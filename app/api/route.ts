import { createClient } from '../utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { ticketId } = await request.json();

    if (!ticketId) {
      return NextResponse.json({ error: "Missing Ticket ID" }, { status: 400 });
    }

    // 1. Fetch the ticket and check its existence/status
    const { data: ticket, error: fetchError } = await supabase
      .from('tickets')
      .select('id, status, events(title)')
      .eq('id', ticketId)
      .single();

    if (fetchError || !ticket) {
      return NextResponse.json({ valid: false, message: "Ticket not found" }, { status: 404 });
    }

    // 2. Prevent double-entry fraud
    if (ticket.status === 'used') {
      return NextResponse.json({ 
        valid: false, 
        message: `Fraud Warning: Already Scanned!`,
        eventName: (ticket.events as any)?.title
      }, { status: 200 }); // Status 200 because the network call succeeded, but validation failed
    }

    // 3. Update status to 'used' (Check them in!)
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ status: 'used' })
      .eq('id', ticketId);

    if (updateError) {
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }

    return NextResponse.json({
      valid: true,
      message: "Access Granted. Welcome!",
      eventName: (ticket.events as any)?.title
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
"use server";
import { createClient } from '../utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signUp(email: string, name: string, password: string, role: string) {
  const supabase = await createClient();

  // 1. Create Auth User (Supabase sets the session cookie behind the scenes)
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  // console.log(authError)
  if (authError) return { success: false, error: authError.message };
 console.log("SESSION:", data.session);

  // 2. Feed the profiles table using the newly generated user ID
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id, 
          email,
          name, 
          role ,
          
        }
      ]);

    if (profileError) return { success: false, error: profileError.message };
  }

  // return redirect('/');
}
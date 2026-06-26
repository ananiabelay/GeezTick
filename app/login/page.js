import { createClient } from '../utils/supabase/client';
import { redirect } from 'next/navigation';
import LoginForm from '../components/LoginForm';

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Already logged in? Go home.
  if (user) {
    redirect('/');
  }

  return <LoginForm />;
}
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const { origin } = req.nextUrl;
  const { username, email, password, accountType } = await req.json();
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        accountType
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ message: `Signup successful. Check your email to continue the sign-in process.\nData: ${data}`, });
}

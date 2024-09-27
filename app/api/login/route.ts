import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { email, password } = await req.json();

  const { error } = await supabase.auth.signInWithPassword({ 
    email, 
    password, 
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ message: 'Login successful' });
}

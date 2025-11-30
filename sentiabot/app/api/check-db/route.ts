import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.rpc('check_connection');

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', message: 'Supabase connection successful!' });
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
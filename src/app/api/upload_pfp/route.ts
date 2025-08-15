import { supabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const id = (form.get('id') as string) || 'anon';
    const file = form.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    const ext = (file.name?.split('.').pop() || 'png').toLowerCase();
    const filePath = `${id}/profile.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('pfp')
      .upload(filePath, file, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: pub } = supabaseAdmin.storage
      .from('pfp')
      .getPublicUrl(filePath);

    return NextResponse.json(
      { url: pub.publicUrl, path: filePath },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Error uploading profile picture:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

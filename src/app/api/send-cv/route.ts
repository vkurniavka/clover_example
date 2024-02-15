import { NextResponse } from 'next/server';
import { config } from '@/config/config';

export async function POST(req: Request) {
  const formData = await req.formData();
  let body = Object.fromEntries(formData);
  let file;

  if (body?.File) {
    file = body.File as File;
    delete body.File;
  }

  try {
    const resForm = await fetch(`${config.LEAD_RECEIVER_URL}/candidate`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());

    if (!file) {
      return NextResponse.json({
        message: resForm.message ?? JSON.stringify(resForm.errors),
      });
    }

    const cvFormData = new FormData();
    cvFormData.append('File', file, file.name);

    const resUploadCV = await fetch(
      `${config.LEAD_RECEIVER_URL}/candidate/${resForm.data?.id}/file`,
      {
        method: 'POST',
        body: cvFormData,
      }
    ).then(res => res.json());

    return NextResponse.json({
      message: resUploadCV.message ?? JSON.stringify(resUploadCV.errors),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

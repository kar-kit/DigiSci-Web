import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json() as {
    name?: string;
    organisation?: string;
    role?: string;
    email?: string;
    enquiryType?: string;
    description?: string;
    gdprConsent?: boolean;
  };

  const { name, organisation, role, email, enquiryType, description, gdprConsent } = body;

  if (!gdprConsent) {
    return NextResponse.json({ error: 'GDPR consent is required' }, { status: 400 });
  }

  if (!name || !email || !description) {
    return NextResponse.json({ error: 'name, email and description are required' }, { status: 400 });
  }

  const to = process.env.RESEND_TO_EMAIL;
  if (!to) {
    return NextResponse.json({ error: 'RESEND_TO_EMAIL not configured' }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: 'DigiSci Enquiries <noreply@digisci.solutions>',
    to,
    replyTo: email,
    subject: `New enquiry — ${enquiryType ?? 'General'} from ${name}`,
    text: [
      `Name: ${name}`,
      `Organisation: ${organisation ?? '—'}`,
      `Role: ${role ?? '—'}`,
      `Email: ${email}`,
      `Enquiry type: ${enquiryType ?? '—'}`,
      '',
      description,
    ].join('\n'),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

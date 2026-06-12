import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json() as { email?: string };
  const { email } = body;

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'DigiSci Insights <hello@digisci.solutions>',
    to: email,
    subject: 'You\'re subscribed to DigiSci Insights',
    text: [
      'Thanks for subscribing to DigiSci Insights.',
      '',
      'You\'ll receive practical perspectives on AI strategy, pharmaceutical manufacturing,',
      'and digital quality systems — written for biotech and pharmaceutical operations leaders.',
      '',
      'DigiSci Consulting',
      'https://digisci.solutions',
    ].join('\n'),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

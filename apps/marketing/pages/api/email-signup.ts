import { emailValidator, safeParseForData } from '@vertex-protocol/web-common';

import type { NextApiRequest, NextApiResponse } from 'next';

const listId = 'S6rp4w';

export interface EmailSignUpRequestParams {
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  const { email } = req.body as EmailSignUpRequestParams;

  const parsedEmail = safeParseForData(emailValidator, email);
  if (!parsedEmail) {
    res.status(400).json({ message: 'Bad Request' });
    return;
  }

  console.debug('Adding email', parsedEmail);

  await fetch(
    `https://a.klaviyo.com/api/v2/list/${listId}/subscribe?api_key=${process.env.KLAVIYO_SECRET}`,
    {
      method: 'POST',
      body: JSON.stringify({
        profiles: [
          {
            email: parsedEmail,
          },
        ],
      }),
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    },
  );

  res.status(200).json({ status: 'success' });
}

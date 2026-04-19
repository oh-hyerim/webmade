/**
 * Vercel Node Serverless — REQUEST_ACCESS_TOKEN 은 Vercel 환경변수(서버 전용)
 * @see https://vercel.com/docs/functions/serverless-functions
 */
type VercelApiHandler = (req: VercelRequest, res: VercelResponse) => void | Promise<void>;

interface VercelRequest {
  method?: string;
  body?: { token?: string };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: object) => void;
  end: (chunk?: string | Buffer) => void;
  setHeader: (name: string, value: string | number | readonly string[]) => void;
}

const handler: VercelApiHandler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const expected = process.env.REQUEST_ACCESS_TOKEN;
  if (!expected || !String(expected).trim()) {
    res.status(503).json({ ok: false, error: 'server_misconfigured' });
    return;
  }

  const body = req.body as { token?: string } | undefined;
  const token = body?.token != null ? String(body.token) : '';
  if (token !== String(expected).trim()) {
    res.status(401).json({ ok: false });
    return;
  }

  res.status(200).json({ ok: true });
};

export default handler;

import { NextRequest } from 'next/server';

// A set of identifiers found in Netlify's logs and often used by brute force tools.
const INVALID_PATH_REGEX = new RegExp(
  /^\/1$|\/\.+|'|\(|\)|\%5C|\%22|\%27|\%28|\%29|CDGServer|getRuntime/,
);

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  if (INVALID_PATH_REGEX.test(pathname)) {
    return new Response('Not Found', { status: 404 });
  }
}

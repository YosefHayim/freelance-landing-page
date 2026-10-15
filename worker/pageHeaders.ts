const clientAcceptEncoding = (request: Request) => {
  const sentByClient =
    request.cf && 'clientAcceptEncoding' in request.cf && request.cf.clientAcceptEncoding;
  if (typeof sentByClient === 'string') return sentByClient;
  return request.headers.get('Accept-Encoding') || '';
};

const isRefused = (parameters: string[]) =>
  parameters.some((parameter) => /^\s*q=0(\.0*)?\s*$/.test(parameter));

const acceptedEncodings = (acceptEncoding: string) =>
  acceptEncoding
    .toLowerCase()
    .split(',')
    .map((entry) => entry.split(';'))
    .filter(([, ...parameters]) => !isRefused(parameters))
    .map(([name]) => name.trim());

const encodingFor = (acceptEncoding: string) => {
  const accepted = acceptedEncodings(acceptEncoding);
  if (accepted.includes('br')) return 'br';
  if (accepted.includes('gzip')) return 'gzip';
  return null;
};

export const addPageHeaders = (headers: Headers, request: Request) => {
  const contentType = headers.get('Content-Type') || '';
  if (!contentType.startsWith('text/html')) return;
  headers.append('Cache-Control', 'no-transform');
  headers.append('Vary', 'Accept-Encoding');
  const acceptEncoding = clientAcceptEncoding(request);
  const encoding = encodingFor(acceptEncoding);
  if (!encoding) return;
  headers.set('Content-Encoding', encoding);
};

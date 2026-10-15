const clientAcceptEncoding = (request: Request) => {
  const original =
    request.cf && 'clientAcceptEncoding' in request.cf && request.cf.clientAcceptEncoding;
  if (typeof original === 'string' && original) return original;
  return request.headers.get('Accept-Encoding') || '';
};

const encodingFor = (acceptEncoding: string) => {
  if (acceptEncoding.includes('br')) return 'br';
  if (acceptEncoding.includes('gzip')) return 'gzip';
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

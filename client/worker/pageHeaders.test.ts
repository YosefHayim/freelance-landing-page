import { describe, expect, it } from 'vitest';
import { addPageHeaders } from './pageHeaders';

const revalidate = 'public, max-age=0, must-revalidate';

const pageHeadersFor = (contentType: string, request: Request) => {
  const headers = new Headers({ 'Content-Type': contentType, 'Cache-Control': revalidate });
  addPageHeaders(headers, request);
  return headers;
};

const headersFor = (contentType: string, acceptEncoding: string) => {
  const request = new Request('https://joseph-tech-solutions.dev/', {
    headers: { 'Accept-Encoding': acceptEncoding },
  });
  return pageHeadersFor(contentType, request);
};

describe('page headers', () => {
  it('keeps Cloudflare from changing a page and compresses it in the Worker', () => {
    const headers = headersFor('text/html', 'gzip, deflate, br, zstd');
    expect(headers.get('Cache-Control')).toBe(`${revalidate}, no-transform`);
    expect(headers.get('Content-Encoding')).toBe('br');
    expect(headers.get('Vary')).toBe('Accept-Encoding');
  });
  it('falls back to gzip for a browser without brotli', () => {
    const headers = headersFor('text/html; charset=utf-8', 'gzip, deflate');
    expect(headers.get('Content-Encoding')).toBe('gzip');
  });
  it('skips an encoding the browser refuses with a zero weight', () => {
    expect(headersFor('text/html', 'br;q=0, gzip;q=1').get('Content-Encoding')).toBe('gzip');
    expect(headersFor('text/html', 'gzip, br; q=0.0').get('Content-Encoding')).toBe('gzip');
    expect(headersFor('text/html', 'br;q=0.5, gzip').get('Content-Encoding')).toBe('br');
  });
  it('trusts the empty header Cloudflare replaced over its own value', () => {
    const replacedRequest = new Request('https://joseph-tech-solutions.dev/', {
      headers: { 'Accept-Encoding': 'br, gzip' },
    });
    const request = Object.assign(replacedRequest, { cf: { clientAcceptEncoding: '' } });
    expect(pageHeadersFor('text/html', request).get('Content-Encoding')).toBeNull();
  });
  it('sends a page as is to a client that accepts no compression', () => {
    const headers = headersFor('text/html', '');
    expect(headers.get('Content-Encoding')).toBeNull();
    expect(headers.get('Cache-Control')).toBe(`${revalidate}, no-transform`);
  });
  it('leaves other files to Cloudflare compression', () => {
    const headers = headersFor('text/javascript', 'br');
    expect(headers.get('Cache-Control')).toBe(revalidate);
    expect(headers.get('Content-Encoding')).toBeNull();
  });
});

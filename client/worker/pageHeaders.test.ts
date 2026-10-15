import { describe, expect, it } from 'vitest';
import { addPageHeaders } from './pageHeaders';

const revalidate = 'public, max-age=0, must-revalidate';

const headersFor = (contentType: string, acceptEncoding: string) => {
  const headers = new Headers({ 'Content-Type': contentType, 'Cache-Control': revalidate });
  const request = new Request('https://joseph-tech-solutions.dev/', {
    headers: { 'Accept-Encoding': acceptEncoding },
  });
  addPageHeaders(headers, request);
  return headers;
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

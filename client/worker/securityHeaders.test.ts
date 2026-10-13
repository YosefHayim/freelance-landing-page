import { describe, expect, it } from 'vitest';
import { addSecurityHeaders } from './securityHeaders';

describe('security headers', () => {
  it('locks framing, sniffing, referrers and outside sources', () => {
    const headers = new Headers({ 'Content-Type': 'text/html' });
    addSecurityHeaders(headers);
    expect(headers.get('Content-Type')).toBe('text/html');
    expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headers.get('X-Frame-Options')).toBe('DENY');
    expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    const policy = headers.get('Content-Security-Policy');
    expect(policy).toContain("font-src 'self'");
    expect(policy).toContain("frame-ancestors 'none'");
  });

  it('lets Google Tag Manager load its container and its no-script frame', () => {
    const headers = new Headers();
    addSecurityHeaders(headers);
    const policy = headers.get('Content-Security-Policy');
    expect(policy).toMatch(/script-src [^;]*https:\/\/www\.googletagmanager\.com/);
    expect(policy).toMatch(/img-src [^;]*https:\/\/www\.googletagmanager\.com/);
    expect(policy).toMatch(/connect-src [^;]*https:\/\/www\.googletagmanager\.com/);
    expect(policy).toMatch(/frame-src [^;]*https:\/\/www\.googletagmanager\.com/);
    expect(policy).not.toMatch(/script-src [^;]*'unsafe-(inline|eval)'/);
  });

  it('lets the Google Analytics tag in the container report visits', () => {
    const headers = new Headers();
    addSecurityHeaders(headers);
    const policy = headers.get('Content-Security-Policy');
    expect(policy).toMatch(/img-src [^;]*https:\/\/\*\.google-analytics\.com/);
    expect(policy).toMatch(/connect-src [^;]*https:\/\/\*\.google-analytics\.com/);
    expect(policy).toMatch(/connect-src [^;]*https:\/\/\*\.google\.com/);
  });

  it('lets the Meta Pixel load its script and report events', () => {
    const headers = new Headers();
    addSecurityHeaders(headers);
    const policy = headers.get('Content-Security-Policy');
    expect(policy).toMatch(/script-src [^;]*https:\/\/connect\.facebook\.net/);
    expect(policy).toMatch(/img-src [^;]*https:\/\/www\.facebook\.com/);
    expect(policy).toMatch(/connect-src [^;]*https:\/\/www\.facebook\.com/);
  });
});

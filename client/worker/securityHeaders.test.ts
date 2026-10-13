import { describe, expect, it } from 'vitest';
import { addSecurityHeaders } from './securityHeaders';

const chatApi = 'https://api.replybase.dev';
const tagManager = 'https://www.googletagmanager.com';
const analytics = 'https://*.google-analytics.com';
const googleSignals = 'https://*.google.com';
const metaEvents = 'https://www.facebook.com';
const pixelGateway = 'https://mpc2-prod-29-is5qnl632q-uc.a.run.app';
const pixelGatewayFallback = 'https://5z-2b6b7616f94640c2840d1841e1ac24c3.ecs.us-east-1.on.aws';

const policySources = (directiveName: string) => {
  const headers = new Headers();
  addSecurityHeaders(headers);
  const policy = headers.get('Content-Security-Policy') || '';
  const directives = policy.split('; ');
  const directive = directives.find((entry) => entry.startsWith(`${directiveName} `)) || '';
  const [, ...sources] = directive.split(' ');
  return sources;
};

describe('security headers', () => {
  it('locks framing, sniffing, referrers and outside sources', () => {
    const headers = new Headers({ 'Content-Type': 'text/html' });
    addSecurityHeaders(headers);
    expect(headers.get('Content-Type')).toBe('text/html');
    expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headers.get('X-Frame-Options')).toBe('DENY');
    expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    const fontSources = policySources('font-src');
    const frameAncestors = policySources('frame-ancestors');
    expect(fontSources).toEqual(["'self'"]);
    expect(frameAncestors).toEqual(["'none'"]);
  });

  it('lets Google Tag Manager load its container and its no-script frame', () => {
    const scriptSources = policySources('script-src');
    const imageSources = policySources('img-src');
    const connectSources = policySources('connect-src');
    const frameSources = policySources('frame-src');
    expect(scriptSources).toContain(tagManager);
    expect(imageSources).toContain(tagManager);
    expect(connectSources).toContain(tagManager);
    expect(frameSources).toEqual([tagManager]);
    expect(scriptSources).not.toContain("'unsafe-inline'");
    expect(scriptSources).not.toContain("'unsafe-eval'");
  });

  it('lets the Google Analytics tag in the container report visits', () => {
    const imageSources = policySources('img-src');
    const connectSources = policySources('connect-src');
    expect(imageSources).toContain(analytics);
    expect(connectSources).toContain(analytics);
    expect(connectSources).toContain(googleSignals);
  });

  it('lets the Meta Pixel load its script and report events', () => {
    const scriptSources = policySources('script-src');
    const imageSources = policySources('img-src');
    const connectSources = policySources('connect-src');
    expect(scriptSources).toContain('https://connect.facebook.net');
    expect(imageSources).toContain(metaEvents);
    expect(connectSources).toContain(metaEvents);
  });

  it('lets the Meta Pixel copy events to its Conversions API gateway', () => {
    const connectSources = policySources('connect-src');
    expect(connectSources).toContain(pixelGateway);
    expect(connectSources).toContain(pixelGatewayFallback);
  });

  it('lets the page connect to no other host', () => {
    const connectSources = policySources('connect-src');
    expect(connectSources).toEqual([
      "'self'",
      chatApi,
      metaEvents,
      pixelGateway,
      pixelGatewayFallback,
      tagManager,
      analytics,
      googleSignals,
    ]);
  });
});

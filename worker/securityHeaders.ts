const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' https://cdn.replybase.dev https://connect.facebook.net https://www.googletagmanager.com https://analytics.tiktok.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://replybase.dev https://www.facebook.com https://www.googletagmanager.com https://*.google-analytics.com; font-src 'self'; connect-src 'self' https://api.replybase.dev https://www.facebook.com https://mpc2-prod-29-is5qnl632q-uc.a.run.app https://5z-2b6b7616f94640c2840d1841e1ac24c3.ecs.us-east-1.on.aws https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com https://analytics.tiktok.com https://analytics-ipv6.tiktokw.us; frame-src https://www.googletagmanager.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'",
};

export const addSecurityHeaders = (headers: Headers) => {
  for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
};

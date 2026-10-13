const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' https://cdn.replybase.dev https://connect.facebook.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://replybase.dev https://www.facebook.com https://www.googletagmanager.com https://*.google-analytics.com; font-src 'self'; connect-src 'self' https://api.replybase.dev https://www.facebook.com https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com; frame-src https://www.googletagmanager.com; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'",
};

export const addSecurityHeaders = (headers: Headers) => {
  for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
};

import { Effect } from 'effect';
import { cacheControlFor } from './cacheHeaders';
import { redirectDestination } from './domainRedirects';
import { addPageHeaders } from './pageHeaders';
import { hebrewPagePath, pagePathFor } from './pageLanguage';
import { addSecurityHeaders } from './securityHeaders';

const defaultCacheControl = 'public, max-age=0, must-revalidate';
const notFoundPagePath = '/404';

const serveFile = (request: Request, env: Env) => {
  const { pathname } = new URL(request.url);
  const fetchFile = Effect.tryPromise(() => env.ASSETS.fetch(request));
  const withHeaders = Effect.map(fetchFile, (file) => {
    const response = new Response(file.body, file);
    const current = response.headers.get('Cache-Control') || defaultCacheControl;
    const cacheControl = cacheControlFor(pathname, response.status, current);
    response.headers.set('Cache-Control', cacheControl);
    addSecurityHeaders(response.headers);
    addPageHeaders(response.headers, request);
    return response;
  });
  const handleFailure = Effect.catchAll(withHeaders, (error) => {
    const report = Effect.logError('static_asset_failure', error);
    const unavailable = new Response('Service temporarily unavailable', { status: 503 });
    return Effect.as(report, unavailable);
  });
  return Effect.runPromise(handleFailure);
};

const servePage = async (request: Request, env: Env) => {
  const pagePath = pagePathFor(request.headers);
  const pageUrl = new URL(pagePath, request.url);
  const pageRequest = new Request(pageUrl, request);
  const page = await serveFile(pageRequest, env);
  page.headers.append('Vary', 'Accept-Language, Cookie');
  return page;
};

const serveNotFound = async (request: Request, env: Env) => {
  const notFoundUrl = new URL(notFoundPagePath, request.url);
  const notFoundRequest = new Request(notFoundUrl);
  const notFoundPage = await serveFile(notFoundRequest, env);
  if (notFoundPage.status !== 200) return notFoundPage;
  return new Response(notFoundPage.body, { status: 404, headers: notFoundPage.headers });
};

const serveSite = (request: Request, env: Env) => {
  const destination = redirectDestination(request.url);
  if (destination) return Response.redirect(destination, 308);
  const { pathname } = new URL(request.url);
  if (pathname === '/') return servePage(request, env);
  const isHebrewPageFile = pathname === hebrewPagePath || pathname === `${hebrewPagePath}.html`;
  if (isHebrewPageFile) return serveNotFound(request, env);
  return serveFile(request, env);
};

export default { fetch: serveSite } satisfies ExportedHandler<Env>;

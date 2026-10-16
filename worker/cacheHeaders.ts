const hashedFileCache = 'public, max-age=31536000, immutable';

export const cacheControlFor = (pathname: string, status: number, assetCacheControl: string) => {
  if (status === 200 && pathname.startsWith('/assets/')) return hashedFileCache;
  return assetCacheControl;
};

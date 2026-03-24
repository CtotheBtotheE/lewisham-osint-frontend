/**
 * Cloudflare Pages Worker — path-based routing
 *
 * /admin → admin.html
 * everything else → default static asset serving
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve admin dashboard at /admin
    if (url.pathname === '/admin' || url.pathname === '/admin/') {
      url.pathname = '/admin.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // Serve database page at /admin/database
    if (url.pathname === '/admin/database' || url.pathname === '/admin/database/') {
      url.pathname = '/database.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // Serve analytics page at /admin/analytics
    if (url.pathname === '/admin/analytics' || url.pathname === '/admin/analytics/') {
      url.pathname = '/analytics.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // Everything else: default static asset serving (index.html for /)
    return env.ASSETS.fetch(request);
  },
};

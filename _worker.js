/**
 * Cloudflare Pages Worker — host-based routing
 *
 * admin.lewishamlive.co.uk → admin.html
 * everything else          → index.html (public crime map)
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get('host') || '';

    // Serve admin dashboard on admin subdomain
    if (host.startsWith('admin.')) {
      // Rewrite root to admin.html
      if (url.pathname === '/' || url.pathname === '') {
        url.pathname = '/admin.html';
        return env.ASSETS.fetch(new Request(url.toString(), request));
      }
    }

    // Everything else: default static asset serving (index.html for /)
    return env.ASSETS.fetch(request);
  },
};

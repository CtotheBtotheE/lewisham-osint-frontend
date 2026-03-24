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

    // ── Maintenance mode (set to true to block public site) ──
    const MAINTENANCE = true;

    if (MAINTENANCE && url.pathname === '/' || MAINTENANCE && url.pathname === '') {
      return new Response(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Lewisham Live — Coming Soon</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f1117;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center}
.wrap{max-width:500px;padding:40px}.h1{font-size:28px;font-weight:700;color:#fff;margin-bottom:8px}.sub{font-size:14px;color:#64748b;margin-bottom:24px}
.badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#facc15;background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.2);border-radius:20px;padding:5px 14px}
.dot{width:7px;height:7px;border-radius:50%;background:#facc15;animation:p 1.4s infinite}@keyframes p{0%,100%{opacity:1}50%{opacity:.2}}</style></head>
<body><div class="wrap"><div class="badge"><span class="dot"></span>Under development</div><h1 class="h1" style="margin-top:20px">Lewisham Live</h1><p class="sub">Crime intelligence platform for Lewisham, South East London.<br>Currently under development. Check back soon.</p></div></body></html>`,
        { status: 200, headers: { 'Content-Type': 'text/html;charset=UTF-8' } }
      );
    }

    // Everything else: default static asset serving (index.html for /)
    return env.ASSETS.fetch(request);
  },
};

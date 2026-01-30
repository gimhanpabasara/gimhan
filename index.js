document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll('a[href*="wa.me"],a[href*="whatsapp"]').forEach(el => {
        el.addEventListener("click", () => trackEvent("Lead_WhatsApp"));
      });
      document.querySelectorAll("#pricing .btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const c = btn.closest(".price");
          trackEvent("Package_Select", { package: c?.querySelector("h4")?.innerText });
        });
      });
    });

    (function () {
      const px = localStorage.getItem("pixelId");
      const ga = localStorage.getItem("gaId");

      if (px && !window.fbq) {
        !function (f, b, e, v, n, t, s) {
          if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
          };
          if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
          n.queue = []; t = b.createElement(e); t.async = !0;
          t.src = v; s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', px); fbq('track', 'PageView');
      }

      if (ga && !window.gtag) {
        const s = document.createElement('script');
        s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments) } window.gtag = gtag;
        gtag('js', new Date()); gtag('config', ga);
      }

      window.trackEvent = function (name, params) {
        if (window.fbq) { fbq('trackCustom', name, params || {}) }
        if (window.gtag) { gtag('event', name, params || {}) }
      }
    })();
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/config";
import { captureUtm, readConsent, track, writeConsent } from "@/lib/analytics";

const hasAnyTool = Object.values(site.analytics).some(Boolean);

function inject(id: string, src?: string, inline?: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  if (src) s.src = src;
  if (inline) s.text = inline;
  document.head.appendChild(s);
}

/** Carrega as ferramentas de medição somente após consentimento (LGPD). */
function loadTools() {
  const { gtmId, ga4Id, metaPixelId, clarityId } = site.analytics;
  if (gtmId) {
    inject("gtm", undefined, `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`);
  }
  if (ga4Id && !gtmId) {
    inject("ga4-src", `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`);
    inject("ga4", undefined, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`);
  }
  if (metaPixelId) {
    inject("meta-pixel", undefined, `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`);
  }
  if (clarityId) {
    inject("clarity", undefined, `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`);
  }
}

export function Tracking() {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    captureUtm();
    const c = readConsent();
    if (c === "granted") loadTools();
    else if (c === null && hasAnyTool) setAsk(true);

    // profundidade de rolagem
    const marks = [25, 50, 75, 90];
    const hit = new Set<number>();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const pct = ((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100;
        marks.forEach((m) => {
          if (pct >= m && !hit.has(m)) {
            hit.add(m);
            track("scroll_depth", { percent: m });
          }
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!ask) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-xl rounded-2xl bg-ink p-5 text-sm text-white shadow-2xl md:bottom-6"
    >
      <p className="leading-relaxed text-white/85">
        Usamos cookies de medição para entender quais partes desta página ajudam as igrejas. Eles só são ativados se
        você aceitar. <Link href="/privacidade/" className="underline underline-offset-2">Política de privacidade</Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          className="btn btn-ghost min-h-11 flex-1 text-sm"
          onClick={() => {
            writeConsent("denied");
            setAsk(false);
          }}
        >
          Recusar
        </button>
        <button
          className="btn btn-gold min-h-11 flex-1 text-sm"
          onClick={() => {
            writeConsent("granted");
            loadTools();
            setAsk(false);
          }}
        >
          Aceitar medição
        </button>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { PlayCircle } from "lucide-react";
import { site } from "@/lib/config";
import { track } from "@/lib/analytics";

/** Botão do topo: rola até a seção do vídeo e começa a tocar. */
export function DemoButton({ className = "" }: { className?: string }) {
  if (!site.demoVideoUrl) return null;
  return (
    <a
      href="#demonstracao"
      className={`btn btn-ghost ${className}`}
      onClick={() => {
        track("cta_click", { location: "hero_demo" });
        const v = document.querySelector<HTMLVideoElement>("#demonstracao video");
        v?.play().catch(() => {
          /* sem autoplay: o visitante aperta o play */
        });
      }}
    >
      <PlayCircle className="size-5" aria-hidden="true" />
      Assistir demonstração
    </a>
  );
}

/** Vídeo de demonstração embutido na página. */
export function DemoVideo() {
  const started = useRef(false);
  if (!site.demoVideoUrl) return null;
  return (
    <video
      src={site.demoVideoUrl}
      poster={site.demoPosterUrl}
      controls
      playsInline
      preload="metadata"
      className="aspect-video w-full rounded-2xl bg-ink shadow-[0_40px_80px_-30px_rgba(10,12,50,0.55)]"
      onPlay={() => {
        if (started.current) return;
        started.current = true;
        track("demo_play", {});
      }}
      onEnded={() => track("demo_complete", {})}
    >
      Seu navegador não reproduz vídeo. <a href={site.demoVideoUrl}>Baixe o vídeo de demonstração</a>.
    </video>
  );
}

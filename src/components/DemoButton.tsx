"use client";

import { useRef } from "react";
import { PlayCircle, X } from "lucide-react";
import { site } from "@/lib/config";
import { track } from "@/lib/analytics";
import { WhatsAppButton } from "./WhatsAppButton";

/** Botão "Assistir demonstração" que abre o vídeo numa janela sobre a página. */
export function DemoButton({ className = "" }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  if (!site.demoVideoUrl) return null;

  function open() {
    track("cta_click", { location: "hero_demo" });
    track("demo_open", {});
    dialog.current?.showModal();
    video.current?.play().catch(() => {
      /* autoplay bloqueado: o visitante aperta o play */
    });
  }

  function close() {
    video.current?.pause();
    dialog.current?.close();
  }

  return (
    <>
      <button type="button" onClick={open} className={`btn btn-ghost ${className}`}>
        <PlayCircle className="size-5" aria-hidden="true" />
        Assistir demonstração
      </button>

      <dialog
        ref={dialog}
        aria-label="Vídeo de demonstração do MinisterioOn"
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        className="m-auto w-[min(1100px,calc(100vw-2rem))] max-w-none bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        <div className="overflow-hidden rounded-2xl bg-ink shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <p className="text-sm font-semibold">MinisterioOn em pouco mais de 1 minuto</p>
            <button type="button" onClick={close} className="grid size-10 place-items-center rounded-full hover:bg-white/10" aria-label="Fechar vídeo">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <video
            ref={video}
            src={site.demoVideoUrl}
            poster={site.demoPosterUrl}
            controls
            playsInline
            preload="none"
            className="aspect-video w-full bg-black"
            onPlay={() => track("demo_play", {})}
            onEnded={() => track("demo_complete", {})}
          />
          <div className="flex flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
            <p className="text-sm text-white/80">Gostou? Fale com a equipe e tire suas dúvidas.</p>
            <WhatsAppButton location="demo_modal" label="Conversar no WhatsApp" className="min-h-11 text-sm" />
          </div>
        </div>
      </dialog>
    </>
  );
}

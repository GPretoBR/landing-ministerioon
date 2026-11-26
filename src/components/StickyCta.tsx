"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";

/** Barra fixa no celular: aparece depois do hero e some quando o fechamento está na tela. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const end = document.getElementById("contato");
    if (!hero || !end) return;
    const state = { heroOut: false, endIn: false };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) state.heroOut = !e.isIntersecting;
        if (e.target === end) state.endIn = e.isIntersecting;
      });
      setShow(state.heroOut && !state.endIn);
    });
    io.observe(hero);
    io.observe(end);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <WhatsAppButton location="sticky_mobile" label="Falar com a equipe" className="w-full" />
    </div>
  );
}

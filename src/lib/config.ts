/**
 * Configuração central da landing page.
 * Itens marcados como PENDENTE precisam ser preenchidos antes da publicação.
 * Nada aqui deve ser inventado: deixe vazio o que não estiver confirmado,
 * e a seção correspondente simplesmente não aparece.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string; // ex.: "Pastor presidente"
  church: string; // ex.: "Igreja X, Curitiba/PR"
  /** Confirme que a pessoa autorizou o uso do depoimento. */
  authorized: true;
};

export const site = {
  name: "MinisterioOn",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ministerioon.com.br",
  appLoginUrl: "https://app.ministerioon.com.br/login/",

  /** WhatsApp comercial, só dígitos, com DDI e DDD. A variável NEXT_PUBLIC_WHATSAPP_NUMBER sobrescreve. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5541998923109").replace(/\D/g, ""),

  /** PENDENTE: dados institucionais. Campos vazios não são exibidos no rodapé. */
  company: {
    legalName: "Confira Aki Tecnologia",
    cnpj: "",
    email: "",
    instagram: "", // URL completa
    youtube: "", // URL completa
  },

  /**
   * PENDENTE: depoimentos reais e autorizados.
   * Enquanto a lista estiver vazia, a seção de prova social não é renderizada.
   */
  testimonials: [] as Testimonial[],

  /** Fechamento perene (funciona em qualquer época do ano). */
  closing: {
    title: "Não espere a próxima reunião de diretoria para colocar a casa em ordem.",
    text: "Em poucos dias sua igreja sai do improviso das planilhas e passa a operar com visão ministerial, aplicativo próprio e transparência financeira.",
  },

  /**
   * Vídeo de demonstração (public/demo.mp4). Deixe vazio para esconder o botão "Assistir demonstração".
   * NEXT_PUBLIC_DEMO_VIDEO_URL permite apontar para outro arquivo.
   */
  demoVideoUrl: process.env.NEXT_PUBLIC_DEMO_VIDEO_URL || `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/demo.mp4`,
  demoPosterUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/demo-poster.jpg`,

  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "",
  },
} as const;

export const defaultWhatsappMessage =
  "Olá! Vim pelo site do MinisterioOn e quero entender como o sistema funciona para a minha igreja.";

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

  /** WhatsApp comercial (+55 41 9892-3109). A variável NEXT_PUBLIC_WHATSAPP_NUMBER, se definida, tem prioridade. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "554198923109").replace(/\D/g, ""),

  /** PENDENTE: dados institucionais. Campos vazios não são exibidos no rodapé. */
  company: {
    legalName: "",
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

  /**
   * Argumento de momento (sem escassez inventada). Revise ou desative quando a data passar.
   */
  seasonal: {
    enabled: true,
    title: "Comece 2027 com a igreja já organizada.",
    text: "Dezembro é quando a liderança monta o calendário do próximo ano. Quem começa agora abre janeiro com membros, departamentos, agenda e escalas já no sistema, em vez de começar o ano migrando planilhas.",
  },

  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "",
  },
} as const;

export const defaultWhatsappMessage =
  "Olá! Vim pelo site do MinisterioOn e quero entender como o sistema funciona para a minha igreja.";

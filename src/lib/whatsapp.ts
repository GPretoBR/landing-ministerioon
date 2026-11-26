import { defaultWhatsappMessage, site } from "./config";

export const whatsappReady = site.whatsappNumber.length >= 12;

export function whatsappUrl(message: string = defaultWhatsappMessage) {
  if (!whatsappReady) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

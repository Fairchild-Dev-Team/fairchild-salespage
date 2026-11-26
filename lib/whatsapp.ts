/** FairChild sales WhatsApp: +1 (347) 766-1809 */
export const FAIRCHILD_WHATSAPP_NUMBER = "13477661809"

export const WHATSAPP_REQUEST_INFO_MESSAGE =
  "I am contacting from the FairChild Institute sales page. I want to request for more information and pricing."

/** Shorter prefill for the floating chat button. */
export const WHATSAPP_FAB_MESSAGE = WHATSAPP_REQUEST_INFO_MESSAGE

export function whatsappChatHref(
  prefill: string = WHATSAPP_REQUEST_INFO_MESSAGE
): string {
  return `https://wa.me/${FAIRCHILD_WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`
}

/** Hero / catalogue cards: include institute or course name in the prefill. */
export function whatsappRequestInfoHref(subject?: string): string {
  const trimmed = subject?.trim()
  const prefill = trimmed
    ? `${WHATSAPP_REQUEST_INFO_MESSAGE} (${trimmed})`
    : WHATSAPP_REQUEST_INFO_MESSAGE
  return whatsappChatHref(prefill)
}
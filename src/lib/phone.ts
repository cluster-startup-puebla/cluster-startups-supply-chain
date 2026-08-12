/**
 * Teléfono legible → destino de un enlace `tel:`.
 *
 * Los teléfonos se escriben para leerse —"+52 (275) 112-1666"— y el
 * `tel:` sólo admite dígitos con un `+` de prefijo internacional. Quitar
 * únicamente los espacios dejaba los paréntesis dentro del enlace, que
 * no todos los marcadores digieren.
 */
export function toTelHref(phone: string) {
  return phone.replace(/(?!^\+)[^\d]/g, '');
}

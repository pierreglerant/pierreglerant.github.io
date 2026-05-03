/** Découpe un texte en paragraphes (blocs séparés par une ligne vide). */
export function bodyParagraphs(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Lignes de stack : une puce par ligne, préfixe `-`, `•` ou `*` + espace. */
export function stackBulletItems(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-•*]\s/.test(line))
    .map((line) => line.replace(/^[-•*]\s+/, "").trim());
}

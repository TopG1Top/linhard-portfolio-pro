/** Swiss orthography and punctuation-free editorial headings. */
export function prose(text: string) {
  return text.replace(/\s*[\u2012-\u2015]\s*/g, " ").replace(/ß/g, "ss").replace(/\s+/g, " ").trim();
}

export function heading(text: string) {
  return prose(text).replace(/\./g, " ").replace(/\s+/g, " ").trim();
}

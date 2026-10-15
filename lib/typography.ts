/** Swiss orthography and punctuation-free editorial headings. */
export function heading(text: string) {
  return text.replace(/ß/g, "ss").replace(/[—–.]/g, " ").replace(/\s+/g, " ").trim();
}

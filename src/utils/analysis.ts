export function extractImages(markdown: string): string[] {
  if (!markdown) {
    return [];
  }
  const imageRegex = /(?:!\[.*?\]\((https?:\/\/.*?\.(?:png|jpg|jpeg|gif|svg|webp)(?:\?[^\s)]+)?)\))|(?:<img.*?src=["'](https?:\/\/.*?\.(?:png|jpg|jpeg|gif|svg|webp)(?:\?[^\s"']+)?)["'])/gi;
  const matches = [...markdown.matchAll(imageRegex)];
  return matches.map(match => match[1] || match[2]).filter(Boolean);
}

export function extractBrandColors(markdown: string): string[] {
  if (!markdown) {
    return [];
  }
  const colorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
  const matches = markdown.match(colorRegex) || [];
  return Array.from(new Set(matches)); // Remove duplicates
}
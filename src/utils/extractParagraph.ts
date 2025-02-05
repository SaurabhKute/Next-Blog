export default function extractFirstParagraph(html: string, limit: number = 80) {
  if (!html) return "";

  const match = html.match(/<p[^>]*>(.*?)<\/p>/i);
  let content = match ? match[1] : "";

  if (content.length > limit) {
    content = content.slice(0, limit) + "...";
  }

  return content.replace(/<\/?[^>]+(>|$)/g, ""); 
}

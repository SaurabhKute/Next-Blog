export default function extractFirstParagraph(html: string, limit: number = 80) {
  if (!html) return "";

  // Extract text from the first <p> tag using a regex
  const match = html.match(/<p[^>]*>(.*?)<\/p>/i);
  let content = match ? match[1] : "";

  // Limit content length
  if (content.length > limit) {
    content = content.slice(0, limit) + "...";
  }

  return content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove any leftover HTML tags
}

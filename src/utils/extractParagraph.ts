"use client";

export default function extractFirstParagraph(html: string, limit: number = 80) {
  if (!html) return "";

  // Create a temporary DOM element to parse the HTML
  const div = document.createElement("div");
  div.innerHTML = html;

  // Find the first paragraph
  const firstParagraph = div.querySelector("p");

  if (!firstParagraph) return ""; // Return empty if no paragraph found

  // Get the text content and limit its length
  let content = firstParagraph.textContent || "";
  if (content.length > limit) {
    content = content.slice(0, limit) + "...";
  }

  return content;
}

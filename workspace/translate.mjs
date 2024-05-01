import data from "./input/stellarpedia_de.json" assert { type: "json" };
import fs from "fs";

const dir = "./output";

// Clean up
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir);

function dasherize(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
    .trim() // Remove leading and trailing spaces
    .replace("/", "-")
    .replace("_", "-")
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^a-zA-Z0-9\-]/g, "") // Remove all non-alphanumeric characters except -
    .toLowerCase(); // Convert to lowercase
}

function convertToImgTag(str) {
  const regex = /\[img\(ttl=(.*)\)\](.*)/;
  const match = str.match(regex);

  if (match) {
    const altText = match[1];
    const src = match[2];

    return `<img src="${src}" alt="${altText}">`;
  }

  return str;
}

for (const book of data) {
  const bookId = dasherize(book.id);

  // Create book dir
  fs.mkdirSync(`${dir}/${bookId}`);

  for (const chapter of book.chapters) {
    const chapterId = dasherize(chapter.id);

    // Create chapter dir
    fs.mkdirSync(`${dir}/${bookId}/${chapterId}`);

    let log = false;

    for (const article of chapter.entries) {
      const articleId = dasherize(article.id);

      let content = "";
      for (const element of article.elements) {
        if (element.startsWith("[hdr]")) {
          content += `# ${element.replace("[hdr]", "").trim()}\n\n`;
        } else if (element.startsWith("[txt]")) {
          content += `${element.replace("[txt]", "").trim()}\n\n`;
        } else if (element.startsWith("[img")) {
          log = true;
          content += convertToImgTag(element) + "\n\n";
        } else {
          content += `\`SP_TODO: ${element}\`\n`;
        }
      }

      // Replace stuff
      content = content.replace("<hl>", "**").replace("</hl>", "**");

      fs.mkdirSync(`${dir}/${bookId}/${chapterId}/${articleId}`);
      fs.writeFileSync(
        `${dir}/${bookId}/${chapterId}/${articleId}/de.md`,
        content.trim()
      );
    }
  }
}

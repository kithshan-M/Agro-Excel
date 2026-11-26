// Lists text on the site that has no translation yet.
// Run from the project root: npm run check-sinhala, npm run check-tamil, or both with npm run check-translations
import { readdirSync, readFileSync } from "node:fs";
import ts from "typescript";

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(`${dir}/${entry.name}`)
      : /\.tsx?$/.test(entry.name)
        ? [`${dir}/${entry.name}`]
        : [],
  );
const parse = (file) =>
  ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
const visit = (node, fn) => {
  fn(node);
  ts.forEachChild(node, (child) => visit(child, fn));
};
const text = (node) => ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node);

const names = { si: "Sinhala", ta: "Tamil" };
const asked = process.argv.slice(2).filter((arg) => arg in names);
const json = process.argv.includes("--json");

// Translations on file
function knownIn(lang) {
  const known = new Map();
  for (const file of walk(`src/i18n/${lang}`)) {
    visit(parse(file), (node) => {
      if (!ts.isPropertyAssignment(node) || !text(node.initializer)) return;
      const key = ts.isStringLiteral(node.name) || ts.isIdentifier(node.name) ? node.name.text : "";
      if (known.has(key)) console.log(`Twice: ${JSON.stringify(key)} in ${known.get(key)} and ${file}`);
      known.set(key, file);
    });
  }
  return known;
}

// English in use. Fields that hold addresses, pictures and other codes are left out.
const codes = new Set(["slug", "key", "href", "image", "icon", "service", "picture", "band", "tile", "file", "photo", "localName", "part"]);
const used = new Map();
// The business name stays as it is.
const add = (key, file) => /[A-Za-z]{2}/.test(key) && key !== "Agro Excel" && !/^M\d/.test(key) && !used.has(key) && used.set(key, file);
for (const file of walk("src")) {
  if (/i18n\/|sample-projects|business-details|data\/projects\.ts/.test(file)) continue;
  const data = /\/data\/|config\/site/.test(file);
  visit(parse(file), (node) => {
    // Text passed to t(...), or chosen inside it, and topics of WhatsApp links
    if (ts.isCallExpression(node) && /^(t|low|whatsappLink)$/.test(node.expression.getText())) {
      const first = node.arguments[0];
      if (first) visit(first, (child) => text(child) && !ts.isBinaryExpression(child.parent) && add(child.text, file));
    }
    // Hints under the message, in both ways of sending it
    if (ts.isPropertyAssignment(node) && /^(whatsapp|copy)$/.test(node.name.getText())) {
      visit(node.initializer, (child) => text(child) && child.text.includes(" ") && add(child.text, file));
    }
    if (!data || !text(node) || ts.isImportDeclaration(node.parent)) return;
    if (ts.isLiteralTypeNode(node.parent) || ts.isPropertyAssignment(node.parent) && node.parent.name === node) return;
    let owner = node.parent;
    while (owner && !ts.isPropertyAssignment(owner) && !ts.isVariableDeclaration(owner)) owner = owner.parent;
    const name = owner?.name?.getText() ?? "";
    if (codes.has(name) || /^[#/.@]|^https?:|process\.env/.test(node.text) || ts.isElementAccessExpression(node.parent)) return;
    if (name === "homeSeeds" || name === "url") return;
    add(node.text, file);
  });
}
for (const file of walk("src/data").filter((name) => name.endsWith("/projects.ts"))) {
  visit(parse(file), (node) => {
    if (ts.isArrayLiteralExpression(node) && /districts|projectKinds/.test(node.parent?.parent?.getText?.().slice(0, 40) ?? "")) node.elements.forEach((item) => text(item) && add(item.text, file));
  });
}

let gaps = 0;
for (const lang of asked.length ? asked : Object.keys(names)) {
  const known = knownIn(lang);
  const missing = [...used].filter(([key]) => !known.has(key));
  gaps += missing.length;
  if (json) {
    console.log(JSON.stringify(missing.map(([key, file]) => [file.replace("src/", ""), key]), null, 0));
  } else {
    for (const [key, file] of missing) console.log(`No ${names[lang]} (${file}): ${key}`);
    console.log(`${used.size - missing.length} of ${used.size} texts have ${names[lang]}.`);
  }
}
process.exitCode = gaps ? 1 : 0;

import fs from "node:fs/promises";
import path from "node:path";
import { flavorEntries } from "@catppuccin/palette";

const imgDir = path.join(import.meta.dirname, "img");

function createSvg(flavorName, colors) {
  const width = 520;
  const height = 172;
  const titleBarHeight = 36;
  const paddingX = 24;
  const fontSize = 14;
  const lineHeight = 24;

  const line1Y = titleBarHeight + 24 + fontSize;
  const line2Y = line1Y + lineHeight;
  const line3Y = line2Y + lineHeight + 8;
  const line4Y = line3Y + lineHeight;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="8" fill="${colors.base.hex}"/>
  <rect width="${width}" height="${titleBarHeight}" rx="8" fill="${colors.mantle.hex}"/>
  <rect y="${titleBarHeight - 8}" width="${width}" height="8" fill="${colors.mantle.hex}"/>
  <circle cx="20" cy="18" r="6" fill="${colors.red.hex}"/>
  <circle cx="40" cy="18" r="6" fill="${colors.yellow.hex}"/>
  <circle cx="60" cy="18" r="6" fill="${colors.green.hex}"/>
  <text x="${width / 2}" y="23" font-family="Hack Nerd Font Mono, monospace" font-size="12" fill="${colors.subtext0.hex}" text-anchor="middle">${flavorName}</text>

  <!-- prompt 1: full git status + success -->
  <text y="${line1Y}" font-family="Hack Nerd Font Mono, monospace" font-size="${fontSize}">
    <tspan x="${paddingX}" fill="${colors.blue.hex}">~/dev/pure-catppuccin</tspan><tspan fill="${colors.mauve.hex}"> main</tspan><tspan fill="${colors.yellow.hex}"> rebase</tspan><tspan fill="${colors.sapphire.hex}"> ⇡</tspan><tspan fill="${colors.yellow.hex}"> *</tspan><tspan fill="${colors.overlay1.hex}"> ≡</tspan>
  </text>
  <text x="${width - paddingX}" y="${line1Y}" text-anchor="end" font-family="Hack Nerd Font Mono, monospace" font-size="${fontSize}" fill="${colors.peach.hex}">5s</text>
  <text x="${paddingX}" y="${line2Y}" font-family="Hack Nerd Font Mono, monospace" font-size="${fontSize}" fill="${colors.green.hex}">❯</text>

  <!-- prompt 2: error state -->
  <text y="${line3Y}" font-family="Hack Nerd Font Mono, monospace" font-size="${fontSize}">
    <tspan x="${paddingX}" fill="${colors.blue.hex}">~/dev/pure-catppuccin</tspan><tspan fill="${colors.mauve.hex}"> main</tspan>
  </text>
  <text x="${paddingX}" y="${line4Y}" font-family="Hack Nerd Font Mono, monospace" font-size="${fontSize}" fill="${colors.red.hex}">❯</text>
</svg>`;
}

await Promise.all(
  flavorEntries.map(async ([flavor, { name, colors }]) => {
    await fs.writeFile(path.join(imgDir, `${flavor}.svg`), createSvg(name, colors));
    console.log(`✅ ${flavor}`);
  }),
);

import fs from "node:fs/promises";
import path from "node:path";
import { flavorEntries } from "@catppuccin/palette";

const styleDir = path.join(import.meta.dirname, "style");

function createTheme(flavor, colors) {
  return fs.writeFile(
    path.join(styleDir, `${flavor}.zsh`),
    `\
# Show the stash status icon
zstyle :prompt:pure:git:stash show yes

zstyle :prompt:pure:execution_time color "${colors.peach.hex}"
zstyle :prompt:pure:path color "${colors.blue.hex}"

zstyle :prompt:pure:prompt:continuation color "${colors.overlay1.hex}"
zstyle :prompt:pure:prompt:error color "${colors.red.hex}"
zstyle :prompt:pure:prompt:success color "${colors.green.hex}"

zstyle :prompt:pure:git:action color "${colors.yellow.hex}"
zstyle :prompt:pure:git:arrow color "${colors.sapphire.hex}"
zstyle :prompt:pure:git:branch color "${colors.mauve.hex}"
zstyle :prompt:pure:git:branch:cached color "${colors.red.hex}"
zstyle :prompt:pure:git:dirty color "${colors.yellow.hex}"
zstyle :prompt:pure:git:stash color "${colors.overlay1.hex}"
`,
  );
}

await Promise.all(
  flavorEntries.map(async ([flavor, { colors }]) => {
    await createTheme(flavor, colors);
    console.log(`✅ ${flavor}`);
  }),
);

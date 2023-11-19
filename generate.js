import { writeFile } from "fs/promises";
import { resolve } from "path";
import { variants } from "@catppuccin/palette";

async function createTheme(variant, palette) {
  await writeFile(
    resolve("style", `${variant}.zsh`),
    `\
# Show the stash status icon
zstyle :prompt:pure:git:stash show yes

zstyle :prompt:pure:execution_time color "${palette.peach.hex}"
zstyle :prompt:pure:path color "${palette.blue.hex}"

zstyle :prompt:pure:prompt:continuation color "${palette.mauve.hex}"
zstyle :prompt:pure:prompt:error color "${palette.red.hex}"
zstyle :prompt:pure:prompt:success color "${palette.green.hex}"

zstyle :prompt:pure:git:action color "${palette.rosewater.hex}"
zstyle :prompt:pure:git:arrow color "${palette.teal.hex}"
zstyle :prompt:pure:git:branch color "${palette.mauve.hex}"
zstyle :prompt:pure:git:branch:cached color "${palette.red.hex}"
zstyle :prompt:pure:git:dirty color "${palette.yellow.hex}"
zstyle :prompt:pure:git:stash color "${palette.teal.hex}"
`,
    "utf8",
  );
}

for (let [variant, palette] of Object.entries(variants)) {
  await createTheme(variant, palette);
  console.log(`✅ ${variant}`);
}

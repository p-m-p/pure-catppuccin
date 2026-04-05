import { writeFile } from "fs/promises";
import { resolve } from "path";
import { flavorEntries } from "@catppuccin/palette";

async function createTheme(flavor, colors) {
  await writeFile(
    resolve("style", `${flavor}.zsh`),
    `\
# Show the stash status icon
zstyle :prompt:pure:git:stash show yes

zstyle :prompt:pure:execution_time color "${colors.peach.hex}"
zstyle :prompt:pure:path color "${colors.blue.hex}"

zstyle :prompt:pure:prompt:continuation color "${colors.surface2.hex}"
zstyle :prompt:pure:prompt:error color "${colors.red.hex}"
zstyle :prompt:pure:prompt:success color "${colors.green.hex}"

zstyle :prompt:pure:git:action color "${colors.rosewater.hex}"
zstyle :prompt:pure:git:arrow color "${colors.sapphire.hex}"
zstyle :prompt:pure:git:branch color "${colors.mauve.hex}"
zstyle :prompt:pure:git:branch:cached color "${colors.red.hex}"
zstyle :prompt:pure:git:dirty color "${colors.yellow.hex}"
zstyle :prompt:pure:git:stash color "${colors.surface2.hex}"
`,
    "utf8",
  );
}

for (const [flavor, { colors }] of flavorEntries) {
  await createTheme(flavor, colors);
  console.log(`✅ ${flavor}`);
}

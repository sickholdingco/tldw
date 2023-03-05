module.exports = {
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => "pnpm tsc --noEmit",

  // Prettify files
  "**/*.(ts|tsx|cjs|mjs|md|json)": (filenames) => [
    `pnpm prettier --write ${filenames.join(" ")}`,
  ],
};

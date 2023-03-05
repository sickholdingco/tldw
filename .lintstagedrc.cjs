module.exports = {
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => "pnpm tsc --noEmit",

  // Lint & Prettify TS and JS files
  "**/*.(ts|tsx|cjs|mjs|md|json)": (filenames) => [
    `pnpm prettier --write ${filenames.join(" ")}`,
  ],
};

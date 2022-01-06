module.exports = {
  parser: "typescript",
  disableLanguages: ["html"],
  importOrderSeparation: true,
  importOrder: [
    "^react(.*)$",
    "^@(.*)$",
    "^src/components/(.*)$",
    "^src/utils/(.*)$",
    "^src/(.*)$",
    "^[./]",
  ],
};

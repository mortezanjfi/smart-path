const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@services": path.resolve(__dirname, "src/services/index.ts"),
      "@utils": path.resolve(__dirname, "src/utils/index.ts"),
    },
  },
};

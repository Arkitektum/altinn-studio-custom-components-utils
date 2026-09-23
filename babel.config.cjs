// preset-typescript only strips the types, which is all jest needs: tsup builds the package and tsc checks it.
module.exports = { presets: ["@babel/preset-env", "@babel/preset-typescript"] };

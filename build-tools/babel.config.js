const { resolve } = require("path");

module.exports = function getBabelConfig(modules) {
  return {
    presets: [
      "babel-preset-react",
      [
        "babel-preset-env",
        {
          modules,
          targets: "node"
        }
      ]
    ],
    plugins: [
      [
        "babel-plugin-transform-runtime",
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: "babel-runtime"
        }
      ],
      "babel-plugin-syntax-dynamic-import",
      "babel-plugin-transform-es3-member-expression-literals",
      "babel-plugin-transform-es3-property-literals",
      "babel-plugin-transform-object-assign",
      "babel-plugin-transform-class-properties",
      "babel-plugin-transform-object-rest-spread"
    ]
  };
};

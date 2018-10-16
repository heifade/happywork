import { resolve } from "path";
import { getToolsModulePath } from "../../../../utils/pathHelper";

export function getBabelConfig(modules: boolean) {
  return {
    presets: [
      getToolsModulePath("@babel/preset-react"),
      [
        getToolsModulePath("@babel/preset-env"),
        {
          modules,
          targets: {
            browsers: ["chrome >= 68", "safari >= 11", "Firefox >= 61"]
          },
          useBuiltIns: false,
          shippedProposals: true,
          debug: true,
          loose: false
        }
      ]
    ],
    cacheDirectory: resolve(process.cwd(), "build-temp/babel"),
    plugins: [
      [
        getToolsModulePath("@babel/plugin-transform-runtime"),
        {
          helpers: false,
          regenerator: true
        }
      ],

      getToolsModulePath("@babel/plugin-syntax-dynamic-import")
      // getToolsModulePath("babel-plugin-transform-es3-member-expression-literals"),
      // getToolsModulePath("babel-plugin-transform-es3-property-literals"),
      // getToolsModulePath("babel-plugin-transform-object-assign"),
      // getToolsModulePath("babel-plugin-transform-class-properties"),
      // getToolsModulePath("babel-plugin-transform-object-rest-spread")
    ]
  };
}

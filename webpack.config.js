const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "../../tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "authMf",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For remotes (please adjust)
      name: "authMf",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": "./projects/auth-mf/src/modules/auth/auth.module.ts",
      },

      // For hosts (please adjust)
      // remotes: {
      //     "mfeProfile": "http://localhost:4202/remoteEntry.js",
      //     "shell": "http://localhost:4200/remoteEntry.js",

      // },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "ngx-cookie-service": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@fortawesome/angular-fontawesome": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@fortawesome/free-solid-svg-icons": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        ...sharedMappings.getDescriptors(),
      }),
    }),

    sharedMappings.getPlugin(),
  ],
  // sharedMappings: ["auth-guards"],
};

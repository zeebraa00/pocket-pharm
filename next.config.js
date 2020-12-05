const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const webpack = require("webpack");
const path = require("path");
const withCSS = require('@zeit/next-css');

module.exports = withPlugins([[withSass], [withImages], [withCSS, {cssModules: true}]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./src"));
    return config
  },

});

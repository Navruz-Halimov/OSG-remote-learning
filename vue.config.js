const path = require("path");

// const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: "/",
  // lintOnSave: isDev,
  productionSourceMap: false,
  css: {
    // sourceMap: true,
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "~@/assets/scss/base/_variables.scss";`,
      },
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.join(__dirname, "./src"));

    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]",
      });
  },
  pluginOptions: {
    // i18n
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE || "ru",
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "uz",
      localeDir: process.env.VUE_APP_I18N_LOCALE_DIR || "locales",
      enableInSFC: true,
    },
  },
};

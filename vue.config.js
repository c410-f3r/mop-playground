module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/mop-playground/" : "/",
  chainWebpack: config =>
    config.resolve.extensions.prepend(".mjs").prepend(".wasm")
};

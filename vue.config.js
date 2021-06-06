module.exports = {
  transpileDependencies: [
    'vuetify'
  ], 
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Shrtnr | URl Shortener";
      return args;
    });
  },  
  publicPath: process.env.NODE_ENV === "production" ? "/bcurlshortener/" : "/"
}

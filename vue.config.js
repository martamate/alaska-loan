const path = require("path");

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  devServer: {
    historyApiFallback: true, // Permite que todas las rutas no encontradas redirijan a index.html
  },
};

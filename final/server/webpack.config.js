module.exports = {
  devServer: {
    Proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}

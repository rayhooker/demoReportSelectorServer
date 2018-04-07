const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  console.log("Setup assetPrefix for Production")
} else {
  console.log("Setup assetPrefix for dev")
} 
module.exports = {
  webpack: function (config) {
    // config.plugins.push(
    //   new require('webpack').IgnorePlugin(/ReportListStore/)
    // )
    

    return config
  }, 
  assetPrefix: process.env.NODE_ENV === 'production' ? '/src/' : ''
  // assetPrefix: '/src'  
}
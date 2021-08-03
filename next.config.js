module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com']
  },
  // use .svg files in <Image /> tags
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

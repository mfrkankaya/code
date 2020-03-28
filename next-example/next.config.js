const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withPlugins([withCSS(withSass())], [withOffline()])

const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": "crypto-browserify",
        "stream": "stream-browserify",
        "assert": "assert",
        "http": "stream-http",
        "https": "https-browserify",
        "os": "os-browserify",
        "url": "url"
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}
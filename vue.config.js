module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "pwa": {
        "name": "meals",
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './src/sw.js',
            swDest: 'service-worker.js',
        },
        "manifestOptions": {
            "name": "meals",
            "short_name": "meals",
            "start_url": ".",
            "display": "standalone",
            "theme_color": "#4DBA87"
        }
    }
}

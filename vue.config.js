module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "pwa": {
    "name": "meals",
    "workboxPluginMode": "GenerateSW",
    "manifestOptions": {
      "name": "meals",
      "short_name": "meals",
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#4DBA87"
    }
  }
}

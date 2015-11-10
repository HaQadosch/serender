var Browser = require('zombie')

module.exports = function(app, options) {

  return function(req, res, next) {

    Browser.localhost('localhost', app.get('port'));
    var browser = new Browser()

    if (req.headers.serender || options.routes.indexOf(req.path) == -1) {
      next()
      return
    }

    browser.headers = req.headers
    browser.headers['serender'] = true

    browser.visit(req.originalUrl, function() {
      res.set(browser.response.headers.toObject())
      res.send('<!doctype html>' + browser.document.documentElement.outerHTML)
    })
  }
}
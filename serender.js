var Browser = require('zombie')

module.exports = function(req, res, next) {

  Browser.localhost('localhost', req.app.get('port'))

  if (req.headers.serender) {
    next()
    return
  }

  var browser = new Browser()
  browser.headers = req.headers
  browser.headers['serender'] = true

  browser.visit(req.originalUrl, function() {
    res.set(browser.response.headers.toObject())
    res.send('<!doctype html>' + browser.document.documentElement.outerHTML)
  })
}
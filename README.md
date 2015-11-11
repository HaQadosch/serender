Serender
========

Serender is a tiny middleware for [Express](http://expressjs.com/) that takes care of rendering client-side apps on the server, making your content loads first before your JavaScript code takes over.

### Installation

```
$ npm install serender --save
```

### Usage

Front-end frameworks generally rely on the hashchange event in the browser, that's why you always have a ```#``` in the url. If you managed to get rid of it, then you've definitely defined some routes in your Express app so your users won't see a not found error when they refresh the page:

```javascript
// app.js
var express = require('express')
var serender = require('serender')

var app = express()

app.set('port', process.env.PORT || 3000)

// Serender must be used before the routes that
// we want to render on the server
app.get('/', serender)
app.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'client/dist' })
})

app.get('/company', serender)
app.get('/company', function(req, res) {
  res.sendFile('index.html', { root: 'client/dist' })
})

app.get('/work', serender)
app.get('/work', function(req, res) {
  res.sendFile('index.html', { root: 'client/dist' })
})

// Server the cient-side app's static files (CSS, JS, Images...)
// from the 'client/dist' folder
app.use(express.static('client/dist'))

app.listen(app.get('port'))
```

Notice how I'm using ```router.use(express.static('client/dist'))``` after the routes! This will server our static assets (CSS, JS, Images...) but we don't want our **index.html** page to be served with them.

### Cookies

Serender handles cookies very well! Your authenticated users will see the content they must see even if they disable JavaScript completely.

That's it! You can now focus on building you client-side app without being worried about any SEO issues, or clients with no JS!
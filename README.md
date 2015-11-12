Serender
========

Serender is a tiny middleware for [Express](http://expressjs.com/) that takes care of rendering client-side apps on the server, making your content load first before your JavaScript code takes over.

[![Package Version](https://img.shields.io/npm/v/serender.svg?style=flat-square)](https://www.npmjs.com/package/serender)
[![Package Downloads](https://img.shields.io/npm/dt/serender.svg?style=flat-square)](https://www.npmjs.com/package/serender)
[![Code Climate](https://img.shields.io/codeclimate/github/YoussefKababe/serender.svg?style=flat-square)](https://codeclimate.com/github/YoussefKababe/serender)
[![Dependencies Status](https://img.shields.io/david/youssefkababe/serender.svg?style=flat-square)](https://david-dm.org/youssefkababe/serender)

Demo screencast: http://youtu.be/ZvpjkA7q7pM

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

app.get('/', serender, function(req, res) {
  res.sendFile('index.html', { root: 'client/dist' })
})

app.get('/company', serender, function(req, res) {
  res.sendFile('index.html', { root: 'client/dist' })
})

app.get('/work', serender, function(req, res) {
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

### How does it work?

Serender uses [Zombie](http://zombie.js.org/) under the hood, which is a headless simulated browser for testing client side code.

When you use it as the first middleware for your routes, Serender spins up a new Zombie (browser) instance for each new request, and makes it load the same exact page that the user is asking for. This might look like creating an infinit loop, but Serender adds a value to the browser headers making it skip itself and pass the new request to the next middleware.

Zombie then loads the page, fetches all the assets, and runs the JavaScript code wich will then take care of fetching data from you API and rendering the page.

As soon as Zombie finishes loading the page, Serender will take the final HTML output and send it back to the user.

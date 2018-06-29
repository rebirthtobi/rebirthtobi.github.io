'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var app = (0, _express2.default)();
var port = process.env.PORT || 8500;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.resolve(__dirname, 'public')));
app.engine('.hbs', (0, _expressHandlebars2.default)({
  defaultLayout: _path2.default.resolve(__dirname, 'views/layouts/main'),
  extname: '.hbs',
  helpers: {
    section: function section(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
}));
app.set('views', _path2.default.resolve(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/", function (req, res) {
  _newArrowCheck(undefined, undefined);

  res.render('index', { title: 'Home' });
}.bind(undefined));

app.get("/currencies", function (req, res) {
  _newArrowCheck(undefined, undefined);

  res.render('currency', { title: 'Currencies' });
}.bind(undefined));

app.listen(port);

//"start": "npm run build && nodemon dist/config/app.js"


// TODO: add service worker
// TODO: add index db and cache api
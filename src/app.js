import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';

const app = express();
const port = process.env.PORT || 8500;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.engine('.hbs', exphbs(
  {
    defaultLayout: path.resolve(__dirname, 'views/layouts/main'), 
    extname: '.hbs',
    helpers: {
      section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  }
));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get("/", (req, res) => {
  res.render('index', {title: 'Home'});
});

app.get("/currencies", (req, res) => {
  res.render('currency', {title: 'Currencies'});
});

app.listen(port);

//"start": "npm run build && nodemon dist/config/app.js"


// TODO: add service worker
// TODO: add index db and cache api
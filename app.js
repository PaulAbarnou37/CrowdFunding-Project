require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const flash        = require('connect-flash');

const passportSetup = require("./config/passport/passport-setup.js")


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
hbs.registerPartials(path.join(__dirname, 'views', "partials"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(session({
  //"secret" should be a string that's different for every app
  secret: process.env.sessionSecret,
  //"save Uninitialized" and "resave" are here just to avoid error messages
  saveUninitialized: true,
  resave: true,
  //use "connect-mongo" to store session information inside MongoDB
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());
passportSetup(app);

app.use((req, res, next) => {
  //makes flash messages accessible inside views
  res.locals.messages = req.flash();
  //you need this or your whole app won't work
  next();
});

// default value for title local
app.locals.title = 'LOGO';



const index = require('./routes/index');
app.use('/', index);

const projectRouter = require("./routes/project-router.js");
app.use("/", projectRouter);

const authRouter = require("./routes/auth-router.js");
app.use("/", authRouter);

const settingsRouter = require("./routes/settings-route.js");
app.use("/", settingsRouter);


module.exports = app;
//Import dependencies 
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection.js')
const routes = require('./controllers')
const helpers = require('./utils/helper.js');
const hbs = exphbs.create({helpers})
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret', 
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//init express in our app
const app = express();
//allows port to connect to native hosting application port or localhost port
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//middleware for express
// app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(routes);

//use sequelize sync to connect to the database. then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
});
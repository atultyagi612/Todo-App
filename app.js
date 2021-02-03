const express = require('express');
const mongoose=require('mongoose');
const path = require('path')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


var app=express();
const PORT = process.env.PORT||3000;
dotenv.config({ path: './config/config.env' })
// Connect to mongodb
// mongoose.connect("mongodb://localhost/todo_list",{
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// Passport config
require('./config/passport')(passport)



// Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine','ejs');

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(require("./routes/index"))
app.use('/auth', require('./routes/auth'))
app.use(require("./routes/todo"))




// app.listen(3000, '192.168.101.9');
app.listen(PORT,console.log(`listening at ${PORT}`))

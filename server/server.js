const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const path = require('path');

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, '../client/dist'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/status', (req,res) =>{
    res.send({
        message: 'hello world'
    })
});

//custom routes
var userRoutes = require("./modules/user/user.route");
var adminRoutes = require("./modules/admin/admin.route");
var {tokencheck} = require("./middleware/tokencheck");
//set portport
app.set('port', (process.env.PORT || 3000));

app.use(tokencheck);
//app.use('/app/admin',adminRoutes);
app.use('/safemydrive/user', userRoutes);

/* //catch 404 and forward to error handler
app.use((req, res, next) => {
    res.redirect("/app/admin#/404");
}); */

app.listen(app.set('port'),()=>{
    console.log('Started up at port: '+ app.get('port'));
});

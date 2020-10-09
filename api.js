var user = require('./users');
const dboperations = require('./dboperation');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response, request } = require('express');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
})

router.route("/users").get((request, response) => {
    dboperations.getUser().then(result => {
        response.json(result[0]);
    });
})

router.route("/users/:id").get((request, response) => {
    dboperations.getUserId(request.params.id).then(result => {
        response.json(result[0]);
    });
})

router.route("/users").post((request, response) => {
    let user = { ...request.body }
    dboperations.addUsers(user).then(result => {
        response.send('新增成功');
    });
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('user API is running at ' + port);



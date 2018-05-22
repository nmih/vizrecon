var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const { Client } = require('pg');
// Pooling is fairly trivial but will be necessary for our web application
// const { Pool } = require('pg');
// const pool = new Pool()

const client = new Client({
    host: 'ec2-54-235-220-220.compute-1.amazonaws.com',
    user: 'mlkxucedzbnozx',
    password: '054e5f07f8b5160946e2232ec93d1e03d8dd0eee1acefdec0b66992b41aa5645',
    database: 'd36e9jg3mk08tc',
    ssl: true,
});

client.connect();
// Issue: not sure how to correctly end connection right now
// Might become easier with pools as well

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// set the home page route
app.listen(port, function (err) {
    if (err) throw err;
    console.log('App is running on port ' + port);
});
/*
app.post('/endpoint', function (req, res) {
    var obj = {};
    console.log('body: ' + JSON.stringify(req.body));
    res.send(req.body);
});

app.post('/runit', function (req, res) {
    var jon = JSON.stringify(req.body.title)
    jon = jon.slice(1, 6);
    console.log('body: ' + jon);
    var obj = GetUniprot(client, jon);
    console.log('result is: ' + JSON.stringify(obj));
    res.send(obj);
});

app.get('/thispoint', function (req, res, err) {
    console.log('query: ' + JSON.stringify(req.query));

    var jon = JSON.stringify(req.query.data)
    jon = jon.slice(1, 6);
    console.log(jon)
    var regex1 = RegExp('(b)(\\d)(\\d)(\\d)(\\d)', 'i')
    if (regex1.test(jon) == false) {
        var obj = {};
        obj.geneInfo = "None";
        res.header('Content-type', 'application/json');
        res.header('Charset', 'utf8');
        res.send(req.query.callback + '(' + JSON.stringify(obj) + ');');
        if (err) throw err;
    } else {
        var sql = {
            text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + jon + "'",
        };

        client.query(sql, function (err, resu, callback) {
            var obj = {};
            var geneInfo = resu.rows;
            console.log("The protein name is " + geneInfo[0].name_id);
            obj = geneInfo;
            res.header('Content-type', 'application/json');
            res.header('Charset', 'utf8');
            res.send(req.query.callback + '(' + JSON.stringify(obj) + ');');
            if (err) throw err;
        });
    };
});
*/
app.get('/search', function (req, res, err) {
    var searchStr = JSON.stringify(req.query.data);
    searchStr = searchStr.slice(1, -1);
    var splitArray = searchStr.split(" ");
    var concStr = splitArray.join('%');
    concStr = "'%" + concStr + "%'";
    console.log(concStr);
    var sql = {
        text: "SELECT gene_id, name_id, description FROM protein WHERE gene_id||name_id||description ILIKE" + concStr + "LIMIT 15"
    };

    client.query(sql, function (err, resu, callback) {
        var obj = {};
        var searchResult = resu.rows;
        res.header('Content-type', 'application/json');
        res.header('Charset', 'utf8');
        res.send(req.query.callback + '(' + JSON.stringify(searchResult) + ');');
        if (err) throw err;
    });
});

app.get('/app', function (req, res, next) {
    res.sendFile(__dirname + "/public/app.html");
});

app.get('/about', function (req, res, next) {
    res.sendFile(__dirname + "/public/about.html");
});

app.get('/people', function (req, res, next) {
    res.sendFile(__dirname + "/public/about.html");
});

app.get('/index', function (req, res, next) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/seniorDesign', function (req, res, next) {
    res.sendFile(__dirname + "/public/seniorDesign.html");
});

app.get('/tutorial', function (req, res, next) {
    res.sendFile(__dirname + "/public/tutorial.html");
});

app.get('/notfound', function (req, res, next) {
    res.sendFile(__dirname + "/public/notfound.html");
});

app.get('/aboutModel', function (req, res, next) {
    res.sendFile(__dirname + "/public/aboutModel.html");
});

app.get('/vr.app', function (req, res, next) {
    res.sendFile(__dirname + "/public/app.html");
});

app.get('/vizrecon.app', function (req, res, next) {
    res.sendFile(__dirname + "/public/app.html");
});

app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + "/public/notfound.html");
});
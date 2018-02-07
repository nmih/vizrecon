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

function GetUniprot(cli, gene, callback) {
    var putout = "";
    var sql = {
        text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + gene + "'",
    };

    cli.query(sql, function (err, res) {
        var geneInfo = res.rows;
        callback;
        if (err) throw err;
        console.log("The uniprot ID is " + geneInfo[0].uniprot_id);
        putout = geneInfo[0].name_id;
    });
}

function GetName(cli, gene, cb) {
    var sql = {
        text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + gene + "'",
    };

    cli.query(sql, function (err, res, callback) {
        var geneInfo = res.rows;
        if (err) throw err;
        console.log("The protein name is " + geneInfo[0].name_id);
        putout = geneInfo[0].name_id;
        callback();
    });

};

function GetUniprotAndName(cli, gene) {
    var sql = {
        text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + gene + "'",
    };

    cli.query(sql, (err, res) => {
        var geneInfo = res.rows;
        if (err) throw err;
        console.log("The protein name is " + geneInfo[0].name_id + " and the Uniprot ID is " + geneInfo[0].uniprot_id);
        done();
        //cli.end();
    });
}

console.log("Called")

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the home page route
app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});

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
    console.log('result is: ' + JSON.stringify(obj))
    res.send(obj);
});

app.get('/thispoint', function (req, res) {
    console.log('params: ' + JSON.stringify(req.params));
    console.log('body: ' + JSON.stringify(req.body));
    console.log('query: ' + JSON.stringify(req.query));

    var jon = JSON.stringify(req.query.data)
    jon = jon.slice(1, 6);
    console.log(jon)

    var sql = {
        text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + jon + "'",
    };

    client.query(sql, function (err, resu, callback) {
        var obj = {};
        var geneInfo = resu.rows;
        if (err) throw err;
        console.log("The protein name is " + geneInfo[0].name_id);
        obj = geneInfo;
        res.header('Content-type', 'application/json');
        res.header('Charset', 'utf8');
        res.send(req.query.callback + '(' + JSON.stringify(obj) + ');');
    });
});

/*app.get('/endpoint', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';
	
	console.log('params: ' + JSON.stringify(req.params));
	console.log('body: ' + JSON.stringify(req.body));
	console.log('query: ' + JSON.stringify(req.query));
	
	res.header('Content-type','application/json');
	res.header('Charset','utf8');
	res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
});*/
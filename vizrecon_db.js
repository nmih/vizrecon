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

function GetUniprot(cli, gene) {
    var sql = {
        text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + gene + "'",
    };

    cli.query(sql, (err, res) => {
        geneInfo = res.rows;
        if (err) throw err;
        console.log("The uniprot ID is " + geneInfo[0].uniprot_id);
        //cli.end();
      })
}

function GetName(cli, gene) {
    var sql = {
        text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + gene + "'",
    };

    cli.query(sql, (err, res) => {
        geneInfo = res.rows;
        if (err) throw err;
        console.log("The protein name is " + geneInfo[0].name_id)
        //cli.end();
      });
};

function GetUniprotAndName(cli,gene) {
    var sql = {
        text: "SELECT a.uniprot_id, a.name_id FROM protein a WHERE gene_id='" + gene + "'",
    };

    cli.query(sql, (err, res) => {
        geneInfo = res.rows;
        if (err) throw err;
        console.log("The protein name is " + geneInfo[0].name_id)
        //cli.end();
      });
}

GetUniprot(client,"b0003");
GetName(client,"b0003");
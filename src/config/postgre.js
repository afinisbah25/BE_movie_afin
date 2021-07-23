const{Client} = require("pg")

const client = new Client ({
    user: "postgres",
    host: "localhost",
    database: "mini-project",
    password: "2LIPAmakanprata",
    port: 5432,
});

client.connect((error) => {
    if(error){
        throw error;
    }
    console.log("Connect to postgreSQL")
});

module.exports = client;
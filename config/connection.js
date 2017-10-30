var mysql = require("mysql");

var connection = mysql.createConnection({
  socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock", 

  user: 'root',
  password: 'root',
  database: "burgers_db"
});

// throws errors/shows connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// export
module.exports = connection;
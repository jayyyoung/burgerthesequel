var connection = require("../config/connection.js");

// prints ?'s to help with mysql syntax
function printQuestionMarks(mark){
	var arr = [];

	for(i = 0; i < mark; i++){
		arr.push("?");
	}
	return arr.toString();
}

// Helper function to convert object to SQL syntax
function objToSql(obj) {
  var arr = [];

  for (key in obj){
  	arr.push(key + "=" + obj[key]);
  }
  return arr.toString();
}

// orm variable with mysql functions
var orm = {
	selectAll: function(tableInput, cb){
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(err, res){
			if(err){
				throw(err);
			}

			cb(res);
		});
	},

	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString	+= printQuestionMarks(vals.length);
		queryString += ") ";

		connection.query(queryString, vals, function(err, res) {
			if(err) {
				throw (err);
			}

			cb(res);
		});
	}, 

	updateOne: function(table, objColVals, condition, cb){
		var queryString = "UPDATE " + table;

		queryString = " SET ";
		queryString = objToSql(objColVals);
		queryString = " WHERE ";
		queryString = condition;

		connection.query(queryString, function(err, res){
			if(err){
				throw(err);
			}

			cb(res);
		});
	}
};

module.exports = orm;
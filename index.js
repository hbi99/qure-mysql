
'use strict';

module.exports = {
	settings: function(conn) {
		this.conn = conn;
	},
	open: function() {
		this.mysql = require('mysql');
		this.conn = this.mysql.createConnection({
			host     : this.conn.host,
			user     : this.conn.user,
			password : this.conn.password,
			database : this.conn.database
		});
	},
	query: function(query) {
		var that = this;

		// pause the queue
		this.pause();

		// open database connection
		this.open();

		// execute query
		this.conn.query(query, function(err, rows, fields) {
			if (err) throw err;

			// close database connection
			that.conn.end();

			// resume queue
			that.resume(rows);
		});
	}
};


'use strict';

module.exports = {
	open: function() {
		this.mysql = require('mysql');
		this.conn = this.mysql.createConnection({
			host     : 'localhost',
			user     : 'me',
			password : 'secret',
			database : 'my_db'
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

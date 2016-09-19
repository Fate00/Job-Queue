var express = require('express');
var path = require('path');
var http = require('http');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT||3000);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/views')));

var dataBase = new Array();

router.route('/jobs')
		.post(function(req, res) {

			try {
				var jobObj = {};
				jobObj.description = req.body.description;
				jobObj.status = 'Not complete';

				var date = new Date();
				var components = [
				    date.getYear(),
				    date.getMonth(),
				    date.getDate(),
				    date.getHours(),
				    date.getMinutes(),
				    date.getSeconds(),
				    date.getMilliseconds()
				];
				var jobId = components.join("");
				jobObj.id = jobId;

				dataBase.push(jobObj);

				res.status(200).json({ id : jobId});
			}		
			catch (err) {
				res.status(500).send(err);
			}
			
		})

		.get(function(req, res) {
			
			try {
				res.status(200).json(dataBase);
			}
			catch (err) {
				res.status(500).send(err);
			}

		});

router.route('/jobs/:id')
		.put(function(req, res) {
			
			try {
				var id = req.params.id;
				var newStatus = req.body.status;

				for (var i = 0; i < dataBase.length; i++) {
					if (id == dataBase[i].id) {
						dataBase[i].status = newStatus;
						res.status(200).send('Success');
					}
				}
				res.status(404).send("Sorry, we can't update your job status. Please try again.");
			}
			catch (err) {
				if (!res.headersSent) {
					res.status(500).send(err);
				}				
			}
			
		})

		.get(function(req, res) {
			
			try {
				var id = req.params.id;
				var status = '';

				for (var i = 0; i < dataBase.length; i++) {
					if (id == dataBase[i].id) {
						status = dataBase[i].status;
						res.status(200).send(status);
					}
				}				
				res.status(404).send("Sorry, we can't find your job status. Please try again.");
			} 
			catch (err) {
				if (!res.headersSent) {
					res.status(500).send(err);
				}
			}

		});

app.use('/api', router);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Server start, listening on port '+ app.get('port'));
});
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var templating = require('consolidate');
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

var request = require('request');
var urlutils = require('url');

app.get('/', function(req, res){
	res.render('translator', {
		title: 'Заполните форму для перевода.'
	});
});

app.post('/', function(req, res){
	if (!req.body.text || req.body.text == "") {
		res.render('translator', {
			title: "Введите слово для перевода!"
		});
	} else {
		var url = urlutils.format({
			protocol: 'https',
			hostname: 'translate.yandex.net',
			pathname: 'api/v1.5/tr.json/translate',
			query: {
				key: 'trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4',
				lang: req.body.lang,
				text: req.body.text
			}
		});

		request.get({
				url: url,
				json: true
			}, function (error, response, json) {
				var data = {};

				if (error || json.code != 200) {
					data = {
						title: "Ошибка при переводе слова " + req.body.text,
						error: json.message
					}
				} else {
					data = {
						title: 'Перевод слова ' + req.body.text + ": " + json.text
					}
				}

				res.render('translator', data);
			}
		);
	}
});


app.listen(8080);
console.log('Express server listening on port 8080');
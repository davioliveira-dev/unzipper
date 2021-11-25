const express = require('express');
const multer = require('multer');
const unzipper = require('unzipper');
const etl = require('etl');
const fs = require('fs');
const app = express();

const upload = multer({dest: '../tmp'});

app.get('/', (req, res) => res.json({hello: 'world'}));

app.post('/receive', upload.single('zipfile'), async (req, res) => {
	console.log(req.body);
	console.log(req.file);
	console.log(req.headers);
	console.log(req.ip);
	res.json({hello: req.file?.filename || false});
	// Descomente as próximas linhas para ter a descompactação do zip
	// Const zipfile = req.file;
	// const filePath = zipfile.path;
	// const contents = [];
	// fs.createReadStream(filePath)
	// 	.pipe(unzipper.Parse())
	// 	.pipe(etl.map(async entry => {
	// 		const content = await entry.buffer();
	// 		const stringContent = await content.toString();
	// 		contents.push(stringContent);
	// 	}))
	// 	.promise().then(() => {
	// 		res.json({data: contents.toString()});
	// 	});
});

app.listen(3333, () => console.log('server is runing on port 3333'));

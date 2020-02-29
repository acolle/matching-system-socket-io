const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const { createSocketServer } = require('./socketServer');
const router = require('./router');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

createSocketServer(http);
app.use('/', router);

http.listen(port, () => console.log(`Listening on port ${port}`));

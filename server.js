const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.use(express.static('dist'));
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
app.listen(port,host);

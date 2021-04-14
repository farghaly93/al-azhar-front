const express = require("express");
const app = express();
const path = require("path");

// const http  =require("http");
// const server = http.createServer(app);
const port = 8080;

app.use(express.static(__dirname + '/dist/alazhar'));
app.get("/*", (res, req) => {
  res.sendFile(path.join(__dirname + '/dist/alazhar/index.html'));
});

app.listen(process.env.PORT || port, () => {
  console.log("connected to port " + port);
});

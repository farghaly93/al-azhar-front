const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Images = require("./images_model");
mongoose.connect("mongodb+srv://farghaly:farghaly_93@cluster0-i8la2.mongodb.net/alazhar",{ useNewUrlParser: true,  useUnifiedTopology: true  })
.then(() => {
  console.log('Connected successfully to database..');
}
).catch(()=>{
  console.log('Connection failed ... !');
});

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'farghaly-developments',
    api_key: '789929815277853',
    api_secret: 'GRYCOy1KymmaOkGu6BuPVNH0VLc'
})


// const http  =require("http");
// const server = http.createServer(app);
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true,  limit: '5mb'}));

app.use('/', express.static(path.join(__dirname, 'www')));

// //app.use(expressValidator);


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


 app.get((req, res, next) => {
   res.sendFile(path.join(__dirname, 'www', 'index.html'));
 });

app.listen(process.env.PORT || port, () => {
  console.log("connected to port " + port);
});

app.post("/uploadAlbumImage", async(req, res) => {
  console.log("image")
  try {
    const image = req.body.image;
    cloudinary.uploader.upload(image, async(err, result) => {
        if(err) res.json({done: false, err});
        const add_new_image = await new Images({url: result.url, date: new Date()}).save();
        if(add_new_image) {
          res.json({done: true, image: add_new_image});
        }
    });
  } catch(err) {
    res.json({done: false, err})
  }
});

app.get("/getAlbumImages", async(req, res) => {
  const images = await Images.find();
  res.json({images});
});

app.get("/removeAlbumImage/:id", async(req, res) => {
  const id = req.params.id;
  const del = await Images.deleteOne({_id: id});
  if(del) {
    res.json({done: true});
  }
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 1000
// import schema and create Model
const CategorySchema = require('./Schema/CategorySchema');
const ImageSchema = require('./Schema/ImagesSchema');
const Image = mongoose.model('Image', ImageSchema);
const Category = mongoose.model('Category', CategorySchema);
// creat app route

// for use json

app.use(express.json());

// for use cross origin

app.use(cors({
  origin: ["https://antopolis-shahed-ahmed-frontend.vercel.app", "http://localhost:1000"],
  optionsSuccessStatus: 200
}));


const mongooseConnctionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.swwr6sg.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority&appName=Cluster0`;




mongoose.connect(mongooseConnctionUri)
  .then(() => console.log('Connection successful'))
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });




// error handle middleware
const error = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};


app.use(error)
// home route
app.get('/', (req, res) => {

  res.send("server home")

})
//category post
app.post('/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(200).json({
      message: "category added Successfully",
      category: newCategory
    })
  } catch (error) {
    res.status(500).json({
      error: "there was a server side error"
    })
  }

})
app.get('/categories', async (req, res) => {

  try {

    const categories = await Category.find()

    res.json(categories)

  } catch (error) {
    res.status(500).json({
      error: "there was a server side error"
    })

  }

})
app.post('/images', async (req, res) => {
  try {
    const newImage = new Image(req.body);
    await newImage.save();

    res.status(200).json({
      message: "image added Successfully"
    })
  } catch (error) {
    res.status(500).json({
      error: "there was a server side error"
    })
  }

})

app.get('/images', async (req, res) => {
  try {
    const data = await Image.find();
    res.json(data)

  } catch (error) {
    res.status(500).json({
      error: "there was a server side error"
    })
  }
})

app.get('/images/:id', async (req, res) => {
  const id = req.params.id;
  console.log("this is id", id)
  try {
    const data = await Image.find({ category: id })
    res.json(data)

  } catch (error) {
    res.status(204).json({
      error: "there was a server side error"
    })
  }
})








// server listen
app.listen(port, () => {
  console.log("server is running on :" + "http://localhost:" + port)
})

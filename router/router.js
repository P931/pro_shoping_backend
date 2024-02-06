const express = require('express')
const router = express.Router();
const multer = require("multer")
const product = require("../models/User")
// const csv = require('fast-csv')
// const fs = require('fs')
const URL = process.env.BASE_URL

// fs is file System

const imgconfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}. ${file.originalname}`)
  }
})

const isImage = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error("only images is allowed"))
  }
}

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage
})

// Create Product 
router.post("/addProduct", upload.single("ProductImage"), async (req, res) => {

  const { ProductName, ProductSize, ProductColor, ProductQuantity, ProductPrice } = req.body
  const ProductImage = req.file.filename


  if (!ProductName || !ProductSize || !ProductColor || !ProductImage || !ProductQuantity || !ProductPrice) {
    res.status(422).send("Please, first fill all Field")
  }

  if (!req.file) {
    res.status(422).send("No Image file is uploaded")
  }

  try {

    const addProduct = new product({
      ProductName,
      ProductSize,
      ProductColor,
      ProductImage,
      // ProductCreated,
      ProductQuantity,
      ProductPrice,
    })
    await addProduct.save();

    // res.status(201).json(addProduct)
    res.status(201).json({ addProduct, message: "Product cart SuccessFull Created." })

  } catch (error) {
    res.send(error)
  }
})


// Get All product cart data...  
router.get("/getAllProductCart", async (req, res) => {

  try {

    const productData = await product.find()

    res.status(201).json({ productData })

  } catch (error) {
    console.log("error in productCartData is :- ", error)
    // res.status(422).json(error)
    res.json(error)
  }

})


const cart = [];

router.post("/addToProductCart", upload.single("ProductImage"), async (req, res) => {

  const { _id, ProductName, ProductSize, ProductColor, ProductImage, ProductQuantity, ProductPrice } = req.body


  if (!_id || !ProductName || !ProductSize || !ProductColor || !ProductImage || !ProductQuantity || !ProductPrice) {
    res.status(422).send("Please, first fill all Field")
  }

  try {

    const existingItem = await product.findById(_id)

    if (existingItem) {

      // existingItem.ProductQuantity += 1;

      // await existingItem.save();

      res.send(existingItem);

    }
    else {
      cart.push({ _id, ProductName, ProductSize, ProductColor, ProductImage, ProductQuantity, ProductPrice });
    }

  } catch (error) {

    console.log("error in addToCart is :- ", error)
    res.status(404).send(error);
  }

})


module.exports = router;
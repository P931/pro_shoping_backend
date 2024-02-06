const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

  ProductName: {
    type: String,
    required: "ProductName is required",
    trim: true,
  },

  ProductQuantity: {
    type: Number,
    required: "ProductQuantity is required",
    trim: true,
  },

  ProductPrice: {
    type: Number,
    required: "ProductPrice is required",
    trim: true,
    unique: [true, "product price already exists in database!"],
  },

  ProductSize: {
    type: String,
    required: "ProductSize is required",
    trim: true,
  },

  ProductColor: {
    type: String,
    required: "ProductColor is required",
    trim: true,
    // unique: [true, "product color already exists in database!"],
  },

  ProductImage: {
    type: String,
    required: "ProductImage is required",
  },

  // ProductCreated: {
  //   type: Date,
  //   required: "ProductCreated is required",
  //   trim: true,
  // },

})

const product = mongoose.model("pra_product", productSchema)

module.exports = product
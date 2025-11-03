import Product from "../models/productModel.js";
export const addProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;

  if (!name || !category || !price) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const product = await Product.create({
      name,
      category,
      price,
      stock,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Product API
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Agar product nahi mila
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check karo user sirf apna hi product delete kar sake
    if (product.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Product...

// @desc    Update product
// @route   PUT /api/products/update-product/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields if provided
    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

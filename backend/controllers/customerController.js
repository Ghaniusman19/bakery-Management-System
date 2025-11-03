import Customer from "../models/customerModel.js";

export const addCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      user: req.user._id, // logged-in user id
    });

    res.status(201).json({
      message: " Customer Added Successfully!",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      total: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // update fields if provided
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    await customer.save();
    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller Example
export const searchCustomers = async (req, res) => {
  try {
    const name = req.query.name || "";

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const customers = await Customer.find({
      name: { $regex: name, $options: "i" }, // case-insensitive search
      user: req.user._id, // ✅ Only fetch customers of logged in user
    }).sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Search failed", error });
  }
};

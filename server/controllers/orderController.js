const Order = require("../models/Order");

// CREATE order
exports.create = async (req, res) => {
  try {
    const { productIds, totalAmount } = req.body;

    const order = new Order({
      userId: req.user.id, // JWT middleware se aata hai
      productIds,
      totalAmount,
    });

    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET single order
exports.getOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("productIds"); // product details bhi saath aayengi

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE order
exports.update = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE order
exports.remove = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

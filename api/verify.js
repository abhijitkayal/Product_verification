import mongoose from "mongoose";

// Define Product Schema inline (since we can't import from separate file easily in serverless)
const ProductSchema = new mongoose.Schema({
  serial: String,
  code: String,
  mfg: String,
  name: String,
  token: String,
  verified: { type: Boolean, default: false },
  verifiedAt: Date,
});

// Use existing model or create new one
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// MongoDB connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/product_verification?retryWrites=true&w=majority&appName=HACKETHIC",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  cachedDb = connection;
  return cachedDb;
}

// Serverless function handler
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  try {
    // Connect to database
    await connectToDatabase();

    const { code, serial, mfg, token } = req.body;

    let product;

    if (token) {
      product = await Product.findOne({ token });
    } else {
      product = await Product.findOne({
        code,
        mfg,
        ...(mfg !== "03/2022 or after" && { serial }),
      });
    }

    if (!product) {
      return res.json({ status: "fail" });
    }

    if (product.verified) {
      return res.json({
        status: "duplicate",
        productName: product.name,
        verifiedAt: product.verifiedAt,
      });
    }

    product.verified = true;
    product.verifiedAt = new Date();

    await product.save();

    return res.json({
      status: "success",
      productName: product.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
}

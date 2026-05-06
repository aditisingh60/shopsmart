require("dotenv").config();

const mongoose = require("mongoose");
const { app } = require("./app");

const PORT = process.env.PORT || 5001;

async function start() {
  if (process.env.NODE_ENV !== "test" && process.env.MONGO_URI) {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("✅ MongoDB connected"))
      .catch((err) => console.log("❌ DB error:", err));
  }

  app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();

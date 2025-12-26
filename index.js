const app = require('./app');
const connectDB = require('./config/database');
require('dotenv').config({ path: './.env' });

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    })

    server.on("error", (error) => {
      console.log(`Server error: ${error}`);
      process.exit(1);
    });
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();
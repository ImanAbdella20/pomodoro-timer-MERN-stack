import dotenv from 'dotenv';
import http from 'http';
import { app, connectDB } from './app.js';

dotenv.config();

const port = process.env.PORT || 5000; // Provide a default port

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    // Set keep-alive and header timeouts
    server.keepAliveTimeout = 60000; // 60 seconds
    server.headersTimeout = 65000; // 65 seconds

    server.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();

import dotenv from 'dotenv';
import http from 'http';
import portfinder from 'portfinder';
import { app, connectDB } from './app.js';

dotenv.config();
const defaultPort = process.env.PORT;

const startServer = async () => {
  await connectDB();

  portfinder.basePort = defaultPort;
  portfinder.getPort(async (err, port) => {
    if (err) {
      console.error("Error finding available port:", err);
      return;
    }

    const server = http.createServer(app);
    server.keepAliveTimeout = 60000; // 60 seconds
    server.headersTimeout = 65000; // 65 seconds

    server.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, retrying...`);
        setTimeout(() => {
          server.close();
          server.listen(port);
        }, 1000);
      }
    });
  });
};

startServer();

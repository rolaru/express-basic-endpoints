import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import appRouter from './router';
import { customMiddleware } from './middleware/custom-middleware';

dotenv.config(); // Initialize dotenv to read from the .env file

const webServer = express(); // Create the web server using Express.js

// Loads the express.json() middleware that allows us to parse req.body as JSON.
webServer.use(express.json());

/* You can add any custom middleware to the Express web server in which
  you can process the request and response objects as you wish. */
webServer.use(customMiddleware); 

// Attach API routes to the web server.
webServer.use(appRouter);

// Start the web server on the port specified in the .env file.
webServer.listen(process.env.WEB_SERVER_PORT, () => {
  console.log(`Web server successfully started on port ${process.env.WEB_SERVER_PORT}`);
});
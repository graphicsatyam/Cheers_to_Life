// Importing necessary modules
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser'; // For Cookies
import adminRoutes from './routes/admin-router.js'; // Use import for ES modules

// Importing environment variables from .env file
dotenv.config();

// Creating an instance of express application
const app = express();

// Importing routers
import { UserRouter } from "./routes/user.js";

// Middleware
app.use(express.json()); // Parsing JSON bodies
app.use(cors({
    origin: /^https:\/\/cheers-to-life-frontend\.vercel\.app(:\d+)?(\/.*)?$/,
    methods : ["POST", "GET"],
    credentials: true
})); // Enable CORS with credentials
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/auth', UserRouter); // Using UserRouter for paths starting with /auth


app.get('/vipin', async (req, res) => {
    res.send('Hello Vipin Don')
  });


// Routes for the Admin Cases 
app.use("/api/admin", adminRoutes); // Use correct variable name and import statement

// Connecting to MongoDB with error handling
mongoose.connect('mongodb+srv://satyamnoidetechnology:Mongodb2050%40@cluster0.cyzppni.mongodb.net/authentication', { 
    useNewUrlParser: true,
    useUnifiedTopology: true   
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

// Defining the port for the server to listen on
const PORT = process.env.PORT || 8080; // Default to 8080 if PORT is not defined

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

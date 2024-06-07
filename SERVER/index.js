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

// Define allowed origins
const allowedOrigins = [*];

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // If origin is not allowed, respond with an error
            return callback(new Error('Not allowed by CORS'));
        }
        // Allow requests from allowed origins
        return callback(null, true);
    },
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"], // Include all methods you need
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Handle preflight requests for all routes
app.options('*', cors({
    origin: allowedOrigins,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with", "origin", "accept", "x-access-token"]
}));

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

    import express from 'express';
    import { getAllUsers, getAllEvents, addEvents } from '../controller/admin-controller.js'; // Ensure the file extension is included


    // import  authMiddleware from '../middlewares/auth-middleware.js'

    const router = express.Router();

    // Define the route

    router.route('/users').get(getAllUsers);
    router.route('/events').get(getAllEvents);
    router.route('/events').post(addEvents);


    router.get("/protected-route", (req, res) => {
        res.send("This is a protected route.");
    });
    // Export the router
    export default router;  // Correct the export statement for ES modules

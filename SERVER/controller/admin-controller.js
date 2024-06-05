import {User} from '../models/UserSchema.js';
import {Events} from '../models/EventsSchema.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getAllEvents = async (req, res, next) => {
    try {
        const events = await Events.find();
        console.log(events);
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No Events Found" });
        }
        return res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

export const addEvents = async (req, res, next) => {
    try {
      const event = req.body; // Extract event data from the request body
      const newEvent = new Events(event);
      await newEvent.save();
      console.log('Event inserted successfully:', newEvent);
      res.status(201).json({ message: 'Event inserted successfully', event: newEvent });
    } catch (error) {
      console.error('Error inserting event:', error);
      res.status(500).json({ message: 'Error inserting event', error });
    }
  };


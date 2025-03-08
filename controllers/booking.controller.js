// const  mongoose  = require('mongoose');
const Rooms = require('../models/booking.model')

const roombooking = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, roomType, dateRange, guests, specialRequests } = req.body;

        const room = await Rooms.findOne({ type: roomType, available: true });
        
        // if (!room) {
        //     return res.status(400).json({ message: "Selected room type is not available" });
        // }

        const newBooking = new Rooms({
            firstName,
            lastName,
            email,
            contact,
            roomType,
            dateRange,
            guests,
            specialRequests,
        });

        await newBooking.save();
        room.available = false;
        await room.save();

        res.status(201).json({ message: "Room booked successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { roombooking };
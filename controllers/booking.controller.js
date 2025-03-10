const Booking = require('../models/booking.model');

const roombooking = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, roomType, dateRange, guests, specialRequests } = req.body;

        // Create a new booking instance
        const newBooking = new Booking({
            firstName,
            lastName,
            email,
            contact,
            roomType,
            dateRange,
            guests,
            specialRequests,
        });

        // Save the booking to the database
        await newBooking.save();

        // Send a success response
        res.status(201).json({ message: "Room booked successfully", booking: newBooking });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Error", error: error.message });
        }

        // Handle other errors
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { roombooking };

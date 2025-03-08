const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    contact: {
      type: String,
      required: true,
      match: [/^\d{5}-\d{5}$/, "Please enter a valid contact number"],
    },
    roomType: {
      type: String,
      enum: ["standard", "deluxe", "suite"],
      required: true,
    },
    dateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    guests: {
      adults: { type: Number, required: true, min: 1 },
      children: { type: Number, required: true, min: 0 },
    },
    specialRequests: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Rooms = mongoose.model("Booking", BookingSchema);

module.exports = Rooms;

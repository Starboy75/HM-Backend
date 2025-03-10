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
      unique: true, // Ensures uniqueness
    },
    contact: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"], // More standard format
    },
    roomType: {
      type: String,
      enum: ["standard", "deluxe", "suite"],
      required: true,
    },
    dateRange: {
      startDate: { type: Date, required: true },
      endDate: { 
        type: Date, 
        required: true,
        validate: {
          validator: function (value) {
            return value > this.dateRange.startDate;
          },
          message: "End date must be after start date.",
        },
      },
    },
    guests: {
      adults: { type: Number, required: true, min: 1 },
      children: { type: Number, required: true, min: 0 },
      rooms: { type: Number, required: true, min: 1 },
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending", // Default status is "pending"
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;

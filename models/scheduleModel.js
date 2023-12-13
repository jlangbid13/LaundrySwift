// scheduleModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    mobile_number: {
        type: String,
        required: true
    },

    service_options: {
        type: String,
        required: false
    },

    weight: {
        type: Number,
        required: false
    },

    laundry_services: {
        type: [String],
        required: false
    },

    payment: {
        type: String,
        required: false
    },
    
    delivery_options: {
        type: String,
        required: false
    },

    total: {
        type: Number,
    },
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        currentTime: () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
    },
});

module.exports = mongoose.model('BookingModel',bookingSchema)


/*
const bookingModel = mongoose.model('bookingModel', bookingSchema);

module.exports = bookingModel;

bookingModel.find()

*/
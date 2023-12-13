// scheduleController.js
const Booking = require('../models/scheduleModel')
const mongoose = require('mongoose')

// get all bookings
const getBookings = async (req, res) => {
  const bookings = await Booking.find({}).sort({createdAt: -1})

  res.status(200).json(bookings)
}

// get a single booking
const getBooking = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such booking'})
  }

  const booking = await Booking.findById(id)

  if (!booking) {
    return res.status(404).json({error: 'No such booking'})
  }

  res.status(200).json(booking)
}

// create a new booking
const createBooking = async (req, res) => {
  const {name, address, mobile_number, service_options, weight, laundry_services, payment, delivery_options, total, day, time} = req.body

  let emptyFields = []
  if(!name) {
    emptyFields.push('name')
  }
  if(!address) {
    emptyFields.push('address')
  }
  if(!mobile_number) {
    emptyFields.push('mobile_number')
  }
  if(!service_options) {
    emptyFields.push('service_options')
  }
  if(!weight) {
    emptyFields.push('weight')
  }
  if(!laundry_services) {
    emptyFields.push('laundry_services')
  }
  if(!total) {
    emptyFields.push('total')
  } 
  if(!day) {
    emptyFields.push('day')
  }
  if(!time) {
    emptyFields.push('time')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill all the feilds', emptyFields})
  }

  // add to the database
  try {
    const booking = await Booking.create({ 
      name,
      address,
      mobile_number,
      service_options,
      weight,
      laundry_services,
      payment,
      delivery_options,
      total,
      day, 
      time })
    res.status(200).json(booking)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// delete a booking
const deleteBooking = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such booking'})
    }
  
    const booking = await Booking.findOneAndDelete({_id: id})
  
    if(!booking) {
      return res.status(400).json({error: 'No such booking'})
    }
  
    res.status(200).json(booking)
  }
  
  // update a booking
  const updateBooking = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such booking'})
    }
  
    const booking = await Booking.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!booking) {
      return res.status(400).json({error: 'No such booking'})
    }
  
    res.status(200).json(booking)
  }

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
};

const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const cookieParser = require('cookie-parser')
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')

connectToDb();

// Replace the existing cors middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);

app.get('/',(req,res)=>{
  res.send("Hello world");
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);


module.exports = app;
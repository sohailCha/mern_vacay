import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import myHotelRoutes from './routes/my-hotels'
import hotelRoutes from './routes/hotels'
import bookingRoutes from './routes/my-bookings'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {
	autoIndex: false, // Don't build indexes
	maxPoolSize: 10, // Maintain up to 10 socket connections
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4, // Use IPv4, skip trying IPv6
})

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: process.env.FRONTEND_URL, // Specify the allowed origin
		credentials: true, // Allow credentials (cookies, authentication, etc.)
		optionsSuccessStatus: 200, // Some legacy browsers choke on 204
	})
)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/my-hotels', myHotelRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/my-bookings', bookingRoutes)

app.get('*', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.listen(process.env.PORT, () => {
	console.log(`Server Running on localhost: ${process.env.PORT}`)
})

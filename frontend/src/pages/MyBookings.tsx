import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import { Link } from 'react-router-dom'

const MyBookings = () => {
	const { data: hotels } = useQuery(
		'fetchMyBookings',
		apiClient.fetchMyBookings
	)

	if (!hotels || hotels.length === 0) {
		return <span>No bookings found</span>
	}

	return (
		<div className='space-y-5 px-4 xs:px-0'>
			<h1 className='text-2xl xs:text-3xl font-bold'>My Bookings</h1>
			{hotels.map((hotel) => (
				<div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'>
					<div className='w-full h-[300px] lg:w-full lg:h-[250px]'>
						<img
							src={hotel.imageUrls[0]}
							className='w-full h-full object-cover object-center'
						/>
					</div>
					<div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
						<div className='text-xl xs:text-2xl font-bold'>
							{hotel.name}
							<div className='text-xs font-normal'>
								{hotel.city}, {hotel.country}
							</div>
						</div>
						{hotel.bookings.map((booking) => (
							<div>
								<div>
									<span className='font-bold mr-2'>Dates: </span>
									<span>
										{new Date(booking.checkIn).toDateString()} -
										{new Date(booking.checkOut).toDateString()}
									</span>
								</div>
								<div>
									<span className='font-bold mr-2'>Guests:</span>
									<span>
										{booking.adultCount} adults, {booking.childCount} children
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
			<div className='flex flex-col gap-2 items-center justify-center '>
				<span className='text-xl lg:text-2xl font-semibold'>
					Search more hotels
				</span>
				<Link
					to={'/'}
					className='flex bg-theme text-white text-md xs:text-lg font-bold p-2 hover:bg-theme'>
					Home
				</Link>
			</div>
		</div>
	)
}

export default MyBookings

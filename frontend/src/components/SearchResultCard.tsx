import { AiFillStar } from 'react-icons/ai'
import { HotelType } from '../../../backend/src/shared/types'
import { Link } from 'react-router-dom'

type Props = {
	hotel: HotelType
}

const SearchResultCard = ({ hotel }: Props) => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8'>
			<div className='w-full h-[300px] lg:h-[350px]'>
				<img
					src={hotel.imageUrls[0]}
					className='w-full h-full object-cover object-center'
				/>
			</div>
			<div className='grid grid-rows-[1fr_2fr_1fr]'>
				<div>
					<Link
						to={`/detail/${hotel._id}`}
						className='text-2xl font-bold cursor-pointer'>
						{hotel.name}
					</Link>
					<div className='flex items-center'>
						<span className='flex'>
							{Array.from({ length: hotel.starRating }).map(() => (
								<AiFillStar className='fill-yellow-400' />
							))}
						</span>
						<span className='ml-1 text-sm'>{hotel.type}</span>
					</div>
				</div>
				<div>
					<div className='line-clamp-4'>{hotel.description}</div>
				</div>
				<div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 items-end whitespace-nowrap'>
					<div className='flex gap-1 items-center'>
						{hotel.facilities.slice(0, 2).map((facility) => (
							<span className='bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap'>
								{facility}
							</span>
						))}
						<span className='text-sm'>
							{hotel.facilities.length > 2 &&
								`+${hotel.facilities.length - 2} more`}
						</span>
					</div>
					<div className='flex flex-row xs:flex-col lg:flex-row lg:items-center items-center xs:items-end gap-1 justify-between xs:justify-normal mt-5 xs:mt-0 lg:mt-2 lg:justify-between'>
						<span className='font-bold underline xs:no-underline lg:underline'>
							${hotel.pricePerNight} per night
						</span>
						<Link
							to={`/detail/${hotel._id}`}
							className='bg-theme text-white h-full p-1 xs:p-2 font-bold text-sm xs:text-md max-w-fit hover:bg-theme'>
							View More
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchResultCard

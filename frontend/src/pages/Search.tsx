import { useQuery } from 'react-query'
import { useSearchContext } from '../contexts/SearchContext'
import * as apiClient from '../api-client'
import { useState } from 'react'
import SearchResultCard from '../components/SearchResultCard'
import Pagination from '../components/Pagination'
import StarRatingFilter from '../components/StarRatingFilter'
import HotelTypesFilter from '../components/HotelTypesFilter'
import FacilitiesFilter from '../components/FacilitiesFilter'
import PriceFilter from '../components/PriceFilter'

const Search = () => {
	const search = useSearchContext()
	const [page, setPage] = useState<number>(1)
	const [selectedStars, setSelectedStars] = useState<string[]>([])
	const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
	const [sortOption, setSortOption] = useState<string>('')
	const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false)

	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),
		stars: selectedStars,
		types: selectedHotelTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice?.toString(),
		sortOption: sortOption,
	}
	const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
		apiClient.searchHotels(searchParams)
	)

	const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = event.target.value

		setSelectedStars((prevStars) =>
			event.target.checked
				? [...prevStars, starRating]
				: prevStars.filter((star) => star !== starRating)
		)
	}

	const handleHotelTypeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const hotelType = event.target.value

		setSelectedHotelTypes((prevHotelTypes) =>
			event.target.checked
				? [...prevHotelTypes, hotelType]
				: prevHotelTypes.filter((type) => type !== hotelType)
		)
	}

	const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const facility = event.target.value

		setSelectedFacilities((prevFacilityTypes) =>
			event.target.checked
				? [...prevFacilityTypes, facility]
				: prevFacilityTypes.filter((prevFacility) => prevFacility !== facility)
		)
	}
	return (
		<div className='grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 px-4 xs:px-0'>
			<div className='rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10'>
				<button
					onClick={() => setIsFiltersVisible(!isFiltersVisible)}
					className='md:hidden text-lg font-semibold py-2 w-full bg-theme cursor-pointer text-white'>
					{isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
				</button>
				<div
					className={`${
						isFiltersVisible ? 'block' : 'hidden'
					} md:block space-y-5`}>
					<h3 className='text-lg font-semibold border-b border-slate-300 pb-5 mt-5 md:mt-0'>
						Filter by:
					</h3>
					{/* TODO FILTERS */}
					<StarRatingFilter
						selectedStars={selectedStars}
						onChange={handleStarsChange}
					/>
					<HotelTypesFilter
						selectedHotelTypes={selectedHotelTypes}
						onChange={handleHotelTypeChange}
					/>
					<FacilitiesFilter
						selectedFacilities={selectedFacilities}
						onChange={handleFacilityChange}
					/>
					<PriceFilter
						selectedPrice={selectedPrice}
						onChange={(value?: number) => setSelectedPrice(value)}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<div className='flex justify-between flex-col-reverse xs:flex-row items-start xs:items-center'>
					<span className='text-xl font-bold mt-4 xs:mt-0'>
						{hotelData?.pagination.total} Hotels found{' '}
						{search.destination ? `in ${search.destination}` : ''}
					</span>
					<select
						value={sortOption}
						onChange={(event) => setSortOption(event.target.value)}
						className='p-2 border rounded-md w-[100%] xs:w-auto'>
						<option value={''}>Sort By</option>
						<option value={'starRating'}>Star Rating</option>
						<option value={'pricePerNightAsc'}>
							Price Per Night (low to high)
						</option>
						<option value={'pricePerNightDesc'}>
							Price Per Night (high to low)
						</option>
					</select>
				</div>

				{hotelData?.data.map((hotel) => (
					<SearchResultCard hotel={hotel} />
				))}
				<div>
					<Pagination
						page={hotelData?.pagination.page || 1}
						pages={hotelData?.pagination.pages || 1}
						onPageChange={(page) => setPage(page)}
					/>
				</div>
			</div>
		</div>
	)
}

export default Search

import { useFormContext } from 'react-hook-form'
import { hotelTypes } from '../../config/hotel-options-config'
import { HotelFormData } from './ManageHotelForm'

const TypeSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<HotelFormData>()
	const typeWatch = watch('type')

	return (
		<div className='px-4 xs:px-0'>
			<h2 className='text-2xl font-bold mb-3'>Type</h2>
			<div className='grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-2'>
				{hotelTypes.map((type) => (
					<label
						className={`cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold text-center
							${typeWatch === type ? 'bg-blue-300' : 'bg-gray-300'}
						`}>
						<input
							type='radio'
							value={type}
							{...register('type', {
								required: 'This field is required',
							})}
							className='hidden'
						/>
						<span>{type}</span>
					</label>
				))}
			</div>
			{errors.type && (
				<span className='text-red-500 text-sm font-bold'>
					{errors.type.message}
				</span>
			)}
		</div>
	)
}

export default TypeSection

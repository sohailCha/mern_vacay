const Footer = () => {
	return (
		<div className='bg-theme py-10'>
			<div className='container mx-auto flex justify-between items-center'>
				<span className='text-3xl text-white font-bold tracking-tight pl-4 sm:pl-0'>
					Vacay.com
				</span>
				<span className='text-white font-bold tracking-tight flex gap-4 flex-col sm:flex-row pr-4 sm:pr-0'>
					<p className='cursor-pointer'>Privacy Policy</p>
					<p className='cursor-pointer'>Terms of Service</p>
				</span>
			</div>
		</div>
	)
}

export default Footer

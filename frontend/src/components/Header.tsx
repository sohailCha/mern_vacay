import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton'
import { useState } from 'react'
import { FaHotel } from 'react-icons/fa'
import { MdHotel } from 'react-icons/md'
import { PiSignInBold } from 'react-icons/pi'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'

const Header = () => {
	const { isLoggedIn } = useAppContext()
	const [isOpen, setIsOpen] = useState(false)
	const queryClient = useQueryClient()
	const { showToast } = useAppContext()

	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries('validateToken')
			showToast({ message: 'Signed Out!', type: 'SUCCESS' })
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' })
		},
	})

	const handleClick = () => {
		mutation.mutate()
		setIsOpen(false)
	}

	// Function to close the hamburger menu
	const closeHamburgerMenu = () => {
		setIsOpen(false)
	}

	return (
		<nav className='bg-theme py-6'>
			<div className='container mx-auto flex justify-between'>
				<span className='text-2xl md:text-3xl text-white font-bold tracking-tight pl-4 xs:pl-0'>
					<Link to={'/'}>Vacay.com</Link>
				</span>
				<span className='space-x-2 hidden lg:flex'>
					{isLoggedIn ? (
						<>
							<Link
								to={'/my-bookings'}
								className='flex items-center text-theme px-4 font-bold bg-white rounded-3xl hover:bg-gray-100'>
								My Bookings
							</Link>
							<Link
								to={'/my-hotels'}
								className='flex items-center text-theme px-4 font-bold bg-white rounded-3xl hover:bg-gray-100'>
								My Hotels
							</Link>
							<SignOutButton />
						</>
					) : (
						<Link
							to={'/sign-in'}
							className='flex items-center text-theme px-4 font-bold hover:bg-gray-100 hover:cursor-pointer bg-white rounded-md'>
							Sign In
						</Link>
					)}
				</span>
				<button
					className='text-white w-8 h-8 relative focus:outline-none lg:hidden'
					onClick={() => setIsOpen(!isOpen)}>
					{/* Hamburger Icon */}
					<span
						className={`block w-6 h-0.5 bg-white transform transition duration-500 ease-in-out ${
							isOpen ? 'rotate-45 translate-y-2.5' : ''
						}`}></span>
					<span
						className={`block w-6 h-0.5 bg-white mt-2 transform transition duration-500 ease-in-out ${
							isOpen ? 'opacity-0' : ''
						}`}></span>
					<span
						className={`block w-6 h-0.5 bg-white mt-2 transform transition duration-500 ease-in-out ${
							isOpen ? '-rotate-45 -translate-y-1' : ''
						}`}></span>
				</button>

				<div
					className={`absolute top-0 left-0 w-full bg-white shadow-md z-50 transition-transform transform ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					} lg:hidden`}>
					<button
						className='p-4 text-xl'
						onClick={closeHamburgerMenu}>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'></path>
						</svg>
					</button>
					<nav>
						{/* Conditional rendering of navigation links for mobile */}
						{isLoggedIn ? (
							<>
								<Link
									to='/my-bookings'
									className='flex gap-2 px-4 py-2'
									onClick={closeHamburgerMenu}>
									<MdHotel className='flex items-center h-auto' />
									My Bookings
								</Link>
								<Link
									to='/my-hotels'
									className='px-4 flex gap-2 py-2'
									onClick={closeHamburgerMenu}>
									<FaHotel className='flex items-center h-auto' /> My Hotels
								</Link>
								{/* Ensure SignOutButton also closes the menu. This might require passing closeHamburgerMenu as a prop or wrapping it in a function that calls both the sign-out logic and closeHamburgerMenu */}
								<div onClick={handleClick}>
									<SignOutButton />
								</div>
							</>
						) : (
							<Link
								to='/sign-in'
								className='px-4 flex gap-2 py-2'
								onClick={closeHamburgerMenu}>
								<PiSignInBold className='flex items-center h-auto' />
								Sign In
							</Link>
						)}
					</nav>
				</div>
			</div>
		</nav>
	)
}

export default Header

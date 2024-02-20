import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'
import { Link } from 'react-router-dom'
import { PiSignOutBold } from 'react-icons/pi'

const SignOutButton = () => {
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
	}

	return (
		<>
			<button
				className='text-theme px-3 font-bold bg-white hover:bg-gray-100 rounded-3xl hidden lg:block'
				onClick={handleClick}>
				Sign Out
			</button>
			<Link
				to='/my-hotels'
				className='px-4 flex gap-2 py-2 lg:hidden'>
				<PiSignOutBold className='flex items-center h-auto' /> Sign Out
			</Link>
		</>
	)
}

export default SignOutButton

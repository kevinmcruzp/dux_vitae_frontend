import { useToast } from '@chakra-ui/react'
import { createContext, ReactNode, useContext } from 'react'

type TToastContext = {
	toastError: any
	toastSuccess: any
}

type TToastProvider = {
	children: ReactNode
}

export const ToastContext = createContext({} as TToastContext)

export function ToastProvider({ children }: TToastProvider) {
	const toastError = useToast({
		title: 'Ocurrió un error',
		position: 'top',
		duration: 3000,
		isClosable: true,
		status: 'error',
		containerStyle: { backgroundColor: '#E01F1F', fontSize: '16px' }
	})
	const toastSuccess = useToast({
		title: 'Acción realizada',
		position: 'top',
		duration: 3000,
		isClosable: true,
		status: 'success',
		containerStyle: { backgroundColor: '#38A169', fontSize: '16px' }
	})

	return (
		<ToastContext.Provider value={{ toastError, toastSuccess }}>{children}</ToastContext.Provider>
	)
}

export const useToasts = () => useContext(ToastContext)

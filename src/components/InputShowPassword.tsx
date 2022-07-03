import { FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'

interface IInput extends InputProps {
	idName: string
	label?: string
	error?: FieldError
}

const InputBaseShowPassword: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
	{ idName, label, error = null, color, ...rest },
	ref
) => {
	const [isShowPassword, setIsShowPassword] = useState(false)
	const handleShowPassword = () => { setIsShowPassword(!isShowPassword) }

	return (
		<FormControl isInvalid={!!error}>
			{!!label && <FormLabel htmlFor={idName} color={color} >{label}</FormLabel>}

			<InputGroup size='lg' borderColor='gray.500' >
        <Input
          border="1px solid"
          borderColor="gray.500"
          id={idName}
          name={idName}
          size="lg"
          color={color}
          ref={ref}
          {...rest}
					type={isShowPassword ? 'text' : 'password'}
          css={{
						'::-ms-reveal': {
							display: 'none'
						}
					}}
        />
				<InputRightElement>
					<Icon
						fontSize={22}
						cursor='pointer'
						color={isShowPassword ? color : color}
						as={isShowPassword ? RiEyeLine : RiEyeCloseLine}
						onClick={handleShowPassword}
					/>
				</InputRightElement>
			</InputGroup>

			{!!error &&
				<FormErrorMessage color='red.500' fontSize={13} >{error.message} </FormErrorMessage>
			}
		</FormControl>
	)
}

export const InputShowPassword = forwardRef(InputBaseShowPassword)

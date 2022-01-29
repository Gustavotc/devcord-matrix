import { Box, Text, Button } from '@skynexui/components';
import RoundedImage from './RoundedImage';

function Header(props) {
	return (
		<>
			<Box
				styleSheet={{
					width: '100%',
					marginBottom: '8px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box
					styleSheet={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<RoundedImage
						src={`https://github.com/${props.loggedUser}.png`}
						size={'50px'}
					/>
					<Text variant='heading5' styleSheet={{ marginLeft: '5px' }}>
						{props.username}
					</Text>
				</Box>
				<Button variant='secondary' colorVariant='neutral' label='Logout' href='/' />
			</Box>
		</>
	);
}

export default Header;

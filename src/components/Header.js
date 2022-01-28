import { Box, Text, Button } from '@skynexui/components';

function Header() {
	return (
		<>
			<Box
				styleSheet={{
					width: '100%',
					marginBottom: '16px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Text variant='heading4'>Dev Chat</Text>
				<Button variant='tertiary' colorVariant='neutral' label='Logout' href='/' />
			</Box>
		</>
	);
}

export default Header;

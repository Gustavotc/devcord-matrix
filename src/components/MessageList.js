import { Box, Text, Image, Icon } from '@skynexui/components';
import appConfig from '../../config.json';
import RoundedImage from './RoundedImage';

function MessageList(props) {
	return (
		<Box
			tag='ul'
			styleSheet={{
				overflow: 'scroll',
				display: 'flex',
				flexDirection: 'column-reverse',
				flex: 1,
				color: appConfig.theme.colors.neutrals['000'],
				marginBottom: '16px',
				overflowX: 'hidden',
			}}
		>
			{props.messages.map((message) => {
				return (
					<Text
						key={message.id}
						tag='li'
						styleSheet={{
							position: 'relative',
							borderRadius: '5px',
							padding: '6px',
							marginBottom: '12px',
							hover: {
								backgroundColor: appConfig.theme.colors.neutrals[700],
							},
						}}
					>
						{message.from === props.loggedUser && (
							<Icon
								name='FaTrash'
								size={'1.3ch'}
								onClick={() => props.onDeleteClick(message.id)}
								styleSheet={{
									position: 'absolute',
									right: '16px',
									color: '#FFF',
									hover: {
										color: 'red',
									},
								}}
							/>
						)}
						<Box styleSheet={{ marginBottom: '8px' }}>
							<RoundedImage
								src={`https://github.com/${message.from}.png`}
								size={'20px'}
							/>
							<Text tag='strong'>{message.from}</Text>
							<Text
								styleSheet={{
									fontSize: '14px',
									marginLeft: '8px',
									marginRight: '8px',
									color: appConfig.theme.colors.neutrals[300],
								}}
								tag='span'
							>
								{new Date().toLocaleDateString()}
							</Text>
						</Box>
						{message.text.startsWith(':sticker:') ? (
							<Image
								src={message.text.replace(':sticker:', '')}
								styleSheet={{
									height: '150px',
								}}
							/>
						) : (
							message.text
						)}
					</Text>
				);
			})}
		</Box>
	);
}

export default MessageList;

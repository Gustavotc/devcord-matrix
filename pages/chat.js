import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { TailSpin } from 'react-loader-spinner';

const SUPABASE_ANNON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMjk1MiwiZXhwIjoxOTU4ODg4OTUyfQ.m2kjCCWYL1SrRw-1kfbONGIq5yek8mZL1enYce77vWs';
const SUPABASE_URL = 'https://ylfvqrvdaaechihgfrxi.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANNON_KEY);

export default function ChatPage() {
	const [message, setMessage] = React.useState('');
	const [messageList, setMessageList] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		supabaseClient
			.from('messages')
			.select('*')
			.order('id', { ascending: false })
			.then(({ data }) => {
				setMessageList(data);
				setLoading(false);
			});
	}, []);

	function handleNewMessage(newMessage) {
		if (newMessage.length > 0) {
			const message = {
				text: newMessage,
				from: 'Gustavotc',
			};

			supabaseClient
				.from('messages')
				.insert([message])
				.then(({ data }) => {
					setMessageList([data[0], ...messageList]);
				});
			setMessage('');
		}
	}

	function handleDeleteMessage(messageId) {
		supabaseClient
			.from('messages')
			.delete(true)
			.match({ id: messageId })
			.then(({ data }) => {
				setMessageList(messageList.filter((message) => message.id !== data[0].id));
			});
	}

	return (
		<Box
			styleSheet={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: appConfig.theme.colors.primary[500],
				backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundBlendMode: 'multiply',
				color: appConfig.theme.colors.neutrals['000'],
			}}
		>
			<Box
				styleSheet={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
					borderRadius: '5px',
					backgroundColor: appConfig.theme.colors.neutrals[700],
					height: '100%',
					maxWidth: '95%',
					maxHeight: '95vh',
					padding: '32px',
				}}
			>
				<Header />
				<Box
					styleSheet={{
						position: 'relative',
						display: 'flex',
						flex: 1,
						height: '80%',
						backgroundColor: appConfig.theme.colors.neutrals[600],
						flexDirection: 'column',
						borderRadius: '5px',
						padding: '16px',
					}}
				>
					{loading ? (
						<Box
							styleSheet={{
								flex: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<TailSpin width={50} />
						</Box>
					) : null}

					<MessageList messages={messageList} onDeleteClick={handleDeleteMessage} />
					<Box
						as='form'
						styleSheet={{
							display: 'flex',
							alignItems: 'center',
						}}
						onSubmit={(event) => {
							event.preventDefault();
							handleNewMessage(message);
						}}
					>
						<TextField
							value={message}
							onChange={(event) => {
								const value = event.target.value;
								setMessage(value);
							}}
							onKeyPress={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault();
									handleNewMessage(message);
								}
							}}
							placeholder='Insira sua message aqui...'
							type='textarea'
							styleSheet={{
								width: '100%',
								border: '0',
								resize: 'none',
								borderRadius: '5px',
								padding: '6px 8px',
								backgroundColor: appConfig.theme.colors.neutrals[800],
								marginRight: '12px',
								color: appConfig.theme.colors.neutrals[200],
							}}
						/>
						<Button
							type='submit'
							iconName='play'
							variant='secondary'
							colorVariant='positive'
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

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
				<Text variant='heading5'>Chat</Text>
				<Button variant='tertiary' colorVariant='neutral' label='Logout' href='/' />
			</Box>
		</>
	);
}

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
			}}
		>
			{props.messages.map((message) => {
				return (
					<Text
						key={message.id}
						tag='li'
						styleSheet={{
							borderRadius: '5px',
							padding: '6px',
							marginBottom: '12px',
							hover: {
								backgroundColor: appConfig.theme.colors.neutrals[700],
							},
						}}
					>
						<Box styleSheet={{ marginBottom: '8px' }}>
							<Image
								styleSheet={{
									width: '20px',
									height: '20px',
									borderRadius: '50%',
									display: 'inline-block',
									marginRight: '8px',
								}}
								src={`https://github.com/${message.from}.png`}
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

							<Icon
								name='FaTrash'
								size={'1.3ch'}
								onClick={() => props.onDeleteClick(message.id)}
								styleSheet={{
									display: 'inline-block',
									color: 'red',
								}}
							/>
						</Box>
						{message.text}
					</Text>
				);
			})}
		</Box>
	);
}

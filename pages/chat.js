import { Box, TextField, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

import Header from '../src/components/Header';
import Loading from '../src/components/Loading';
import MessageList from '../src/components/MessageList';

import { useRouter } from 'next/router';

import GithubAPI from '../src/services/GithubAPI';

const SUPABASE_ANNON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMjk1MiwiZXhwIjoxOTU4ODg4OTUyfQ.m2kjCCWYL1SrRw-1kfbONGIq5yek8mZL1enYce77vWs';
const SUPABASE_URL = 'https://ylfvqrvdaaechihgfrxi.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANNON_KEY);

function listMessagesInRealTime(addMessage, deleteMessage) {
	return supabaseClient
		.from('messages')
		.on('INSERT', (response) => {
			addMessage(response.new);
		})
		.on('DELETE', (response) => {
			deleteMessage(response.old);
		})
		.subscribe();
}

export default function ChatPage() {
	const [message, setMessage] = React.useState('');
	const [messageList, setMessageList] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [userName, setUserName] = React.useState('');
	const router = useRouter();

	const loggedUser = router.query.username;

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

		listMessagesInRealTime(handleNewMessageFromDb, handleDeleteMessageFromDb);

		GithubAPI.getUserName(loggedUser).then((name) => {
			setUserName(name);
		});
	}, []);

	const handleNewMessageFromDb = (newMessage) => {
		setMessageList((value) => {
			return [newMessage, ...value];
		});
	};

	const handleDeleteMessageFromDb = (oldMessage) => {
		setMessageList((value) => {
			return value.filter((message) => message.id !== oldMessage.id);
		});
	};

	function handleNewMessage(newMessage) {
		if (newMessage.length > 0) {
			const message = {
				text: newMessage,
				from: loggedUser,
			};

			supabaseClient
				.from('messages')
				.insert([message])
				.then(({ data }) => {});
			setMessage('');
		}
	}

	function handleDeleteMessage(messageId) {
		supabaseClient
			.from('messages')
			.delete(true)
			.match({ id: messageId })
			.then(({ data }) => {});
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
					padding: '24px',
				}}
			>
				<Header loggedUser={loggedUser} username={userName} />
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
					{loading && <Loading />}

					<MessageList
						messages={messageList}
						onDeleteClick={handleDeleteMessage}
						loggedUser={loggedUser}
					/>
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
						<Box
							styleSheet={{
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							<ButtonSendSticker
								onStickerClick={(sticker) => {
									handleNewMessage(':sticker:' + sticker);
								}}
							/>
							<Button
								styleSheet={{
									marginLeft: '8px',
								}}
								type='submit'
								iconName='paperPlane'
								variant='secondary'
								colorVariant='positive'
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

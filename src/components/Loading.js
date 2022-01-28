import { Box } from '@skynexui/components';
import { TailSpin } from 'react-loader-spinner';

function Loading() {
	return (
		<Box
			styleSheet={{
				position: 'fixed',
				bottom: '50vh',
				right: '50vw',
			}}
		>
			<TailSpin width={50} />
		</Box>
	);
}

export default Loading;

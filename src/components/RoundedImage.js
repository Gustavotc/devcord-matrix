import { Image } from '@skynexui/components';

function RoundedImage(props) {
	return (
		<Image
			styleSheet={{
				width: props.size,
				height: props.size,
				borderRadius: '50%',
				display: 'inline-block',
				marginRight: '8px',
			}}
			src={props.src}
		/>
	);
}

export default RoundedImage;

import React from 'react';
import { useParams } from 'react-router';

const Checkout = () => {
	const { packageName } = useParams();
	console.log(packageName)
	return (
		<div>
			
		</div>
	);
};

export default Checkout;
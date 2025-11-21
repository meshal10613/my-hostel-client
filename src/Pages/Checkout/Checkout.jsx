import React from 'react';
import { useParams } from 'react-router';

const Checkout = () => {
	const { packageName } = useParams();
	console.log(packageName)
	return (
		<div>
			<h2>Check Out Page!</h2>
		</div>
	);
};

export default Checkout;
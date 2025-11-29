const config = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: import.meta.env.VITE_authDomain,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messagingSenderId,
	appId: import.meta.env.VITE_appId,
	stripe_payment_publishable_key: import.meta.env.VITE_stripe_payment_publishable_key,
	imgbb_apikey: import.meta.env.VITE_imgbb_apikey,
};

export default config;
import Script from 'next/script';
import { useContext, useEffect } from 'react';
import { AuthContext, AuthProvider } from '@/components/SessionContext';
import { useRouter } from 'next/router';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import '@/pages/globals.scss';

const client = new ApolloClient({
	uri: 'http://localhost:8090/graphql',
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
	const { authenticated } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (!authenticated) router.push('/');
	}, [authenticated]);

	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<Script
					src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js'
					integrity='sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3'
					crossOrigin='anonymous'
				/>
				<Script
					src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js'
					integrity='sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V'
					crossOrigin='anonymous'
				/>
				<Component {...pageProps} />
			</AuthProvider>
		</ApolloProvider>
	);
}
export default MyApp;

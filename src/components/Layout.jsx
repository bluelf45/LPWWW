import Script from 'next/script';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<>
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

			<Navbar />
			<Container fluid>{children}</Container>
			<Footer />
		</>
	);
}

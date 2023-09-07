/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import Layout from './components/layout';
export default function Home() {
	return (
		<>
			<script
				src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js'
				integrity='sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3'
				crossorigin='anonymous'
			></script>
			<script
				src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js'
				integrity='sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V'
				crossorigin='anonymous'
			></script>
			<Layout></Layout>
		</>
	);
}

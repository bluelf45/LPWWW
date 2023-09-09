import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<Container fluid>{children}</Container>
			<Footer />
		</>
	);
}

import { Container } from 'react-bootstrap';
import Navbar from './Navbar';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<Container fluid>{children}</Container>
		</>
	);
}

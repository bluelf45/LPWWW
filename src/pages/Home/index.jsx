import { useContext } from 'react';
import { AuthContext } from '@/components/SessionContext';
import Layout from '@/components/Layout';

export default function Home() {
	const { tipoUsuario } = useContext(AuthContext);

	return (
		<Layout>
			<a>Home {tipoUsuario}</a>
		</Layout>
	);
}

import { useContext } from 'react';
import { AuthContext } from '@/components/SessionContext';
import Layout from '@/components/Layout';

export default function Home() {
	const { username, tipoUsuario } = useContext(AuthContext);

	return (
		<Layout>
			<a>Bienvenido {username}</a>
			<a>Tipo de Usuario {tipoUsuario}</a>
		</Layout>
	);
}

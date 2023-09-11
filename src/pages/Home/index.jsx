import { useContext } from 'react';
import { AuthContext } from '@/components/SessionContext';
import Layout from '@/components/Layout';

export default function Home() {
	const { username, tipoUsuario } = useContext(AuthContext);

	return (
		<Layout>
			<h2>Bienvenido {username}</h2>
			<h4>Tipo de Usuario {tipoUsuario}</h4>
		</Layout>
	);
}

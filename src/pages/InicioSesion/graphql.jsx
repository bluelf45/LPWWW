import { gql } from '@apollo/client';

const LOGIN_USER = gql`
	query LoginUsuario($rut: String!, $contrasena: String!) {
		loginUsuario(rut: $rut, contrasena: $contrasena) {
			tipoUsuario
		}
	}
`;

export { LOGIN_USER };

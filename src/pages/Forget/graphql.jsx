import { gql } from '@apollo/client';

const UPD_PASS = gql`
	mutation UpdPass($rut: String!, $contrasena: String!, $nuevaContrasena: String!) {
		updPass(rut: $rut, contrasena: $contrasena, nuevaContrasena: $nuevaContrasena) {
			id
			rut
			nombre
			apellido1
			apellido2
			carrera
			correo
			telefono
			tipoUsuario
			contrasena
			moroso
			bloqueado
			disponibilidad
		}
	}
`;

export { UPD_PASS };

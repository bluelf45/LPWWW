import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
	query getUsuarios($page: Int!, $limit: Int = 1) {
		getUsuarios(page: $page, limit: $limit) {
			usuarios {
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
			totalUsuarios
		}
	}
`;

const GET_USUARIO = gql`
	query getUsuario($id: ID!) {
		getUsuario(id: $id) {
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

const ADD_USUARIO = gql`
	mutation addUsuario($input: UsuarioInput!) {
		addUsuario(input: $input) {
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

const UPD_USUARIO = gql`
	mutation updUsuario($id: ID!, $input: UsuarioInput!) {
		updUsuario(id: $id, input: $input) {
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

const DEL_USUARIO = gql`
	mutation delUsuario($id: ID!) {
		delUsuario(id: $id) {
			message
		}
	}
`;

export { GET_USUARIOS, GET_USUARIO, ADD_USUARIO, UPD_USUARIO, DEL_USUARIO };

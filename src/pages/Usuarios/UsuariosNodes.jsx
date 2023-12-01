import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
	query getUsuarios(
		$page: Int!
		$limit: Int!
		$search: String!
		$tipoFilter: [String]!
		$disponibilidadFilter: [String]!
		$morosoFilter: [String]!
		$bloqueadoFilter: [String]!
	) {
		getUsuarios(
			page: $page
			limit: $limit
			search: $search
			tipoFilter: $tipoFilter
			disponibilidadFilter: $disponibilidadFilter
			morosoFilter: $morosoFilter
			bloqueadoFilter: $bloqueadoFilter
		) {
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

const ADD_USUARIO = gql`
	mutation addUsuario(
		$rut: String!
		$nombre: String!
		$apellido1: String!
		$apellido2: String!
		$carrera: String!
		$correo: String!
		$telefono: String!
		$contrasena: String!
		$tipoUsuario: String!
		$moroso: Boolean!
		$bloqueado: Boolean!
		$disponibilidad: Boolean!
	) {
		addUsuario(
			input: {
				rut: $rut
				nombre: $nombre
				apellido1: $apellido1
				apellido2: $apellido2
				carrera: $carrera
				correo: $correo
				telefono: $telefono
				contrasena: $contrasena
				tipoUsuario: $tipoUsuario
				moroso: $moroso
				bloqueado: $bloqueado
				disponibilidad: $disponibilidad
			}
		) {
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
	mutation updUsuario(
		$id: ID!
		$rut: String
		$nombre: String
		$apellido1: String
		$apellido2: String
		$carrera: String
		$correo: String
		$telefono: String
		$contrasena: String
		$tipoUsuario: String
		$moroso: Boolean
		$bloqueado: Boolean
		$disponibilidad: Boolean
	) {
		updUsuario(
			id: $id
			input: {
				rut: $rut
				nombre: $nombre
				apellido1: $apellido1
				apellido2: $apellido2
				carrera: $carrera
				correo: $correo
				telefono: $telefono
				contrasena: $contrasena
				tipoUsuario: $tipoUsuario
				moroso: $moroso
				bloqueado: $bloqueado
				disponibilidad: $disponibilidad
			}
		) {
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

export { GET_USUARIOS, ADD_USUARIO, UPD_USUARIO };

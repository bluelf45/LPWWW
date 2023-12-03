import { gql } from '@apollo/client';

// La exclamacion al lado del tipo significa que el parametro es obligatorio
// El [] significa que es un arreglo del tipo
const GET_TICKETS = gql`
	query getTickets($page: Int!, $limit: Int!, $ticketFilter: [String]!, $rutUsuario: String!) {
		getTickets(page: $page, limit: $limit, ticketFilter: $ticketFilter, rutUsuario: $rutUsuario) {
			tickets {
				id
				producto {
					id
					nombre
					categoria
					detalle
					cantidad
					disponibilidad
				}
				ticketEspecial {
					id
					fechaTermino
				}
				estadoPrestamo
				rut
				estadoTicket
				fechaPrestamo
			}
			totalTickets
		}
	}
`;
const GET_ALL_USERS = gql`
	query getAllUsers {
		getAllUsers {
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
const GET_ALL_PRODUCTOS = gql`
	query getAllProductos {
		getAllProductos {
			id
			nombre
			categoria
			detalle
			cantidad
			disponibilidad
		}
	}
`;

const ADD_TICKET = gql`
	mutation addTicket(
		$producto: ID!
		$estadoPrestamo: String!
		$rut: String!
		$estadoTicket: String!
		$fechaTermino: Date
	) {
		addTicket(
			input: {
				producto: $producto
				estadoPrestamo: $estadoPrestamo
				rut: $rut
				estadoTicket: $estadoTicket
				fechaTermino: $fechaTermino
			}
		) {
			id
			estadoPrestamo
			rut
			estadoTicket
			fechaPrestamo
		}
	}
`;

const UPD_TICKET = gql`
	mutation updTicket(
		$id: ID!
		$producto: ID!
		$estadoPrestamo: String!
		$rut: String!
		$estadoTicket: String!
		$fechaTermino: Date
	) {
		updTicket(
			id: $id
			input: {
				producto: $producto
				estadoPrestamo: $estadoPrestamo
				rut: $rut
				estadoTicket: $estadoTicket
				fechaTermino: $fechaTermino
			}
		) {
			id
			estadoPrestamo
			rut
			estadoTicket
			fechaPrestamo
		}
	}
`;

const GET_USER = gql`
	query getUser($rut: Int!) {
		getUser(rut: $rut) {
			rut
			nombre
			apellido1
			apellido2
		}
	}
`;

export { GET_TICKETS, ADD_TICKET, UPD_TICKET, GET_ALL_USERS, GET_USER, GET_ALL_PRODUCTOS };

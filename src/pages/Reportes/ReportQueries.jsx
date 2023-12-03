// src/queries.js
import { gql } from '@apollo/client';

export const GET_ALL_TICKETS = gql`
	query GetAllTickets {
		getAllTickets {
			id
			producto {
				id
				nombre
				categoria
				detalle
				cantidad
				disponibilidad
				image
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
	}
`;

export const GET_PRODUCTOS = gql`
	query GetProductos {
		getProductos {
			id
			nombre
			categoria
			detalle
			cantidad
			disponibilidad
			image
		}
	}
`;

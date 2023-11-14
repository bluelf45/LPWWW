import { gql } from '@apollo/client';

// La exclamacion al lado del tipo significa que el parametro es obligatorio
// El [] significa que es un arreglo del tipo
const GET_PRODUCTOS = gql`
	query getInventario(
		$page: Int!
		$limit: Int!
		$search: String!
		$tipoFilter: [String]!
		$estadoFilter: [String]!
		$cantidadFilter: [String]!
	) {
		getInventario(
			page: $page
			limit: $limit
			search: $search
			tipoFilter: $tipoFilter
			estadoFilter: $estadoFilter
			cantidadFilter: $cantidadFilter
		) {
			productos {
				id
				nombre
				categoria
				detalle
				cantidad
				disponibilidad
				image
			}
			totalProductos
		}
	}
`;

const ADD_PRODUCTO = gql`
	mutation addProducto(
		$nombre: String!
		$categoria: String!
		$detalle: String!
		$cantidad: Int!
		$disponibilidad: Boolean!
		$image: String!
	) {
		addProducto(
			input: {
				nombre: $nombre
				categoria: $categoria
				detalle: $detalle
				cantidad: $cantidad
				disponibilidad: $disponibilidad
				image: $image
			}
		) {
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

const UPD_PRODUCTO = gql`
	mutation updProducto(
		$id: ID!
		$nombre: String
		$categoria: String
		$detalle: String
		$cantidad: Int
		$disponibilidad: Boolean
		$image: String
	) {
		updProducto(
			id: $id
			input: {
				nombre: $nombre
				categoria: $categoria
				detalle: $detalle
				cantidad: $cantidad
				disponibilidad: $disponibilidad
				image: $image
			}
		) {
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

export { GET_PRODUCTOS, ADD_PRODUCTO, UPD_PRODUCTO };

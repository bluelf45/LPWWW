import { Table } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { FaXmark, FaCheck } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import styles from './index.module.css';

const GetFecha = (fecha) => {
	const Fecha = new Date(fecha);
	return [Fecha.getUTCDate(), Fecha.getMonth() + 1, Fecha.getFullYear()].join('/');
};

export default function PrestamosTabla({
	tickets,
	cantidadTotal,
	paginacionParams,
	setPaginacionParams,
	handleUpdateTicketButtonPressed,
	usuarioElevado,
}) {
	const estadoPrestamoDict = {
		esperando: 'Esperando entrega',
		entregado: 'Entregado al usuario',
		devuelto: 'Producto devuelto',
	};

	return (
		<>
			<Table hover responsive className={`mt-3 mx-auto ${styles['inventario-table']}`}>
				<thead>
					<tr className={styles['table-head']}>
						<th>Estado</th>
						{usuarioElevado && <th>Usuario</th>}
						<th>Categoría</th>
						<th>Nombre</th>
						<th>Detalle</th>
						<th>Fecha prestamo</th>
						<th>Fecha devolución</th>
						<th>Aceptado</th>
						{usuarioElevado && <th>Editar</th>}
						<th />
					</tr>
				</thead>
				<tbody>
					{tickets &&
						tickets.map((ticket) => (
							<tr key={ticket.id}>
								<td className='align-middle'>{estadoPrestamoDict[ticket.estadoPrestamo]}</td>
								{usuarioElevado && <td className='align-middle'>{ticket.rut}</td>}
								<td className='align-middle'>
									{ticket.producto.categoria.charAt(0).toUpperCase() +
										ticket.producto.categoria.slice(1)}
								</td>
								<td className='align-middle'>{ticket.producto.nombre}</td>
								<td className='align-middle'>{ticket.producto.detalle}</td>
								<td className='align-middle'>{GetFecha(ticket.fechaPrestamo)}</td>
								<td className='align-middle'>
									{ticket.ticketEspecial !== null
										? GetFecha(ticket.ticketEspecial.fechaTermino)
										: GetFecha(ticket.fechaPrestamo)}
								</td>
								<td align='center' className='align-middle'>
									{ticket.estadoTicket === 'aceptado' && <FaCheck style={{ color: 'green' }} />}
									{ticket.estadoTicket === 'pendiente' && <FaCheck style={{ color: 'gray' }} />}
									{ticket.estadoTicket === 'rechazado' && <FaXmark style={{ color: 'red' }} />}
								</td>
								{usuarioElevado && (
									<td className='align-middle'>
										<FaRegEdit
											onClick={(e) => {
												handleUpdateTicketButtonPressed(e, ticket);
											}}
											size='2rem'
											style={{ color: 'var(--alt-text-color)', cursor: 'pointer' }}
										/>
									</td>
								)}
							</tr>
						))}
				</tbody>
			</Table>

			<PaginationControl
				page={paginacionParams.paginaActiva}
				between={4}
				total={cantidadTotal}
				limit={paginacionParams.elementosPorPagina}
				changePage={(page) => {
					setPaginacionParams((prev) => ({ ...prev, paginaActiva: page }));
				}}
				ellipsis={4}
			/>
		</>
	);
}

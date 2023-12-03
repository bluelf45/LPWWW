import { Table } from 'react-bootstrap';
import styles from './index.module.css';
import { FaXmark, FaCheck } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReportTablaTickets({ productos, sort }) {
	console.log(productos);
	const [page, SetPage] = useState(1);
	const [sortOrder, setSortOrder] = useState('asc');
	const startIndex = (page - 1) * 5;
	const endIndex = startIndex + 5;
	const currentPageData = productos.slice(startIndex, endIndex);

	useEffect(() => {
		if (sort) {
			setSortOrder(sort);
		}
	});

	useEffect(() => {
		if (sortOrder === 'asc') {
			productos.sort((a, b) => (a.fechaPrestamo > b.fechaPrestamo ? 1 : -1));
		} else {
			productos.sort((a, b) => (a.fechaPrestamo < b.fechaPrestamo ? 1 : -1));
		}
	}, [sortOrder]);

	return (
		<div>
			<Table hover responsive className={`mt-3 mx-auto ${styles['report-table-stock']}`}>
				<thead>
					<tr className={styles['table-head']}>
						<th>Estado</th>
						<th>Categoría</th>
						<th>Nombre</th>
						<th>Detalle</th>
						<th>Fecha prestamo</th>
						<th>Fecha devolución</th>
						<th>Aceptado</th>
					</tr>
				</thead>
				<tbody>
					{currentPageData.map((ticket) => (
						<tr key={ticket.id}>
							<td className='align-middle'>{ticket.estadoPrestamo}</td>
							<td className='align-middle'>{ticket.rut}</td>
							<td className='align-middle'>
								{ticket.producto.categoria.charAt(0).toUpperCase() +
									ticket.producto.categoria.slice(1)}
							</td>
							<td className='align-middle'>{ticket.producto.nombre}</td>
							<td className='align-middle'>{ticket.producto.detalle}</td>
							<td className='align-middle'>
								{new Date(ticket.fechaPrestamo).toLocaleString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
							</td>
							<td className='align-middle'>
								{ticket.ticketEspecial != null
									? new Date(ticket.ticketEspecial.fechaTermino).toLocaleString('en-US', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
									  })
									: new Date(ticket.fechaPrestamo).toLocaleString('en-US', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
									  })}
							</td>
							<td align='center' className='align-middle'>
								{ticket.estadoTicket === 'aceptado' && <FaCheck style={{ color: 'green' }} />}
								{ticket.estadoTicket === 'pendiente' && <FaCheck style={{ color: 'gray' }} />}
								{ticket.estadoTicket === 'rechazado' && <FaXmark style={{ color: 'red' }} />}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<PaginationControl
				page={page}
				between={4}
				total={productos.length}
				limit={5}
				changePage={(page) => {
					SetPage(page);
				}}
			/>
		</div>
	);
}

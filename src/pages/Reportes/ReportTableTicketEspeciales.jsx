import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import styles from './index.module.css';
import { FaImage } from 'react-icons/fa6';

export default function ReportTableTicketEspeciales({ productos, sort }) {
	console.log(productos);
	const [page, SetPage] = useState(1);
	const [sortOrder, setSortOrder] = useState('asc');
	const startIndex = (page - 1) * 5;
	const endIndex = startIndex + 5;
	const currentPageData = productos.slice(startIndex, endIndex);
	console.log(startIndex, ' ', endIndex);

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
						<th />
						<th>Nombre</th>
						<th>Descripcion</th>
						<th style={{ textAlign: 'center' }}>Categoría</th>
						<th style={{ textAlign: 'center' }}>Estado</th>
						<th style={{ textAlign: 'center' }}>Rut</th>
						<th style={{ textAlign: 'center' }} align='center'>
							Fecha Solicitado
						</th>
						<th style={{ textAlign: 'center' }} align='center' className='align-middle'>
							Fecha Devolucion
						</th>
					</tr>
				</thead>
				<tbody>
					{currentPageData.map((ticket) => (
						<tr key={ticket.id}>
							<td align='center' className='align-middle'>
								<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
							</td>
							<td className='align-middle'>{ticket.producto.nombre}</td>
							<td className='align-middle'>{ticket.producto.detalle}</td>
							<td style={{ textAlign: 'center' }} className='align-middle'>
								{ticket.producto.categoria}
							</td>
							<td style={{ textAlign: 'center' }} className='align-middle'>
								{ticket.estadoPrestamo}
							</td>
							<td style={{ textAlign: 'center' }} className='align-middle'>
								{ticket.rut}
							</td>
							<td align='center' className='align-middle'>
								{new Date(ticket.fechaPrestamo).toLocaleString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
							</td>
							<td align='center' className='align-middle'>
								{new Date(ticket.ticketEspecial.fechaTermino).toLocaleString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
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

import { Table } from 'react-bootstrap';
import styles from './index.module.css';
import { FaImage } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

// No tengo idea si hay que contar la cantidad de veces que algo se ha pedido,
// o la cantidad de productos pedidos. Lo hice para que contara la cantidad de veces que se han prestado en total

export default function ReportTableSolicitados({ solicitudes, sort }) {
	const [page, SetPage] = useState(1);
	const [sortOrder, setSortOrder] = useState('asc');
	const startIndex = (page - 1) * 5;
	const endIndex = startIndex + 5;
	const currentPageData = solicitudes.slice(startIndex, endIndex);

	useEffect(() => {
		if (sort) {
			setSortOrder(sort);
		}
	});

	useEffect(() => {
		if (sortOrder === 'asc') {
			solicitudes.sort((a, b) => (a.vecesPedido > b.vecesPedido ? 1 : -1));
		} else {
			solicitudes.sort((a, b) => (a.vecesPedido < b.vecesPedido ? 1 : -1));
		}
	}, [sortOrder]);

	return (
		<div>
			<Table hover responsive className={`mt-3 mx-auto ${styles['report-table-stock']}`}>
				<thead>
					<tr className={styles['table-head']}>
						<th />
						<th>Nombre</th>
						<th>Detalle</th>
						<th style={{ textAlign: 'center' }}>Categoria</th>
						<th style={{ textAlign: 'center' }} align='center' className='align-middle'>
							Veces Pedido
						</th>
					</tr>
				</thead>
				<tbody>
					{currentPageData.map((ticket) => (
						<tr key={ticket.id}>
							<td align='center' className='align-middle'>
								<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
							</td>
							<td className='align-middle'>{ticket.nombre}</td>
							<td className='align-middle'>{ticket.detalle}</td>
							<td style={{ textAlign: 'center' }} className='align-middle'>
								{ticket.categoria}{' '}
							</td>
							<td style={{ textAlign: 'center' }} align='center ' className='align-middle'>
								{ticket.vecesPedido}{' '}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<PaginationControl
				page={page}
				between={4}
				total={currentPageData.length}
				limit={5}
				className={styles.paginacion}
				changePage={(page) => {
					SetPage(page);
				}}
			/>
		</div>
	);
}

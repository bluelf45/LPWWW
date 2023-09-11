import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import styles from './index.module.css';
import { FaImage, FaCheck } from 'react-icons/fa6';

export default function ReportTableStock({ productos }) {
	const [page, SetPage] = useState(1);
	const startIndex = (page - 1) * 5;
	const endIndex = startIndex + 5;
	const currentPageData = productos.slice(startIndex, endIndex);
	console.log(startIndex, ' ', endIndex);

	return (
		<div>
			<Table hover responsive className={`mt-3 mx-auto ${styles['report-table-stock']}`}>
				<thead>
					<tr className={styles['table-head']}>
						<th />
						<th>ID</th>
						<th>Categoría</th>
						<th>Nombre</th>
						<th>Detalle</th>
						<th>Cantidad</th>
						<th>Disponible</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{currentPageData.map((producto) => (
						<tr key={producto.id}>
							<td align='center' className='align-middle'>
								<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
							</td>
							<td className='align-middle'>{producto.id}</td>
							<td className='align-middle'>
								{producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}
							</td>
							<td className='align-middle'>{producto.nombre}</td>
							<td className='align-middle'>{producto.detalle}</td>
							<td align='center' className='align-middle'>
								{producto.cantidad}
							</td>
							<td align='center' className='align-middle'>
								{producto.disponible && <FaCheck style={{ color: 'green' }} />}
								{!producto.disponible && <FaCheck style={{ color: 'gray' }} />}
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

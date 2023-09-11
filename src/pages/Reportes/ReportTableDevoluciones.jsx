import { Table } from 'react-bootstrap';
import styles from './index.module.css';
import { FaImage } from 'react-icons/fa6';
import { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReportTableDevoluciones({ productos }) {
	const [page, SetPage] = useState(1);
	const startIndex = (page - 1) * 5;
	const endIndex = startIndex + 5;
	const currentPageData = productos.slice(startIndex, endIndex);

	return (
		<div>
			<Table hover responsive className={`mt-3 mx-auto ${styles['report-table-stock']}`}>
				<thead>
					<tr className={styles['table-head']}>
						<th />
						<th>ID Solicitud</th>
						<th>Nombre Persona</th>
						<th>ID</th>
						<th>Categoría</th>
						<th>Nombre</th>
						<th>Fecha Solicitado</th>
						<th>Fecha Entrega</th>
						<th>Fecha Entregado</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{currentPageData.map((producto) => (
						<tr key={producto.id}>
							<td align='center' className='align-middle'>
								<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
							</td>
							<td className='align-middle'>{producto.idSolicitud}</td>
							<td className='align-middle'>{producto.nombrePersona}</td>
							<td className='align-middle'>{producto.id}</td>
							<td className='align-middle'>
								{producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}
							</td>
							<td className='align-middle'>{producto.nombre}</td>
							<td className='align-middle'>{producto.fechaSolicitud}</td>
							<td className='align-middle'>{producto.fechaEntrega}</td>
							<td className='align-middle'>{producto.fechaEntregado}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<PaginationControl
				page={page}
				between={4}
				total={currentPageData.length}
				limit={5}
				changePage={(page) => {
					SetPage(page);
				}}
			/>
		</div>
	);
}

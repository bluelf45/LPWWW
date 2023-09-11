import { Table } from 'react-bootstrap';
import styles from './index.module.css';
import { FaImage } from 'react-icons/fa6';
import { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

// No tengo idea si hay que contar la cantidad de veces que algo se aha pedido,
// o la cantidad de productos pedidos. Lo hice para que contara la cantidad de objetos que se han prestado en total

export default function ReportTableSolicitados({ solicitudes }) {
	const [page, SetPage] = useState(1);
	const startIndex = (page - 1) * 5;
	const endIndex = startIndex + 5;
	const currentPageData = solicitudes.slice(startIndex, endIndex);
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
						<th>NºSolicitudes</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{currentPageData.map((solicitud) => (
						<tr key={solicitud.id}>
							<td align='center' className='align-middle'>
								<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
							</td>
							<td className='align-middle'>{solicitud.id}</td>
							<td className='align-middle'>
								{solicitud.categoria.charAt(0).toUpperCase() + solicitud.categoria.slice(1)}
							</td>
							<td className='align-middle'>{solicitud.nombre}</td>
							<td className='align-middle'>{solicitud.detalle}</td>
							<td align='center' className='align-middle'>
								{solicitud.cantidad}
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

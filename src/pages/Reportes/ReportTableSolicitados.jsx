import { Table } from 'react-bootstrap';
import styles from './index.module.css';
import { FaImage } from 'react-icons/fa6';

// No tengo idea si hay que contar la cantidad de veces que algo se aha pedido,
// o la cantidad de productos pedidos. Lo hice para que contara la cantidad de objetos que se han prestado en total

export default function ReportTableSolicitados({ solicitudes }) {
	return (
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
				{solicitudes &&
					solicitudes.map((solicitud) => (
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
	);
}

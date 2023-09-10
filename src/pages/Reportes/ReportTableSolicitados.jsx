import { Table } from 'react-bootstrap';
import styles from './index.module.css';
import { FaImage } from 'react-icons/fa6';

export default function ReportTableStock({ solicitudes }) {
	function añadirCantidades(data) {
		const idUsed = [];
		const final = [];
		data.forEach((element) => {
			if (!idUsed.includes(element.id)) {
				idUsed.push(element.id);
				final.push(element);
			} else {
				const index = idUsed.indexOf(element.id);
				final[index].cantidad += element.cantidad;
			}
		});
		return final;
	}

	solicitudes = añadirCantidades(solicitudes);

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
				{solicitudes.map((solicitudes) => (
					<tr key={solicitudes.id}>
						<td align='center' className='align-middle'>
							<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
						</td>
						<td className='align-middle'>{solicitudes.id}</td>
						<td className='align-middle'>
							{solicitudes.categoria.charAt(0).toUpperCase() + solicitudes.categoria.slice(1)}
						</td>
						<td className='align-middle'>{solicitudes.nombre}</td>
						<td className='align-middle'>{solicitudes.detalle}</td>
						<td align='center' className='align-middle'>
							{solicitudes.cantidad}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

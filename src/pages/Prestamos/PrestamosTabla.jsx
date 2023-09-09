import { Row, Col, Table } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa6';
import styles from './index.module.css';

export default function PrestamosTabla({ productos, productosOcultos }) {
	return (
		<Table hover responsive className={`mt-3 mx-auto ${styles['inventario-table']}`}>
			<thead>
				<tr className={styles['table-head']}>
					<th />
					<th>Estado</th>
					<th>Categoría</th>
					<th>Nombre</th>
					<th>Detalle</th>
					<th>Cantidad</th>
					<th>Fecha</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{productos.map((producto) => (
					<tr key={producto.id}>
						<td align='center' className='align-middle'>
							<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
						</td>
						<td className='align-middle'>{producto.Estado}</td>
						<td className='align-middle'>
							{producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}
						</td>
						<td className='align-middle'>{producto.nombre}</td>
						<td className='align-middle'>{producto.detalle}</td>
						<td className='align-middle'>
							<Row className='align-items-center'>
								<Col>
									<Col className='align-right'>{producto.cantidad}</Col>
								</Col>
							</Row>
						</td>
						<td align='center' className='align-middle'>
							{producto.fechaPrestamo}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

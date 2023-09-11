import { Table } from 'react-bootstrap';
import { FaXmark, FaCheck } from 'react-icons/fa6';
import styles from './index.module.css';
import { useContext } from 'react';
import { AuthContext } from '@/components/SessionContext';

export default function PrestamosTabla({ productos, productosOcultos }) {
	const { username } = useContext(AuthContext);
	return (
		<>
			<Table hover responsive className={`mt-3 mx-auto ${styles['inventario-table']}`}>
				<thead>
					<tr className={styles['table-head']}>
						<th>Creador</th>
						<th>Estado</th>
						<th>Categoría</th>
						<th>Nombre</th>
						<th>Detalle</th>
						<th>Cantidad</th>
						<th>Fecha</th>
						<th>Aceptado</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{productos &&
						productos.map((producto) => (
							<>
								{producto.Usuario === username && (
									<tr key={producto.id}>
										<td className='align-middle'>{producto.CreadoPor}</td>
										<td className='align-middle'>{producto.Estado}</td>
										<td className='align-middle'>
											{producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}
										</td>
										<td className='align-middle'>{producto.nombre}</td>
										<td className='align-middle'>{producto.detalle}</td>
										<td className='align-middle'>{producto.cantidad}</td>
										<td className='align-middle'>{producto.fechaPrestamo}</td>
										<td align='center' className='align-middle'>
											{producto.aceptado === true && <FaCheck style={{ color: 'green' }} />}
											{producto.aceptado === false && <FaCheck style={{ color: 'gray' }} />}
											{producto.aceptado === null && <FaXmark style={{ color: 'red' }} />}
										</td>
									</tr>
								)}
							</>
						))}
				</tbody>
			</Table>
		</>
	);
}

import { Table, Button } from 'react-bootstrap';
import { FaRegEdit, FaCheck } from 'react-icons/fa';
import styles from './index.module.css';
import { FaXmark } from 'react-icons/fa6';

export default function PrestamosTablaAdmin({ productos, HandleEditPrestamo }) {
	// const EditPrestamo = () => {};
	return (
		<Table hover responsive className={`mt-3 mx-auto ${styles['inventario-table']}`}>
			<thead>
				<tr className={styles['table-head']}>
					<th>Estado</th>
					<th>Usuario</th>
					<th>Categoría</th>
					<th>Nombre</th>
					<th>Detalle</th>
					<th>Cantidad</th>
					<th>Fecha</th>
					<th>Aceptado</th>
					<th>Editar</th>
					<th>Ticket</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{productos &&
					productos.map((producto) => (
						<tr key={producto.id}>
							<td className='align-middle'>
								{producto.aceptado !== null && <>{producto.Estado}</>}
								{producto.aceptado === null && <>Rechazado</>}
							</td>
							<td className='align-middle'>{producto.Usuario}</td>
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
							<td className='align-middle'>
								<FaRegEdit
									onClick={(e) => {
										HandleEditPrestamo(e, producto);
									}}
									size='2rem'
									style={{ color: 'var(--alt-text-color)' }}
								/>
							</td>
							<td className='align-middle'>
								<Button className='btn-primary'>Ticket</Button>
							</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
}

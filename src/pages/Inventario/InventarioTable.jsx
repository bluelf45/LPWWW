import { useState } from 'react';
import { Row, Col, Form, Table } from 'react-bootstrap';
import {
	FaImage,
	FaPen,
	FaCircleInfo,
	FaCheck,
	FaCircleXmark,
	FaCircleCheck,
	FaCaretDown,
} from 'react-icons/fa6';
import styles from './index.module.css';

export default function InventarioTable({
	productos,
	editandoCantidad,
	setEditandoCantidad,
	cantidadProducto,
	setCantidadProducto,
	handleUpdateCantidad,
	handleUpdateEstado,
	handleUpdateProductoButtonPressed,
	cantidadProductoAceptable,
}) {
	const [idProductoEditarCantidad, setIdProductoEditarCantidad] = useState();

	return (
		<Table hover responsive className={`mt-3 mx-auto ${styles['inventario-table']}`}>
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
				{productos.map((producto) => (
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
						<td className='align-middle'>
							<Row className='align-items-center'>
								{editandoCantidad && (
									<>
										{idProductoEditarCantidad === producto.id && (
											<>
												<Col>
													<Form.Control
														type='number'
														value={cantidadProducto}
														onChange={(e) => {
															setCantidadProducto(e.target.value);
														}}
													/>
												</Col>
												<Col className='align-middle'>
													<a
														onClick={(e) => {
															e.preventDefault();
															setEditandoCantidad(false);
														}}
													>
														<FaCircleXmark
															size='1.5rem'
															style={{ color: 'var(--red)', cursor: 'pointer' }}
														/>
													</a>
													<a
														onClick={(e) => {
															handleUpdateCantidad(e, producto.id);
														}}
													>
														<FaCircleCheck
															size='1.5rem'
															style={{ color: 'green', marginLeft: '1rem', cursor: 'pointer' }}
														/>
													</a>
												</Col>

												<Col></Col>
											</>
										)}
										{idProductoEditarCantidad !== producto.id && (
											<>
												<Col>{producto.id}</Col>
												<Col>
													<FaPen style={{ color: 'lightslategrey' }} />
												</Col>
												<Col>
													{producto.cantidad < cantidadProductoAceptable && (
														<>
															<div className={styles['alert-cantidad']}>
																<FaCircleInfo style={{ color: 'var(--red)' }} />
																<p>La cantidad de este producto es muy baja.</p>
															</div>
														</>
													)}
												</Col>
											</>
										)}
									</>
								)}
								{!editandoCantidad && (
									<>
										<Col>{producto.cantidad}</Col>
										<Col>
											<a
												onClick={() => {
													setEditandoCantidad(true);
													setIdProductoEditarCantidad(producto.id);
													setCantidadProducto(producto.cantidad);
												}}
												style={{ cursor: 'pointer' }}
											>
												<FaPen style={{ color: 'var(--alt-text-color)' }} />
											</a>
										</Col>
										<Col>
											{producto.cantidad < cantidadProductoAceptable && (
												<>
													<div className={styles['alert-cantidad']}>
														<FaCircleInfo style={{ color: 'var(--red)' }} />
														<p>La cantidad de este producto es muy baja.</p>
													</div>
												</>
											)}
										</Col>
									</>
								)}
							</Row>
						</td>
						<td align='center' className='align-middle'>
							{producto.disponible && <FaCheck style={{ color: 'green' }} />}
							{!producto.disponible && <FaCheck style={{ color: 'gray' }} />}
						</td>
						<td className={`align-middle ${styles['producto-accion-dropdown']}`}>
							<FaCaretDown style={{ color: 'var(--alt-text-color)' }} />
							<div className={styles['producto-accion-opciones']}>
								<a
									onClick={(e) => handleUpdateEstado(e, producto.id)}
									style={{ cursor: 'pointer' }}
								>
									Dar de
									{producto.disponible && ' baja'}
									{!producto.disponible && ' alta'}
								</a>
								<hr />
								<a
									onClick={(e) => {
										handleUpdateProductoButtonPressed(e, producto);
									}}
									style={{ cursor: 'pointer' }}
								>
									Editar Producto
								</a>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

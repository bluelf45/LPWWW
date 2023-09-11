import Layout from '@/components/Layout';
import styles from './index.module.css';
import { Col, Modal, Form, Row, Button } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import PrestamosTabla from './PrestamosTabla';
import PrestamosTablaAdmin from './PrestamosTablaAdmin';
import { AuthContext } from '@/components/SessionContext';
import Conditional from '@/components/conditional';

export default function Perfil() {
	const { tipoUsuario, username } = useContext(AuthContext);
	const ViewDefiner = {
		panolero: 0,
		coordinador: 1,
		jefeCarrera: 2,
		alumno: 3,
		docente: 4,
	};
	const [productosGuardados] = useState([
		{
			id: 1,
			disponible: true,
			categoria: 'materiales',
			nombre: 'Plumones de pizarra',
			detalle: 'Plumon de pizarra color rojo',
			cantidad: 6,
			Estado: 'Devolucion',
			fechaPrestamo: '2023-3-01',
			Usuario: 'alumno',
			CreadoPor: 'alumno',
			aceptado: true,
		},
		{
			id: 2,
			disponible: true,
			categoria: 'herramientas',
			nombre: 'Llaves Allen',
			detalle: 'Set de llaves allen de distintos tamaños',
			cantidad: 2,
			Estado: 'Devolucion',
			fechaPrestamo: '2023-5-01',
			Usuario: 'alumno',
			CreadoPor: 'alumno',
			aceptado: false,
		},
		{
			id: 3,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
			Estado: 'Prestamo',
			fechaPrestamo: '2023-10-02',
			Usuario: 'docente',
			CreadoPor: 'panolero',
			aceptado: true,
		},
		{
			id: 4,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
			Estado: 'Prestamo',
			fechaPrestamo: '2023-10-01',
			Usuario: 'docente',
			aceptado: null,
			CreadoPor: 'docente',
		},
	]);
	const [editandoProducto, setEditandoProducto] = useState(false);
	const [creandoProducto, setCreandoProducto] = useState(false);
	const [aceptarProducto, setAceptarProducto] = useState(false);
	const [cantidadProducto, setCantidadProducto] = useState(0);
	const [EstadoProducto, setEstadoProducto] = useState('');
	const [nombreProducto, setNombreProducto] = useState('');
	const [idProductoEditar, setIdProductoEditar] = useState();
	const [FechaProducto, setFechaProducto] = useState(Date.now());
	const [showProductoModal, setShowProductoModal] = useState(false);
	const [showCrearSolicitudModal, setshowCrearSolicitudModal] = useState(false);
	const [ProductosVisibles, setProductosVisibles] = useState([...productosGuardados]);
	const [detalleProductos, setDetalleProductos] = useState('');
	const [nombreUsuario, setNombreUsuario] = useState('');
	const [categoriaProducto, setCategoriaProducto] = useState('');

	const findLastID = () => {
		let lastID = 0;
		ProductosVisibles.forEach((producto) => {
			if (producto.id > lastID) {
				lastID = producto.id;
			}
		});
		console.log(lastID);
		return lastID + 1;
	};
	useEffect(() => {
		setProductosVisibles([...productosGuardados]);
	}, [productosGuardados]);
	const handleCreateProducto = (e) => {
		e.preventDefault();
		const temp = [...ProductosVisibles];
		const lastId = findLastID();
		temp.push({
			id: lastId,
			Estado: 'Devolucion',
			Usuario: nombreUsuario,
			cantidad: cantidadProducto,
			nombre: nombreProducto,
			fechaPrestamo: FechaProducto,
			detalle: detalleProductos,
			categoria: categoriaProducto,
			aceptado: false,
			CreadoPor: username,
		});
		setProductosVisibles([...temp]);
		setShowProductoModal(false);
		setshowCrearSolicitudModal(false);
		setCreandoProducto(false);
	};
	const HandleEditPrestamo = (e, producto) => {
		e.preventDefault();

		setShowProductoModal(true);
		setEditandoProducto(true);
		setIdProductoEditar(producto.id);
	};
	const HandleCreateSolicitudModal = (e) => {
		e.preventDefault();
		setshowCrearSolicitudModal(true);
	};

	const handleUpdateProducto = (e) => {
		e.preventDefault();
		const temp = [...productosGuardados];
		const producto = productosGuardados[idProductoEditar - 1];
		if (EstadoProducto === '') {
			producto.Estado = 'Prestamo';
		} else {
			producto.Estado = EstadoProducto;
		}
		if (aceptarProducto === 'null') {
			producto.aceptado = null;
		} else {
			producto.aceptado = aceptarProducto === 'true';
		}
		console.log(producto.aceptado);
		producto.cantidad = cantidadProducto;
		producto.nombre = nombreProducto;
		producto.fechaPrestamo = FechaProducto;
		temp[idProductoEditar - 1] = producto;
		setProductosVisibles([...temp]);
		setShowProductoModal(false);
		setEditandoProducto(false);
	};
	const HandleChanges = (e) => {
		const { id, checked } = e.target;
		let checkboxSecondary;
		if (id === 'Prestamo') {
			checkboxSecondary = document.getElementById('Devolucion');
		} else {
			checkboxSecondary = document.getElementById('Prestamo');
		}
		const temp = [];
		if (!checked) {
			setProductosVisibles([...productosGuardados]);
			return;
		}
		productosGuardados.forEach((producto) => {
			if (producto.Estado === id && checked) {
				temp.push(producto);
			}
			if (Boolean(checkboxSecondary.checked) && producto.Estado !== id) {
				temp.push(producto);
			}
		});
		setProductosVisibles([...temp]);
	};
	useEffect(() => {}, [ProductosVisibles, editandoProducto, creandoProducto]);
	return (
		<Layout>
			<h1 style={{ color: 'var(--alt-text-color)' }}>Prestamos y Devoluciones</h1>

			<Row>
				<Col xs={12} md={2} className={styles['filter-selection']}>
					<div className='d-flex flex-column'>
						<p className='h5'>Filtros estado de prestamos</p>
						<label className={styles['filter-checkbox']} htmlFor='Prestamo'>
							<input type='checkbox' id='Prestamo' onChange={HandleChanges} />
							<span>Prestamos</span>
						</label>
						<label className={styles['filter-checkbox']} htmlFor='Devolucion'>
							<input type='checkbox' id='Devolucion' onChange={HandleChanges} />
							<span>Devoluciones</span>
						</label>
					</div>
					<Button onClick={HandleCreateSolicitudModal} className={` mt-3 btn-primary`}>
						Crear Solicitud
					</Button>
					<Modal
						show={showCrearSolicitudModal}
						onHide={() => setshowCrearSolicitudModal(false)}
						size='lg'
						aria-labelledby='contained-modal-title-vcenter'
						centered
					>
						<Modal.Header closeButton>
							<Modal.Title
								id='contained-modal-title-vcenter'
								style={{ color: 'var(--alt-text-color)' }}
							>
								Crear Solicitud
							</Modal.Title>
						</Modal.Header>
						<Form
							onSubmit={(e) => {
								handleCreateProducto(e);
							}}
						>
							<Modal.Body>
								<Row>
									<Col>
										<Form.Group className='mb-3' controlId='formUsuario'>
											<Form.Label>Usuario</Form.Label>
											<Form.Control
												type='text'
												// defaultValue={productosGuardados[idProductoEditar].nombre}
												min='0'
												value={nombreUsuario}
												onChange={(e) => setNombreUsuario(e.target.value)}
												className={styles['form-categoria-dropdown']}
												required
											/>
										</Form.Group>
									</Col>
									<Col>
										{' '}
										<Form.Group className='mb-3' controlId='formNombre'>
											<Form.Label>Nombre Producto</Form.Label>
											<Form.Control
												type='text'
												// defaultValue={productosGuardados[idProductoEditar].nombre}
												min='0'
												value={nombreProducto}
												onChange={(e) => setNombreProducto(e.target.value)}
												className={styles['form-categoria-dropdown']}
												required
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col>
										{' '}
										<Form.Group className='mb-3' controlId='formNombre'>
											<Form.Label>Detalle del Producto</Form.Label>
											<Form.Control
												type='text'
												// defaultValue={productosGuardados[idProductoEditar].nombre}
												min='0'
												value={detalleProductos}
												onChange={(e) => setDetalleProductos(e.target.value)}
												className={styles['form-categoria-dropdown']}
												required
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group className='mb-3' controlId='formCantidad'>
											<Form.Label>Cantidad</Form.Label>
											<Form.Control
												type='number'
												min='0'
												value={cantidadProducto}
												onChange={(e) => setCantidadProducto(e.target.value)}
												className={styles['form-categoria-dropdown']}
												required
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col>
										{' '}
										<Form.Group className='mb-3' controlId='formCategoria'>
											<Form.Label>Categoria</Form.Label>
											<Form.Control
												type='text'
												value={categoriaProducto}
												onChange={(e) => setCategoriaProducto(e.target.value)}
												className={styles['form-categoria-dropdown']}
												required
											/>
										</Form.Group>
									</Col>
									<Col>
										{' '}
										<Form.Group controlId='duedate'>
											<Form.Label>Fecha Solicitud</Form.Label>
											<Form.Control
												type='date'
												name='duedate'
												placeholder='Due date'
												value={FechaProducto}
												onChange={(e) => setFechaProducto(e.target.value)}
												className={styles['form-categoria-dropdown']}
											/>
										</Form.Group>
									</Col>
								</Row>
								<div style={{ display: 'flex' }}>
									<Button type='submit' className={styles['custom-button']}>
										Crear Solicitud
									</Button>
								</div>
							</Modal.Body>
						</Form>
					</Modal>
				</Col>
				<Col>
					<div className='row'>
						<Conditional
							condition={ViewDefiner[tipoUsuario] > 2}
							children1={<PrestamosTabla productos={ProductosVisibles} />}
							children2={
								<>
									<Modal
										show={showProductoModal}
										onHide={() => setShowProductoModal(false)}
										size='lg'
										aria-labelledby='contained-modal-title-vcenter'
										centered
									>
										<Modal.Header closeButton>
											<Modal.Title
												id='contained-modal-title-vcenter'
												style={{ color: 'var(--alt-text-color)' }}
											>
												Editar Prestamo
											</Modal.Title>
										</Modal.Header>
										<Form
											onSubmit={(e) => {
												handleUpdateProducto(e, idProductoEditar);
											}}
										>
											<Modal.Body>
												<Row>
													<Col>
														<Form.Group controlId='duedate'>
															<Form.Label>Fecha Prestamo</Form.Label>
															<Form.Control
																type='date'
																name='duedate'
																placeholder='Due date'
																value={FechaProducto}
																className={styles['text-form']}
																onChange={(e) => setFechaProducto(e.target.value)}
															/>
														</Form.Group>
													</Col>
													<Col>
														<Form.Group className='mb-3' controlId='formNombre'>
															<Form.Label>Aceptar prestamo</Form.Label>
															<Form.Select
																type='text'
																value={aceptarProducto}
																onChange={(e) => setAceptarProducto(e.target.value)}
																className={styles['text-form']}
																required
															>
																<option value='true'>Aceptar</option>
																<option value='false'>Esperar</option>
																<option value='null'>Rechazar</option>
															</Form.Select>
														</Form.Group>
													</Col>
													<Form.Group className='mb-3' controlId='formNombre'>
														<Form.Label>Estado del Prestamo</Form.Label>
														<Form.Select
															type='text'
															defaultValue={'Prestamo'}
															onChange={(e) => setEstadoProducto(e.target.value)}
															placeholder='Estado...'
															className={styles['text-form']}
															required
														>
															<option value='Prestamo'>Prestado</option>
															<option value='Devolucion'>Devuelto</option>
														</Form.Select>
													</Form.Group>
													<Form.Group className='mb-3' controlId='formCantidad'>
														<Form.Label>Cantidad</Form.Label>
														<Form.Control
															type='number'
															min='0'
															value={cantidadProducto}
															onChange={(e) => setCantidadProducto(e.target.value)}
															className={styles['form-categoria-dropdown']}
															required
														/>
													</Form.Group>
													<Form.Group className='mb-3' controlId='formCantidad'>
														<Form.Label>Nombre Producto</Form.Label>
														<Form.Control
															type='text'
															// defaultValue={productosGuardados[idProductoEditar].nombre}
															min='0'
															value={nombreProducto}
															onChange={(e) => setNombreProducto(e.target.value)}
															className={styles['form-categoria-dropdown']}
															required
														/>
													</Form.Group>
												</Row>
												<div style={{ display: 'flex' }}>
													<Button type='submit' className={styles['custom-button']}>
														{editandoProducto && 'Editar'}
														{!editandoProducto && 'Agregar'}
													</Button>
												</div>
											</Modal.Body>
										</Form>
									</Modal>
									<PrestamosTablaAdmin
										productos={ProductosVisibles}
										HandleEditPrestamo={HandleEditPrestamo}
									/>
								</>
							}
						/>
					</div>
				</Col>
			</Row>
		</Layout>
	);
}

import Layout from '@/components/Layout';
import styles from './index.module.css';
import { Col, Modal, Form, Row, Button } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import PrestamosTabla from './PrestamosTabla';
import PrestamosTablaAdmin from './PrestamosTablaAdmin';
import { AuthContext } from '@/components/SessionContext';
import Conditional from '@/components/conditional';

export default function Perfil() {
	const { tipoUsuario } = useContext(AuthContext);
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
			Usuario: 'Juan Perez',
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
			Usuario: 'Juan Gonzalez',
		},
		{
			id: 3,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
			Estado: 'Prestamo',
			fechaPrestamo: '2023-10-01',
			Usuario: 'Patricio Perez',
		},
	]);
	const [editandoProducto, setEditandoProducto] = useState(false);
	const [cantidadProducto, setCantidadProducto] = useState(0);
	const [EstadoProducto, setEstadoProducto] = useState('');
	const [nombreProducto, setNombreProducto] = useState('');
	const [idProductoEditar, setIdProductoEditar] = useState();
	const [showProductoModal, setShowProductoModal] = useState(false);
	const [ProductosVisibles, setProductosVisibles] = useState([...productosGuardados]);
	useEffect(() => {
		setProductosVisibles([...productosGuardados]);
	}, [productosGuardados]);

	const HandleEditPrestamo = (e, producto) => {
		e.preventDefault();

		setShowProductoModal(true);
		setEditandoProducto(true);
		setIdProductoEditar(producto.id);
	};
	const handleUpdateProducto = (e) => {
		e.preventDefault();
		const temp = [];
		productosGuardados.forEach((producto) => {
			if (producto.id === idProductoEditar) {
				producto.Estado = EstadoProducto;
				producto.cantidad = cantidadProducto;
			}
			temp.push(producto);
		});
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
	useEffect(() => {}, [ProductosVisibles, editandoProducto]);
	return (
		<Layout>
			<Col sm md>
				<h1 style={{ color: 'var(--alt-text-color)' }}>Prestamos y Devoluciones</h1>
			</Col>
			<Col sm md>
				<p className='h5'>Estado del prestamo</p>
				<label className={styles['filter-checkbox']} htmlFor='Prestamo'>
					<input type='checkbox' id='Prestamo' onChange={HandleChanges} />
					<span>Prestamos</span>
				</label>
				<label className={styles['filter-checkbox']} htmlFor='Devolucion'>
					<input type='checkbox' id='Devolucion' onChange={HandleChanges} />
					<span>Devoluciones</span>
				</label>
			</Col>
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
											<Form.Group className='mb-3' controlId='formNombre'>
												<Form.Label>Estado del Prestamo</Form.Label>
												<Form.Select
													type='text'
													value={EstadoProducto}
													defaultValue={EstadoProducto}
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
		</Layout>
	);
}

import { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import InventarioTable from './InventarioTable';

export default function Inventario() {
	const [tipoProductoFilter, setTipoProductoFilter] = useState([]);
	const [estadoProductoFilter, setEstadoProductoFilter] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	const [productosGuardados, setProductosGuardados] = useState([
		{
			id: 1,
			disponible: true,
			categoria: 'materiales',
			nombre: 'Plumones de pizarra',
			detalle: 'Plumon de pizarra color rojo',
			cantidad: 6,
		},
		{
			id: 2,
			disponible: true,
			categoria: 'herramientas',
			nombre: 'Llaves Allen',
			detalle: 'Set de llaves allen de distintos tamaños',
			cantidad: 2,
		},
		{
			id: 3,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
		},
	]);
	const [ultimaIdGuardada, setUltimaIdGuardada] = useState(3);
	const [productos, setProductos] = useState(productosGuardados);

	const [editandoProducto, setEditandoProducto] = useState(false);
	const [editandoCantidad, setEditandoCantidad] = useState(false);
	const [idProductoEditar, setIdProductoEditar] = useState();
	const [showProductoModal, setShowProductoModal] = useState(false);

	const [nombreProducto, setNombreProducto] = useState('');
	const [detalleProducto, setDetalleProducto] = useState('');
	const [categoriaProducto, setCategoriaProducto] = useState('');
	const [cantidadProducto, setCantidadProducto] = useState(0);
	const [estadoProducto, setEstadoProducto] = useState(false);

	const searchRef = useRef();

	const cantidadProductoAceptable = 3;

	const handleChangeTipoFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setTipoProductoFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setTipoProductoFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const handleCangeEstadoFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setEstadoProductoFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setEstadoProductoFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const filterProductos = () => {
		const productosTipoFiltered = [];

		tipoProductoFilter.forEach((filtro) => {
			productosGuardados.forEach((producto) => {
				if (producto.categoria === filtro && !productosTipoFiltered.includes(producto))
					productosTipoFiltered.push(producto);
			});
		});

		const productosEstadoFiltered = [];

		estadoProductoFilter.forEach((filtro) => {
			productosGuardados.forEach((producto) => {
				let cumpleFiltro = false;

				switch (filtro) {
					case 'disponibles':
						if (producto.disponible) cumpleFiltro = true;
						break;
					case 'no_disponibles':
						if (!producto.disponible) cumpleFiltro = true;
						break;
					case 'cantidad_alta':
						if (producto.cantidad >= cantidadProductoAceptable) cumpleFiltro = true;
						break;
					case 'cantidad_baja':
						if (producto.cantidad < cantidadProductoAceptable) cumpleFiltro = true;
						break;
				}

				if (cumpleFiltro && !productosEstadoFiltered.includes(producto))
					productosEstadoFiltered.push(producto);
			});
		});

		let productosFiltered = [];

		if (tipoProductoFilter.length > 0) {
			if (estadoProductoFilter.length > 0) {
				productosTipoFiltered.forEach((producto) => {
					if (productosEstadoFiltered.includes(producto)) {
						productosFiltered.push(producto);
					}
				});
			} else {
				productosFiltered = productosTipoFiltered;
			}
		} else if (estadoProductoFilter.length > 0) {
			productosFiltered = productosEstadoFiltered;
		} else {
			productosFiltered = productosGuardados;
		}

		if (searchQuery === '') setProductos(productosFiltered);
		else
			setProductos(
				productosFiltered.filter((producto) =>
					producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()),
				),
			);
	};

	const handleFilter = (e) => {
		e.preventDefault();

		filterProductos();
	};

	const handleSearchBar = (e) => {
		e.preventDefault();

		setSearchQuery(searchRef.current.value);
	};

	const cleanFormData = () => {
		setShowProductoModal(false);
		setNombreProducto('');
		setDetalleProducto('');
		setCategoriaProducto('');
		setCantidadProducto(0);
		setEstadoProducto(false);
	};

	const handleAgregarProducto = (e) => {
		e.preventDefault();

		setUltimaIdGuardada((prev) => prev + 1);

		const nuevoProducto = {
			id: ultimaIdGuardada + 1,
			nombre: nombreProducto,
			detalle: detalleProducto,
			categoria: categoriaProducto,
			cantidad: parseInt(cantidadProducto),
			disponible: estadoProducto,
		};

		setProductosGuardados((prev) => [...prev, nuevoProducto]);
		cleanFormData();
	};

	const handleUpdateEstado = (e, idProducto) => {
		e.preventDefault();

		const productosNuevo = productosGuardados.map((producto) => {
			if (producto.id === idProducto) {
				return { ...producto, disponible: !producto.disponible };
			} else {
				return producto;
			}
		});

		setProductosGuardados(productosNuevo);
	};

	const handleUpdateCantidad = (e, idProducto) => {
		e.preventDefault();

		const productosNuevo = productosGuardados.map((producto) => {
			if (producto.id === idProducto) {
				return { ...producto, cantidad: cantidadProducto };
			} else {
				return producto;
			}
		});

		setProductosGuardados(productosNuevo);
		setCantidadProducto(0);
		setEditandoCantidad(false);
	};

	const handleUpdateProductoButtonPressed = (e, producto) => {
		e.preventDefault();

		setShowProductoModal(true);
		setEditandoProducto(true);
		setIdProductoEditar(producto.id);
		setNombreProducto(producto.nombre);
		setDetalleProducto(producto.detalle);
		setCategoriaProducto(producto.categoria);
		setCantidadProducto(producto.cantidad);
		setEstadoProducto(producto.disponible);
	};

	const hadleUpdateProducto = (e, idProducto) => {
		e.preventDefault();

		setUltimaIdGuardada((prev) => prev + 1);

		const nuevoProducto = {
			id: ultimaIdGuardada + 1,
			nombre: nombreProducto,
			detalle: detalleProducto,
			categoria: categoriaProducto,
			cantidad: cantidadProducto,
			disponible: estadoProducto,
		};

		const productosNuevo = productosGuardados.map((producto) => {
			if (producto.id === idProducto) {
				return nuevoProducto;
			} else {
				return producto;
			}
		});

		setProductosGuardados(productosNuevo);
		cleanFormData();
	};

	useEffect(() => {
		filterProductos();
	}, [productosGuardados, searchQuery]);

	return (
		<Layout>
			<Row className='mt-3 m-auto justify-content-md-left'>
				<Col sm md>
					<h1 style={{ color: 'var(--alt-text-color)' }}>Inventario</h1>
				</Col>
				<Col sm md className='mt-2 d-flex justify-content-center'>
					<Form onSubmit={handleSearchBar}>
						<Form.Group controlId='formSearchBar' style={{ display: 'inline-block' }}>
							<Form.Label visuallyHidden='true'>Barra de búsqueda</Form.Label>
							<Form.Control type='search' ref={searchRef} className={styles['text-form']} />
						</Form.Group>
						<Button variant='light' type='submit' style={{ display: 'inline-block' }}>
							<FaMagnifyingGlass style={{ color: 'var(--alt-text-color)' }} />
						</Button>
					</Form>
				</Col>
				<Col className='mt-2'>
					<a
						onClick={() => {
							if (editandoProducto) {
								cleanFormData();
							}
							setShowProductoModal(true);
							setEditandoProducto(false);
						}}
						style={{ cursor: 'pointer', textDecoration: 'none' }}
						className='float-end'
					>
						<h5 style={{ color: 'var(--primary-color)' }}>+ Agregar Producto</h5>
					</a>
				</Col>
			</Row>
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
						{editandoProducto && 'Editar Producto'}
						{!editandoProducto && 'Agregar Producto'}
					</Modal.Title>
				</Modal.Header>

				<Form
					onSubmit={(e) => {
						if (editandoProducto) hadleUpdateProducto(e, idProductoEditar);
						else handleAgregarProducto(e);
					}}
				>
					<Modal.Body>
						<Row>
							<Col sm md>
								<Form.Group className='mb-3' controlId='formNombre'>
									<Form.Label>Nombre</Form.Label>
									<Form.Control
										type='text'
										value={nombreProducto}
										onChange={(e) => setNombreProducto(e.target.value)}
										placeholder='Nombre...'
										className={styles['text-form']}
										required
									/>
								</Form.Group>
							</Col>
							<Col sm md>
								<Form.Group className='mb-3' controlId='formDetalle'>
									<Form.Label>Detalle</Form.Label>
									<Form.Control
										type='text'
										value={detalleProducto}
										onChange={(e) => setDetalleProducto(e.target.value)}
										placeholder='Detalles...'
										className={styles['text-form']}
										required
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm md>
								<Form.Group className='mb-3' controlId='formCategoria'>
									<Form.Label>Categoría</Form.Label>
									<Form.Control
										required
										as='select'
										className={styles['form-categoria-dropdown']}
										value={categoriaProducto}
										onChange={(e) => setCategoriaProducto(e.target.value)}
									>
										<option value=''>Seleccione una categoría</option>
										<option value='materiales'>Material</option>
										<option value='herramientas'>Herramienta</option>
										<option value='equipos'>Equipo</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col sm md>
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
								<Form.Check
									type='switch'
									id='estado-producto'
									label='¿Dar producto de alta?'
									checked={estadoProducto}
									onChange={() => {
										setEstadoProducto(!estadoProducto);
									}}
								></Form.Check>
							</Col>
							<Col>
								<Button type='submit' className={styles['custom-button']}>
									{editandoProducto && 'Editar'}
									{!editandoProducto && 'Agregar'}
								</Button>
							</Col>
						</Row>
					</Modal.Body>
				</Form>
			</Modal>
			<Row>
				<Col xs={12} md={2} className={styles['filter-selection']}>
					<p className='h5'>Tipo de Producto</p>
					<div className='d-flex flex-wrap'>
						<label className={styles['filter-checkbox']} htmlFor='materiales'>
							<input type='checkbox' id='materiales' onChange={handleChangeTipoFilter} />
							<span>Materiales</span>
						</label>
						<label className={styles['filter-checkbox']} htmlFor='herramientas'>
							<input type='checkbox' id='herramientas' onChange={handleChangeTipoFilter} />
							<span>Herramientas</span>
						</label>
						<label className={styles['filter-checkbox']} htmlFor='equipos'>
							<input type='checkbox' id='equipos' onChange={handleChangeTipoFilter} />
							<span>Equipos</span>
						</label>
					</div>

					<p className='h5 mt-3'>Estado del Producto</p>
					<div className='d-flex flex-wrap'>
						<label className={styles['filter-checkbox']} htmlFor='disponibles'>
							<input type='checkbox' id='disponibles' onChange={handleCangeEstadoFilter} />
							<span>Disponibles</span>
						</label>
						<label className={styles['filter-checkbox']} htmlFor='no_disponibles'>
							<input type='checkbox' id='no_disponibles' onChange={handleCangeEstadoFilter} />
							<span>No disponibles</span>
						</label>
						<label className={styles['filter-checkbox']} htmlFor='cantidad_alta'>
							<input type='checkbox' id='cantidad_alta' onChange={handleCangeEstadoFilter} />
							<span>Cantidad aceptable</span>
						</label>
						<label className={styles['filter-checkbox']} htmlFor='cantidad_baja'>
							<input type='checkbox' id='cantidad_baja' onChange={handleCangeEstadoFilter} />
							<span>Cantidad baja</span>
						</label>
					</div>
					<Button onClick={handleFilter} className={`float-end mt-3 ${styles['custom-button']}`}>
						Filtrar
					</Button>
				</Col>
				<Col xs={12} md={10}>
					<InventarioTable
						productos={productos}
						editandoCantidad={editandoCantidad}
						setEditandoCantidad={setEditandoCantidad}
						cantidadProducto={cantidadProducto}
						setCantidadProducto={setCantidadProducto}
						handleUpdateCantidad={handleUpdateCantidad}
						handleUpdateEstado={handleUpdateEstado}
						handleUpdateProductoButtonPressed={handleUpdateProductoButtonPressed}
						cantidadProductoAceptable={cantidadProductoAceptable}
					/>
				</Col>
			</Row>
		</Layout>
	);
}

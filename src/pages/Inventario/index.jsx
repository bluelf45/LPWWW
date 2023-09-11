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

	const [paginacionParams, setPaginacionParams] = useState({
		elementosPorPagina: 8,
		paginaActiva: 1,
	});

	const [productosPorPagina, setProductosPorPagina] = useState(
		productos.slice(
			paginacionParams.elementosPorPagina * (paginacionParams.paginaActiva - 1),
			paginacionParams.elementosPorPagina * paginacionParams.paginaActiva,
		),
	);

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

	const filterProductos = () => {
		const productosTipoFiltered = [];

		tipoProductoFilter.forEach((filtro) => {
			productosGuardados.forEach((producto) => {
				if (producto.categoria === filtro && !productosTipoFiltered.includes(producto))
					productosTipoFiltered.push(producto);
			});
		});

		const productosEstadoFiltered = {};

		estadoProductoFilter.forEach((filtro) => {
			productosGuardados.forEach((producto) => {
				let cumpleFiltro = false;
				let key;

				switch (filtro) {
					case 'disponible':
						if (producto.disponible) {
							key = 'disponible';
							cumpleFiltro = true;
						}
						break;
					case 'no_disponible':
						if (!producto.disponible) {
							key = 'disponible';
							cumpleFiltro = true;
						}
						break;
					case 'cantidad_alta':
						if (producto.cantidad >= cantidadProductoAceptable) {
							key = 'cantidad';
							cumpleFiltro = true;
						}
						break;
					case 'cantidad_baja':
						if (producto.cantidad < cantidadProductoAceptable) {
							key = 'cantidad';
							cumpleFiltro = true;
						}
						break;
				}

				if (cumpleFiltro) {
					if (productosEstadoFiltered[key] === undefined) productosEstadoFiltered[key] = [];

					if (!productosEstadoFiltered[key].includes(producto))
						productosEstadoFiltered[key].push(producto);
				}
			});
		});

		let productosFiltered = [];

		if (tipoProductoFilter.length > 0) {
			productosFiltered = productosTipoFiltered;
			if (estadoProductoFilter.length > 0) {
				for (const key in productosEstadoFiltered) {
					productosFiltered = productosFiltered.filter(
						(usuario) => productosEstadoFiltered[key].indexOf(usuario) !== -1,
					);
				}
			}
		} else if (estadoProductoFilter.length > 0) {
			for (const key in productosEstadoFiltered) {
				if (productosFiltered.length === 0) productosFiltered = productosEstadoFiltered[key];
				else {
					productosFiltered = productosFiltered.filter(
						(usuario) => productosEstadoFiltered[key].indexOf(usuario) !== -1,
					);
				}
			}
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

	const handleChangeEstadoFilter = (e) => {
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

	const handleFilter = (e) => {
		e.preventDefault();

		filterProductos();

		setPaginacionParams((prev) => ({ ...prev, paginaActiva: 1 }));
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
		setProductosPorPagina(
			productos.slice(
				paginacionParams.elementosPorPagina * (paginacionParams.paginaActiva - 1),
				paginacionParams.elementosPorPagina * paginacionParams.paginaActiva,
			),
		);
	}, [productos]);

	useEffect(() => {
		setProductosPorPagina(
			productos.slice(
				paginacionParams.elementosPorPagina * (paginacionParams.paginaActiva - 1),
				paginacionParams.elementosPorPagina * paginacionParams.paginaActiva,
			),
		);
	}, [paginacionParams.paginaActiva]);

	useEffect(() => {
		filterProductos();
	}, [productosGuardados]);

	useEffect(() => {
		filterProductos();
		setPaginacionParams((prev) => ({ ...prev, paginaActiva: 1 }));
	}, [searchQuery]);

	return (
		<Layout>
			<Row className='mt-3 m-auto justify-content-md-left'>
				<Col sm md>
					<h1 style={{ color: 'var(--alt-text-color)' }}>Inventario</h1>
				</Col>
				<Col sm md className='mt-2 d-flex justify-content-center'>
					<Form onSubmit={handleSearchBar}>
						<Form.Group
							controlId='formSearchBar'
							style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
						>
							<Form.Label visuallyHidden='true'>Barra de búsqueda</Form.Label>
							<Form.Control
								type='search'
								ref={searchRef}
								className={styles['text-form']}
								placeholder='Busque por nombre de producto'
							/>
						</Form.Group>
						<Button
							variant='light'
							type='submit'
							style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
						>
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
						className='float-sm-end'
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
					<div className='d-flex flex-md-column flex-sm-wrap flex-wrap'>
						<label
							className={`${
								tipoProductoFilter.includes('materiales')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='materiales'
						>
							<input type='checkbox' id='materiales' onChange={handleChangeTipoFilter} />
							<span>Materiales</span>
						</label>
						<label
							className={`${
								tipoProductoFilter.includes('herramientas')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='herramientas'
						>
							<input type='checkbox' id='herramientas' onChange={handleChangeTipoFilter} />
							<span>Herramientas</span>
						</label>
						<label
							className={`${
								tipoProductoFilter.includes('equipos')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='equipos'
						>
							<input type='checkbox' id='equipos' onChange={handleChangeTipoFilter} />
							<span>Equipos</span>
						</label>
					</div>

					<p className='h5 mt-3'>Estado del Producto</p>
					<div className='d-flex flex-md-column flex-sm-wrap flex-wrap'>
						<label
							className={`${
								estadoProductoFilter.includes('disponible')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='disponible'
						>
							<input type='checkbox' id='disponible' onChange={handleChangeEstadoFilter} />
							<span>Disponible</span>
						</label>
						<label
							className={`${
								estadoProductoFilter.includes('no_disponible')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='no_disponible'
						>
							<input type='checkbox' id='no_disponible' onChange={handleChangeEstadoFilter} />
							<span>No disponible</span>
						</label>
						<label
							className={`${
								estadoProductoFilter.includes('cantidad_alta')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='cantidad_alta'
						>
							<input type='checkbox' id='cantidad_alta' onChange={handleChangeEstadoFilter} />
							<span>Cantidad aceptable</span>
						</label>
						<label
							className={`${
								estadoProductoFilter.includes('cantidad_baja')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='cantidad_baja'
						>
							<input type='checkbox' id='cantidad_baja' onChange={handleChangeEstadoFilter} />
							<span>Cantidad baja</span>
						</label>
					</div>
					<Button onClick={handleFilter} className={`float-end mt-3 btn-primary`}>
						Filtrar
					</Button>
				</Col>
				<Col xs={12} md={10}>
					<InventarioTable
						productos={productos}
						productosPorPagina={productosPorPagina}
						paginacionParams={paginacionParams}
						setPaginacionParams={setPaginacionParams}
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

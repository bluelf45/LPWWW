import { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import InventarioTable from './InventarioTable';
import AddProducto from './AddProducto';
import { useQuery, useMutation } from '@apollo/client';
import { UPD_PRODUCTO, GET_PRODUCTOS } from './DocumentNodes';

export default function Inventario() {
	const [tipoProductoFilter, setTipoProductoFilter] = useState([]);
	const [estadoProductoFilter, setEstadoProductoFilter] = useState([]);
	const [cantidadProductoFilter, setCantidadProductoFilter] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [productos, setProductos] = useState([]);

	const [paginacionParams, setPaginacionParams] = useState({
		elementosPorPagina: 8,
		paginaActiva: 1,
	});

	const [editandoProducto, setEditandoProducto] = useState(false);
	const [cantidadProducto, setCantidadProducto] = useState();
	const [editandoCantidad, setEditandoCantidad] = useState(false);
	const [productoEditar, setProductoEditar] = useState({});
	const [showProductoModal, setShowProductoModal] = useState(false);
	const [cantidadTotal, setCantidadTotal] = useState(0);

	const searchRef = useRef();

	const cantidadProductoAceptable = 3;

	// eslint-disable-next-line no-unused-vars
	const [updP, { dataUpdP, loadingUpdP, errorUpdP }] = useMutation(UPD_PRODUCTO, {
		refetchQueries: [GET_PRODUCTOS, 'getInventario'],
	});
	// se filtran los datos cada vez que se cambia una de las variables del useQuery, pero ojo que para esto usa los datos almacenados en cache
	// para actualizar los datos de forma manual usar la funcion refetch
	const { loading, error, data, refetch } = useQuery(GET_PRODUCTOS, {
		variables: {
			page: paginacionParams.paginaActiva,
			limit: paginacionParams.elementosPorPagina,
			search: '',
			tipoFilter: [],
			estadoFilter: [],
			cantidadFilter: [],
		},
	});

	useEffect(() => {
		if (!loading && !error) {
			setProductos(data.getInventario.productos);
			setCantidadTotal(data.getInventario.totalProductos);
		}
	}, [data]);

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

	const handleChangeCantidadFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setCantidadProductoFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setCantidadProductoFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const handleFilter = (e) => {
		e.preventDefault();

		setPaginacionParams((prev) => ({ ...prev, paginaActiva: 1 }));

		refetch({
			page: paginacionParams.paginaActiva,
			limit: paginacionParams.elementosPorPagina,
			search: searchQuery,
			tipoFilter: tipoProductoFilter,
			estadoFilter: estadoProductoFilter,
			cantidadFilter: cantidadProductoFilter,
		});
	};

	const handleSearchBar = (e) => {
		e.preventDefault();

		setPaginacionParams((prev) => ({ ...prev, paginaActiva: 1 }));
		setSearchQuery(searchRef.current.value);

		refetch({
			page: paginacionParams.paginaActiva,
			limit: paginacionParams.elementosPorPagina,
			search: searchRef.current.value,
			tipoFilter: tipoProductoFilter,
			estadoFilter: estadoProductoFilter,
			cantidadFilter: cantidadProductoFilter,
		});
	};

	const handleUpdateEstado = (e, producto) => {
		e.preventDefault();

		updP({
			variables: {
				id: producto.id,
				disponibilidad: !producto.disponibilidad,
			},
		});
	};

	const handleUpdateCantidad = (e, producto) => {
		e.preventDefault();

		updP({
			variables: {
				id: producto.id,
				cantidad: parseInt(cantidadProducto),
			},
		});

		setEditandoCantidad(false);
	};

	const handleUpdateProductoButtonPressed = (e, producto) => {
		e.preventDefault();

		setShowProductoModal(true);
		setEditandoProducto(true);
		setProductoEditar({
			id: producto.id,
			nombre: producto.nombre,
			detalle: producto.detalle,
			categoria: producto.categoria,
			cantidad: producto.cantidad,
			disponibilidad: producto.disponibilidad,
		});
	};

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
			<AddProducto
				showProductoModal={showProductoModal}
				setShowProductoModal={setShowProductoModal}
				editandoProducto={editandoProducto}
				productoEditar={productoEditar}
				refetch={refetch}
			/>
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
								cantidadProductoFilter.includes('cantidad_alta')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='cantidad_alta'
						>
							<input type='checkbox' id='cantidad_alta' onChange={handleChangeCantidadFilter} />
							<span>Cantidad aceptable</span>
						</label>
						<label
							className={`${
								cantidadProductoFilter.includes('cantidad_baja')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='cantidad_baja'
						>
							<input type='checkbox' id='cantidad_baja' onChange={handleChangeCantidadFilter} />
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
						cantidadTotal={cantidadTotal}
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

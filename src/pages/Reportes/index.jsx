import { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import InventarioTable from './InventarioTable';
import ReportTableStock from './ReportTableStock';

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

	const [selectedOption, setSelectedOption] = useState('');

	const searchRef = useRef();

	const cantidadProductoAceptable = 3;

	const handleChangeTipoFilter = (e) => {
		setSelectedOption(e.target.value);
		console.log(e.target.value);
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

	useEffect(() => {
		filterProductos();
	}, [productosGuardados, searchQuery]);

	return (
		<Layout>
			<Row className='mt-3 m-auto justify-content-md-left'>
				<Col sm md>
					<h1 style={{ color: 'var(--alt-text-color)' }}>Reportes</h1>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={2} className={styles['filter-selection']}>
					<p className='h5'>Escoger reporte</p>
					<div className='d-flex flex-wrap'>
						<label
							className={`report-checkbox ${
								selectedOption === 'stock'
									? styles['report-checkbox-checked']
									: styles['report-checkbox']
							}`}
							htmlFor='stock'
						>
							<input
								type='radio'
								id='stock'
								name='tipoProducto'
								value='stock'
								checked={selectedOption === 'stock'}
								onChange={handleChangeTipoFilter}
							/>
							<span>Stock disponible</span>
						</label>
						<label
							className={`report-checkbox ${
								selectedOption === 'solicitados'
									? styles['report-checkbox-checked']
									: styles['report-checkbox']
							}`}
							htmlFor='solicitados'
						>
							<input
								type='radio'
								id='solicitados'
								name='tipoProducto'
								value='solicitados'
								checked={selectedOption === 'solicitados'}
								onChange={handleChangeTipoFilter}
							/>
							<span>Mas solicitados</span>
						</label>
						<label
							className={`report-checkbox ${
								selectedOption === 'devoluciones'
									? styles['report-checkbox-checked']
									: styles['report-checkbox']
							}`}
							htmlFor='devoluciones'
						>
							<input
								type='radio'
								id='devoluciones'
								name='tipoProducto'
								value='devoluciones'
								checked={selectedOption === 'devoluciones'}
								onChange={handleChangeTipoFilter}
							/>
							<span>Devoluciones atrasadas</span>
						</label>
						<label
							className={`report-checkbox ${
								selectedOption === 'perdidos'
									? styles['report-checkbox-checked']
									: styles['report-checkbox']
							}`}
							htmlFor='perdidos'
						>
							<input
								type='radio'
								id='perdidos'
								name='tipoProducto'
								value='perdidos'
								checked={selectedOption === 'perdidos'}
								onChange={handleChangeTipoFilter}
							/>
							<span>Objetos mas perdidos</span>
						</label>
					</div>
					<Button onClick={handleFilter} className={`float-end mt-3 ${styles['custom-button']}`}>
						Filtrar
					</Button>
				</Col>
				<Col xs={12} md={10}>
					{(() => {
						switch (selectedOption) {
							case 'stock':
								return <ReportTableStock productos={productos} />;
							case 'solicitados':
								return <p>Reporte de mas solicitados</p>;
							case 'devoluciones':
								return <p>Reporte de devoluciones atrasadas</p>;
							case 'perdidos':
								return <p>Reporte de objetos mas perdidos</p>;
							default:
								return <p>Seleccione un reporte</p>;
						}
					})()}
				</Col>
			</Row>
		</Layout>
	);
}

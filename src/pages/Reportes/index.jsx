import { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import ReportTableStock from './ReportTableStock';
import ReportTableSolicitados from './ReportTableSolicitados';

export default function Inventario() {
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

	const [productosSolicitados, setProductosSolicitados] = useState([
		{
			idSolicitud: 1000,
			id: 1,
			disponible: true,
			categoria: 'materiales',
			nombre: 'Plumones de pizarra',
			detalle: 'Plumon de pizarra color rojo',
			cantidad: 1,
			nombrePersona: 'Juan Perez',
			fechaSolicitud: '2021-06-01',
		},
		{
			idSolicitud: 1001,
			id: 2,
			disponible: true,
			categoria: 'herramientas',
			nombre: 'Llaves Allen',
			detalle: 'Set de llaves allen de distintos tamaños',
			cantidad: 4,
			nombrePersona: 'Maria Gonzalez',
			fechaSolicitud: '2021-06-01',
		},
		{
			idSolicitud: 1002,
			id: 3,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 2,
			nombrePersona: 'Robin Williams',
			fechaSolicitud: '2021-06-01',
		},
		{
			idSolicitud: 1003,
			id: 3,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 3,
			nombrePersona: 'Maria Gonzalez',
			fechaSolicitud: '2021-06-01',
		},
	]);

	const [productos, setProductos] = useState(productosGuardados);

	const [selectedOption, setSelectedOption] = useState('');

	const handleChangeTipoFilter = (e) => {
		setSelectedOption(e.target.value);
		console.log(e.target.value);
	};

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
				</Col>
				<Col xs={12} md={10}>
					{(() => {
						switch (selectedOption) {
							case 'stock':
								return <ReportTableStock productos={productos} />;
							case 'solicitados':
								return <ReportTableSolicitados solicitudes={productosSolicitados} />;
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

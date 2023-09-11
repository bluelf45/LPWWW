import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import ReportTableStock from './ReportTableStock';
import ReportTableSolicitados from './ReportTableSolicitados';
import ReportTableDevoluciones from './ReportTableDevoluciones';
import ReportTablePerdidos from './ReportTablePerdidos';

export default function Inventario() {
	const [productosGuardados] = useState([
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
		{
			id: 4,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
		},
		{
			id: 5,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
		},
		{
			id: 6,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
		},
		{
			id: 7,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
		},
		{
			id: 8,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
		},
	]);

	const [productosSolicitados] = useState([
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
			fechaEntrega: '2021-06-02',
			fechaEntregado: '2021-06-02',
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
			fechaEntrega: '2021-06-02',
			fechaEntregado: '2021-06-04',
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
			fechaEntrega: '2021-06-02',
			fechaEntregado: '2021-06-02',
		},
		{
			idSolicitud: 1003,
			id: 2,
			disponible: true,
			categoria: 'herramientas',
			nombre: 'Llaves Allen',
			detalle: 'Set de llaves allen de distintos tamaños',
			cantidad: 1,
			nombrePersona: 'Roberto Robert',
			fechaSolicitud: '2021-06-01',
			fechaEntrega: '2021-06-02',
			fechaEntregado: 'Perdido',
		},
	]);

	const [solicitados] = useState(() => {
		const idUsed = [];
		const final = [];
		productosSolicitados.forEach((element) => {
			if (!idUsed.includes(element.id)) {
				idUsed.push(element.id);
				final.push(element);
			} else {
				const index = idUsed.indexOf(element.id);
				final[index].cantidad += element.cantidad;
			}
		});
		return final;
	});

	const [devoluciones] = useState(() => {
		const final = [];
		productosSolicitados.forEach((element) => {
			if (element.fechaEntregado !== 'Perdido' && element.fechaEntregado > element.fechaEntrega) {
				final.push(element);
			}
		});
		return final;
	});

	const [perdidos] = useState(() => {
		const final = [];
		productosSolicitados.forEach((element) => {
			if (element.fechaEntregado === 'Perdido') {
				final.push(element);
			}
		});
		return final;
	});

	const [productos] = useState(productosGuardados);

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
					<div className='d-flex flex-md-column flex-sm-wrap flex-wrap'>
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
					<hr></hr>
					{selectedOption !== '' && (
						<label
							className={`report-button ${
								selectedOption === 'descargar'
									? styles['report-button-pressed']
									: styles['report-button']
							}`}
							htmlFor='descargar'
						>
							<input
								type='button'
								id='descargar'
								name='decargar'
								value='descargar'
								checked={selectedOption === 'descargar'}
							/>
							<span>Descargar Reporte</span>
						</label>
					)}
				</Col>
				<Col xs={12} md={10}>
					{(() => {
						switch (selectedOption) {
							case 'stock':
								return <ReportTableStock productos={productos} />;
							case 'solicitados':
								return <ReportTableSolicitados solicitudes={solicitados} />;
							case 'devoluciones':
								return <ReportTableDevoluciones productos={devoluciones} />;
							case 'perdidos':
								return <ReportTablePerdidos productos={perdidos} />;
							default:
								return <p>Seleccione un reporte</p>;
						}
					})()}
				</Col>
			</Row>
		</Layout>
	);
}

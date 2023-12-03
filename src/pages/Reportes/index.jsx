import { useState, useEffect, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import ReportTableStock from './ReportTableStock';
import ReportTableSolicitados from './ReportTableSolicitados';
import ReportTableDevoluciones from './ReportTableDevoluciones';
import ReportTablePerdidos from './ReportTablePerdidos';
import { GET_ALL_TICKETS } from './ReportQueries';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTOS } from '../Inventario/DocumentNodes';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function Inventario() {
	const [ticketsSolicitados, setTicketsSolicitados] = useState(null);

	const [sortOrder, setSortOrder] = useState('desc');
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const handleSortToggle = () => {
		const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		console.log(newSortOrder);
		setSortOrder(newSortOrder);
	};

	const handleChangeStartDate = (e) => {
		const selectedDate = new Date(e.target.value);
		const unixTime = selectedDate.getTime();
		console.log(unixTime);
		setStartDate(unixTime);
	};

	const handleChangeEndDate = (e) => {
		const selectedDate = new Date(e.target.value);
		const unixTime = selectedDate.getTime();
		console.log(unixTime);
		setEndDate(unixTime);
	};

	const { loading, error, data } = useQuery(GET_ALL_TICKETS, {
		variables: { page: 1, limit: 4 },
	});

	useEffect(() => {
		if (loading) return;

		if (error) {
			console.error(`Error! ${error.message}`);
			return;
		}
		console.log(data);
		setTicketsSolicitados(data?.getAllTickets || []);
	}, [loading, error, data]);

	const [productosGuardados, setProductosGuardados] = useState([]);

	const { loadingPro, errorPro, dataPro } = useQuery(GET_PRODUCTOS);

	useEffect(() => {
		if (loadingPro) return;

		if (errorPro) {
			console.error(`Error! ${error.message}`);
			return;
		}

		setProductosGuardados(dataPro?.getProductos || []);
	}, [loadingPro, errorPro, dataPro]);

	const [masSolicitados, setMasSolicitados] = useState([]);

	useMemo(() => {
		// Objetos mas solicitados (En funcion de la cantidad de tickets)
		if (!ticketsSolicitados || !Array.isArray(ticketsSolicitados)) {
			return [];
		}
		const idUsed = [];
		const final = [];
		let filteredTickets;

		if (startDate !== undefined && endDate !== undefined) {
			filteredTickets = [];
			ticketsSolicitados.forEach((element) => {
				console.log(element.fechaPrestamo);
				console.log(startDate, ' > ', element.fechaPrestamo, ' < ', endDate);
				if (element.fechaPrestamo >= startDate && element.fechaPrestamo <= endDate) {
					filteredTickets.push(element);
				}
			});
		} else {
			console.log('no hay fechas');
			filteredTickets = ticketsSolicitados;
		}

		console.log(filteredTickets);

		filteredTickets.forEach((element) => {
			if (!idUsed.includes(element.producto.id)) {
				const copiedObject = { ...element.producto, vecesPedido: 1 };
				idUsed.push(element.producto.id);
				final.push(copiedObject);
				console.log(copiedObject);
			} else {
				const index = idUsed.indexOf(element.producto.id);
				final[index].vecesPedido += 1;
			}
		});

		setMasSolicitados(final.sort((a, b) => (a.vecesPedido < b.vecesPedido ? 1 : -1)));
	}, [ticketsSolicitados, startDate, endDate]);

	const devoluciones = useMemo(() => {
		if (!ticketsSolicitados || !Array.isArray(ticketsSolicitados)) {
			return [];
		}
		const final = [];
		ticketsSolicitados.forEach((element) => {
			if (element.fechaEntregado !== 'Perdido' && element.fechaEntregado > element.fechaEntrega) {
				final.push(element);
			}
		});
		return final;
	});

	const perdidos = useMemo(() => {
		if (!ticketsSolicitados || !Array.isArray(ticketsSolicitados)) {
			return [];
		}
		const final = [];
		ticketsSolicitados.forEach((element) => {
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
					<div>
						Orden:
						<label
							className={`${
								sortOrder === 'asc' ? styles['report-checkbox-checked'] : styles['report-checkbox']
							}`}
							htmlFor='disponible'
						>
							<input type='checkbox' id='disponible' onChange={handleSortToggle} />
							<span>
								{sortOrder === 'asc' ? (
									<div style={{ marginRight: '1rem', marginLeft: '1rem' }}>
										Des.
										<FaArrowDown />
									</div>
								) : (
									<div style={{ marginRight: '1rem', marginLeft: '1rem' }}>
										Asc.
										<FaArrowUp />
									</div>
								)}
							</span>
						</label>
						Periodo:
						<input
							className={styles['calendar-container']}
							type='date'
							id='startDate'
							onChange={handleChangeStartDate}
							name='ReportStart'
						></input>
						-
						<input
							className={styles['calendar-container']}
							type='date'
							id='endDate'
							onChange={handleChangeEndDate}
							name='ReportEnd'
						></input>
					</div>
					{(() => {
						switch (selectedOption) {
							case 'stock':
								if (loading) return <p>Cargando...</p>;
								return <ReportTableStock productos={productos} />;
							case 'solicitados':
								if (!masSolicitados) return <p>Cargando...</p>;
								return <ReportTableSolicitados solicitudes={masSolicitados} sort={sortOrder} />;
							case 'devoluciones':
								if (!devoluciones) return <p>Cargando...</p>;
								return <ReportTableDevoluciones productos={devoluciones} />;
							case 'perdidos':
								if (!perdidos) return <p>Cargando...</p>;
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

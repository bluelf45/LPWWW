import { useState, useEffect, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import ReportTableTicketEspeciales from './ReportTableTicketEspeciales';
import ReportTableSolicitados from './ReportTableSolicitados';
import ReportTableDevoluciones from './ReportTableDevoluciones';
import ReportTableTickets from './ReportTablaTickets';
import { GET_ALL_TICKETS } from './ReportQueries';
import { useQuery } from '@apollo/client';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function Inventario() {
	const [ticketsSolicitados, setTicketsSolicitados] = useState(null);

	const [sortOrder, setSortOrder] = useState('desc');
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const handleSortToggle = () => {
		const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		setSortOrder(newSortOrder);
	};

	const handleChangeStartDate = (e) => {
		const selectedDate = new Date(e.target.value);
		const unixTime = selectedDate.getTime();
		setStartDate(unixTime);
	};

	const handleChangeEndDate = (e) => {
		const selectedDate = new Date(e.target.value);
		const unixTime = selectedDate.getTime();
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
		setTicketsSolicitados(data?.getAllTickets || []);
	}, [loading, error, data]);

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
				if (element.fechaPrestamo >= startDate && element.fechaPrestamo <= endDate) {
					filteredTickets.push(element);
				}
			});
		} else {
			filteredTickets = ticketsSolicitados;
		}

		filteredTickets.forEach((element) => {
			if (!idUsed.includes(element.producto.id)) {
				const copiedObject = { ...element.producto, vecesPedido: 1 };
				idUsed.push(element.producto.id);
				final.push(copiedObject);
			} else {
				const index = idUsed.indexOf(element.producto.id);
				final[index].vecesPedido += 1;
			}
		});

		setMasSolicitados(final.sort((a, b) => (a.vecesPedido < b.vecesPedido ? 1 : -1)));
	}, [ticketsSolicitados, startDate, endDate]);

	const [ticketEspecial, setTicketEspecial] = useState([]);

	useMemo(() => {
		// Todos los tickets especiales
		if (!ticketsSolicitados || !Array.isArray(ticketsSolicitados)) {
			return [];
		}
		const final = [];

		let filteredTickets;

		if (startDate !== undefined && endDate !== undefined) {
			filteredTickets = [];
			ticketsSolicitados.forEach((element) => {
				if (element.fechaPrestamo >= startDate && element.fechaPrestamo <= endDate) {
					filteredTickets.push(element);
				}
			});
		} else {
			filteredTickets = ticketsSolicitados;
		}

		filteredTickets.forEach((element) => {
			if (element.ticketEspecial !== null) {
				final.push(element);
			}
		});
		setTicketEspecial(final);
	}, [ticketsSolicitados, startDate, endDate]);

	useMemo(() => {
		// Todos los tickets especiales
		if (!ticketsSolicitados || !Array.isArray(ticketsSolicitados)) {
			return [];
		}
		const final = [];
		let filteredTickets;

		if (startDate !== undefined && endDate !== undefined) {
			filteredTickets = [];
			ticketsSolicitados.forEach((element) => {
				if (element.fechaPrestamo >= startDate && element.fechaPrestamo <= endDate) {
					filteredTickets.push(element);
				}
			});
		} else {
			filteredTickets = ticketsSolicitados;
		}

		filteredTickets.forEach((element) => {
			if (element.ticketEspecial !== null) {
				final.push(element);
			}
		});

		setTicketEspecial(final);
	}, [ticketsSolicitados, startDate, endDate]);

	const [atrasados, setAtrasados] = useState([]);

	useMemo(() => {
		if (!ticketsSolicitados || !Array.isArray(ticketsSolicitados)) {
			return [];
		}
		const final = [];
		ticketsSolicitados.forEach((element) => {
			if (element.estadoPrestamo === 'devuelto') {
				console.log('');
			} else if (element.ticketEspecial !== null) {
				if (new Date().getTime() > element.ticketEspecial.fechaTermino) {
					final.push(element);
				}
			} else {
				if (new Date().getTime() > element.fechaPrestamo) {
					final.push(element);
				}
			}
		});
		console.log(final);
		setAtrasados(final);
	}, [ticketsSolicitados, startDate, endDate]);

	const [tickets, setTickets] = useState([]);

	useMemo(() => {
		if (!ticketsSolicitados || !Array.isArray(ticketsSolicitados)) {
			return [];
		}

		const final = [];

		let filteredTickets;

		if (startDate !== undefined && endDate !== undefined) {
			filteredTickets = [];
			ticketsSolicitados.forEach((element) => {
				if (element.fechaPrestamo >= startDate && element.fechaPrestamo <= endDate) {
					filteredTickets.push(element);
				}
			});
		} else {
			filteredTickets = ticketsSolicitados;
		}
		ticketsSolicitados.forEach((element) => {
			final.push(element);
		});

		// Por alguna razon, no puedo reorganizar filteredTickets si hago una copia directa de el, por lo que loa añado
		// uno por uno y asi si funciona.
		setTickets(final);
	}, [ticketsSolicitados, startDate, endDate]);

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
								selectedOption === 'tickets'
									? styles['report-checkbox-checked']
									: styles['report-checkbox']
							}`}
							htmlFor='tickets'
						>
							<input
								type='radio'
								id='tickets'
								name='tipoProducto'
								value='tickets'
								checked={selectedOption === 'tickets'}
								onChange={handleChangeTipoFilter}
							/>
							<span>Tickets Generales</span>
						</label>
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
							<span>Tickets Especiales</span>
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
					</div>
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
							max={endDate || undefined}
							onChange={handleChangeStartDate}
							name='ReportStart'
						></input>
						-
						<input
							className={styles['calendar-container']}
							type='date'
							id='endDate'
							min={startDate || undefined}
							onChange={handleChangeEndDate}
							name='ReportEnd'
						></input>
					</div>
					{(() => {
						switch (selectedOption) {
							case 'stock':
								if (!ticketEspecial) return <p>Cargando...</p>;
								return <ReportTableTicketEspeciales productos={ticketEspecial} sort={sortOrder} />;
							case 'solicitados':
								if (!masSolicitados) return <p>Cargando...</p>;
								return <ReportTableSolicitados solicitudes={masSolicitados} sort={sortOrder} />;
							case 'devoluciones':
								if (!atrasados) return <p>Cargando...</p>;
								return <ReportTableDevoluciones productos={atrasados} sort={sortOrder} />;
							case 'tickets':
								if (!tickets) return <p>Cargando...</p>;
								return <ReportTableTickets productos={tickets} sort={sortOrder} />;
							default:
								return <p>Seleccione un reporte</p>;
						}
					})()}
				</Col>
			</Row>
		</Layout>
	);
}

import Layout from '@/components/Layout';
import styles from './index.module.css';
import { Col, Row, Button } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import PrestamosTabla from './PrestamosTabla';
import AddTicket from './AddTicket';
import { AuthContext } from '@/components/SessionContext';
import { useQuery } from '@apollo/client';
import { GET_TICKETS } from './DocumentNode';

export default function Perfil() {
	const { tipoUsuario, username } = useContext(AuthContext);
	const ViewDefiner = {
		panolero: 0,
		coordinador: 1,
		jefeCarrera: 2,
		alumno: 3,
		docente: 4,
	};

	const [ticketFilter, setTicketFilter] = useState([]);
	const [tickets, setTickets] = useState([]);

	const [paginacionParams, setPaginacionParams] = useState({
		elementosPorPagina: 8,
		paginaActiva: 1,
	});

	const [editandoTicket, setEditandoTicket] = useState(false);
	const [ticketEditar, setTicketEditar] = useState({});
	const [showTicketModal, setShowTicketModal] = useState(false);
	const [cantidadTotal, setCantidadTotal] = useState(0);

	const rutUsuario = ViewDefiner[tipoUsuario] < 3 ? '' : username;

	const { loading, error, data, refetch } = useQuery(GET_TICKETS, {
		variables: {
			page: paginacionParams.paginaActiva,
			limit: paginacionParams.elementosPorPagina,
			ticketFilter: [],
			rutUsuario,
		},
	});

	useEffect(() => {
		if (!loading && !error) {
			setTickets(data.getTickets.tickets);
			setCantidadTotal(data.getTickets.totalTickets);
		}
	}, [data]);

	const handleChangeFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setTicketFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setTicketFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const handleUpdateTicketButtonPressed = (e, ticket) => {
		e.preventDefault();

		let ticketEspecial = false;

		if (ticket.ticketEspecial !== null) {
			ticketEspecial = true;
		}

		setEditandoTicket(true);
		setTicketEditar({
			id: ticket.id,
			rut: [ticket.rut],
			producto: [{ id: ticket.producto.id, producto: ticket.producto.nombre }],
			estadoPrestamo: ticket.estadoPrestamo,
			estadoTicket: ticket.estadoTicket,
			ticketEspecial,
			fechaTermino: ticketEspecial ? new Date(ticket.ticketEspecial.fechaTermino) : '',
		});

		setShowTicketModal(true);
	};

	useEffect(() => {
		setPaginacionParams((prev) => ({ ...prev, paginaActiva: 1 }));

		refetch({
			page: paginacionParams.paginaActiva,
			limit: paginacionParams.elementosPorPagina,
			ticketFilter,
			rutUsuario,
		});
	}, [ticketFilter]);

	return (
		<Layout>
			<h1 style={{ color: 'var(--alt-text-color)' }}>Prestamos y Devoluciones</h1>

			<Row>
				<Col xs={12} md={2} className={styles['filter-selection']}>
					<div className='d-flex flex-column'>
						<p className='h5'>Filtros estado de prestamos</p>
						<label className={styles['filter-checkbox']} htmlFor='prestamo'>
							<input type='checkbox' id='prestamo' onChange={handleChangeFilter} />
							<span>Prestamos</span>
						</label>
						<label className={styles['filter-checkbox']} htmlFor='devolucion'>
							<input type='checkbox' id='devolucion' onChange={handleChangeFilter} />
							<span>Devoluciones</span>
						</label>
					</div>
					<Button
						onClick={() => {
							setShowTicketModal(true);
							setEditandoTicket(false);
						}}
						className={`btn-custom`}
					>
						Crear Solicitud
					</Button>
				</Col>
				<Col xs={12} md={10}>
					<PrestamosTabla
						tickets={tickets}
						cantidadTotal={cantidadTotal}
						paginacionParams={paginacionParams}
						setPaginacionParams={setPaginacionParams}
						handleUpdateTicketButtonPressed={handleUpdateTicketButtonPressed}
						usuarioElevado={ViewDefiner[tipoUsuario] < 3}
					/>
				</Col>
			</Row>
			<AddTicket
				showTicketModal={showTicketModal}
				setShowTicketModal={setShowTicketModal}
				editandoTicket={editandoTicket}
				ticketEditar={ticketEditar}
				refetch={refetch}
				usuarioElevado={ViewDefiner[tipoUsuario] < 3}
			/>
		</Layout>
	);
}

import { Col, Modal, Form, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
	ADD_TICKET,
	UPD_TICKET,
	GET_TICKETS,
	GET_ALL_USERS,
	GET_ALL_PRODUCTOS,
} from './DocumentNode';

const DateConverter = (date) => {
	const offset = date.getTimezoneOffset();
	date = new Date(date.getTime() + offset * 60 * 1000);
	return date.toISOString().split('T')[0];
};

export default function AddTicket({
	showTicketModal,
	setShowTicketModal,
	editandoTicket,
	ticketEditar,
	refetch,
	usuarioElevado,
}) {
	// eslint-disable-next-line no-unused-vars
	const [addT, { dataAddT, loadingAddT, errorAddT }] = useMutation(ADD_TICKET, {
		refetchQueries: [GET_TICKETS, 'getTickets'],
	});

	// eslint-disable-next-line no-unused-vars
	const [updT, { dataUpdT, loadingUpdT, errorUpdT }] = useMutation(UPD_TICKET, {
		refetchQueries: [GET_TICKETS, 'getTickets'],
	});

	const [usuarios, setUsuarios] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [getAllUsers, { loadingU, errorU, dataU }] = useLazyQuery(GET_ALL_USERS, {
		onCompleted: (data) => {
			setUsuarios(data.getAllUsers);
		},
	});

	const [productos, setProductos] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [getAllProductos, { loadingP, errorP, dataP }] = useLazyQuery(GET_ALL_PRODUCTOS, {
		onCompleted: (data) => {
			setProductos(data.getAllProductos);
		},
	});

	const [formState, setFormState] = useState({
		rut: '',
		producto: '',
		estadoPrestamo: 'esperando',
		estadoTicket: 'pendiente',
		ticketEspecial: false,
		fechaTermino: '',
	});

	const [idTicketEditar, setIdTicketEditar] = useState('');

	const cleanFormData = () => {
		setFormState({
			rut: '',
			producto: '',
			estadoPrestamo: 'esperando',
			estadoTicket: 'pendiente',
			ticketEspecial: false,
			fechaTermino: '',
		});
	};

	const handleAgregarTicket = (e) => {
		e.preventDefault();

		let variables = {
			rut: formState.rut,
			producto: formState.producto,
			estadoPrestamo: formState.estadoPrestamo,
			estadoTicket: formState.estadoTicket,
		};

		if (formState.ticketEspecial) {
			variables = { ...variables, fechaTermino: formState.fechaTermino };
		}

		addT({
			variables,
			onCompleted: () => {
				refetch();
			},
		});

		setShowTicketModal(false);
		cleanFormData();
	};

	const handleUpdateTicket = (e) => {
		e.preventDefault();

		let variables = {
			id: idTicketEditar,
			rut: formState.rut,
			producto: formState.producto,
			estadoPrestamo: formState.estadoPrestamo,
			estadoTicket: formState.estadoTicket,
		};

		if (formState.ticketEspecial) {
			variables = { ...variables, fechaTermino: formState.fechaTermino };
		}

		updT({
			variables,
			onCompleted: () => {
				refetch();
			},
		});

		setShowTicketModal(false);
		cleanFormData();
	};

	useEffect(() => {
		if (showTicketModal) {
			getAllUsers();
			getAllProductos();

			if (editandoTicket) {
				const { id, ...restTemp } = ticketEditar;

				let rest = restTemp;

				if (restTemp.fechaTermino !== '') {
					rest = { ...restTemp, fechaTermino: DateConverter(restTemp.fechaTermino) };
				}

				setFormState(rest);
				setIdTicketEditar(id);
			} else {
				cleanFormData();
			}
		}
	}, [showTicketModal]);

	return (
		<Modal
			show={showTicketModal}
			onHide={() => setShowTicketModal(false)}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter' style={{ color: 'var(--alt-text-color)' }}>
					Crear Solicitud
				</Modal.Title>
			</Modal.Header>
			<Form
				onSubmit={(e) => {
					if (editandoTicket) handleUpdateTicket(e);
					else handleAgregarTicket(e);
				}}
			>
				<Modal.Body>
					<Row>
						{editandoTicket && (
							<>
								<Col>
									<Form.Group className='mb-3' controlId='formUsuario'>
										<Form.Label>Rut Usuario</Form.Label>
										<Form.Control
											disabled
											readOnly
											as='select'
											value={formState.rut}
											className={styles['form-categoria-dropdown']}
											onChange={(e) => setFormState({ ...formState, rut: e.target.value })}
										>
											<option value=''>Seleccionar Rut Usuario</option>
											{usuarios.map((usuario) => (
												<option key={usuario.id} value={usuario.rut}>
													{usuario.rut}
												</option>
											))}
										</Form.Control>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className='mb-3' controlId='formProducto'>
										<Form.Label>Producto</Form.Label>
										<Form.Control
											disabled
											readOnly
											as='select'
											value={formState.producto}
											className={styles['form-categoria-dropdown']}
											onChange={(e) => setFormState({ ...formState, producto: e.target.value })}
										>
											<option value=''>Seleccionar Producto</option>
											{productos.map((producto) => (
												<option key={producto.id} value={producto.id}>
													{producto.nombre}
												</option>
											))}
										</Form.Control>
									</Form.Group>
								</Col>
							</>
						)}
						{!editandoTicket && (
							<>
								<Col>
									<Form.Group className='mb-3' controlId='formUsuario'>
										<Form.Label>Rut Usuario</Form.Label>
										<Form.Control
											required
											as='select'
											value={formState.rut}
											className={styles['form-categoria-dropdown']}
											onChange={(e) => setFormState({ ...formState, rut: e.target.value })}
										>
											<option value=''>Seleccionar Rut Usuario</option>
											{usuarios.map((usuario) => (
												<option key={usuario.id} value={usuario.rut}>
													{usuario.rut}
												</option>
											))}
										</Form.Control>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className='mb-3' controlId='formProducto'>
										<Form.Label>Producto</Form.Label>
										<Form.Control
											required
											as='select'
											value={formState.producto}
											className={styles['form-categoria-dropdown']}
											onChange={(e) => setFormState({ ...formState, producto: e.target.value })}
										>
											<option value=''>Seleccionar Producto</option>
											{productos.map((producto) => (
												<option key={producto.id} value={producto.id}>
													{producto.nombre}
												</option>
											))}
										</Form.Control>
									</Form.Group>
								</Col>
							</>
						)}
					</Row>
					{usuarioElevado && (
						<Row>
							<Col>
								<Form.Group className='mb-3' controlId='formEstadoPrestamo'>
									<Form.Label>Estado del Prestamo</Form.Label>
									<Form.Control
										required
										as='select'
										value={formState.estadoPrestamo}
										className={styles['form-categoria-dropdown']}
										onChange={(e) => setFormState({ ...formState, estadoPrestamo: e.target.value })}
									>
										<option value='esperando'>Esperando entrega</option>
										<option value='entregado'>Entregado al usuario</option>
										<option value='devuelto'>Producto devuelto</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className='mb-3' controlId='formEstadoTicket'>
									<Form.Label>Estado de la solicitud</Form.Label>
									<Form.Control
										required
										as='select'
										value={formState.estadoTicket}
										className={styles['form-categoria-dropdown']}
										onChange={(e) => setFormState({ ...formState, estadoTicket: e.target.value })}
									>
										<option value='pendiente'>Por revisar</option>
										<option value='aceptado'>Aceptado</option>
										<option value='rechazado'>Rechazado</option>
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
					)}
					<Row>
						<Col>
							{editandoTicket && (
								<Form.Check
									type='switch'
									id='formTicketEspecial'
									label='¿Devolución en otro día?'
									checked={formState.ticketEspecial}
									onChange={() => {
										setFormState({ ...formState, ticketEspecial: !formState.ticketEspecial });
									}}
									disabled
								/>
							)}
							{!editandoTicket && (
								<Form.Check
									type='switch'
									id='formTicketEspecial'
									label='¿Devolución en otro día?'
									checked={formState.ticketEspecial}
									onChange={() => {
										setFormState({ ...formState, ticketEspecial: !formState.ticketEspecial });
									}}
								/>
							)}
						</Col>
						<Col>
							{formState.ticketEspecial && (
								<Form.Group controlId='formFechaTermino'>
									<Form.Label>Fecha de devolución</Form.Label>
									<Form.Control
										type='date'
										name='fechaTermino'
										placeholder='Fecha Término'
										value={formState.fechaTermino}
										onChange={(e) => setFormState({ ...formState, fechaTermino: e.target.value })}
										className={styles['form-categoria-dropdown']}
									/>
								</Form.Group>
							)}
						</Col>
					</Row>
					<div style={{ display: 'flex' }} className='mt-3'>
						<Button type='submit' className={styles['custom-button']}>
							{editandoTicket && 'Editar Solicitud'}
							{!editandoTicket && 'Crear Solicitud'}
						</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	);
}

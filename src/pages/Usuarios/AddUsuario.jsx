import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { validate, format } from 'rut.js';
import styles from './index.module.css';
import { useMutation } from '@apollo/client';
import { ADD_USUARIO, UPD_USUARIO, GET_USUARIOS } from './UsuariosNodes';

export default function AddUsuario({
	showUsuarioModal,
	setShowUsuarioModal,
	editandoUsuario,
	usuarioEditar,
	refetch,
}) {
	// eslint-disable-next-line no-unused-vars
	const [addU, { dataAddU, loadingAddU, errorAddU }] = useMutation(ADD_USUARIO, {
		refetchQueries: [GET_USUARIOS, 'getUsuarios'],
	});
	// eslint-disable-next-line no-unused-vars
	const [updU, { dataUpdU, loadingUpdU, errorUpdU }] = useMutation(UPD_USUARIO, {
		refetchQueries: [GET_USUARIOS, 'getUsuarios'],
	});

	const [formState, setFormState] = useState({
		tipoUsuario: '',
		rut: '',
		apellido1: '',
		apellido2: '',
		nombre: '',
		telefono: '',
		correo: '',
		carrera: '',
		disponibilidad: false,
		moroso: false,
		bloqueado: false,
	});
	const [rutUsuarioEditar, setRutUsuarioEditar] = useState('');

	const cleanFormData = () => {
		setFormState({
			tipoUsuario: '',
			rut: '',
			apellido1: '',
			apellido2: '',
			nombre: '',
			telefono: '',
			correo: '',
			carrera: '',
			disponibilidad: false,
			moroso: false,
			bloqueado: false,
		});
	};

	const handleCrearUsuario = (e) => {
		e.preventDefault();

		const carrera = formState.tipoUsuario === 'panolero' ? '' : formState.carrera;

		console.log(formState);

		addU({
			variables: {
				tipoUsuario: formState.tipoUsuario,
				rut: formState.rut,
				apellido1: formState.apellido1,
				apellido2: formState.apellido2,
				nombre: formState.nombre,
				telefono: formState.telefono,
				correo: formState.correo,
				carrera,
				disponibilidad: formState.disponibilidad,
				moroso: formState.moroso,
				bloqueado: formState.bloqueado,
				contrasena: `${formState.nombre.toLowerCase()}_${formState.apellido1.toLowerCase()}`,
			},
			onCompleted: () => {
				refetch();
			},
		});

		setShowUsuarioModal(false);
		cleanFormData();
	};

	const handleUpdateUsuario = (e) => {
		e.preventDefault();

		const carrera = formState.tipoUsuario === 'panolero' ? '' : formState.carrera;

		updU({
			variables: {
				id: rutUsuarioEditar,
				tipoUsuario: formState.tipoUsuario,
				rut: formState.rut,
				apellido1: formState.apellido1,
				apellido2: formState.apellido2,
				nombre: formState.nombre,
				telefono: formState.telefono,
				correo: formState.correo,
				carrera,
				disponibilidad: formState.disponibilidad,
				moroso: formState.moroso,
				bloqueado: formState.bloqueado,
			},
			onCompleted: () => {
				refetch();
			},
		});

		setShowUsuarioModal(false);
		cleanFormData();
	};

	useEffect(() => {
		if (editandoUsuario) {
			const { id, ...rest } = usuarioEditar;
			setFormState(rest);
			setRutUsuarioEditar(id);
		} else {
			cleanFormData();
		}
	}, [showUsuarioModal]);

	return (
		<Modal
			show={showUsuarioModal}
			onHide={() => setShowUsuarioModal(false)}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter' style={{ color: 'var(--alt-text-color)' }}>
					{editandoUsuario && 'Editar Usuario'}
					{!editandoUsuario && 'Crear Usuario'}
				</Modal.Title>
			</Modal.Header>

			<Form
				onSubmit={(e) => {
					if (editandoUsuario) handleUpdateUsuario(e);
					else handleCrearUsuario(e);
				}}
			>
				<Modal.Body>
					<Row>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formTipoUsuario'>
								<Form.Label>Tipo de Usuario</Form.Label>
								<Form.Control
									required
									as='select'
									className={styles['form-categoria-dropdown']}
									value={formState.tipoUsuario}
									onChange={(e) => setFormState({ ...formState, tipoUsuario: e.target.value })}
								>
									<option value=''>Seleccione una categoría</option>
									<option value='jefeCarrera'>Jefe de Carrera</option>
									<option value='coordinador'>Coordinador</option>
									<option value='panolero'>Pañolero</option>
									<option value='docente'>Docente</option>
									<option value='alumno'>Alumno</option>
								</Form.Control>
							</Form.Group>
						</Col>
						<Col sm md>
							{formState.tipoUsuario === 'alumno' && (
								<Col sm md>
									<Form.Group className='mb-3' controlId='formCarrera'>
										<Form.Label>Carrera</Form.Label>
										<Form.Control
											type='text'
											value={formState.carrera}
											onChange={(e) => setFormState({ ...formState, carrera: e.target.value })}
											placeholder='Carrera...'
											className={styles['text-form']}
											required
										/>
									</Form.Group>
								</Col>
							)}
							{formState.tipoUsuario !== '' &&
								formState.tipoUsuario !== 'alumno' &&
								formState.tipoUsuario !== 'panolero' && (
									<Col sm md>
										<Form.Group className='mb-3' controlId='formDepartamento'>
											<Form.Label>Departamento</Form.Label>
											<Form.Control
												type='text'
												value={formState.carrera}
												onChange={(e) => setFormState({ ...formState, carrera: e.target.value })}
												placeholder='Departamento...'
												className={styles['text-form']}
												required
											/>
										</Form.Group>
									</Col>
								)}
						</Col>
					</Row>
					<Row>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formRut'>
								<Form.Label>Rut</Form.Label>
								{editandoUsuario && (
									<Form.Control
										type='text'
										value={formState.rut}
										onChange={(e) => setFormState({ ...formState, rut: format(e.target.value) })}
										className={styles['text-form']}
										disabled
										readOnly
									/>
								)}
								{!editandoUsuario && (
									<>
										<Form.Control
											type='text'
											value={formState.rut}
											onChange={(e) => setFormState({ ...formState, rut: format(e.target.value) })}
											placeholder='12.345.678-9'
											className={styles['text-form']}
											isInvalid={!validate(formState.rut)}
											required
										/>
										<Form.Control.Feedback type='invalid'>
											Ingrese un Rut válido
										</Form.Control.Feedback>
									</>
								)}
							</Form.Group>
						</Col>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formNombre'>
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type='text'
									value={formState.nombre}
									onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
									placeholder='Nombre...'
									className={styles['text-form']}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formApellido1'>
								<Form.Label>Primer Apellido</Form.Label>
								<Form.Control
									type='text'
									value={formState.apellido1}
									onChange={(e) => setFormState({ ...formState, apellido1: e.target.value })}
									placeholder='Primer Apellido...'
									className={styles['text-form']}
									required
								/>
							</Form.Group>
						</Col>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formApellido2'>
								<Form.Label>Segundo Apellido</Form.Label>
								<Form.Control
									type='text'
									value={formState.apellido2}
									onChange={(e) => setFormState({ ...formState, apellido2: e.target.value })}
									placeholder='Primer Apellido...'
									className={styles['text-form']}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formCorreo'>
								<Form.Label>Correo</Form.Label>
								<Form.Control
									type='email'
									value={formState.correo}
									onChange={(e) => setFormState({ ...formState, correo: e.target.value })}
									placeholder='Correo...'
									className={styles['text-form']}
									required
								/>
							</Form.Group>
						</Col>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formTelefono'>
								<Form.Label>Teléfono</Form.Label>
								<Form.Control
									type='text'
									value={formState.telefono}
									onChange={(e) => setFormState({ ...formState, telefono: e.target.value })}
									placeholder='Teléfono...'
									className={styles['text-form']}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col sm md>
							<Form.Check
								type='switch'
								id='disponibilidad-usuario'
								label='¿Dar usuario de alta?'
								checked={formState.disponibilidad}
								onChange={() => {
									setFormState({ ...formState, disponibilidad: !formState.disponibilidad });
								}}
							></Form.Check>
						</Col>
						<Col sm md>
							{editandoUsuario && (
								<Form.Check
									type='switch'
									id='moroso-usuario'
									label='¿Otorgar estado de moroso?'
									checked={formState.moroso}
									onChange={() => {
										setFormState({ ...formState, moroso: !formState.moroso });
									}}
								></Form.Check>
							)}
							{!editandoUsuario && validate(formState.rut) && (
								<Button type='submit' className={styles['custom-button']}>
									Crear
								</Button>
							)}
							{!editandoUsuario && !validate(formState.rut) && (
								<Button type='submit' className={styles['custom-button']} disabled>
									Crear
								</Button>
							)}
						</Col>
					</Row>
					{editandoUsuario && (
						<Row>
							<Col sm md>
								<Form.Check
									type='switch'
									id='bloquear-usuario'
									label='¿Bloquear usuario?'
									checked={formState.bloqueado}
									onChange={() => {
										setFormState({ ...formState, bloqueado: !formState.bloqueado });
									}}
								></Form.Check>
							</Col>
							<Col sm md>
								<Button type='submit' className={styles['custom-button']}>
									Editar
								</Button>
							</Col>
						</Row>
					)}
				</Modal.Body>
			</Form>
		</Modal>
	);
}

import { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '@/components/SessionContext';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { validate, format } from 'rut.js';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import UsuariosTable from './UsuariosTable';

export default function Usuarios() {
	const [tipoUsuarioFilter, setTipoUsuarioFilter] = useState([]);
	const [estadoUsuarioFilter, setEstadoUsuarioFilter] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	const [usuariosGuardados, setUsuariosGuardados] = useState([
		{
			tipo: 'alumno',
			rut: '21.234.123-2',
			apellido1: 'González',
			apellido2: 'Gómez',
			nombre: 'María',
			carrera: 'Ingeniería Civil Informática',
			telefono: '+569 1234 1234',
			correo: 'maria.gonzalezz@usm.cl',
			disponible: true,
			moroso: true,
			bloqueado: false,
		},
		{
			tipo: 'coordinador',
			rut: '13.221.145-0',
			apellido1: 'Robert',
			apellido2: 'Robert',
			nombre: 'Roberto',
			telefono: '+569 5678 5678',
			departamento: 'Informática',
			correo: 'roberto.robert@usm.cl',
			disponible: true,
			moroso: false,
			bloqueado: false,
		},
		{
			tipo: 'panolero',
			rut: '19.221.145-0',
			apellido1: 'Pérez',
			apellido2: 'Jiménez',
			nombre: 'Juan',
			telefono: '+569 5678 5678',
			correo: 'juan.perez@usm.cl',
			disponible: true,
			moroso: false,
			bloqueado: true,
		},
		{
			tipo: 'jefeCarrera',
			rut: '12.123.123-2',
			apellido1: 'González',
			apellido2: 'González',
			nombre: 'Juan',
			telefono: '+569 5678 5678',
			departamento: 'Informática',
			correo: 'juan.gonzalez@usm.cl',
			disponible: true,
			moroso: false,
			bloqueado: false,
		},
		{
			tipo: 'docente',
			rut: '10.456.456-1',
			apellido1: 'Pérez',
			apellido2: 'González',
			nombre: 'Patricio',
			telefono: '+569 5678 5678',
			departamento: 'Informática',
			correo: 'patricio.perez@usm.cl',
			disponible: false,
			moroso: false,
			bloqueado: false,
		},
	]);
	const [usuarios, setUsuarios] = useState(usuariosGuardados);

	const [paginacionParams, setPaginacionParams] = useState({
		elementosPorPagina: 8,
		paginaActiva: 1,
	});

	const [usuariosPorPagina, setUsuariosPorPagina] = useState(
		usuarios.slice(
			paginacionParams.elementosPorPagina * (paginacionParams.paginaActiva - 1),
			paginacionParams.elementosPorPagina * paginacionParams.paginaActiva,
		),
	);

	const [editandoUsuario, setEditandoUsuario] = useState(false);
	const [rutUsuarioEditar, setRutUsuarioEditar] = useState();
	const [showUsuarioModal, setShowUsuarioModal] = useState(false);

	const [tipoUsuarioForm, setTipoUsuarioForm] = useState('');
	const [rutUsuarioForm, setRutUsuarioForm] = useState('');
	const [nombreUsuarioForm, setNombreUsuarioForm] = useState('');
	const [apellido1UsuarioForm, setApellido1UsuarioForm] = useState('');
	const [apellido2UsuarioForm, setApellido2UsuarioForm] = useState('');
	const [departamentoUsuarioForm, setDepartamentoUsuarioForm] = useState('');
	const [carreraUsuarioForm, setCarreraUsuarioForm] = useState('');
	const [telefonoUsuarioForm, setTelefonoUsuarioForm] = useState('');
	const [correoUsuarioForm, setCorreoUsuarioForm] = useState('');
	const [disponibleUsuarioForm, setDisponibleUsuarioForm] = useState(false);
	const [morosoUsuarioForm, setMorosoUsuarioForm] = useState(false);
	const [bloqueadoUsuarioForm, setBloqueadoUsuarioForm] = useState(false);

	const searchRef = useRef();

	const { tipoUsuario } = useContext(AuthContext);

	const filterUsuarios = () => {
		const usuariosTipoFiltered = [];

		tipoUsuarioFilter.forEach((filtro) => {
			usuariosGuardados.forEach((usuario) => {
				if (usuario.tipo === filtro && !usuariosTipoFiltered.includes(usuario))
					usuariosTipoFiltered.push(usuario);
			});
		});

		const usuariosEstadoFiltered = {};

		estadoUsuarioFilter.forEach((filtro) => {
			usuariosGuardados.forEach((usuario) => {
				let cumpleFiltro = false;
				let key;

				switch (filtro) {
					case 'disponible':
						if (usuario.disponible) {
							key = 'disponible';
							cumpleFiltro = true;
						}
						break;
					case 'no_disponible':
						if (!usuario.disponible) {
							key = 'disponible';
							cumpleFiltro = true;
						}
						break;
					case 'moroso':
						if (usuario.moroso) {
							key = 'moroso';
							cumpleFiltro = true;
						}
						break;
					case 'no_moroso':
						if (!usuario.moroso) {
							key = 'moroso';
							cumpleFiltro = true;
						}
						break;
					case 'bloqueado':
						if (usuario.bloqueado) {
							key = 'bloqueado';
							cumpleFiltro = true;
						}
						break;
					case 'no_bloqueado':
						if (!usuario.bloqueado) {
							key = 'bloqueado';
							cumpleFiltro = true;
						}
						break;
				}

				if (cumpleFiltro) {
					if (usuariosEstadoFiltered[key] === undefined) usuariosEstadoFiltered[key] = [];

					if (!usuariosEstadoFiltered[key].includes(usuario))
						usuariosEstadoFiltered[key].push(usuario);
				}
			});
		});

		let usuariosFiltered = [];

		if (tipoUsuarioFilter.length > 0) {
			usuariosFiltered = usuariosTipoFiltered;
			if (estadoUsuarioFilter.length > 0) {
				for (const key in usuariosEstadoFiltered) {
					usuariosFiltered = usuariosFiltered.filter(
						(usuario) => usuariosEstadoFiltered[key].indexOf(usuario) !== -1,
					);
				}
			}
		} else if (estadoUsuarioFilter.length > 0) {
			for (const key in usuariosEstadoFiltered) {
				if (usuariosFiltered.length === 0) usuariosFiltered = usuariosEstadoFiltered[key];
				else {
					usuariosFiltered = usuariosFiltered.filter(
						(usuario) => usuariosEstadoFiltered[key].indexOf(usuario) !== -1,
					);
				}
			}
		} else {
			usuariosFiltered = usuariosGuardados;
		}

		const searchQueryFormated = searchQuery
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
		if (searchQuery === '') setUsuarios(usuariosFiltered);
		else
			setUsuarios(
				usuariosFiltered.filter((usuario) => {
					let result =
						usuario.rut
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.includes(searchQueryFormated) ||
						usuario.apellido1
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.includes(searchQueryFormated) ||
						usuario.apellido2
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.includes(searchQueryFormated) ||
						usuario.nombre
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.includes(searchQueryFormated) ||
						usuario.correo
							.toLowerCase()
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.includes(searchQueryFormated);

					if (result) return result;

					if (usuario.tipo === 'alumno')
						result =
							result ||
							usuario.carrera
								.toLowerCase()
								.normalize('NFD')
								.replace(/[\u0300-\u036f]/g, '')
								.includes(searchQueryFormated);
					else if (usuario.tipo !== 'panolero')
						result =
							result ||
							usuario.departamento
								.toLowerCase()
								.normalize('NFD')
								.replace(/[\u0300-\u036f]/g, '')
								.includes(searchQueryFormated);

					return result;
				}),
			);
	};

	const cleanFormData = () => {
		setShowUsuarioModal(false);
		setTipoUsuarioForm('');
		setRutUsuarioForm('');
		setNombreUsuarioForm('');
		setApellido1UsuarioForm('');
		setApellido2UsuarioForm('');
		setDepartamentoUsuarioForm('');
		setCarreraUsuarioForm('');
		setTelefonoUsuarioForm('');
		setCorreoUsuarioForm('');
		setDisponibleUsuarioForm(false);
	};

	const handleCrearUsuario = (e) => {
		e.preventDefault();

		let nuevoUsuario = {
			tipo: tipoUsuarioForm,
			rut: rutUsuarioForm,
			apellido1: apellido1UsuarioForm,
			apellido2: apellido2UsuarioForm,
			nombre: nombreUsuarioForm,
			telefono: telefonoUsuarioForm,
			correo: correoUsuarioForm,
			disponible: disponibleUsuarioForm,
			moroso: false,
			bloqueado: false,
		};

		if (tipoUsuarioForm === 'alumno')
			nuevoUsuario = { ...nuevoUsuario, carrera: carreraUsuarioForm };
		else if (tipoUsuarioForm !== 'panolero')
			nuevoUsuario = { ...nuevoUsuario, departamento: departamentoUsuarioForm };

		setUsuariosGuardados((prev) => [...prev, nuevoUsuario]);
		cleanFormData();
	};

	const handleUpdateUsuario = (e, rutUsuario) => {
		e.preventDefault();

		let nuevoUsuario = {
			tipo: tipoUsuarioForm,
			rut: rutUsuarioForm,
			apellido1: apellido1UsuarioForm,
			apellido2: apellido2UsuarioForm,
			nombre: nombreUsuarioForm,
			telefono: telefonoUsuarioForm,
			correo: correoUsuarioForm,
			disponible: disponibleUsuarioForm,
			moroso: morosoUsuarioForm,
			bloqueado: bloqueadoUsuarioForm,
		};

		if (tipoUsuarioForm === 'alumno')
			nuevoUsuario = { ...nuevoUsuario, carrera: carreraUsuarioForm };
		else if (tipoUsuarioForm !== 'panolero')
			nuevoUsuario = { ...nuevoUsuario, departamento: departamentoUsuarioForm };

		const usuariosNuevos = usuariosGuardados.map((usuario) => {
			if (usuario.rut === rutUsuario) {
				return nuevoUsuario;
			} else {
				return usuario;
			}
		});

		setUsuariosGuardados(usuariosNuevos);
		cleanFormData();
	};

	const handleUpdateDisponibilidad = (e, rutUsuario) => {
		e.preventDefault();

		const usuariosNuevos = usuariosGuardados.map((usuario) => {
			if (usuario.rut === rutUsuario) return { ...usuario, disponible: !usuario.disponible };
			else return usuario;
		});

		setUsuariosGuardados(usuariosNuevos);
	};

	const handleUpdateMoroso = (e, rutUsuario) => {
		e.preventDefault();

		const usuariosNuevos = usuariosGuardados.map((usuario) => {
			if (usuario.rut === rutUsuario) return { ...usuario, moroso: !usuario.moroso };
			else return usuario;
		});

		setUsuariosGuardados(usuariosNuevos);
	};

	const handleUpdateBloqueado = (e, rutUsuario) => {
		e.preventDefault();

		const usuariosNuevos = usuariosGuardados.map((usuario) => {
			if (usuario.rut === rutUsuario) return { ...usuario, bloqueado: !usuario.bloqueado };
			else return usuario;
		});

		setUsuariosGuardados(usuariosNuevos);
	};

	const handleUpdateUsuarioButtonPressed = (e, usuario) => {
		e.preventDefault();

		setShowUsuarioModal(true);
		setEditandoUsuario(true);
		setRutUsuarioEditar(usuario.rut);
		setTipoUsuarioForm(usuario.tipo);
		setRutUsuarioForm(usuario.rut);
		setNombreUsuarioForm(usuario.nombre);
		setApellido1UsuarioForm(usuario.apellido1);
		setApellido2UsuarioForm(usuario.apellido2);
		setTelefonoUsuarioForm(usuario.telefono);
		setCorreoUsuarioForm(usuario.correo);
		setDisponibleUsuarioForm(usuario.disponible);
		setMorosoUsuarioForm(usuario.moroso);
		setBloqueadoUsuarioForm(usuario.bloqueado);

		if (usuario.tipo === 'alumno') {
			setCarreraUsuarioForm(usuario.carrera);
			setDepartamentoUsuarioForm('');
		} else if (usuario.tipo !== 'panolero') {
			setCarreraUsuarioForm('');
			setDepartamentoUsuarioForm(usuario.departamento);
		} else {
			setCarreraUsuarioForm('');
			setDepartamentoUsuarioForm('');
		}
	};

	const handleFilter = (e) => {
		e.preventDefault();

		filterUsuarios();

		setPaginacionParams((prev) => ({ ...prev, paginaActiva: 1 }));
	};

	const handleChangeTipoFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setTipoUsuarioFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setTipoUsuarioFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const handleChangeEstadoFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setEstadoUsuarioFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setEstadoUsuarioFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const handleSearchBar = (e) => {
		e.preventDefault();

		setSearchQuery(searchRef.current.value);
	};

	useEffect(() => {
		setUsuariosPorPagina(
			usuarios.slice(
				paginacionParams.elementosPorPagina * (paginacionParams.paginaActiva - 1),
				paginacionParams.elementosPorPagina * paginacionParams.paginaActiva,
			),
		);
	}, [usuarios, paginacionParams.paginaActiva]);

	useEffect(() => {
		filterUsuarios();
	}, [usuariosGuardados]);

	useEffect(() => {
		filterUsuarios();
		setPaginacionParams((prev) => ({ ...prev, paginaActiva: 1 }));
	}, [searchQuery]);

	return (
		<Layout>
			<Row className='mt-3 m-auto justify-content-md-left'>
				<Col sm md>
					<h1 style={{ color: 'var(--alt-text-color)' }}>Usuarios</h1>
				</Col>
				<Col sm md className='mt-2 d-flex justify-content-center'>
					<Form onSubmit={handleSearchBar}>
						<Form.Group
							controlId='formSearchBar'
							style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
						>
							<Form.Label visuallyHidden='true'>Barra de búsqueda</Form.Label>
							<Form.Control type='search' ref={searchRef} className={styles['text-form']} />
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
					{['jefeCarrera', 'coordinador'].includes(tipoUsuario) && (
						<a
							onClick={() => {
								if (editandoUsuario) cleanFormData();

								setShowUsuarioModal(true);
								setEditandoUsuario(false);
							}}
							style={{ cursor: 'pointer', textDecoration: 'none' }}
							className='float-sm-end'
						>
							<h5 style={{ color: 'var(--primary-color)' }}>+ Crear Usuario</h5>
						</a>
					)}
				</Col>
			</Row>

			<Modal
				show={showUsuarioModal}
				onHide={() => setShowUsuarioModal(false)}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title
						id='contained-modal-title-vcenter'
						style={{ color: 'var(--alt-text-color)' }}
					>
						{editandoUsuario && 'Editar Usuario'}
						{!editandoUsuario && 'Crear Usuario'}
					</Modal.Title>
				</Modal.Header>

				<Form
					onSubmit={(e) => {
						if (editandoUsuario) handleUpdateUsuario(e, rutUsuarioEditar);
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
										value={tipoUsuarioForm}
										onChange={(e) => setTipoUsuarioForm(e.target.value)}
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
								{tipoUsuarioForm === 'alumno' && (
									<Col sm md>
										<Form.Group className='mb-3' controlId='formCarrera'>
											<Form.Label>Carrera</Form.Label>
											<Form.Control
												type='text'
												value={carreraUsuarioForm}
												onChange={(e) => setCarreraUsuarioForm(e.target.value)}
												placeholder='Carrera...'
												className={styles['text-form']}
												required
											/>
										</Form.Group>
									</Col>
								)}
								{tipoUsuarioForm !== '' &&
									tipoUsuarioForm !== 'alumno' &&
									tipoUsuarioForm !== 'panolero' && (
										<Col sm md>
											<Form.Group className='mb-3' controlId='formDepartamento'>
												<Form.Label>Departamento</Form.Label>
												<Form.Control
													type='text'
													value={departamentoUsuarioForm}
													onChange={(e) => setDepartamentoUsuarioForm(e.target.value)}
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
											value={rutUsuarioForm}
											onChange={(e) => setRutUsuarioForm(e.target.value)}
											className={styles['text-form']}
											disabled
											readOnly
										/>
									)}
									{!editandoUsuario && (
										<>
											<Form.Control
												type='text'
												value={rutUsuarioForm}
												onChange={(e) => setRutUsuarioForm(format(e.target.value))}
												placeholder='12.345.678-9'
												className={styles['text-form']}
												isInvalid={!validate(rutUsuarioForm)}
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
										value={nombreUsuarioForm}
										onChange={(e) => setNombreUsuarioForm(e.target.value)}
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
										value={apellido1UsuarioForm}
										onChange={(e) => setApellido1UsuarioForm(e.target.value)}
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
										value={apellido2UsuarioForm}
										onChange={(e) => setApellido2UsuarioForm(e.target.value)}
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
										value={correoUsuarioForm}
										onChange={(e) => setCorreoUsuarioForm(e.target.value)}
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
										value={telefonoUsuarioForm}
										onChange={(e) => setTelefonoUsuarioForm(e.target.value)}
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
									checked={disponibleUsuarioForm}
									onChange={() => {
										setDisponibleUsuarioForm(!disponibleUsuarioForm);
									}}
								></Form.Check>
							</Col>
							<Col sm md>
								{editandoUsuario && (
									<Form.Check
										type='switch'
										id='moroso-usuario'
										label='¿Otorgar estado de moroso?'
										checked={morosoUsuarioForm}
										onChange={() => {
											setMorosoUsuarioForm(!morosoUsuarioForm);
										}}
									></Form.Check>
								)}
								{!editandoUsuario && validate(rutUsuarioForm) && (
									<Button type='submit' className={styles['custom-button']}>
										Crear
									</Button>
								)}
								{!editandoUsuario && !validate(rutUsuarioForm) && (
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
										checked={bloqueadoUsuarioForm}
										onChange={() => {
											setBloqueadoUsuarioForm(!bloqueadoUsuarioForm);
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

			<Row>
				<Col xs={12} md={2} className={styles['filter-selection']}>
					<p className='h5'>Tipo de Usuario</p>
					<div className='d-flex flex-md-column flex-sm-wrap flex-wrap'>
						<label
							className={`${
								tipoUsuarioFilter.includes('jefeCarrera')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='jefeCarrera'
						>
							<input type='checkbox' id='jefeCarrera' onChange={handleChangeTipoFilter} />
							<span>Jefe de Carrera</span>
						</label>
						<label
							className={`${
								tipoUsuarioFilter.includes('coordinador')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='coordinador'
						>
							<input type='checkbox' id='coordinador' onChange={handleChangeTipoFilter} />
							<span>Coordinador</span>
						</label>
						<label
							className={`${
								tipoUsuarioFilter.includes('panolero')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='panolero'
						>
							<input type='checkbox' id='panolero' onChange={handleChangeTipoFilter} />
							<span>Pañolero</span>
						</label>
						<label
							className={`${
								tipoUsuarioFilter.includes('docente')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='docente'
						>
							<input type='checkbox' id='docente' onChange={handleChangeTipoFilter} />
							<span>Docente</span>
						</label>
						<label
							className={`${
								tipoUsuarioFilter.includes('alumno')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='alumno'
						>
							<input type='checkbox' id='alumno' onChange={handleChangeTipoFilter} />
							<span>Alumno</span>
						</label>
					</div>
					<p className='h5'>Estado del Usuario</p>
					<div className='d-flex flex-md-column flex-wrap'>
						<label
							className={`${
								estadoUsuarioFilter.includes('disponible')
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
								estadoUsuarioFilter.includes('no_disponible')
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
								estadoUsuarioFilter.includes('moroso')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='moroso'
						>
							<input type='checkbox' id='moroso' onChange={handleChangeEstadoFilter} />
							<span>Moroso</span>
						</label>
						<label
							className={`${
								estadoUsuarioFilter.includes('no_moroso')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='no_moroso'
						>
							<input type='checkbox' id='no_moroso' onChange={handleChangeEstadoFilter} />
							<span>No moroso</span>
						</label>
						<label
							className={`${
								estadoUsuarioFilter.includes('bloqueado')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='bloqueado'
						>
							<input type='checkbox' id='bloqueado' onChange={handleChangeEstadoFilter} />
							<span>Bloqueado</span>
						</label>
						<label
							className={`${
								estadoUsuarioFilter.includes('no_bloqueado')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='no_bloqueado'
						>
							<input type='checkbox' id='no_bloqueado' onChange={handleChangeEstadoFilter} />
							<span>No bloqueado</span>
						</label>
					</div>
					<Button onClick={handleFilter} className={`float-end mt-3 btn-primary`}>
						Filtrar
					</Button>
				</Col>
				<Col xs={12} md={10}>
					<UsuariosTable
						tipoUsuario={tipoUsuario}
						usuarios={usuarios}
						usuariosPorPagina={usuariosPorPagina}
						paginacionParams={paginacionParams}
						setPaginacionParams={setPaginacionParams}
						handleUpdateDisponibilidad={handleUpdateDisponibilidad}
						handleUpdateMoroso={handleUpdateMoroso}
						handleUpdateBloqueado={handleUpdateBloqueado}
						handleUpdateUsuarioButtonPressed={handleUpdateUsuarioButtonPressed}
					/>
				</Col>
			</Row>
		</Layout>
	);
}

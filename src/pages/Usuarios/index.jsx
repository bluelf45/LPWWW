import { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '@/components/SessionContext';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import UsuariosTable from './UsuariosTable';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIOS, UPD_USUARIO } from './UsuariosNodes';
import AddUsuario from './AddUsuario';

export default function Usuarios() {
	const [tipoUsuarioFilter, setTipoUsuarioFilter] = useState([]);
	const [disponibilidadUsuarioFilter, setDisponibilidadUsuarioFilter] = useState([]);
	const [morosoUsuarioFilter, setMorosoUsuarioFilter] = useState([]);
	const [bloqueadoUsuarioFilter, setBloqueadoUsuarioFilter] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	const [usuarios, setUsuarios] = useState([]);

	const [paginacionParams, setPaginacionParams] = useState({
		elementosPorPagina: 8,
		paginaActiva: 1,
	});

	const [editandoUsuario, setEditandoUsuario] = useState(false);
	const [usuarioEditar, setUsuarioEditar] = useState({});
	const [showUsuarioModal, setShowUsuarioModal] = useState(false);

	const [cantidadTotal, setCantidadTotal] = useState(0);

	const searchRef = useRef();

	const { tipoUsuario } = useContext(AuthContext);

	// eslint-disable-next-line no-unused-vars
	const [updU, { dataUpdU, loadingUpdU, errorUpdU }] = useMutation(UPD_USUARIO, {
		refetchQueries: [GET_USUARIOS, 'getUsuarios'],
	});

	const { loading, error, data, refetch } = useQuery(GET_USUARIOS, {
		variables: {
			page: paginacionParams.paginaActiva,
			limit: paginacionParams.elementosPorPagina,
			search: '',
			tipoFilter: [],
			disponibilidadFilter: [],
			morosoFilter: [],
			bloqueadoFilter: [],
		},
	});

	useEffect(() => {
		if (!loading && !error) {
			setUsuarios(data.getUsuarios.usuarios);
			setCantidadTotal(data.getUsuarios.totalUsuarios);
		}
	}, [data]);

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

	const handleChangeDisponibilidadFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setDisponibilidadUsuarioFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setDisponibilidadUsuarioFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const handleChangeMorosoFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setMorosoUsuarioFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setMorosoUsuarioFilter((prev) => {
				return prev.filter((item) => {
					return id !== item;
				});
			});
		}
	};

	const handleChangeBloqueadoFilter = (e) => {
		const { id, checked } = e.target;

		if (checked) {
			setBloqueadoUsuarioFilter((prev) => {
				return [...prev, id];
			});
		} else {
			setBloqueadoUsuarioFilter((prev) => {
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
			tipoFilter: tipoUsuarioFilter,
			disponibilidadFilter: disponibilidadUsuarioFilter,
			morosoFilter: morosoUsuarioFilter,
			bloqueadoFilter: bloqueadoUsuarioFilter,
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
			tipoFilter: tipoUsuarioFilter,
			disponibilidadFilter: disponibilidadUsuarioFilter,
			morosoFilter: morosoUsuarioFilter,
			bloqueadoFilter: bloqueadoUsuarioFilter,
		});
	};

	const handleUpdateDisponibilidad = (e, rutUsuario) => {
		e.preventDefault();

		const usuariosNuevos = usuarios.map((usuario) => {
			if (usuario.rut === rutUsuario) return { ...usuario, disponible: !usuario.disponible };
			else return usuario;
		});

		setUsuarios(usuariosNuevos);
		updU({
			variables: {
				id: rutUsuario,
				input: {
					disponibilidad: !usuarios.find((usuario) => usuario.rut === rutUsuario).disponible,
				},
			},
		});
	};

	const handleUpdateMoroso = (e, rutUsuario) => {
		e.preventDefault();

		const usuariosNuevos = usuarios.map((usuario) => {
			if (usuario.rut === rutUsuario) return { ...usuario, moroso: !usuario.moroso };
			else return usuario;
		});

		setUsuarios(usuariosNuevos);

		updU({
			variables: {
				id: rutUsuario,
				input: {
					moroso: !usuarios.find((usuario) => usuario.rut === rutUsuario).moroso,
				},
			},
		});
	};

	const handleUpdateBloqueado = (e, rutUsuario) => {
		e.preventDefault();

		const usuariosNuevos = usuarios.map((usuario) => {
			if (usuario.rut === rutUsuario) return { ...usuario, bloqueado: !usuario.bloqueado };
			else return usuario;
		});

		setUsuarios(usuariosNuevos);

		updU({
			variables: {
				id: rutUsuario,
				input: {
					bloqueado: !usuarios.find((usuario) => usuario.rut === rutUsuario).bloqueado,
				},
			},
		});
	};

	const handleUpdateUsuarioButtonPressed = (e, usuario) => {
		e.preventDefault();

		setShowUsuarioModal(true);
		setEditandoUsuario(true);
		setUsuarioEditar({
			id: usuario.id,
			tipoUsuario: usuario.tipoUsuario,
			rut: usuario.rut,
			apellido1: usuario.apellido1,
			apellido2: usuario.apellido2,
			nombre: usuario.nombre,
			telefono: usuario.telefono,
			correo: usuario.correo,
			carrera: usuario.carrera,
			disponibilidad: usuario.disponibilidad,
			moroso: usuario.moroso,
			bloqueado: usuario.bloqueado,
		});
	};

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

			<AddUsuario
				showUsuarioModal={showUsuarioModal}
				setShowUsuarioModal={setShowUsuarioModal}
				editandoUsuario={editandoUsuario}
				usuarioEditar={usuarioEditar}
				refetch={refetch}
			/>

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
								disponibilidadUsuarioFilter.includes('disponible')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='disponible'
						>
							<input type='checkbox' id='disponible' onChange={handleChangeDisponibilidadFilter} />
							<span>Disponible</span>
						</label>
						<label
							className={`${
								disponibilidadUsuarioFilter.includes('no_disponible')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='no_disponible'
						>
							<input
								type='checkbox'
								id='no_disponible'
								onChange={handleChangeDisponibilidadFilter}
							/>
							<span>No disponible</span>
						</label>
						<label
							className={`${
								morosoUsuarioFilter.includes('moroso')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='moroso'
						>
							<input type='checkbox' id='moroso' onChange={handleChangeMorosoFilter} />
							<span>Moroso</span>
						</label>
						<label
							className={`${
								morosoUsuarioFilter.includes('no_moroso')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='no_moroso'
						>
							<input type='checkbox' id='no_moroso' onChange={handleChangeMorosoFilter} />
							<span>No moroso</span>
						</label>
						<label
							className={`${
								bloqueadoUsuarioFilter.includes('bloqueado')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='bloqueado'
						>
							<input type='checkbox' id='bloqueado' onChange={handleChangeBloqueadoFilter} />
							<span>Bloqueado</span>
						</label>
						<label
							className={`${
								bloqueadoUsuarioFilter.includes('no_bloqueado')
									? styles['filter-checkbox-checked']
									: styles['filter-checkbox']
							}`}
							htmlFor='no_bloqueado'
						>
							<input type='checkbox' id='no_bloqueado' onChange={handleChangeBloqueadoFilter} />
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
						cantidadTotal={cantidadTotal}
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

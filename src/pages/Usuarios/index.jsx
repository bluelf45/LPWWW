/* eslint-disable */
import { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '@/components/SessionContext';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';
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
	}, [usuarios]);

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
						<Form.Group controlId='formSearchBar' style={{ display: 'inline-block' }}>
							<Form.Label visuallyHidden='true'>Barra de búsqueda</Form.Label>
							<Form.Control type='search' ref={searchRef} className={styles['text-form']} />
						</Form.Group>
						<Button variant='light' type='submit' style={{ display: 'inline-block' }}>
							<FaMagnifyingGlass style={{ color: 'var(--alt-text-color)' }} />
						</Button>
					</Form>
				</Col>
				<Col className='mt-2'>
					<a
						onClick={() => {}}
						style={{ cursor: 'pointer', textDecoration: 'none' }}
						className='float-end'
					>
						<h5 style={{ color: 'var(--primary-color)' }}>+ Crear Usuario</h5>
					</a>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={2} className={styles['filter-selection']}>
					<p className='h5'>Tipo de Usuario</p>
					<div className='d-flex flex-md-column'>
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
					<div className='d-flex flex-md-column'>
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
					<UsuariosTable usuarios={usuariosPorPagina} />
				</Col>
			</Row>
		</Layout>
	);
}

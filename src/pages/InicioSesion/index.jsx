import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/components/SessionContext';
import styles from './index.module.css';
import { FaUser, FaLock, FaBookOpenReader } from 'react-icons/fa6';
import Footer from '@/components/Footer';

export default function InicioSesion() {
	const { setAuthenticated, setTipoUsuario } = useContext(AuthContext);
	const [usuario, setUsuario] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const usuariosGuardados = [
		{
			usuario: 'panolero',
			password: 'panolero',
			tipoUsuario: 'panolero',
		},
		{
			usuario: 'coordinador',
			password: 'coordinador',
			tipoUsuario: 'coordinador',
		},
		{
			usuario: 'jefeCarrera',
			password: 'jefeCarrera',
			tipoUsuario: 'jefeCarrera',
		},
		{
			usuario: 'alumno',
			password: 'alumno',
			tipoUsuario: 'alumno',
		},
		{
			usuario: 'docente',
			password: 'docente',
			tipoUsuario: 'docente',
		},
	];

	const handleLogin = (tipoUsuario) => {
		setAuthenticated(true);
		setTipoUsuario(tipoUsuario);
		router.push('/Home');
	};

	const verificar = (usuario, password) => {
		const obtenerUsuario = usuariosGuardados.find(
			(obj) => obj.usuario === usuario && obj.password === password,
		);
		if (obtenerUsuario !== undefined) {
			console.log(obtenerUsuario.tipoUsuario);
			handleLogin(obtenerUsuario.tipoUsuario);
		}
	};

	return (
		<div className={styles.page}>
			<FaBookOpenReader size='18rem' style={{ color: 'var(--alt-text-color)' }} />
			<div className={styles['main-container']}>
				<div className={styles.header}>
					<div className={styles.text}>Log In</div>
				</div>
				<div className={styles.inputs}>
					<div className={styles.input}>
						<FaUser size='2rem' style={{ color: 'var(--alt-text-color)', margin: '0rem 0.3rem' }} />
						<input
							value={usuario}
							type='text'
							placeholder='Nombre De Usuario'
							onChange={(e) => setUsuario(e.target.value)}
						></input>
					</div>
				</div>
				<div className={styles.inputs}>
					<div className={styles.input}>
						<FaLock size='2rem' style={{ color: 'var(--alt-text-color)', margin: '0rem 0.3rem' }} />
						<input
							value={password}
							type='password'
							placeholder='Contraseña'
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
				</div>
				<div className={styles['login-container']}>
					<div className={styles['custom-button']} onClick={() => verificar(usuario, password)}>
						Iniciar sesión
					</div>
				</div>
			</div>
			<Footer></Footer>
			{/*
			<Row>
				<Col>
					<Button className={styles['custom-button']} onClick={() => handleLogin('panolero')}>
						Pañolero
					</Button>
				</Col>
				<Col>
					<Button className={styles['custom-button']} onClick={() => handleLogin('coordinador')}>
						Coordinador
					</Button>
				</Col>
				<Col>
					<Button className={styles['custom-button']} onClick={() => handleLogin('jefeCarrera')}>
						Jefe de Carrera
					</Button>
				</Col>
				<Col>
					<Button className={styles['custom-button']} onClick={() => handleLogin('alumno')}>
						Alumno
					</Button>
				</Col>
				<Col>
					<Button className={styles['custom-button']} onClick={() => handleLogin('docente')}>
						Docente
					</Button>
				</Col>
			</Row> */}
		</div>
	);
}

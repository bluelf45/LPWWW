import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/components/SessionContext';
import Link from 'next/link';
import styles from './index.module.css';
import { FaUser, FaLock, FaBookOpenReader } from 'react-icons/fa6';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from './graphql';
import { validate, format } from 'rut.js';

export default function InicioSesion() {
	const { setAuthenticated, setTipoUsuario } = useContext(AuthContext);
	const [usuario, setUsuario] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const [rutError, setRutError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	// eslint-disable-next-line no-unused-vars
	const [loginU, { data }] = useLazyQuery(LOGIN_USER);

	const handleLogin = (tipoUsuario) => {
		if (tipoUsuario === 'error') {
			setPasswordError('Contraseña y/o RUT Incorrecto');
		} else {
			setAuthenticated(true);
			setTipoUsuario(tipoUsuario);
			router.push('/Home');
		}
	};

	const verificar = (RUT, password) => {
		if (validate(RUT) === false) {
			setRutError('El Rut indicado no existe');
		} else {
			loginU({
				variables: {
					rut: RUT,
					contrasena: password,
				},
				onCompleted: (data) => {
					handleLogin(data.loginUsuario.tipoUsuario);
				},
			});
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
							placeholder='RUT'
							onChange={(e) => setUsuario(format(e.target.value))}
						></input>
					</div>
					{rutError && <p className={styles['error-text']}>{rutError}</p>}
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
					{passwordError && <p className={styles['error-text']}>{passwordError}</p>}
				</div>
				<Link href='/Forget' className={styles['forgot-text']}>
					Cambiar tu Contraseña
				</Link>
				<div className={styles['login-container']}>
					<div className={styles['custom-button']} onClick={() => verificar(usuario, password)}>
						Iniciar sesión
					</div>
				</div>
			</div>
		</div>
	);
}

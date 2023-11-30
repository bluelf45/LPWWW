import Link from 'next/link';
import styles from './index.module.css';
import { FaUser, FaLock, FaBookOpenReader } from 'react-icons/fa6';
import { validate, format } from 'rut.js';
import { useState } from 'react';
import { UPD_PASS } from './graphql';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function Forget() {
	const [rut, setRut] = useState('');
	const [password, setPassword] = useState('');
	const [newPasword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errorPassword, setErrorPassword] = useState('');
	const [rutError, setRutError] = useState('');
	const [errorMatchPassword, setErrorMatchPassword] = useState('');
	const [check, setCheck] = useState(Boolean);

	// eslint-disable-next-line no-unused-vars
	const [updP, { data, loading, error }] = useMutation(UPD_PASS);
	const router = useRouter();

	function verificar(RUT, password, newPasword, confirmPassword) {
		setCheck(true);
		if (validate(RUT) === false) {
			setCheck(false);
			setRutError('El Rut indicado no existe');
		}
		if (newPasword !== confirmPassword) {
			setCheck(false);
			setErrorMatchPassword('Las contraseñas no coinciden');
		}
		console.log(check);
		if (check === true) {
			updP({
				variables: {
					rut: RUT,
					contrasena: password,
					nuevaContrasena: newPasword,
				},
				onCompleted: (data) => {
					if (data.updPass === null) {
						setErrorPassword('Contraseña incorrecta');
					} else {
						router.push('/InicioSesion');
					}
				},
			});
		}
	}

	return (
		<div className={styles.page}>
			<FaBookOpenReader size='18rem' style={{ color: 'var(--alt-text-color)' }} />
			<div className={styles['main-container']}>
				<div className={styles.header}>
					<div className={styles.text}>Cambiar Contraseña</div>
				</div>
				<div className={styles.inputs}>
					<div className={styles.input}>
						<FaUser size='2rem' style={{ color: 'var(--alt-text-color)', margin: '0rem 0.3rem' }} />
						<input
							value={rut}
							type='text'
							placeholder='RUT'
							onChange={(e) => setRut(format(e.target.value))}
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
							placeholder='Contraseña Actual'
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					{errorPassword && <p className={styles['error-text']}>{errorPassword}</p>}
				</div>
				<div className={styles.inputs}>
					<div className={styles.input}>
						<FaLock size='2rem' style={{ color: 'var(--alt-text-color)', margin: '0rem 0.3rem' }} />
						<input
							value={newPasword}
							type='password'
							placeholder='Nueva Contraseña'
							onChange={(e) => setNewPassword(e.target.value)}
						></input>
					</div>
				</div>
				<div className={styles.inputs}>
					<div className={styles.input}>
						<FaLock size='2rem' style={{ color: 'var(--alt-text-color)', margin: '0rem 0.3rem' }} />
						<input
							value={confirmPassword}
							type='password'
							placeholder='Confirmar Contraseña'
							onChange={(e) => setConfirmPassword(e.target.value)}
						></input>
					</div>
					{errorMatchPassword && <p className={styles['error-text']}>{errorMatchPassword}</p>}
				</div>
				<Link href='/InicioSesion' className={styles['forgot-text']}>
					Volver a Inicio Sesión
				</Link>
				<div className={styles['login-container']}>
					<div
						className={styles['custom-button']}
						onClick={() => verificar(rut, password, newPasword, confirmPassword)}
					>
						Cambiar Contraseña
					</div>
				</div>
			</div>
		</div>
	);
}

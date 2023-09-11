import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '@/components/SessionContext';
import Conditional from './conditional';

export default function Navbar() {
	const { setAuthenticated } = useContext(AuthContext);
	const router = useRouter();
	const { tipoUsuario } = useContext(AuthContext);
	const handleCerrarSesion = () => {
		setAuthenticated(false);
		router.push('/');
	};
	const ViewDefiner = {
		jefeCarrera: 0,
		coordinador: 1,
		panolero: 2,
		alumno: 3,
		docente: 4,
	};
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand' href='/Home'>
					Home
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#Navbar'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<form className='collapse navbar-collapse me-auto' id='Navbar'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<Conditional
							condition={ViewDefiner[tipoUsuario] < 3}
							children1={
								<li className='nav-item'>
									<Link className='nav-link' href='/Inventario'>
										Inventario
									</Link>
								</li>
							}
							children2={<></>}
						/>
						<li className='nav-item'>
							<Link className='nav-link' href='/Solicitudes'>
								Solicitudes
							</Link>
						</li>
						<Conditional
							condition={ViewDefiner[tipoUsuario] < 2}
							children1={
								<li>
									<Link className='nav-link' href='/Usuarios'>
										Usuarios
									</Link>
								</li>
							}
							children2={<></>}
						></Conditional>
						<Conditional
							condition={ViewDefiner[tipoUsuario] < 3}
							children1={
								<li>
									<Link className='nav-link' href='/Reportes'>
										Reportes
									</Link>
								</li>
							}
							children2={<></>}
						></Conditional>
						<li>
							<Link className='nav-link' href='/Prestamos'>
								Prestamos
							</Link>
						</li>
					</ul>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link className='nav-link' href='/Perfil'>
								Perfil
							</Link>
						</li>
						<li className='nav-item'>
							<a className='nav-link' style={{ cursor: 'pointer' }} onClick={handleCerrarSesion}>
								Cerrar Sesión
							</a>
						</li>
					</ul>
				</form>
			</div>
		</nav>
	);
}

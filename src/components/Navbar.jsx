import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='/'>
					Navbar
				</a>
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
						<li className='nav-item'>
							<Link className='nav-link' href='/Solicitudes'>
								Solicitudes
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' href='/Inventario'>
								Inventario
							</Link>
						</li>
						<li>
							<Link className='nav-link' href='/Usuarios'>
								Usuarios
							</Link>
						</li>
						<li>
							<Link className='nav-link' href='/Reportes'>
								Reportes
							</Link>
						</li>
					</ul>
					<Link className='nav-link ms-auto mb-2 mb-lg-0' href='/Perfil'>
						Perfil
					</Link>
				</form>
			</div>
		</nav>
	);
}

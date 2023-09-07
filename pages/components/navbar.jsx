import React from 'react'; // import react module
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';

const Navbar = () => {
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
							<Link className='nav-link' href='/solicitudes'>
								Solicitudes
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' href='/inventario'>
								Inventario
							</Link>
						</li>
						<li>
							<Link className='nav-link' href='/usuarios'>
								Usuarios
							</Link>
						</li>
						<li>
							<Link className='nav-link' href='/perfil'>
								Perfil
							</Link>
						</li>
					</ul>
				</form>
			</div>
		</nav>
	);
};
export default Navbar;

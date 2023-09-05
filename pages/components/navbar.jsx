import React from 'react'; // import react module
import 'bootstrap/dist/css/bootstrap.css';
const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='#'>
					Navbar
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<form className='me-auto'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<a className='nav-link active' aria-current='page' href='/'>
								Home
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='Solicitudes'>
								Solicitudes
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='#'>
								Pricing
							</a>
						</li>
						<li className='ms-auto'>
							<a className='nav-link d-flex' href='Perfil' tabIndex='-1' aria-disabled='true'>
								Perfil
							</a>
						</li>
					</ul>
				</form>
			</div>
		</nav>
	);
};
export default Navbar;

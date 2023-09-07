import 'bootstrap/dist/css/bootstrap.css';
import Layout from '@/components/Layout';

export default function Inventario() {
	return (
		<Layout>
			<div className='d-flex'>
				<h2>Inventario</h2>
				<div className='dropdown'>
					<button
						className='btn dropdown-toggle'
						type='button'
						id='dropdownMenuButton'
						data-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						Tipo de producto
					</button>
					<div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
						<a className='dropdown-item' href='#'>
							Materiales
						</a>
						<a className='dropdown-item' href='#'>
							Herramientas
						</a>
						<a className='dropdown-item' href='#'>
							Equipos
						</a>
					</div>
				</div>
			</div>
		</Layout>
	);
}

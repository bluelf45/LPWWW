import { Dropdown } from 'bootstrap';
import Layout from '@/components/Layout';

export default function Inventario() {
	return (
		<Layout>
			<div className='d-flex'>
				<h2>Inventario</h2>

				<Dropdown>
					<Dropdown.Toggle variant='success' id='dropdown-basic'>
						Tipo de Producto
					</Dropdown.Toggle>
				</Dropdown>
			</div>
		</Layout>
	);
}

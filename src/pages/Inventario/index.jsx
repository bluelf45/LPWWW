// import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Layout from '@/components/Layout';
import styles from './index.module.css';

export default function Inventario() {
	/* const [tipoProducto, setTipoProducto] = useState();

	const handleSelectTipoProducto = (e) => {
		console.log(e);
	}; */

	return (
		<Layout>
			<div className='d-flex'>
				<h2>Inventario</h2>

				<Dropdown>
					<Dropdown.Toggle
						variant='light'
						id='dropdown-basic'
						className={styles['dropdown-toggle']}
						// onSelect={handleSelectTipoProducto}
					>
						Tipo de Producto
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item className={styles['dropdown-options']} href='#/action-1'>
							Action
						</Dropdown.Item>
						<Dropdown.Item className={styles['dropdown-options']} href='#/action-2'>
							Another action
						</Dropdown.Item>
						<Dropdown.Item className={styles['dropdown-options']} href='#/action-3'>
							Something else
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</Layout>
	);
}

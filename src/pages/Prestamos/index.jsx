import Layout from '@/components/Layout';
import styles from './index.module.css';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import PrestamosTabla from './PrestamosTabla';

export default function Perfil() {
	const [productosGuardados] = useState([
		{
			id: 1,
			disponible: true,
			categoria: 'materiales',
			nombre: 'Plumones de pizarra',
			detalle: 'Plumon de pizarra color rojo',
			cantidad: 6,
			Estado: 'Devolucion',
			fechaPrestamo: '2023-3-01',
		},
		{
			id: 2,
			disponible: true,
			categoria: 'herramientas',
			nombre: 'Llaves Allen',
			detalle: 'Set de llaves allen de distintos tamaños',
			cantidad: 2,
			Estado: 'Devolucion',
			fechaPrestamo: '2023-5-01',
		},
		{
			id: 3,
			disponible: false,
			categoria: 'equipos',
			nombre: 'Notebook Samsung',
			detalle: 'Notebook Samsung con procesador i10 de 20va generación.',
			cantidad: 8,
			Estado: 'Prestamo',
			fechaPrestamo: '2023-10-01',
		},
	]);
	const [ProductosVisibles, setProductosVisibles] = useState([...productosGuardados]);
	useEffect(() => {
		setProductosVisibles([...productosGuardados]);
	}, [productosGuardados]);

	const HandleChanges = () => {
		const checkboxPrestamo = document.getElementById('Prestamo');
		const checkboxDevolucion = document.getElementById('Devolucion');

		if (checkboxPrestamo.checked && checkboxDevolucion.checked) {
			setProductosVisibles([...productosGuardados]);
		} else if (checkboxPrestamo.checked) {
			setProductosVisibles(productosGuardados.filter((producto) => producto.Estado === 'Prestamo'));
		} else if (checkboxDevolucion.checked) {
			setProductosVisibles(
				productosGuardados.filter((producto) => producto.Estado === 'Devolucion'),
			);
		} else {
			setProductosVisibles([]);
		}
	};

	useEffect(() => {}, [ProductosVisibles]);
	return (
		<Layout>
			<Col sm md>
				<h1 style={{ color: 'var(--alt-text-color)' }}>Prestamos y Devoluciones</h1>
			</Col>
			<Col sm md>
				<p className='h5'>Estado del prestamo</p>
				<label className={styles['filter-checkbox']} htmlFor='Prestamo'>
					<input type='checkbox' id='Prestamo' onChange={HandleChanges} />
					<span>Prestamos</span>
				</label>
				<label className={styles['filter-checkbox']} htmlFor='Devolucion'>
					<input type='checkbox' id='Devolucion' onChange={HandleChanges} />
					<span>Devoluciones</span>
				</label>
			</Col>
			<div className='row'>
				<PrestamosTabla productos={ProductosVisibles} />
			</div>
		</Layout>
	);
}

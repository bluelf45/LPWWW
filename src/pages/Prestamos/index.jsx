import Layout from '@/components/Layout';
import styles from './index.module.css';
import Col from 'react-bootstrap/Col';
import { useEffect, useState, useContext } from 'react';
import PrestamosTabla from './PrestamosTabla';
import PrestamosTablaAdmin from './PrestamosTablaAdmin';
import { AuthContext } from '@/components/SessionContext';
import Conditional from '@/components/conditional';

export default function Perfil() {
	const { tipoUsuario } = useContext(AuthContext);
	const ViewDefiner = {
		panolero: 0,
		coordinador: 1,
		jefeCarrera: 2,
		alumno: 3,
		docente: 4,
	};
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

	const HandleChanges = (e) => {
		const { id, checked } = e.target;
		let checkboxSecondary;
		if (id === 'Prestamo') {
			checkboxSecondary = document.getElementById('Devolucion');
		} else {
			checkboxSecondary = document.getElementById('Prestamo');
		}
		const temp = [];
		if (!checked) {
			setProductosVisibles([...productosGuardados]);
			return;
		}
		productosGuardados.forEach((producto) => {
			if (producto.Estado === id && checked) {
				temp.push(producto);
			}
			if (Boolean(checkboxSecondary.checked) && producto.Estado !== id) {
				temp.push(producto);
			}
		});
		setProductosVisibles([...temp]);
	};
	useEffect(() => {}, [ProductosVisibles]);
	return (
		<Layout>
			<h1 className='h1'>{tipoUsuario}</h1>
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
				<Conditional
					condition={ViewDefiner[tipoUsuario] > 2}
					children1={<PrestamosTabla productos={ProductosVisibles} />}
					children2={<PrestamosTablaAdmin productos={ProductosVisibles} />}
				/>
			</div>
		</Layout>
	);
}

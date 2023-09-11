import { Table } from 'react-bootstrap';
import { FaCheck, FaUser, FaBan, FaCaretDown } from 'react-icons/fa6';
import styles from './index.module.css';

export default function UsuariosTable({ usuarios }) {
	return (
		<Table responsive className={`mt-3 mx-auto ${styles['usuarios-table']}`}>
			<thead>
				<tr className={styles['table-head']}>
					<th>Tipo de Usuario</th>
					<th>RUT</th>
					<th>Nombre</th>
					<th>Apellidos</th>
					<th>Departamento / Carrera</th>
					<th>Teléfono</th>
					<th>Correo</th>
					<th>Disponible</th>
					<th>Moroso</th>
					<th>Bloqueado</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{usuarios &&
					usuarios.map((usuario) => (
						<tr key={usuario.id}>
							<td className='align-middle'>
								{(() => {
									switch (usuario.tipo) {
										case 'jefeCarrera':
											return 'Jefe de Carrera';
										case 'coordinador':
											return 'Coordinador';
										case 'docente':
											return 'Docente';
										case 'alumno':
											return 'Alumno';
										case 'panolero':
											return 'Pañolero';
									}
								})()}
							</td>
							<td className='align-middle'>{usuario.rut}</td>
							<td className='align-middle'>{usuario.nombre}</td>
							<td className='align-middle'>{`${usuario.apellido1} ${usuario.apellido2}`}</td>
							<td className='align-middle'>
								{(() => {
									switch (usuario.tipo) {
										case 'jefeCarrera':
										case 'coordinador':
										case 'docente':
											return usuario.departamento;
										case 'alumno':
											return usuario.carrera;
										case 'panolero':
											return '-';
									}
								})()}
							</td>
							<td className='align-middle'>{usuario.telefono}</td>
							<td className='align-middle'>{usuario.correo}</td>
							<td className='align-middle'>
								{usuario.disponible && <FaCheck style={{ color: 'green' }} />}
								{!usuario.disponible && <FaCheck style={{ color: 'gray' }} />}
							</td>
							<td className='align-middle'>
								{usuario.moroso && <FaUser style={{ color: 'red' }} />}
								{!usuario.moroso && <FaUser style={{ color: 'green' }} />}
							</td>
							<td className='align-middle'>
								{usuario.bloqueado && <FaBan style={{ color: 'red' }} />}
								{!usuario.bloqueado && <FaBan style={{ color: 'gray' }} />}
							</td>
							<td align='center' className='align-middle'>
								<FaCaretDown style={{ color: 'var(--alt-text-color)' }} />
							</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
}

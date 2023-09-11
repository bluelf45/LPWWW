import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaCheck, FaUser, FaBan, FaCaretDown } from 'react-icons/fa6';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import styles from './index.module.css';

export default function UsuariosTable({
	tipoUsuario,
	usuarios,
	usuariosPorPagina,
	paginacionParams,
	setPaginacionParams,
	handleUpdateDisponibilidad,
	handleUpdateMoroso,
	handleUpdateBloqueado,
	handleUpdateUsuarioButtonPressed,
}) {
	const [usuarioHoveringEditar, setUsuarioHoveringEditar] = useState('');

	return (
		<>
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
					{usuariosPorPagina &&
						usuariosPorPagina.map((usuario) => (
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
								<td align='center' className='align-middle'>
									{usuario.disponible && <FaCheck style={{ color: 'green' }} />}
									{!usuario.disponible && <FaCheck style={{ color: 'gray' }} />}
								</td>
								<td align='center' className='align-middle'>
									{usuario.moroso && <FaUser style={{ color: 'red' }} />}
									{!usuario.moroso && <FaUser style={{ color: 'green' }} />}
								</td>
								<td align='center' className='align-middle'>
									{usuario.bloqueado && <FaBan style={{ color: 'red' }} />}
									{!usuario.bloqueado && <FaBan style={{ color: 'gray' }} />}
								</td>
								<td
									align='center'
									className='align-middle'
									onMouseEnter={() => setUsuarioHoveringEditar(usuario.rut)}
									onMouseLeave={() => {
										setUsuarioHoveringEditar('');
									}}
								>
									{['jefeCarrera', 'coordinador', 'panolero'].includes(tipoUsuario) && (
										<>
											<FaCaretDown style={{ color: 'var(--alt-text-color)' }} />
											{usuarioHoveringEditar === usuario.rut && (
												<div className={styles['usuario-accion-opciones']}>
													{['jefeCarrera', 'coordinador'].includes(tipoUsuario) && (
														<>
															<a
																onClick={(e) => handleUpdateDisponibilidad(e, usuario.rut)}
																style={{ cursor: 'pointer' }}
															>
																Dar de
																{usuario.disponible && ' baja'}
																{!usuario.disponible && ' alta'}
															</a>
															<hr />
														</>
													)}
													<a
														onClick={(e) => handleUpdateMoroso(e, usuario.rut)}
														style={{ cursor: 'pointer' }}
													>
														{usuario.moroso && 'Remover '}
														{!usuario.moroso && 'Agregar '}
														estado de moroso
													</a>
													<hr />
													<a
														onClick={(e) => handleUpdateBloqueado(e, usuario.rut)}
														style={{ cursor: 'pointer' }}
													>
														{usuario.bloqueado && 'Desbloquear'}
														{!usuario.bloqueado && 'Bloquear'}
													</a>
													{['jefeCarrera', 'coordinador'].includes(tipoUsuario) && (
														<>
															<hr />
															<a
																onClick={(e) => {
																	handleUpdateUsuarioButtonPressed(e, usuario);
																}}
																style={{ cursor: 'pointer' }}
															>
																Editar Usuario
															</a>
														</>
													)}
												</div>
											)}
										</>
									)}
								</td>
							</tr>
						))}
				</tbody>
			</Table>

			<PaginationControl
				page={paginacionParams.paginaActiva}
				between={4}
				total={usuarios.length}
				limit={paginacionParams.elementosPorPagina}
				changePage={(page) => {
					setPaginacionParams((prev) => ({ ...prev, paginaActiva: page }));
				}}
				ellipsis={4}
			/>
		</>
	);
}

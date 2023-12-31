import { Table, Image, Modal } from 'react-bootstrap';
import styles from './index.module.css';
import { FaImage } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReportTableDevoluciones({ data, sort }) {
	const [productos, setProductos] = useState(data);
	const [page, SetPage] = useState(1);
	const [sortOrder, setSortOrder] = useState();
	const [showModalImage, setShowModalImage] = useState(false);
	const startIndex = (page - 1) * 5;
	const endIndex = startIndex + 5;
	const currentPageData = productos.slice(startIndex, endIndex);

	useEffect(() => {
		if (sort) {
			setSortOrder(sort);
		}
	});

	useEffect(() => {
		const sortedProductos = [...productos];
		if (sortOrder === 'asc') {
			sortedProductos.sort((a, b) => (a.fechaPrestamo > b.fechaPrestamo ? 1 : -1));
		} else {
			sortedProductos.sort((a, b) => (a.fechaPrestamo < b.fechaPrestamo ? 1 : -1));
		}
		setProductos(sortedProductos);
	}, [sortOrder]);

	return (
		<div>
			<Table hover responsive className={`mt-3 mx-auto ${styles['report-table-stock']}`}>
				<thead>
					<tr className={styles['table-head']}>
						<th />
						<th>Nombre</th>
						<th>Descripcion</th>
						<th style={{ textAlign: 'center' }}>Categoría</th>
						<th style={{ textAlign: 'center' }}>Estado</th>
						<th style={{ textAlign: 'center' }}>Rut</th>
						<th style={{ textAlign: 'center' }} align='center'>
							Fecha devolucion
						</th>
					</tr>
				</thead>
				<tbody>
					{currentPageData.map((producto) => (
						<tr key={producto.id}>
							<td align='center' className='align-middle'>
								{producto.producto.image === '' && (
									<FaImage size='2rem' style={{ color: 'var(--alt-text-color)' }} />
								)}
								{producto.producto.image !== '' && (
									<>
										<Image
											style={{ width: '2rem', cursor: 'pointer' }}
											src={producto.producto.image}
											onClick={() => setShowModalImage(true)}
											rounded
										/>

										<Modal
											show={showModalImage}
											onHide={() => setShowModalImage(false)}
											size='sm'
											aria-labelledby='contained-modal-title-vcenter'
											centered
										>
											<Modal.Header closeButton>{producto.producto.nombre}</Modal.Header>
											<Modal.Body className='text-center'>
												<Image src={producto.producto.image} fluid />
											</Modal.Body>
										</Modal>
									</>
								)}
							</td>
							<td className='align-middle'>{producto.producto.nombre}</td>
							<td className='align-middle'>{producto.producto.detalle}</td>
							<td style={{ textAlign: 'center' }} className='align-middle'>
								{producto.producto.categoria}
							</td>
							<td style={{ textAlign: 'center' }} className='align-middle'>
								{producto.estadoPrestamo}
							</td>
							<td style={{ textAlign: 'center' }} className='align-middle'>
								{producto.rut}
							</td>
							<td align='center' className='align-middle'>
								{producto.ticketEspecial != null
									? new Date(producto.ticketEspecial.fechaTermino).toLocaleString('en-US', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
									  })
									: new Date(producto.fechaPrestamo).toLocaleString('en-US', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
									  })}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<PaginationControl
				page={page}
				between={4}
				total={currentPageData.length}
				limit={5}
				changePage={(page) => {
					SetPage(page);
				}}
			/>
		</div>
	);
}

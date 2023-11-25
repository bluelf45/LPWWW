import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import styles from './index.module.css';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCTO, UPD_PRODUCTO, GET_PRODUCTOS } from './DocumentNodes';

export default function AddProducto({
	showProductoModal,
	setShowProductoModal,
	editandoProducto,
	productoEditar,
	refetch,
}) {
	// eslint-disable-next-line no-unused-vars
	const [addP, { dataAddP, loadingAddP, errorAddP }] = useMutation(ADD_PRODUCTO, {
		refetchQueries: [GET_PRODUCTOS, 'getInventario'],
	});
	// eslint-disable-next-line no-unused-vars
	const [updP, { dataUpdP, loadingUpdP, errorUpdP }] = useMutation(UPD_PRODUCTO, {
		refetchQueries: [GET_PRODUCTOS, 'getInventario'],
	});
	const [formState, setFormState] = useState({
		nombre: '',
		detalle: '',
		categoria: '',
		cantidad: 0,
		disponibilidad: false,
		image: null,
	});
	const [idProductoEditar, setIdProductoEditar] = useState('');

	const cleanFormData = () => {
		setFormState({
			nombre: '',
			detalle: '',
			categoria: '',
			cantidad: 0,
			disponibilidad: false,
			image: null,
		});
	};

	const getBase64 = (file) => {
		return new Promise((resolve) => {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = () => {
				resolve(reader.result);
			};
		});
	};

	const handleAgregarProducto = async (e) => {
		e.preventDefault();

		let imageBase64;

		if (formState.image === null) {
			imageBase64 = '';
		} else {
			imageBase64 = await getBase64(formState.image);
		}

		console.log('outside async', imageBase64);

		addP({
			variables: {
				nombre: formState.nombre,
				detalle: formState.detalle,
				categoria: formState.categoria,
				cantidad: formState.cantidad,
				disponibilidad: formState.disponibilidad,
				image: imageBase64,
			},
			onCompleted: () => {
				refetch();
			},
		});

		setShowProductoModal(false);
		cleanFormData();
	};

	const hadleUpdateProducto = async (e) => {
		e.preventDefault();

		let variables = {
			id: idProductoEditar,
			nombre: formState.nombre,
			detalle: formState.detalle,
			categoria: formState.categoria,
			cantidad: formState.cantidad,
			disponibilidad: formState.disponibilidad,
		};

		if (formState.image !== null) {
			const imageBase64 = await getBase64(formState.image);
			console.log(imageBase64);
			variables = { ...variables, image: imageBase64 };
		}

		updP({
			variables,
			onCompleted: () => {
				refetch();
			},
		});

		setShowProductoModal(false);
		cleanFormData();
	};

	useEffect(() => {
		if (editandoProducto) {
			const { id, ...rest } = productoEditar;
			setFormState({ ...rest, image: null });
			setIdProductoEditar(id);
		} else {
			cleanFormData();
		}
	}, [showProductoModal]);

	return (
		<Modal
			show={showProductoModal}
			onHide={() => setShowProductoModal(false)}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter' style={{ color: 'var(--alt-text-color)' }}>
					{editandoProducto && 'Editar Producto'}
					{!editandoProducto && 'Agregar Producto'}
				</Modal.Title>
			</Modal.Header>

			<Form
				onSubmit={(e) => {
					if (editandoProducto) hadleUpdateProducto(e);
					else handleAgregarProducto(e);
				}}
			>
				<Modal.Body>
					<Row>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formNombre'>
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type='text'
									value={formState.nombre}
									onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
									placeholder='Nombre...'
									className={styles['text-form']}
									required
								/>
							</Form.Group>
						</Col>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formDetalle'>
								<Form.Label>Detalle</Form.Label>
								<Form.Control
									type='text'
									value={formState.detalle}
									onChange={(e) => setFormState({ ...formState, detalle: e.target.value })}
									placeholder='Detalles...'
									className={styles['text-form']}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formCategoria'>
								<Form.Label>Categoría</Form.Label>
								<Form.Control
									required
									as='select'
									className={styles['form-categoria-dropdown']}
									value={formState.categoria}
									onChange={(e) => setFormState({ ...formState, categoria: e.target.value })}
								>
									<option value=''>Seleccione una categoría</option>
									<option value='materiales'>Material</option>
									<option value='herramientas'>Herramienta</option>
									<option value='equipos'>Equipo</option>
								</Form.Control>
							</Form.Group>
						</Col>
						<Col sm md>
							<Form.Group className='mb-3' controlId='formCantidad'>
								<Form.Label>Cantidad</Form.Label>
								<Form.Control
									type='number'
									min='0'
									value={formState.cantidad}
									onChange={(e) =>
										setFormState({ ...formState, cantidad: parseInt(e.target.value) })
									}
									className={styles['form-categoria-dropdown']}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Form.Group controlId='formImage'>
							<Form.Label>Imagen</Form.Label>
							<Form.Control
								type='file'
								onChange={(e) => setFormState({ ...formState, image: e.target.files[0] })}
								accept='.png,.jpg,.jpeg,.webp'
							/>
						</Form.Group>
					</Row>
					<br />
					<Row>
						<Col>
							<Form.Check
								type='switch'
								id='estado-producto'
								label='¿Dar producto de alta?'
								checked={formState.disponibilidad}
								onChange={() => {
									setFormState({ ...formState, disponibilidad: !formState.disponibilidad });
								}}
							></Form.Check>
						</Col>
						<Col>
							<Button type='submit' className={styles['custom-button']}>
								{editandoProducto && 'Editar'}
								{!editandoProducto && 'Agregar'}
							</Button>
						</Col>
					</Row>
				</Modal.Body>
			</Form>
		</Modal>
	);
}

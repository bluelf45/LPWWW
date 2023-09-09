import { Row, Col, Button } from 'react-bootstrap';
import styles from './index.module.css';

export default function InicioSesion() {
	return (
		<Row>
			<Col>
				<Button className={styles['custom-button']}>Pañolero</Button>
			</Col>
			<Col>
				<Button className={styles['custom-button']}>Coordinador</Button>
			</Col>
			<Col>
				<Button className={styles['custom-button']}>Jefe de Carrera</Button>
			</Col>
			<Col>
				<Button className={styles['custom-button']}>Alumno</Button>
			</Col>
			<Col>
				<Button className={styles['custom-button']}>Docente</Button>
			</Col>
		</Row>
	);
}

import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '@/components/SessionContext';
// import styles from './index.module.css';

export default function InicioSesion() {
	const { setAuthenticated, setTipoUsuario } = useContext(AuthContext);
	const router = useRouter();

	const handleLogin = (tipoUsuario) => {
		setAuthenticated(true);
		setTipoUsuario(tipoUsuario);
		router.push('/Home');
	};
	return (
		<Row>
			<Col>
				<Button className='btn-primary' onClick={() => handleLogin('panolero')}>
					Pañolero
				</Button>
			</Col>
			<Col>
				<Button className='btn-primary' onClick={() => handleLogin('coordinador')}>
					Coordinador
				</Button>
			</Col>
			<Col>
				<Button className='btn-primary' onClick={() => handleLogin('jefeCarrera')}>
					Jefe de Carrera
				</Button>
			</Col>
			<Col>
				<Button className='btn-primary' onClick={() => handleLogin('alumno')}>
					Alumno
				</Button>
			</Col>
			<Col>
				<Button className='btn-primary' onClick={() => handleLogin('docente')}>
					Docente
				</Button>
			</Col>
		</Row>
	);
}

import { createContext, useState } from 'react';

const initialValue = {
	authenticated: false,
	setAuthenticated: () => {},
	tipoUsuario: '',
	setTipoUsuario: () => {},
	username: '',
	setUsername: () => {},
};

const AuthContext = createContext(initialValue);

const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(initialValue.authenticated);
	const [tipoUsuario, setTipoUsuario] = useState(initialValue.tipoUsuario);
	const [username, setUsername] = useState(initialValue.username);

	return (
		<AuthContext.Provider
			value={{
				authenticated,
				setAuthenticated,
				tipoUsuario,
				setTipoUsuario,
				username,
				setUsername,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

import { createContext, useState } from 'react';

const initialValue = {
	authenticated: false,
	setAuthenticated: () => {},
	tipoUsuario: '',
	setTipoUsuario: () => {},
};

const AuthContext = createContext(initialValue);

const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(initialValue.authenticated);
	const [tipoUsuario, setTipoUsuario] = useState(initialValue.tipoUsuario);

	return (
		<AuthContext.Provider
			value={{
				authenticated,
				setAuthenticated,
				tipoUsuario,
				setTipoUsuario,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

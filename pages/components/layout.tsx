import React, { PropsWithChildren } from 'react';
import Navbar from './navbar';
import Footer from './footer';
const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Navbar />
			{children}
			<></>
			<Footer />
		</>
	);
};
export default Layout;

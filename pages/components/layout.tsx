import React, { PropsWithChildren } from 'react';
import Navbar from './navbar';
import Footer from './footer';
const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Navbar />
			{children}
			<div>
				<a>POR LA CRESTA MADRE</a>
			</div>
			<Footer />
		</>
	);
};
export default Layout;

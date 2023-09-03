import React from 'react';
import Link from 'next/link';
const Navbar = () => {
	return (
		<div className='navbar bg-base-100'>
			<div className='flex-none'>
				<Link href='/'>Home</Link>
				<Link href='/contact'>Contact</Link>
				<Link href='/about'>About</Link>
			</div>
		</div>
	);
};
export default Navbar;

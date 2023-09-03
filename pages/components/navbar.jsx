import React from 'react';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
	return (
		<div className='navbar '>
			<ul className={styles.ul}>
				<li className={styles.li}>
					<a className='active' href='#home'>
						Home
					</a>
				</li>
				<li className={styles.li}>
					<a href='#news'>News</a>
				</li>
				<li className={styles.li}>
					<a href='#contact'>Contact</a>
				</li>
				<li className={styles.li}>
					<a href='#about'>About</a>
				</li>
			</ul>
		</div>
	);
};
export default Navbar;

import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
	const { currentUser } = props
	return (
			<Nav>
				<NavItem><NavLink tag={RouterNavLink} to="/">Home</NavLink></NavItem>
				{currentUser && <NavItem><NavLink tag={RouterNavLink} to="/profile">My Profile</NavLink></NavItem>}
				{currentUser && <NavItem><NavLink tag={RouterNavLink} to="/questions">Questions</NavLink></NavItem>}
				{currentUser && <NavItem><NavLink tag={RouterNavLink} to="/logout">Logout</NavLink></NavItem>}
				{!currentUser && <NavItem><NavLink tag={RouterNavLink} to="/login">Log In</NavLink></NavItem>}
				{!currentUser && <NavItem><NavLink tag={RouterNavLink} to="/signup">Sign Up</NavLink></NavItem>}
			</Nav>
	)
}

export default NavBar

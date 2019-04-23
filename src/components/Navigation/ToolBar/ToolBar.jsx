import React from 'react'

import classes from './ToolBar.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems'
import DrawerToggle from './DrawerToggle/DrawerToggle';

const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolBar
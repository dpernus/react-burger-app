import React, { Component } from 'react';

import ToolBar from './../../components/Navigation/ToolBar/ToolBar'
import SideDrawer from './../Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false});
    }

    drawerToggleHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <div>
                <ToolBar drawerToggleClicked={this.drawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.closeSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;
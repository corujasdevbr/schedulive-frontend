import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button={true} {...{ component: NavLink, to: "/dashboard" }}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button={true} {...{ component: NavLink, to: "/lives" }}>
            <ListItemIcon>
                <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary="Lives" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button={true} {...{ component: NavLink, to: "/sair" }}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
        </ListItem>
    </div>
);
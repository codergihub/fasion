
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useDispatch,useSelector } from 'react-redux';
import ListItemText from '@mui/material/ListItemText';
import {actions} from './store/mainSlice'

export default function CollectedDataDrawer() {
    const dispatch = useDispatch()
const drawerOpen = useSelector(state=> state.main.drawerCollectedOpen)
debugger
    return <Drawer open={drawerOpen} onClose={()=>{dispatch(actions.toggleCollectedDrawer())}}
        sx={{
            width: 200,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 200,
                boxSizing: 'border-box',
            },
        }}
       
        anchor="left"
    >
        <Toolbar />
        <Divider />
        <List>
            {['Total', 'By Brand', 'By Category'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton onClick={()=>{dispatch(actions.setCollectedReport(text))}}>

                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />

    </Drawer>
}
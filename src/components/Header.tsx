/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setNetworks } from '../state/networks/index';
import { useEffect } from 'react';
import { useWeb3Context } from '../contexts/Web3';
import ROUTES from '../constants/routes';
import { useRouter } from 'next/router';
import { setAddress } from '../state/address';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';

interface AppBarProps extends MuiAppBarProps {
}

const AppBar = styled(MuiAppBar, {})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));


const Header: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openexplorer, setOpenExplorer] = React.useState(false);
    const anchorRefExplorer = React.useRef<HTMLButtonElement>(null);

    const [tab, setTab] = React.useState(1)
    const [login, setLogin] = React.useState(false)
    const router = useRouter();
    const { connect, user, logout } = useWeb3Context();
    const dispatch = useDispatch();

    useEffect(() => {
        if (router.pathname == '/') {
            setTab(1)
        } else if (router.pathname == '/community') {
            setTab(2)
        } else {
            setTab(0)
        }

    }, [router.pathname])

    useEffect(() => {
        if (user.loggedIn != null) {
            setLogin(true)
            dispatch(setAddress(user.addr))
        } else {
            setLogin(false)
        }
    }, [user]);

    useEffect(() => {
        const net = localStorage.getItem('net');
        dispatch(setNetworks(net))
    }, [])

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleToggleExplorer = () => {
        setOpenExplorer((prevOpen) => !prevOpen);
    };

    const handleSelectExplorer = (index: number) => {
        if (index === 1) {
            router.push('/community');
        } else if (index === 2) {
            router.push('/profile');
        } else {
        }
        setOpenExplorer((prevOpen) => !prevOpen);
    };

    function handleListKeyDownExplorer(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenExplorer(false);
        } else if (event.key === 'Escape') {
            setOpenExplorer(false);
        }

    }

    const wallet = () => {
        if (login) {
            logout()
        } else {
            connect()
        }
    }

    const beautyAdrs = (adrs: string) => {
        if (adrs != null && adrs != undefined && adrs != "") {
            return adrs.substring(0, 6) + "..." + adrs.substring(adrs.length - 4)
        } else {
            return ""
        }
    }

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'var(--background)', color: '#000' }}>
            <Grid container spacing={2} sx={{ justifyContent: "space-between", maxWidth: "1400px", margin: "-16px auto 0", height: '100px' }}>
                <Grid item sx={{ width: '80px', paddingLeft: '20px !important', display: 'flex', alignItems: 'center' }} xs={1} md={2}>
                    <a href='/'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src="/assets/logo.png"
                                alt="BlockForest"
                                style={{ width: '190px' }}
                            />
                        </div>
                    </a>
                </Grid>

                <Grid item xs={1} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '20px' }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, paddingRight: '20px' }} >
                        <Box sx={{ marginTop: '30px', paddingBottom: '10px', borderBottom: tab == 1 ? 'solid 4px #00ef3e' : 'solid 0px #00ef3e' }}>
                            <Button
                                style={{ color: '#333333', height: '38px', width: '100px' }}
                                onClick={() => router.push('/')}
                            >
                                <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>Explore</span>
                            </Button>
                        </Box>
                        <Box sx={{ marginTop: '30px', paddingBottom: '10px', borderBottom: tab == 2 ? 'solid 4px #00ef3e' : 'solid 0px #00ef3e' }}>
                            <Button
                                style={{ color: '#333333', height: '38px', width: '100px', marginRight: '10px' }}
                                onClick={() => router.push('/community')}
                            >
                                <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>Create</span>
                            </Button>
                        </Box>
                        {
                            !login ?
                                <Box style={{ marginTop: '30px', paddingBottom: '10px', marginLeft: '10px' }}>
                                    <Button
                                        style={{ color: '#959595', height: '38px', width: '150px', marginRight: '10px', border: 'solid 1px #959595' }}
                                    >
                                        <span style={{ fontWeight: '600', textTransform: 'capitalize' }} onClick={() => wallet()}>Connect Wallet</span>
                                    </Button>
                                </Box> :
                                <Box style={{ marginTop: '30px', paddingBottom: '10px', marginLeft: '10px' }}>
                                    <Button
                                        ref={anchorRefExplorer}
                                        aria-controls={openexplorer ? 'composition-menu' : undefined}
                                        aria-expanded={openexplorer ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleExplorer}
                                        style={{ color: '#333333', height: '38px', width: '170px', marginRight: '10px' }}
                                    >
                                        <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>{beautyAdrs(user.addr)}</span>
                                        <KeyboardArrowDownIcon style={{ marginLeft: '5px', color: '#C1C1C1' }} />
                                    </Button>
                                    <Popper
                                        open={openexplorer}
                                        anchorEl={anchorRefExplorer.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin:
                                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                }}
                                            >
                                                <Paper >
                                                    <ClickAwayListener onClickAway={() => handleSelectExplorer(5)}>
                                                        <MenuList
                                                            autoFocusItem={openexplorer}
                                                            id="composition-menus"
                                                            aria-labelledby="composition-button"
                                                            onKeyDown={handleListKeyDownExplorer}
                                                        >
                                                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => handleSelectExplorer(0)}>
                                                                <span>Change Wallet</span>
                                                            </MenuItem>
                                                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => handleSelectExplorer(1)}>
                                                                <span>Create Community</span>
                                                            </MenuItem>
                                                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => handleSelectExplorer(2)}>
                                                                <span>View Profile</span>
                                                            </MenuItem>
                                                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => wallet()}>
                                                                <span>Disconnect</span>
                                                            </MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </Box>
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleMenuClick}
                        >
                            <MoreVertIcon sx={{ color: 'var(--text-color)' }} />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 270,
                                    width: '25ch',
                                },
                            }}
                        >
                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => handleSelectExplorer(0)}>
                                <span>Change Wallet</span>
                            </MenuItem>
                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => handleSelectExplorer(1)}>
                                <span>Create Community</span>
                            </MenuItem>
                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => handleSelectExplorer(2)}>
                                <span>View Profile</span>
                            </MenuItem>
                            <MenuItem style={{ width: '250px', color: '#888888' }} onClick={() => wallet()}>
                                <span>Disconnect</span>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Grid>
            </Grid>
        </AppBar >
    );
}

export default Header;

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import { Box, Button, Typography, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Address } from '../src/state/address';
import { useWeb3Context } from '../src/contexts/Web3';
import { ApiUrl } from '../src/constants/api';

const Main = styled('main', {})<{}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#F9F9F9',
    backgroundPosition: 'right bottom, left center',
    backgroundRepeat: 'no-repeat, no-repeat',
    minHeight: '90vh'
}));

const avatar = ['Frame1.png', 'Frame2.png', 'Frame3.png', 'Frame4.png', 'Frame5.png', 'Frame6.png', 'Frame7.png', 'Frame8.png', 'Frame9.png', 'Frame10.png']




interface Props { }

const Register: React.FC<Props> = ({ }) => {
    const { user } = useWeb3Context();

    const router = useRouter()
    const [load, setLoad] = useState(false);
    const [name, setName] = useState('');
    const [avatarSel, setAvatarSel] = useState(0);


    useEffect(() => { 
        if (user.loggedIn != null && user.loggedIn) {
            console.log(">>>>address", user.addr)
        } else {

        }
    }, [user]) 
  
    const registerNew = () => {
        const newUser = {
            name: name,
            address: user.addr,
            avatar: "/assets/" + avatar[avatarSel],
            detail: ""
        }
        axios.post(ApiUrl + 'user', newUser)
            .then((res) => {
                router.push('/profile')
                setLoad(true);
                setLoad(false);
            })
            .catch((e) => {
                setLoad(false);
            })
    }

    return (
        <>
            <Main>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: '15vh', textAlign: 'center' }}>
                        <Typography className='big-slogan' sx={{ fontSize: { xs: '24px', sm: '30px', md: '38px' }, color: '#333333', fontWeight: 'bold', marginBottom: '0px' }}>Welcome to FlowCapture.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid container maxWidth="md" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item xs={12} md={8}>
                                <Paper
                                    component="form"
                                    sx={{ borderRadius: '20px', display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #a7a7a7', background: '#FFF', boxShadow: 'none' }}
                                >
                                    <InputBase
                                        className='nickname'
                                        sx={{ ml: 1, flex: 1, textAlign: 'center', padding: '10px 0' }}
                                        placeholder="Enter you nickname(accepts lowercase and ',' symbol)"
                                        inputProps={{ 'aria-label': 'Enter you nickname(accepts lowercase and `,` symbol)' }}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
                        <span style={{ color: '#838383', fontWeight: 'bold' }}>Choose an avatar:</span>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                        <Grid container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item xs={12} md={12} style={{ display: 'contents' }}>
                                {avatar.map((c, index) => {
                                    return (
                                        <Box key={index} onClick={() => setAvatarSel(index)} className={avatarSel == index ? "avatar-sel" : "avatar-nosel"} sx={{ marginRight: '10px', marginTop: '10px' }}>
                                            <img src={"/assets/" + c} style={{ width: '60px', height: '60px', cursor: 'pointer', padding: '3px' }} />
                                        </Box>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={() => registerNew()}
                            style={{ background: '#00ef8b', color: 'white', fontSize: '16px', fontWeight: '700', textTransform: 'unset', padding: '12px 30px', borderRadius: '10px' }}>
                            Start DAO-ing on Flow
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                        <span style={{ color: '#838383', fontWeight: '500', textAlign: 'center', textShadow: '2px 2px 4px #0000003d' }}>Note: This is a one-time register process for your newly connected wallet. <br /> You can always edit your nickname and avatar in the profile section</span>
                    </Grid>

                </Grid>
            </Main>
        </>
    );
}

export default Register

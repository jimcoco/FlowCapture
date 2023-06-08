/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box, Button, Typography, Divider } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useWeb3Context } from '../src/contexts/Web3';
import { ApiUrl } from '../src/constants/api';

interface Props { }

interface Community {
    avatar: string,
    _id: string,
}

interface User {
    avatar: string,
    address: string,
    detail: string,
    name: string
}

interface Voter {
    avatar: string,
    address: string,
    candidate: string,
    token: string,
    thresold: number,
    maker: string,
    proposal: string,
    title: string,
    _id: string,
    contract: string,
    community: string,
    createdAt: string
}

const votes = [0, 0, 0, 0]

const Profile: React.FC<Props> = ({ }) => {
    const { user } = useWeb3Context();
    const router = useRouter()
    const [load, setLoad] = useState(false);
    const [address, setAddress] = useState('');
    const [joined, setJoined] = useState<Community[]>([]);
    const [userinfo, setUserinfo] = useState<User>();
    const [voted, setVoted] = useState<Voter[]>([])
    const [loadmore, setLoadmore] = useState(0)

    useEffect(() => { 
        if (user.loggedIn != null && user.loggedIn) {
            axios.get(ApiUrl + 'user/address/' + user.addr)
                .then((res) => {
                    console.log(">>>user", res)
                    setJoined(res.data.community)
                    setUserinfo(res.data.user)
                    setVoted(res.data.vote)
                    setLoad(false);
                })
                .catch((e) => {
                    setLoad(false);
                })
        } else {

        }
    }, [user])

    const getHours = (h: string) => {
        const n = Date.now();
        const d = n - Number(h) * 1;
        const hs = Math.floor(d / 3600000)
        if (hs < 1) {
            return Math.floor(d / 60000) + " mins ago"
        } else {
            return hs + " hours ago"
        }

    }

    return (
        <Container maxWidth="xl">
            <Grid container spacing={{ xs: 0, sm: 0, md: 6 }} style={{ padding: '0 3%', marginTop: '15vh', marginLeft: '0' }}>
                <Grid item xs={12} sm={12} md={5} lg={4} >
                    <div className='flow-card mb-2'>
                        <div className='d-flex-end '>
                            <NoteAltOutlinedIcon className='text-color1' />
                        </div>
                        <div className='d-flex-start '>
                            <img className='vote-icon-img' src={userinfo?.avatar} />
                            <div className='ml-2'>
                                <p className='mb-0 text-color2-b tb text-capital'>{userinfo?.name}</p>
                                <p className='address-btn d-flex-start m0 text-color1 mb-0 mt-2'>
                                    {user.addr}
                                    <ContentCopyOutlinedIcon className='font-16 ml-1 copy' onClick={() => navigator.clipboard.writeText(user.addr)} />
                                </p>
                            </div>
                        </div>
                        <Divider style={{ marginTop: '5px', marginBottom: '10px' }} />
                        <div className='ml-2'>
                            <p className='mb-1 text-color1 tb'>Joined Communities</p>
                            <div className='d-flex-start mt-2'>
                                {joined.length > 0 && joined.map((c) => {
                                    return (
                                        <img key={c?._id} src={c?.avatar} style={{ width: '50px', borderRadius: '80px', marginRight: '10px', border: 'solid 2px #6aff6a', padding: '1px' }} alt="" />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={6} >
                    <p className='mb-4 com-name'>Voting Timeline</p>
                    {
                        voted.map((v, index) => {
                            if (index < loadmore * 3 + 3) {
                                return (
                                    <div className='flow-card mb-2' key={index}>
                                        <div className='d-flex-between'>
                                            <div className='d-flex-start '>
                                                <img className='vote-icon-img' src={v?.avatar} />
                                                <div className=''>
                                                    <p className='d-flex-start m0 text-color1 mb-0 '>Voted “{v?.candidate}”</p>
                                                    <p className='mb-0 text-color2 tb mt-2'>{v?.title}</p>
                                                </div>
                                            </div>
                                            <p className='text-color1-s'>{getHours(v?.createdAt)}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {
                        voted.length == 0 &&
                        <Box className="voter-wrap tx-center">
                            <img src='/assets/sad.png' className="shield-icon mt-2 mb-2" />
                            <p className='text-color1 mb-4'> No voting history</p>
                        </Box>
                    }
                    {
                        voted.length > 0 && <Button style={{ width: '100%', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', }} onClick={() => setLoadmore(loadmore + 1)} >Load More</Button>
                    }
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile

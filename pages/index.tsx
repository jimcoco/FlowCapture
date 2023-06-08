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
import { ApiUrl, Category } from '../src/constants/api';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Main = styled('main', {})<{}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#F9F9F9',
    backgroundPosition: 'right bottom, left center',
    backgroundRepeat: 'no-repeat, no-repeat',
    minHeight: '90vh'
}));


interface Props { }

// interface Community {
//     name: string,
//     maker: string,
//     count: string,
//     id: string,
//     avatar: string
// }

const Home: React.FC<Props> = ({ }) => {
    const { user } = useWeb3Context();
    const router = useRouter()
    const [load, setLoad] = useState(false);
    const [address, setAddress] = useState('');
    const [orderby, setOrderby] = useState("1");
    const [community, setCommunity] = useState<any[]>([]);
    const [keyword, setKeyword] = useState("");
    const [selCat, setSelCat] = useState(0);

    useEffect(() => { 
        if (user.loggedIn != null && user.loggedIn) {
            axios.get(ApiUrl + 'user/address/' + user.addr)
                .then((res) => { 
                    if (res.data.user == "") {
                        router.push("/register");
                    } else {
                        const user_data = res.data.user
                        localStorage.setItem("user", JSON.stringify(user_data))
                    }
                    setLoad(false);
                })
                .catch((e) => {
                    setLoad(false);
                })
        } else {

        }
    }, [user])

    const callApi = async () => {
        axios.get(ApiUrl + 'community/')
            .then((res) => {
                console.log(">>D", res.data)
                setCommunity(res.data)
            })
            .catch((e) => {
            })
    }

    useEffect(() => {
        callApi()
    }, [])

    const join = (id: string) => {
        const data = { address: user.addr, community: id }
        axios.post(ApiUrl + 'user/community', data)
            .then((res) => {
                if (res.status) {
                    callApi()
                }
            })
            .catch((e) => {
            })
    }

    const typekeyword = (k: string) => {
        setKeyword(k)
    }


    const changeOrderBy = (o: string) => {
        var ctmp = community.reverse();
        setCommunity([...ctmp])
    }

    const searchCategory = () => {

    }

    const selectCategory = (index: number) => {
        setSelCat(index)
    }

    const goCommunity = (id: string) => {
        router.push('/community/' + id);
    }

    return (
        <>
            <Main>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} style={{ marginTop: '15vh', textAlign: 'center' }}>
                        <Typography className='big-slogan' sx={{ fontSize: { xs: '24px', sm: '28px', md: '32px' }, color: '#333333', fontWeight: 'bold', marginBottom: '0px' }}>Explore community townhalls on FlowCapture</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid container maxWidth="md" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item xs={12} md={8}>
                                <Paper
                                    component="form"
                                    sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #EAEAEA', background: '#FFF', boxShadow: 'none' }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, }}
                                        style={{ backgroundColor: 'white' }}
                                        placeholder="Search the name of community townhall... "
                                        inputProps={{ 'aria-label': 'Search the name of community townhall... ' }}
                                        onChange={(e) => typekeyword(e.target.value)}
                                    />
                                    <Button onClick={() => searchCategory()} style={{ minWidth: '60px', height: '43px', color: '#333333', borderRadius: '0', borderBottomRightRadius: '5px', borderTopRightRadius: '5px' }}><SearchIcon /></Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                        <Grid container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item xs={12} md={12} style={{ display: 'contents' }}>
                                {Category.map((c, index) => {
                                    return (
                                        <Box key={index}
                                            sx={{ cursor: 'pointer', width: '150px', background: "white", fontSize: '16px', padding: '10px 10px', textAlign: 'center', borderRadius: '5px', color: 'black', fontWeight: '800', marginTop: '10px', marginRight: '10px', border: selCat == index ? 'solid #00ef3e 2px' : 'solid #eaeaea 2px' }}
                                            onClick={() => selectCategory(index)}
                                        >
                                            {c}
                                        </Box>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                        <Grid container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <span style={{ color: '#333333' }}>Order By</span>
                                <select onChange={(e) => changeOrderBy(e.currentTarget.value)} style={{ height: '42px', width: '240px', border: 'solid #cfcfcf 2px', padding: '10px', fontSize: '14px', color: 'grey', borderRadius: '5px', marginLeft: '10px' }}>
                                    <option value={1} style={{ fontSize: '14px', marginTop: '20px' }}>Decreasing Creation Date</option>
                                    <option value={2} style={{ fontSize: '14px', marginTop: '20px' }}>Increasing Creation Date</option>
                                </select>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ marginTop: '30px' }}>
                                <Grid container spacing={2}>
                                    {
                                        community.length > 0 && community.map((m, index) => {
                                            if ((Category[selCat] == "All" || Category[selCat] == m?.category) && m?.name.toLowerCase().includes(keyword.toLowerCase())) {
                                                return (
                                                    <Grid item xs={12} sm={4} md={3} key={index}>
                                                        <Box style={{ boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)', padding: '20px', borderRadius: '5px', background: 'white', textAlign: 'center' }}>
                                                            <div style={{ textAlign: 'right' }}><OpenInNewIcon onClick={() => goCommunity(m?._id)} style={{ color: '#959595', cursor: 'pointer' }} /></div>
                                                            <img src={m?.avatar} style={{ width: '80px', marginTop: '10px', borderRadius: '80px' }} alt="" />
                                                            <p style={{ color: '#333333', fontWeight: '900', fontSize: '24px', margin: '10px 0px' }}>{m?.name}</p>
                                                            <p style={{ color: '#959595', fontSize: '14px', fontWeight: '700', margin: '0' }}>by {m?.maker}</p>
                                                            <Button
                                                                onClick={() => join(m?._id)}
                                                                style={{ color: '#959595', fontSize: '14px', fontWeight: '700', margin: '15px 0px', border: 'solid 1px #959595', padding: '8px 50px', borderRadius: '30px', textTransform: 'capitalize' }}>
                                                                Join
                                                            </Button>
                                                            <p style={{ color: '#959595', fontSize: '14px', fontWeight: '700', margin: '0' }}>{m?.space.length} member(s)</p>
                                                        </Box>
                                                    </Grid>
                                                )
                                            }
                                        })
                                    }

                                </Grid>
                            </Grid>
                            {load ?
                                <Grid item md={12}>
                                    <LinearProgress />
                                </Grid> : <></>
                            }
                            <Grid item md={12} xs={12} style={{ marginTop: '20px' }} >
                                <Button style={{ width: '100%', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', }}  >Load More</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Main>
        </>
    );
}

export default Home

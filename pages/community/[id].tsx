/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box, Button, Typography, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ApiUrl } from '../../src/constants/api';
import { useWeb3Context } from '../../src/contexts/Web3';

const Main = styled('main', {})<{}>(({ theme }) => ({
    padding: 0,
    backgroundColor: '#F9F9F9',
    backgroundPosition: 'right bottom, left center',
    backgroundRepeat: 'no-repeat, no-repeat',
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container spacing={2} >
                    {children}
                </Grid>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Props { }

interface Community {
    _id: string,
    id: number,
    name: string,
    maker: string,
    owner: string,
    team: string,
    category: string,
    bio: string,
    slug: string,
    avatar: string,
    banner: string,
    votecnt: string,
    flow: string,
    twitter: string,
    discord: string,
    github: string,
    website: string,
    ipfskey: string,
    secret: string,
    space: string[],
}

interface Proposal {
    _id: string,
    id: number,
    maker: string,  //maker name
    address: string, //maker address
    title: string,  // proposal title
    summary: string,
    eDate: string,
    sDate: string,
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


const Community: React.FC<Props> = ({ }) => {
    const router = useRouter()
    const { user } = useWeb3Context();
    const { id } = router.query
    const [load, setLoad] = useState(false);

    const [community, setCommunity] = useState<Community>()
    const [proposal, setProposal] = useState<Proposal[]>([])
    const [voted, setVoted] = useState<Voter[]>([])
    const [loadmore, setLoadmore] = useState(0)

    const callApi = async () => { 
        axios.get(ApiUrl + 'community/' + id)
            .then((res) => {
                setCommunity(res.data.community)
                setProposal(res.data.proposals)
                setVoted(res.data.voters)
                setLoad(false);
            })
            .catch((e) => {
                setLoad(false);
            })
    }

    useEffect(() => {
        if (id != undefined && id) {
            callApi()
        }
    }, [id])


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const join = () => {
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

    const beautyAdrs = (adrs: string) => {
        if (adrs != null && adrs != undefined && adrs != "") {
            return adrs.substring(0, 6) + "..." + adrs.substring(adrs.length - 4)
        } else {
            return ""
        }
    }

    const getPeriod = (a: any) => {
        const startDate = new Date();
        const endDate = new Date(a);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (daysDiff > 0) {
            return "Ends in " + daysDiff + " days"
        } else {
            return "Ended " + Math.abs(daysDiff) + " days ago"
        }
    }


    return (

        <Container maxWidth="xl" style={{ padding: '0' }}>
            <Grid item xs={12} sm={12} md={12} style={{ marginTop: '6vh', height: '250px', position: 'relative' }}>
                <img src={community?.banner ? community?.banner : "/assets/cover.png"} className='cover-img' alt="cover" />
                <img src={community?.avatar ? community?.avatar : "/assets/avatar-sample.png"} className='avatar-img' />
            </Grid>

            <Grid container spacing={2} style={{ padding: '0 5%', marginTop: '40px', marginLeft: '0' }}>
                <Grid item xs={6} sm={6} md={6} >
                    <p className='mb-2 com-name'>{community?.name ? community?.name : "loading..."}</p>
                    <p className='mb-2 text-color1'>by {community?.maker ? community?.maker : 'loading...'}</p>
                    <div className='d-flex-start'>
                        <a href={community?.flow} target='_blank' rel="noreferrer"><img className='sicon-btn' src="/assets/sicon1.png" /></a>
                        <a href={community?.twitter} target='_blank' rel="noreferrer"><img className='sicon-btn' src="/assets/sicon2.png" /></a>
                        <a href={community?.discord} target='_blank' rel="noreferrer"><img className='sicon-btn' src="/assets/sicon3.png" /></a>
                        <a href={community?.github} target='_blank' rel="noreferrer"><img className='sicon-btn' src="/assets/sicon4.png" /></a>
                        <a href={community?.website} target='_blank' rel="noreferrer"><img className='sicon-btn' src="/assets/sicon5.png" /></a>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} style={{ textAlign: 'right' }}>
                    <Button className='join-btn' onClick={() => join()}>
                        Join
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: '0 5%', marginTop: '30px', marginLeft: '0' }}>
                <Grid item xs={12} sm={12} md={12} >
                    <p className='mb-2 text-color2'>{community?.bio}</p>
                    <div className='d-flex-start mt-4'>
                        <div className='mr-3'>
                            <p className='mb-1 text-color2 tb tar'>{community?.space.length ? community?.space.length : 0}</p>
                            <p className='mb-2 text-color1'>members</p>
                        </div>
                        <div className='mr-3'>
                            <p className='mb-1 text-color2 tb tar'>{voted?.length ? voted?.length : 0}</p>
                            <p className='mb-2 text-color1'>voters</p>
                        </div>
                        <div className='mr-3'>
                            <p className='mb-1 text-color2 tb tar'>{proposal?.length ? proposal?.length : 0}</p>
                            <p className='mb-2 text-color1'>proposal</p>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: '3%', marginTop: '30px', marginLeft: '0' }}>
                <Grid item xs={12} sm={12} md={12} style={{ padding: '0' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab className='tab-btn' label="Propoals" {...a11yProps(0)} />
                        <Tab className='tab-btn' label="Voters" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '20px' }}>
                            <select style={{ height: '38px', width: '170px', border: 'solid #cfcfcf 2px', padding: '5px', fontSize: '14px', color: 'grey', borderRadius: '5px' }}>
                                <option value={1} style={{ fontSize: '14px', marginTop: '20px' }}>All</option>
                                <option value={2} style={{ fontSize: '14px', marginTop: '20px' }}>Active</option>
                                <option value={3} style={{ fontSize: '14px', marginTop: '20px' }}>Completed</option>
                                <option value={4} style={{ fontSize: '14px', marginTop: '20px' }}>Cancelled</option>
                            </select>
                            <Button
                                onClick={() => {
                                    router.push('/proposal/' + id)
                                }}
                                variant="outlined" className='create-btn'>
                                Create Proposal
                            </Button>
                        </Grid>
                        {
                            proposal.map((p, index) => {
                                return (
                                    <Grid item xs={12} sm={12} md={12} key={index}>
                                        <div className='flow-card mb-2 proposal-item' onClick={() => router.push('/proposal/detail/' + p?._id)}>
                                            <div className='d-flex-between'>
                                                <p className='mb-0 text-color tb'>{p?.title}</p>
                                                <p className='active-badge'>active</p>
                                            </div>
                                            <p className='mb-0 text-color1-s'>Proposed by {p?.address}</p>
                                            <p>{p?.summary}</p>
                                            <p className='text-color1-s '> {getPeriod(p?.eDate)} </p>
                                            <p className='mb-0 text-color1-s'>Winning Candidate: <span className='tb text-color2'>James Corrolla</span></p>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                        {load ?
                            <Grid item md={12}>
                                <LinearProgress />
                            </Grid> : <></>
                        }
                        <Grid item md={12} xs={12} style={{ marginTop: '5px' }} >
                            <Button style={{ width: '100%', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', }}  >Load More</Button>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '20px' }}>
                            <select style={{ height: '38px', width: '170px', border: 'solid #cfcfcf 2px', padding: '5px', fontSize: '14px', color: 'grey', borderRadius: '5px' }}>
                                <option style={{ fontSize: '14px', marginTop: '20px' }}>Recently Voted</option>
                                <option style={{ fontSize: '14px', marginTop: '20px' }}>Most Votes</option>
                                <option style={{ fontSize: '14px', marginTop: '20px' }}>Least Votes</option>
                            </select>
                            <Button
                                onClick={() => {
                                    router.push('/proposal/' + id)
                                }}
                                variant="outlined" className='create-btn'>
                                Create Proposal
                            </Button>
                        </Grid>
                        {
                            voted.map((p, index) => {
                                return (
                                    <Grid item xs={6} sm={3} md={2} key={index} className='vote-padding'>
                                        <div className='vote-card mb-2'>
                                            <img className='vote-icon-img' src={p?.avatar} />
                                            <p className='mb-0 tb text-color2 tx-center mb-2'>{beautyAdrs(p?.address)}</p>
                                            <p className='text-color2-s'>{p?.thresold} {p?.token}</p>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                        <Grid item md={12} xs={12} style={{ marginTop: '5px' }} >
                            <Button style={{ width: '100%', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', }}  >Load More</Button>
                        </Grid>
                    </TabPanel>
                </Grid>

            </Grid>









        </Container>




    );
}

export default Community

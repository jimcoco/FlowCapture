/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box, Button, Typography, Divider, Paper, InputBase, DialogContent } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import Dialog from '@mui/material/Dialog';


import { ApiUrl } from '../../../src/constants/api';
import { useWeb3Context } from '../../../src/contexts/Web3';

interface Props { }

interface Proposal {
    _id: string,
    id: number,
    maker: string,  //maker name
    address: string, //maker address
    title: string,  // proposal title
    summary: string,
    community: string,
    contract: string,
    percent: number, //
    strategy: number,
    system: number,
    supply: number,
    thresold: number,
    token: string,
    zone: string,
    eDate: string,
    sDate: string,
    eTime: string,
    sTime: string,
    shielded: boolean,
    candidate: string[],
}

interface Voter {
    avatar: string,
    address: string,
    candidate: string,
    token: string,
    thresold: number
}

interface User {
    avatar: string,
    address: string,
    detail: string,
    name: string
}

const Singleproposal: React.FC<Props> = ({ }) => {
    const { user } = useWeb3Context();
    const router = useRouter()
    const { id } = router.query
    const [openDiag, setOpenDiag] = useState(false)
    const [load, setLoad] = useState(false);
    const [address, setAddress] = useState('');
    const [step, setStep] = useState(1);
    const [selVote, setSelVote] = useState(100);
    const [selStrategy, setSelStrategy] = useState(100);
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    const [proposal, setProposal] = useState<Proposal>()
    const [voter, setVoter] = useState<Voter[]>([])
    const [cand, selCand] = useState(0)
    const [eligible, setEligible] = useState(true)
    const [userinfo, setUserinfo] = useState<User>();
    const [total, setTotal] = useState(1);

    useEffect(() => {
        setLoad(true);
        if (user.loggedIn != null && user.loggedIn) {
            axios.get(ApiUrl + 'user/address/' + user.addr)
                .then((res) => {
                    console.log(">>>user", res)
                    setUserinfo(res.data.user)
                    setLoad(false);
                })
                .catch((e) => {
                    setLoad(false);
                })
        } else {

        }
    }, [user])

    const callApi = async () => {
        axios.get(ApiUrl + 'proposal/' + id)
            .then((res) => {
                setProposal(res.data.proposal)
                setVoter(res.data.vote)
            })
            .catch((e) => {
            })
    }

    useEffect(() => {
        setLoad(true);
        if (id != undefined && id) {
            callApi()
        }
    }, [id])

    useEffect(() => {
        if (voter.length > 0) {
            var sum = 0
            voter.forEach((v) => {
                sum = sum + v.thresold * 1
            })
            setTotal(sum)
        }
    }, [voter])

    const handleClose = () => {
        setOpenDiag(false)
    }

    const selectVote = (index: number) => {
        setSelVote(index)
    }

    const selectVoteStrategy = (index: number) => {
        setSelStrategy(index)
    }

    const getPeriod = (a: any, b: any) => {
        const startDate = new Date(a);
        const endDate = new Date(b); 
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff
    }

    const submitVote = () => {
        const _vote = {
            maker: userinfo?.name,
            address: userinfo?.address,
            avatar: userinfo?.avatar,
            community: proposal?.community,
            proposal: proposal?._id,
            title: proposal?.title,
            token: proposal?.token,
            thresold: proposal?.thresold,
            contract: proposal?.contract,
            candidate: proposal?.candidate[cand],
            createdAt: Date.now(),
        }
        axios.post(ApiUrl + 'vote', _vote)
            .then((res) => {
                if (res.status) {
                    callApi();
                }
            })
            .catch((e) => {
            })
        handleClose()
    }

    const beautyAdrs = (adrs: string) => {
        if (adrs != null && adrs != undefined && adrs != "") {
            return adrs.substring(0, 6) + "..." + adrs.substring(adrs.length - 4)
        } else {
            return ""
        }
    }

    return (
        <Container maxWidth="xl">
            <Grid container style={{ padding: '0 3%', marginTop: '15vh', marginLeft: '0' }} spacing={{ xs: 0, sm: 0, md: 4 }}>
                <Grid item xs={12} sm={12} md={7} >
                    <p className='mb-6 com-name'>{proposal?.title}</p>
                    <Box className='d-flex-start'>
                        <p className='text-color ' >Proposal by {proposal?.address} </p>
                        <p className='active-badge ml-2'>Active</p>
                    </Box>
                    <Box>
                        <p>{proposal?.summary}</p>
                    </Box>
                    <Box className='text-box-wrap mt-6' >
                        <p className='label-name mb-4'>Voting Candidates</p>
                        {
                            proposal?.candidate && proposal.candidate.map((c, index) => {
                                return (
                                    <p key={index} className='vote-can'>{c}</p>
                                )
                            })
                        }
                    </Box>
                    <Box className='text-box-wrap mt-6' >
                        <p className='label-name mb-4'>Voters</p>
                        <Box className="voter-list-wrap">
                            {
                                voter.length > 0 &&
                                voter.map((v, index) => {
                                    return (
                                        <Box key={index} className="d-flex-between voter-wrap">
                                            <Box className='d-flex-start'>
                                                <img src={v.avatar} className='voter-avatar' alt="" />
                                                <p className='d-flex-start m0 text-color1 mb-0'>
                                                    {beautyAdrs(v.address)}
                                                    <ContentCopyOutlinedIcon className='font-16 ml-1' onClick={() => navigator.clipboard.writeText(user.addr)} />
                                                </p>
                                            </Box>
                                            <p>{v.candidate}</p>
                                            <p>{v.thresold} {v.token}</p>
                                        </Box>
                                    )
                                })
                            }
                            {
                                voter.length == 0 &&
                                <Box className="voter-wrap tx-center">
                                    <img src='/assets/sad.png' className="shield-icon mt-2 mb-2" />
                                    <p className='text-color1 mb-4'> No votes submitted for this proposal</p>
                                </Box>
                            }
                            <Box className="d-flex-center ">
                                <p className='tx-center'>View More</p>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={5} >
                    <Box className="voter-list-wrap">
                        <p className='text-color tb ml-4' >Proposal by {proposal?.address} </p>
                        <Divider style={{ marginTop: '5px', marginBottom: '10px' }} />
                        <p className='text-color tb ml-4' >Start: <span className='text-color1'>{proposal?.sDate}, {proposal?.sTime}</span></p>
                        <p className='text-color tb ml-4' >End: <span className='text-color1'>{proposal?.eDate}, {proposal?.eTime}</span></p>
                        <p className='text-color tb ml-4' >Timezone: <span className='text-color1'>{proposal?.zone}</span></p>
                        <p className='text-color tb ml-4' >Duration: <span className='text-color1'>{getPeriod(proposal?.sDate, proposal?.eDate)} days</span>  </p>
                    </Box>

                    <Box className="voter-list-wrap">
                        <p className='text-color tb ml-4' >Quorum </p>
                        <Divider style={{ marginTop: '5px', marginBottom: '10px' }} />
                        <p className='text-color tb ml-4' >Threshold: <span className='text-color1'>{proposal?.percent}%</span></p>
                        <p className='text-color tb ml-4' >Votes required:  <span className='text-color1'>{proposal?.thresold} {proposal?.token}</span></p>
                    </Box>

                    <Box className="voter-list-wrap tx-center">
                        <p className='text-color tb ml-4' >Voting Result</p>
                        <Divider style={{ marginTop: '5px', marginBottom: '10px' }} />
                        {
                            voter.map((v, index) => {
                                return (
                                    <Box key={index}>
                                        <div className='d-flex-between ml-4 mr-4'>
                                            <p className='text-color' >{v.candidate}</p>
                                            <p className='text-color' >{v.thresold} {v.token} {Math.floor(v.thresold / total * 100 * 100) / 100}%</p>
                                        </div>
                                        <LinearProgress className='ml-4 mr-4 vote-percent' variant="determinate" value={v.thresold / total * 100} />
                                    </Box>
                                )
                            })
                        }
                        <Button className='mt-6 mb-4 vote-btn' onClick={() => setOpenDiag(true)}>Vote Now</Button>
                    </Box>
                </Grid>
            </Grid>
            <Dialog maxWidth="sm" fullWidth={true} open={openDiag} onClose={handleClose}>
                <DialogContent >
                    <Grid container >
                        <Grid item xs={12} md={12}>
                            <Box className='text-box-wrap mt-6 ' >
                                <p className='label-name mb-4 tx-center'>Select your voting option</p>
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                    {
                                        proposal?.candidate && proposal.candidate.map((c, index) => {
                                            return (
                                                <p key={index} className={cand == index ? 'vote-can-sel mw300' : 'vote-can mw300'} onClick={() => selCand(index)}>Candidate {index + 1} - {c}</p>
                                            )
                                        })
                                    }
                                    {
                                        eligible ?
                                            <div className='tx-center mt-4' style={{ padding: '10px', border: 'solid 1px #8b8b8b', borderRadius: '5px' }}>
                                                <CheckCircleIcon style={{ color: '#00ef8b' }} />
                                                <p className='text-color1 mb-0'>Requirements and threshold are met.<br />
                                                    You are eligible to vote.</p>
                                            </div> :
                                            <div className='tx-center mt-4' style={{ padding: '10px', border: 'solid 1px #8b8b8b', borderRadius: '5px' }}>
                                                <CancelIcon style={{ color: '#ff0000' }} />
                                                <p className='text-color1 mb-0'>Does not fulfil the requirements and threshold.<br />
                                                    You are ineligible to vote. </p>
                                            </div>
                                    }
                                    <Button className='mt-6 mb-4 vote-btn-s' onClick={() => submitVote()}>Submit Vote</Button>
                                </div>

                            </Box>
                        </Grid>

                    </Grid>
                </DialogContent>




            </Dialog>
        </Container>
    );
}

export default Singleproposal

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box, Button, Typography, Divider, Paper, InputBase } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Checkbox from '@mui/material/Checkbox';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ApiUrl, Timezones, Votingsystem, Votingstrategy } from '../../src/constants/api';
import { useWeb3Context } from '../../src/contexts/Web3';

interface Props { }


interface Proposal {
    title: string,
    summary: string,
    system: number,
    strategy: number,
    token: string,
    contract: string,
    thresold: number,
    percent: number,
    supply: number,
    sDate: string,
    sTime: string
    eDate: string,
    eTime: string,
    zone: string
    shielded: boolean
}

const Proposalcreate: React.FC<Props> = ({ }) => {
    const router = useRouter()
    const { id } = router.query
    const { user } = useWeb3Context();
    const [load, setLoad] = useState(false);
    const [address, setAddress] = useState('');
    const [maker, setMaker] = useState('')
    const [step, setStep] = useState(1);
    const [selVote, setSelVote] = useState(100);
    const [selStrategy, setSelStrategy] = useState(100);
    const [zone, setZone] = useState(
        "(GMT+8:00) Beijing, Hong Kong, Singapore, Kuala Lumpur"
    )
    const [proposal, setProposal] = useState<Proposal>()

    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [system, setSystem] = useState(0)
    const [strategy, setStrategy] = useState(0)
    const [token, setToken] = useState("")
    const [contract, setContract] = useState("")
    const [thresold, setThresold] = useState(0)
    const [percent, setPercent] = useState(0)
    const [supply, setSupply] = useState(0)
    const [sDate, setSDate] = useState("")
    const [sTime, setSTime] = useState("")
    const [eDate, setEDate] = useState("")
    const [eTime, setETime] = useState("")
    const [shielded, setShielded] = useState(false)
    const [candidate, setCandidate] = useState<string[]>([]);
    const [cand, setCand] = useState("")

    useEffect(() => {
        setLoad(true);
        if (user.loggedIn != null && user.loggedIn) {
            const lu = localStorage.getItem('user')
            if (lu) {
                const u = JSON.parse(lu)
                setMaker(u.name)
                setAddress(u.address)
            }
        } else {

        }
    }, [user])

    const setTimezones = (zone: string) => {
        setZone(zone)
    }

    const selectVote = (index: number) => {
        setSelVote(index)
        setSystem(index)
    }

    const selectVoteStrategy = (index: number) => {
        setSelStrategy(index)
        setStrategy(index)
    }

    const checkShield = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShielded(event.target.checked)
    }

    const addSpace = () => {
        setCandidate([...candidate, cand])
        setCand('')
    }

    const delSpace = (index: number) => {
        var tmp = candidate
        tmp.splice(index, 1)
        setCandidate([...tmp])
    }

    const next = () => {
        if (step < 5) {
            setStep(step + 1)
        } else {
            const proposal = {
                community: id,
                address,
                maker,
                id: Date.now(),
                title,
                summary,
                system,
                strategy,
                token,
                contract,
                thresold,
                percent,
                supply,
                sDate,
                sTime,
                eDate,
                eTime,
                zone,
                shielded,
                candidate,
            }
            axios.post(ApiUrl + 'proposal/', proposal)
                .then((res) => {
                    setLoad(false);
                    router.push('/community/' + id)
                })
                .catch((e) => {
                })
        }
    }

    return (
        <Container maxWidth="xl">
            <Grid container style={{ padding: '0 3%', marginTop: '15vh', marginLeft: '0' }}>
                <Grid item sm={12} md={8} >
                    <p className='mb-6 com-name'>Create a proposal.</p>
                    {
                        step == 1 ?
                            <>
                                <Box className='text-box-wrap'  >
                                    <p className='label-name'>Title</p>
                                    <p className='label-description'>Give your proposal a title</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            value={title}
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder=" "
                                            inputProps={{ 'aria-label': ' ' }}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Paper>
                                </Box>
                                <Box className='text-box-wrap' >
                                    <p className='label-name'>Summary</p>
                                    <p className='label-description'>Write down what’s your proposal about. Format your proposal summary in Markdown.</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", minHeight: '120px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            value={summary}
                                            multiline={true}
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder=" "
                                            inputProps={{ 'aria-label': ' ' }}
                                            onChange={(e) => setSummary(e.target.value)}
                                        />
                                    </Paper>
                                </Box>
                            </> : step == 2 ?
                                <>
                                    <Box className='text-box-wrap'  >
                                        <p className='label-name'>Voting System</p>
                                        <p className='label-description'>Choose a voting system which is suitable for your proposal</p>
                                        <Grid container spacing={2} style={{ marginTop: '30px' }} >
                                            {
                                                Votingsystem.map((pro, index) => {
                                                    return (
                                                        <Grid item xs={12} sm={6} md={6} key={index}>
                                                            <Box
                                                                className='flow-card-voting mb-2'
                                                                sx={{ border: selVote == index ? pro.active == true ? 'solid #00ef3e 2px' : 'solid #eaeaea 2px' : pro.active == true ? 'solid #a9a9a9 2px' : 'solid #eaeaea 2px', }}
                                                                onClick={() => selectVote(index)}>
                                                                <Box className='d-flex-start'>
                                                                    <p className={pro.active == true ? 'text-color tb' : 'text-color1 tb'}>{pro.title}</p>
                                                                    {pro.badge != "" && <p className='cancel-badge ml-2'>{pro.badge}</p>}
                                                                </Box>
                                                                <p className='mb-0 text-color1-s '>{pro.text}</p>
                                                            </Box>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </Box>
                                    <div className='text-box-wrap'  >
                                        <p className='label-name'>Candidates</p>
                                        <p className='label-description'>Minimum two candidates is required for Single Choice Voting.</p>
                                        {
                                            candidate.map((c, index) => {
                                                return (
                                                    <div key={index} className='d-flex-start mb-2'>
                                                        <Paper
                                                            component="form"
                                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none', }}
                                                        >
                                                            <InputBase
                                                                disabled
                                                                value={c}
                                                                sx={{ ml: 1, flex: 1, }}
                                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                                placeholder="Enter wallet address"
                                                                inputProps={{ 'aria-label': 'Enter wallet address' }}
                                                            />
                                                        </Paper>
                                                        <Button onClick={() => delSpace(index)} style={{ width: '30px', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', height: '43px', marginLeft: '10px' }}><RemoveIcon /></Button>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='d-flex-start'>
                                            <Paper
                                                component="form"
                                                sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none', }}
                                            >
                                                <InputBase
                                                    value={cand}
                                                    sx={{ ml: 1, flex: 1, }}
                                                    style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                    placeholder="Candidate ..."
                                                    inputProps={{ 'aria-label': 'Candidate ...' }}
                                                    onChange={(e) => setCand(e.target.value)}
                                                />
                                            </Paper>
                                            <Button onClick={() => addSpace()} style={{ width: '30px', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', height: '43px', marginLeft: '10px' }}><AddIcon /></Button>
                                        </div>

                                    </div>
                                </> : step == 3 ?
                                    <>
                                        <Box className='text-box-wrap'  >
                                            <p className='label-name'>Voting Strategies</p>
                                            <p className='label-description'>Choose a voting strategies which is suitable for your proposal.</p>
                                            <Grid container spacing={2} style={{ marginTop: '30px' }} >
                                                {
                                                    Votingstrategy.map((pro, index) => {
                                                        return (
                                                            <Grid item xs={12} sm={6} md={6} key={index}>
                                                                <Box
                                                                    className='flow-card-voting mb-2'
                                                                    sx={{ border: selStrategy == index ? pro.active == true ? 'solid #00ef3e 2px' : 'solid #eaeaea 2px' : pro.active == true ? 'solid #a9a9a9 2px' : 'solid #eaeaea 2px', }}
                                                                    onClick={() => selectVoteStrategy(index)}>
                                                                    <Box className='d-flex-start'>
                                                                        <p className={pro.active == true ? 'text-color tb' : 'text-color1 tb'}>{pro.title}</p>
                                                                        {pro.badge != "" && <p className='cancel-badge ml-2'>{pro.badge}</p>}
                                                                    </Box>
                                                                    <p className='mb-0 text-color1-s '>{pro.text}</p>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </Box>

                                    </> : step == 4 ?
                                        <>
                                            <Box className='text-box-wrap'  >
                                                <p className='label-name'>Voting Strategy Settings</p>
                                                <p className='label-description'>Provide general info for the voting strategy you chose for your proposal:</p>
                                            </Box>
                                            <Box className='text-box-wrap mt-6' >
                                                <p className='label-name'>Token Symbol</p>
                                                <p className='label-description'>The symbol of the token for this proposal voting</p>
                                                <Paper
                                                    component="form"
                                                    sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                                >
                                                    <InputBase
                                                        value={token}
                                                        sx={{ ml: 1, flex: 1, }}
                                                        style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                        placeholder="Eg.FLOW"
                                                        inputProps={{ 'aria-label': 'Eg.FLOW' }}
                                                        onChange={(e) => setToken(e.target.value)}
                                                    />
                                                </Paper>
                                            </Box>
                                            <Box className='text-box-wrap' >
                                                <p className='label-name'>Contract Address</p>
                                                <p className='label-description'>The contract address of the token for this proposal voting</p>
                                                <Paper
                                                    component="form"
                                                    sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                                >
                                                    <InputBase
                                                        value={contract}
                                                        sx={{ ml: 1, flex: 1, }}
                                                        style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                        placeholder=""
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => setContract(e.target.value)}
                                                    />
                                                </Paper>
                                            </Box>
                                            <Box className='text-box-wrap' >
                                                <p className='label-name'>Minimum Threshold</p>
                                                <p className='label-description'>Token in user wallet has to exceed this threshold to be eligible for voting</p>
                                                <Paper
                                                    component="form"
                                                    sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                                >
                                                    <InputBase
                                                        sx={{ ml: 1, flex: 1, }}
                                                        style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                        placeholder="Enter a number which is greater than 0"
                                                        inputProps={{ 'aria-label': '' }}
                                                        onChange={(e) => setThresold(Number(e.target.value))}
                                                    />
                                                </Paper>
                                            </Box>
                                            <Box className="d-flex">
                                                <Checkbox className='mt-2' />
                                                <Box style={{ width: '81%' }}>
                                                    <Box className='text-box-wrap' >
                                                        <p className='label-name'>Apply quorum threshold <QuestionMarkIcon style={{ fontSize: '14px' }} /> </p>
                                                        <p className='label-description'>A quorum is the minimum number of participating members or tokens required for a proposal to be approved.</p>
                                                        <Paper
                                                            component="form"
                                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1, }}
                                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                                placeholder="Enter a percentage (maximum is 100%)"
                                                                inputProps={{ 'aria-label': '' }}
                                                                onChange={(e) => setPercent(Number(e.target.value))}
                                                            />
                                                        </Paper>
                                                    </Box>
                                                    <Box className='text-box-wrap' >
                                                        <p className='label-description'>Total circulating supply</p>
                                                        <Paper
                                                            component="form"
                                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                                        >
                                                            <InputBase
                                                                sx={{ ml: 1, flex: 1, }}
                                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                                placeholder="Eg. 100,000,000"
                                                                inputProps={{ 'aria-label': '' }}
                                                                onChange={(e) => setSupply(Number(e.target.value))}
                                                            />
                                                        </Paper>
                                                    </Box>
                                                </Box>

                                            </Box>

                                        </> : step == 5 ?
                                            <>
                                                <Box className='text-box-wrap'  >
                                                    <p className='label-name'>Date and Time Settings</p>
                                                    <p className='label-description'>Provide general info for the date, time and result visibility for your proposal:</p>
                                                </Box>
                                                <Box className='text-box-wrap mt-6' >
                                                    <p className='label-name'>Timezone</p>
                                                    <div style={{ marginTop: '10px', width: "100%", height: '43px', }}
                                                    >
                                                        <select onChange={(e) => setTimezones(e.target.value)} style={{ height: '42px', maxWidth: '400px', width: '100%', border: 'solid #cfcfcf 2px', padding: '10px', fontSize: '14px', color: 'grey', borderRadius: '5px' }}>
                                                            {
                                                                Timezones.map((c) => {
                                                                    return (
                                                                        <option key={c} value={c} style={{ fontSize: '14px', marginTop: '20px' }}>{c}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </Box>
                                                {/* <Box className='text-box-wrap mt-4'  >
                                                    <p className='label-name-b'>First Round Voting:</p>
                                                </Box> */}
                                                <Box className="d-flex mb-2">
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>Start Date</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }} >
                                                            <input type='date' className='my-timezone' onChange={(e) => setSDate(e.target.value)} />
                                                        </div>
                                                    </Box>
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>Start Time</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }} >
                                                            <input type="time" className='my-timezone' onChange={(e) => setSTime(e.target.value)} />
                                                        </div>
                                                    </Box>
                                                </Box>
                                                <Box className="d-flex mb-2">
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>End Date</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }} >
                                                            <input type='date' className='my-timezone' onChange={(e) => setEDate(e.target.value)} />
                                                        </div>
                                                    </Box>
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>End Time</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }} >
                                                            <input type="time" className='my-timezone' onChange={(e) => setETime(e.target.value)} />
                                                        </div>
                                                    </Box>
                                                </Box>

                                                {/* <Box className='text-box-wrap mt-8'  >
                                                    <p className='label-name-b'>Second Round Voting:</p>
                                                </Box>
                                                <Box className="d-flex mb-2">
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>Start Date</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }}
                                                        >
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker className='my-timezone' />
                                                            </LocalizationProvider>
                                                        </div>
                                                    </Box>
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>Start Time</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }}
                                                        >
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <TimePicker className='my-timezone' label="Basic time picker" />
                                                            </LocalizationProvider>
                                                        </div>
                                                    </Box>
                                                </Box>
                                                <Box className="d-flex mb-2">
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>Start Date</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }}
                                                        >
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker className='my-timezone' />
                                                            </LocalizationProvider>
                                                        </div>
                                                    </Box>
                                                    <Box className='text-box-wrap mt-2 mr-2' >
                                                        <p className='label-name'>Start Time</p>
                                                        <div style={{ marginTop: '10px', width: "100%", height: '43px', }}
                                                        >
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <TimePicker className='my-timezone' label="Basic time picker" />
                                                            </LocalizationProvider>
                                                        </div>
                                                    </Box>
                                                </Box> */}

                                                <Box className="d-flex">
                                                    <Checkbox className='mt-2' onChange={checkShield} value={shielded} />
                                                    <Box style={{ width: '81%' }}>
                                                        <Box className='text-box-wrap' >
                                                            <p className='label-name'>Shielded Voting <QuestionMarkIcon style={{ fontSize: '14px' }} /> </p>
                                                            <p className='label-description'>Votes and voting results are shielded until the voting period is over.</p>
                                                            <p className='label-description'>Here are some of the benefits:</p>
                                                            <ul>
                                                                <li className='label-description'>Partial privacy</li>
                                                                <li className='label-description'>Pre-voting information symmetry</li>
                                                                <li className='label-description'>Prevent voter apathy and misbehavior</li>
                                                            </ul>
                                                        </Box>

                                                    </Box>

                                                </Box>
                                            </> : <></>
                    }
                    <Box className="d-flex-end text-box-wrap mb-10">
                        <Button style={{ width: '200px', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', }} onClick={() => next()} >{step == 5 ? "Create" : "Next"} </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Proposalcreate

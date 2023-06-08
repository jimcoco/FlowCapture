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
import next from 'next/types';
import { useWeb3Context } from '../src/contexts/Web3';
import { ApiUrl, Category } from '../src/constants/api';


interface Props { }

const votes = [0, 0, 0, 0]

const Communitycreate: React.FC<Props> = ({ }) => {
    const router = useRouter()
    const { user } = useWeb3Context();
    const [load, setLoad] = useState(false);
    const [address, setAddress] = useState('');
    const [step, setStep] = useState(1);

    const [cname, setCname] = useState("")
    const [cteam, setCteam] = useState("")
    const [cbio, setCbio] = useState("")
    const [category, setCategory] = useState("All")
    const [cslug, setCslug] = useState("")
    const [cavatar, setCavatar] = useState("/assets/avatar-sample.png")
    const [cbanner, setCbanner] = useState("/assets/cover.png")
    const [cvotecnt, setCvotcnt] = useState("")
    const [cflow, setCflow] = useState("")
    const [ctwitter, setCtwitter] = useState("")
    const [cdiscord, setCdiscord] = useState("")
    const [cgithub, setCgithub] = useState("")
    const [cwebsite, setCwebsite] = useState("")
    const [cipfskey, setCipfskey] = useState("")
    const [cipfsscret, setCipfsscret] = useState("")
    const [cspace, setCspace] = useState<string[]>([]);
    const [maker, setMaker] = useState("")

    useEffect(() => { 
        if (user.loggedIn != null && user.loggedIn) {
            const lu = localStorage.getItem('user')
            if (lu) {
                const u = JSON.parse(lu)
                setMaker(u.name)
            }
        } else {

        }
    }, [user])

    const addSpace = () => {
        setCspace([...cspace, address])
        setAddress('')
    }

    const delSpace = (index: number) => {
        var tmp = cspace
        tmp.splice(index, 1)
        setCspace([...tmp])
    }

    const next = () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            const newCommunity = {
                owner: user.addr,
                maker,
                id: Date.now(),
                name: cname,
                team: cteam,
                bio: cbio,
                category,
                slug: cslug,
                avatar: cavatar,
                banner: cbanner,
                votecnt: cvotecnt,
                flow: cflow,
                twitter: ctwitter,
                discord: cdiscord,
                github: cgithub,
                website: cwebsite,
                ipfskey: cipfskey,
                secret: cipfsscret,
                space: cspace
            }
            axios.post(ApiUrl + 'community', newCommunity)
                .then((res) => {
                    router.push('/')
                    setLoad(true);
                    setLoad(false);
                })
                .catch((e) => {
                    setLoad(false);
                })
        }
    }


    return (
        <Container maxWidth="xl">
            <Grid container style={{ padding: '0 3%', marginTop: '15vh', marginLeft: '0' }}>
                <Grid item sm={12} md={8} >
                    <p className='mb-6 com-name'>Create your community space.</p>
                    {
                        step == 1 ?
                            <>
                                <div className='text-box-wrap'  >
                                    <p className='label-name'>Name</p>
                                    <p className='label-description'>Give your community space name.</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            value={cname}
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder=" "
                                            inputProps={{ 'aria-label': ' ' }}
                                            onChange={(e) => setCname(e.target.value)}
                                        />
                                    </Paper>
                                </div>
                                <div className='text-box-wrap' >
                                    <p className='label-name'>Team</p>
                                    <p className='label-description'>Provide the name of your team.</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            value={cteam}
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder=" "
                                            inputProps={{ 'aria-label': ' ' }}
                                            onChange={(e) => setCteam(e.target.value)}
                                        />
                                    </Paper>
                                </div>
                                <div className='text-box-wrap' >
                                    <p className='label-name'>Bio</p>
                                    <p className='label-description'>Give your community a simple description (200 character max).</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'start', width: "100%", minHeight: '120px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            multiline={true}
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder=" "
                                            inputProps={{ 'aria-label': ' ' }}
                                            onChange={(e) => setCbio(e.target.value)}
                                        />
                                    </Paper>
                                </div>
                                <div className='text-box-wrap'  >
                                    <p className='label-name'>Categories</p>
                                    <p className='label-description'>What category best describe your community?</p>
                                    <select onChange={(e) => setCategory(e.target.value)} style={{ height: '42px', width: '100%', border: 'solid #cfcfcf 2px', padding: '10px', fontSize: '14px', color: 'grey', borderRadius: '5px' }}>
                                        {
                                            Category.map((c, index) => {
                                                return (
                                                    <option key={index} value={c} style={{ fontSize: '14px', marginTop: '20px' }}>{c}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='text-box-wrap' >
                                    <p className='label-name'>Slug</p>
                                    <p className='label-description'>Provide a slug for your community. It will be your community URL.<br />
                                        For example: www.flowcapture.com/sampledao.flow </p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            value={cslug}
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder=" "
                                            inputProps={{ 'aria-label': ' ' }}
                                            onChange={(e) => setCslug(e.target.value)}
                                        />
                                        <Button style={{ minWidth: '60px', textTransform: 'none', height: '43px', fontWeight: '600', color: '#333333', borderRadius: '0', borderBottomRightRadius: '5px', borderTopRightRadius: '5px' }}>.flow</Button>

                                    </Paper>
                                </div>
                                <div className='text-box-wrap' >
                                    <p className='label-name'>Avatar</p>
                                    <p className='label-description'>Give your community an avatar (Recommended: 250*250 pixels)</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder="Upload you image"
                                            inputProps={{ 'aria-label': 'Upload you image' }}
                                            onChange={(e) => setCavatar(e.target.value)}
                                        />
                                        <Button style={{ minWidth: '60px', textTransform: 'none', height: '43px', fontWeight: '600', color: '#333333', borderRadius: '0', borderBottomRightRadius: '5px', borderTopRightRadius: '5px' }}><FileUploadOutlinedIcon /></Button>

                                    </Paper>
                                </div>
                                <div className='text-box-wrap' >
                                    <p className='label-name'>Banner Photo</p>
                                    <p className='label-description'>Give your community a banner photo (Recommended: 1920*350 pixels)</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder="Upload you image"
                                            inputProps={{ 'aria-label': 'Upload you image' }}
                                            onChange={(e) => setCbanner(e.target.value)}
                                        />
                                        <Button style={{ minWidth: '60px', textTransform: 'none', height: '43px', fontWeight: '600', color: '#333333', borderRadius: '0', borderBottomRightRadius: '5px', borderTopRightRadius: '5px' }}><FileUploadOutlinedIcon /></Button>

                                    </Paper>
                                </div>
                                <div className='text-box-wrap' >
                                    <p className='label-name'>Vote Count Symbol</p>
                                    <p className='label-description'>This symbol is for displaying vote counts in the voters tab</p>
                                    <Paper
                                        component="form"
                                        sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                    >
                                        <InputBase
                                            value={cvotecnt}
                                            sx={{ ml: 1, flex: 1, }}
                                            style={{ backgroundColor: 'white', fontSize: '14px' }}
                                            placeholder="Eg. FLOW"
                                            inputProps={{ 'aria-label': 'Eg. FLOW' }}
                                            onChange={(e) => setCvotcnt(e.target.value)}
                                        />
                                    </Paper>
                                </div>
                            </> : step == 2 ?
                                <>
                                    <div className='text-box-wrap'  >
                                        <p className='label-name'>Flowscan</p>
                                        <p className='label-description'>Provide a Flowscan link to your token contract</p>
                                        <Paper
                                            component="form"
                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                        >
                                            <InputBase
                                                value={cflow}
                                                sx={{ ml: 1, flex: 1, }}
                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                placeholder=" "
                                                inputProps={{ 'aria-label': ' ' }}
                                                onChange={(e) => setCflow(e.target.value)}
                                            />
                                        </Paper>
                                    </div>
                                    <div className='text-box-wrap' >
                                        <p className='label-name'>Twitter</p>
                                        <p className='label-description'>Provide a link to your community Twitter</p>
                                        <Paper
                                            component="form"
                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                        >
                                            <InputBase
                                                value={ctwitter}
                                                sx={{ ml: 1, flex: 1, }}
                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                placeholder=" "
                                                inputProps={{ 'aria-label': ' ' }}
                                                onChange={(e) => setCtwitter(e.target.value)}
                                            />
                                        </Paper>
                                    </div>
                                    <div className='text-box-wrap' >
                                        <p className='label-name'>Discord</p>
                                        <p className='label-description'>Provide a link to your community Discord channel</p>
                                        <Paper
                                            component="form"
                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                        >
                                            <InputBase
                                                value={cdiscord}
                                                sx={{ ml: 1, flex: 1, }}
                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                placeholder=" "
                                                inputProps={{ 'aria-label': ' ' }}
                                                onChange={(e) => setCdiscord(e.target.value)}
                                            />
                                        </Paper>
                                    </div>
                                    <div className='text-box-wrap' >
                                        <p className='label-name'>GitHub</p>
                                        <p className='label-description'>Provide a link to your community open source GitHub repo</p>
                                        <Paper
                                            component="form"
                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                        >
                                            <InputBase
                                                value={cgithub}
                                                sx={{ ml: 1, flex: 1, }}
                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                placeholder=" "
                                                inputProps={{ 'aria-label': ' ' }}
                                                onChange={(e) => setCgithub(e.target.value)}
                                            />
                                        </Paper>
                                    </div>
                                    <div className='text-box-wrap' >
                                        <p className='label-name'>Website</p>
                                        <p className='label-description'>Provide a link to your community website</p>
                                        <Paper
                                            component="form"
                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                        >
                                            <InputBase
                                                value={cwebsite}
                                                sx={{ ml: 1, flex: 1, }}
                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                placeholder=" "
                                                inputProps={{ 'aria-label': ' ' }}
                                                onChange={(e) => setCwebsite(e.target.value)}
                                            />
                                        </Paper>
                                    </div>
                                    <div className='text-box-wrap' >
                                        <p className='label-name'>IPFS - Pinata</p>
                                        <p className='label-description'>IPFS will be use to store a permanent record of the proposal voting result.<br /> FlowCapture is using Pinata for this. If you do not have a Pinata account, <br />please create one to obtain the API key and API secret l</p>
                                        <Paper
                                            component="form"
                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none' }}
                                        >
                                            <InputBase
                                                value={cipfskey}
                                                sx={{ ml: 1, flex: 1, }}
                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                placeholder="Pinata API key"
                                                inputProps={{ 'aria-label': 'Pinata API key' }}
                                                onChange={(e) => setCipfskey(e.target.value)}
                                            />
                                        </Paper>
                                        <Paper
                                            component="form"
                                            sx={{ display: 'flex', alignItems: 'center', width: "100%", height: '43px', border: 'solid 1px #c9c9c9', background: '#FFF', boxShadow: 'none', marginTop: '15px' }}
                                        >
                                            <InputBase
                                                value={cipfsscret}
                                                sx={{ ml: 1, flex: 1, }}
                                                style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                placeholder="Pinata API secret"
                                                inputProps={{ 'aria-label': 'Pinata API secret' }}
                                                onChange={(e) => setCipfsscret(e.target.value)}
                                            />
                                        </Paper>
                                    </div>

                                </> : step == 3 ?
                                    <>
                                        <div className='text-box-wrap'  >
                                            <p className='label-name'>Space Controller(s)</p>
                                            <p className='label-description'>Space controllers have the role to create proposals in the community space.<br /> Assign space controllers by simply adding their wallet address below.<br /> You can edit the space controllers assignment after the creation of your community space.</p>
                                            {
                                                cspace.map((c, index) => {
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
                                                        value={address}
                                                        sx={{ ml: 1, flex: 1, }}
                                                        style={{ backgroundColor: 'white', fontSize: '14px' }}
                                                        placeholder="Enter wallet address"
                                                        inputProps={{ 'aria-label': 'Enter wallet address' }}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </Paper>
                                                <Button onClick={() => addSpace()} style={{ width: '30px', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', height: '43px', marginLeft: '10px' }}><AddIcon /></Button>
                                            </div>

                                        </div>

                                    </> : <></>
                    }
                    <div className="d-flex-end text-box-wrap mb-10">
                        <Button style={{ width: '200px', border: 'solid 1px #C1C1C1', textTransform: 'none', color: '#959595', }} onClick={() => next()} >{step == 3 ? "Create" : "Next"}</Button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Communitycreate

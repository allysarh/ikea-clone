import axios from 'axios';
import React, { useState } from 'react';
import { Input, Button, Jumbotron, Container, Alert } from 'reactstrap';
import { URL_API } from '../Helper';

const VerifPage = (props) => {
    const [inOtp, setInOtp] = useState('')
    const [color, setColor] = useState('success')
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    // cek token
    // console.log("lokasi", props.location.pathname.split('/')[2])

    const sendOtp = async () => {
        try {
            const headers = {
                headers: {
                    'Authorization': `Bearer ${props.location.pathname.split('/')[2]}`
                }
            }

            let res = await axios.post(URL_API + '/users/verifyOTP', { otp: inOtp.value }, headers)
            console.log("res data",res.data)
            alert(res.data.message)
            // setOpen(!open)
            // if(res.data.message == 1){
            //     setMessage('Verifikasi berhasil!')
            // } else {
            //     setMessage('Verifikasi gagal')
            //     setColor('danger')
            // }
            // setTimeout(()=> setOpen(open), 3000)
        } catch (error) {
            console.log("errror", error)
        }
    }

    return (
        <Container fluid style={{ margin: 'auto' }}>
            <Jumbotron style={{ width: '50%', margin: 'auto' }}>
                <h1>Hej! Please Verify Your Account</h1>
                <p>Type your OTP</p>
                <Input type="text" innerRef={(e) => setInOtp(e)} style={{ width: '30%' }} />
                <Button color="primary" onClick={sendOtp}>Verify Account</Button>
                <Alert color={color} isOpen={open}>
                    {message}
                </Alert>
            </Jumbotron>
        </Container>
    )
}

export default VerifPage
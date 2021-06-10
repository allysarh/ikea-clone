//username, email, psswd, sama confirm password

import Axios from 'axios';
import React from 'react';
import { Col, FormGroup, Label, Row, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Container, Button, Alert, Spinner } from 'reactstrap';
import BreadcrumbComp from '../components/BreadcrumbComp';
import { URL_API } from '../Helper';
import { connect } from 'react-redux'
import { authLogin } from '../action'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: true,
            alert: false,
            message: '',
            alertType: '',
            verifEmail: false,
            confPass: true,
            alertLogin: false,
            verifUlang: false,
            loading: false
        }
    }
    handlePassword = (value) => {
        console.log(this.inRegisPassword.value)
        let huruf = /[a-zA-Z]/
        let number = /[0-9]/
        if (huruf.test(this.inRegisPassword.value) && !number.test(this.inRegisPassword.value)) {
            console.log("hanya huruf")
        } else if (huruf.test(this.inRegisPassword.value) && number.test(this.inRegisPassword.value)) {
            console.log("huruf dan angka")
        }
        console.log(huruf.test(this.inRegisPassword.value))
    }

    // Membuat fungsi untuk register data /push
    onBtnRegis = () => {
        let username = this.inUsername.value
        let email = this.inRegisEmail.value
        let password = this.inRegisPassword.value
        let confPass = this.inConfirmPass.value
        let role = 'user'
        let cart = []

        console.log(username, email, password, confPass)
        // Mengecek apakah email sudah terdaftar atau belum

        // this.getDataEmail()
        // console.log("verif", this.state.verifEmail)

        if (username === "" || email === "" || password === "" || confPass === "") {
            // sederhanakan lagi nantiii
            this.setState((state, props) => ({
                alert: !this.state.alert,
                message: 'Isi semua form!',
                alertType: 'danger',
            }))


        } else {
            // mengecek fromat email
            if (email.includes('@')) {
                // mengecek email apakah sudah terdaftar atau belum
                Axios.get(URL_API + `/users/get-all?email=${this.inRegisEmail.value}`)
                    .then((res) => {
                        console.log("test", res.data[0])
                        if (res.data.length > 0) {
                            this.setState((state, props) => ({
                                alert: !this.state.alert,
                                message: 'Email sudah terdaftar!',
                                alertType: 'warning'
                            }))
                        } else {
                            if (password.match(/[a-z]/ig) && password.match(/[0-9]/ig)) {
                                Axios.post(URL_API + `/users/register`, {
                                    username, email, password
                                }).then(res => {
                                    this.setState((state, props) => ({
                                        alert: !this.state.alert,
                                        message: 'Registrasi akun sukses✔. Silahkan login',
                                        alertType: 'success'
                                    }))
                                    console.log(res.data)

                                }).catch((err) => {
                                    console.log(err)
                                })
                            } else {
                                this.setState((state, props) => ({
                                    alert: !this.state.alert,
                                    message: 'password terlalu lemah, masukkan password baru!',
                                    alertType: 'warning'
                                }))
                            }
                        }
                    })
                    .catch((err) => console.log(err))

            } else {
                this.setState((state, props) => ({
                    alert: !this.state.alert,
                    message: 'email salah!',
                    alertType: 'warning'
                }))
                this.inUsername.value = null
                this.inRegisEmail.value = null
                this.inRegisPassword.value = null
                this.inConfirmPass.value = null
            }

        }
        // mengatur waktu time out 
        setTimeout(() => this.setState({ alert: !this.state.alert }), 3000)
    }

    onBtnPass = () => {
        this.setState({ passType: !this.state.passType })
    }


    onBtnLogin = () => {
        // Axios.get(URL_API + `/users?email=${this.inEmail.value}&password=${this.inPassword.value}`)
        //     .then((res) => {
        //         if (res.data.length > 0) {
        //             this.props.authLogin(res.data[0])

        //             // menyimpan tokem ke dalam browser
        //             localStorage.setItem("tkn_id", res.data[0].id)
        //             this.setState({ redirect: true })
        //         } else {
        //             this.setState((state, props) => ({
        //                 alert: !this.state.alert,
        //                 message: 'Akun tidak ditemukan',
        //                 alertType: 'warning'
        //             }))
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("login error", err)
        //     })

        this.props.authLogin(this.inEmail.value, this.inPassword.value)
        if (this.props.status) {
            this.setState((state, props) => ({
                alertLogin: !this.state.alertLogin,
            }))
            
        }
        else {
            this.setState((state, props) => ({
                alertLogin: !this.state.alertLogin,
            }))
            setTimeout(() => this.setState({ alertLogin: !this.state.alertLogin }), 7000)

        }


    }

    //CARA REDIRECT1: redirect dengan cdu 
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.id){
    //         return <Redirect to="/" />
    //     }
    // }
    // INI GBS HARUS SETSTATE AJ YG DIUPDATENYAA

    // PASSWORD REGEX

    //VERIFIKASI ULANG
    verfikasiUlang = async () => {
        try {
            this.setState({ loading: true })
            await axios.post(URL_API + `/users/verif-ulang`, {
                email: this.inEmail.value, password: this.inPassword.value
            })
            this.setState({ loading: false })

            this.setState({alertLogin: !this.state.alertLogin})
            this.setState({ verifUlang: !this.state.verifUlang })
            setTimeout(() => this.setState({ verifUlang: !this.state.verifUlang }), 4000)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        // normal
        // if (this.state.redirect) {
        //     return <Redirect to="/" />
        // }
        if (this.props.id) {
            return <Redirect to="/" />
        }
        return (
            <Container fluid>
                <BreadcrumbComp />
                <div style={{ textAlign: 'center', margin: '2%' }}>
                    <h2>Pilihan Masuk</h2>
                    <p>Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat memiliki akun IKEA.</p>
                </div>
                <Row className="d-flex justify-content-center">
                    {/* LOGIN */}
                    <Col xs='4' className="d-flex flex-column justify-content-center " style={{ marginBottom: "10%" }}>
                        <Alert color={this.props.status ? "warning" : "danger"} isOpen={this.state.alertLogin}>
                            {this.props.status ? "Akun belum diverifikasi. " : "Email atau password anda salah. Pastikan akun anda telah terdaftar"}
                            {this.props.status &&
                                <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={this.verfikasiUlang}>Verifikasi Ulang</span>
                            }
                            {
                                this.state.loading &&
                                <Spinner size="sm" color="primary" />
                            }
                        </Alert>
                        <Alert color="success" isOpen={this.state.verifUlang}>
                            Verifikasi ulang berhasil. Silahkan cek kembali email anda.
                        </Alert>
                        <div className="m-3">
                            <h4>Silahkan masuk ke akun Anda</h4>
                            <p>Silakan masuk ke akun Anda untuk menyelesaikan pembayaran dengan data pribadi anda</p>
                            <Form>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" placeholder="Masukkan alamat email Anda.." innerRef={elemen => this.inEmail = elemen} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Kata Sandi</Label>
                                    <InputGroup>
                                        <Input type=
                                            {
                                                this.state.passType ? 'password' : 'text'
                                            } placeholder="Masukkan kata sandi Anda.." innerRef={elemen => this.inPassword = elemen} />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="btn btn-outline-secondary" onClick={this.onBtnPass}>
                                                {
                                                    this.state.passType ?
                                                        <span className="material-icons">
                                                            visibility_off
                                                    </span> :
                                                        <span className="material-icons">
                                                            visibility
                                                    </span>

                                                }
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" id="checkbox2" />{' '}
                                        Ingat saya
                                </Label>
                                </FormGroup><br />
                                <FormGroup>
                                    <Button size="lg" style={{ width: '100%', backgroundColor: ' #427AB3' }} onClick={this.onBtnLogin}>Masuk</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>

                    {/* REGISTER */}

                    <Col xs='4' className="mt-3 border-left" >
                        <div>
                            <Alert color={this.state.alertType} isOpen={this.state.alert}>
                                {this.state.message}
                            </Alert>
                        </div>
                        <div className="m-3">
                            <h4>Daftar dan nikmati</h4>
                            <p>Ada banyak keuntungan yang Anda dapatkan dengan membuat akun IKEA:
                            <ul>
                                    <li>Anda dapat membuat dan menyimpan daftar belanja untuk memudahkan Anda
                                    saat berbelanja ke toko IKEA
                                </li>
                                    <li>Buat dan simpan perencanaan dapur Anda</li>
                                </ul>
                            </p>
                            <div>

                            </div>
                            <FormGroup>
                                <Label for="email">Username</Label>
                                <Input type="email" placeholder="Masukkan alamat username Anda.." innerRef={elemen => this.inUsername = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" placeholder="Masukkan alamat email Anda.." innerRef={elemen => this.inRegisEmail = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Kata Sandi</Label>
                                <InputGroup>
                                    <Input type={
                                        this.state.passType ? 'password' : 'type'
                                    } onChange={this.handlePassword} placeholder="Masukkan kata sandi Anda.." innerRef={elemen => this.inRegisPassword = elemen} />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText className="btn btn-outline-secondary " onClick={this.onBtnPass}>
                                            {
                                                this.state.passType ?
                                                    <span className="material-icons">
                                                        visibility_off
                                                    </span> :
                                                    <span className="material-icons">
                                                        visibility
                                                </span>
                                            }
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Konfirmasi Kata Sandi</Label>
                                <InputGroup>
                                    <Input type={this.state.confPass} placeholder="Masukkan kata sandi Anda.." innerRef={elemen => this.inConfirmPass = elemen} />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText className="btn btn-outline-secondary " onClick={this.onBtnPass}>
                                            {
                                                this.state.confPass ?
                                                    <span className="material-icons">
                                                        visibility_off
                                                    </span> :
                                                    <span className="material-icons">
                                                        visibility
                                                    </span>
                                            }
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup><br />
                            <FormGroup>
                                <Button size="lg" style={{ width: '100%', backgroundColor: ' #427AB3' }} onClick={this.onBtnRegis}>Daftar</Button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </Container>

        )

    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        status: authReducer.status
    }
}
//1: ngambil data(map state to props), 2: hubungin dengan action (data -> action)
export default connect(mapStateToProps, { authLogin })(LoginPage);
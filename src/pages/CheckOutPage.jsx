import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Container, Input, Label } from 'reactstrap';
import { URL_API } from '../Helper'
import { getProductAction, getTransactionAction } from '../action'
import { Redirect } from 'react-router';

class CheckOutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTransaction: [],
            transactionCart: [],
            redirectHistory: false
        }
    }

    componentDidMount() {
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        axios.get(URL_API + `/transactions/?idUser=${this.props.id}`)
            .then((res) => {
                // console.log("get data transaksi", res.data)
                this.setState({ dataTransaction: res.data})
                this.setState({ transactionCart: res.data.cart })
                this.props.getTransactionAction(res.data)

            })
            .catch((err) => console.log("error", err))
    }

    printInfoCust = () => {
        return (
            <>
                <span>{this.props.username}</span><br />
                <span>{this.props.email}</span>
            </>
        )
    }
    printDataTransaction = () => {
        let unpaidTransactions = this.state.dataTransaction.filter(item => item.statusPaid === "unpaid")
        return unpaidTransactions.map((item, index) => {
            return (
                <>
                    <div >
                        <div>
                            {
                                item.cart.map((item, index) => {
                                    return (
                                        <div className="d-flex">
                                            <img height="100vh" src={item.image} />
                                            <div className="d-flex flex-column justify-content-center">
                                                <span>{item.qty} x {item.nama}</span>
                                                <span>{item.type}</span>
                                                <h6>Rp. {item.total.toLocaleString()}</h6>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <span className="m-1">Date: {item.date}</span><br />
                        <span className="m-1">Status:</span><Badge color="danger">{item.statusPaid}</Badge>
                    </div>
                    <hr />
                </>
            )
        })
    }

    getAllPrice = () => {
        let totalAll = this.state.dataTransaction.filter(e => e.statusPaid === "unpaid").map((item, index) => {
            return item.totalPayment
        })
        return totalAll.reduce((a, b) => (a + b), 0)

    }
    bayar = () => {
        // let statusPaidChanged = this.state.dataTransaction.map((item, index) => {
        //     delete item.statusPaid
        //     return item
        // }).map((item, index) => {
        //     item.statusPaid = "paid"
        //     return item
        // })
        
        // console.log(statusPaidChanged)
        // console.log("id", this.state.dataTransaction[0].id)
        
        let dataUnpaid = this.state.dataTransaction.filter(e => e.statusPaid === "unpaid")
        let totalPayment = Math.round(this.getAllPrice() * 110 / 100)
        console.log("total",totalPayment)
        
        axios.patch(URL_API + `/transactions/${dataUnpaid[0].id}`, {
            statusPaid: "paid", totalPayment: totalPayment
        })
            .then((res) => {
                console.log("respon patch status", res.data)
                this.getDataTransaction()
            })
            .catch((err) => console.log("get respon patch bayar error", err))
        this.setState({redirectHistory: !this.state.redirectHistory})

    }
    render() {
        if(this.state.redirectHistory){
            return <Redirect to="/history" />
        } else {
            return (
                <Container>
                    <h2 style={{ textAlign: 'center' }}>
                        Cek kembali pesanan Anda
                    </h2>
                    <hr />
                    <div>
                        <div className="row d-flex">
                            <div className="col-5">
                                <h5>Tas belanja</h5><hr />
                                {this.printDataTransaction()}
                            </div>
                            <div className="col-7">
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <h5>Informasi Pelanggan</h5>
                                        <span className="material-icons">
                                            edit
                                    </span>
                                    </div>
                                    <span>
                                        {this.printInfoCust()}
                                    </span><hr />
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <h5>Layanan yang dipilih</h5>
                                        <span className="material-icons">
                                            edit
                                    </span>
                                    </div>
                                    <h6>Ambil Sendiri</h6>
                                    <p>Kota Baru Parahyangan Bandung Store</p>
                                </div>
                                <div>
                                    <span>Jumlah Produk: </span><hr />
                                    <div>
                                        <h4>Ringkasan</h4>
                                        <h6>Produk: Rp.{this.getAllPrice().toLocaleString()}</h6>
                                        <h6>Pajak 10%: {Math.round((this.getAllPrice() * 10 / 100)).toLocaleString()}</h6>
                                    </div><hr />
                                    <div>
                                        <h5>Total termasuk pajak: Rp. {Math.round((this.getAllPrice() * 110 / 100)).toLocaleString()}</h5>
                                    </div><hr />
                                    <div>
                                        <h5>Bayar dengan e-Voucher</h5>
                                        <div className="d-flex">
                                            <Input placeholder="Masukkan nomor e-Voucher e.g:EGVxxxxxxxxx" className="mr-2" />
                                            <Button style={{ color: '407AB1' }}>Tambah</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h5>Metode pemabyaran yang tersedia</h5>
                                    <p>Kami menerima metode pembayaran berikut. Silahkan pilih metode pembayaran</p>
                                    <h6>Bank transfer dan kartu kredit</h6>
                                    <div className="d-flex flex-wrap m-3">
                                        <input type="radio" className="mr-3" />
                                        <div>
                                            <div>
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/Visa.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/MasterCard.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/jcb.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/american_express.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/BCA_Bank.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/Mandiri_bank.svg" height="20vh" />
                                            </div>
                                            <div>
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/BNI_Vector.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/PermataBank.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/atm_bersama.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/bca-klikpay.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/CIMB_Clicks.svg" height="20vh" />
                                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/gopay.svg" height="20vh" />
                                            </div>
                                        </div><hr />
                                    </div><hr />
                                    <h6>Kredivo</h6>
                                    <div className="d-flex m-3">
                                        <input type="radio" className="mr-3" />
                                        <div>
                                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/static_content/payment_partners/logo-kredivo.svg" height="20vh" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex flex-wrap mx-3">
                                        <Input type="checkbox" />
                                        <Label>Saya sudah membaca dan memahami Syarat dan Ketentuan Umum IKEA.</Label>
                                        <Button color="warning" style={{ width: '100%' }} onClick={this.bayar}>Lanjutkan Pembayaran</Button>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="row">
    
                    </div>
                </Container>
            );
        }
        
    }
} const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        username: authReducer.username,
        email: authReducer.email
    }
}
export default connect(mapStateToProps, { getProductAction, getTransactionAction })(CheckOutPage);
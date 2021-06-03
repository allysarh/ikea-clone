import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Badge } from 'reactstrap';
import { URL_API } from '../Helper';


class ModalDetailTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        // this.getTransactions()
    }
    // getTransactions = () => {
    //     axios.get(URL_API + `/transactions/get-trans/0`)
    //         .then((res) => {
    //             this.setState({ transactions: res.data })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    printCart = () => {
        return this.props.dataDetail.transactionDetail.map((item, index) => {
            console.log("data detail:", this.props.dataDetail)
            return (
                <tr>
                    <td className="d-flex">
                        <div>
                            <span><h6>{item.nama}</h6></span>
                            <span>TYPE: {item.type}</span>
                        </div>
                    </td>
                    <td>{item.qty}</td>
                    <td>Rp. {item.harga.toLocaleString()}</td>
                </tr>
            )
        })
    }
    render() {
        console.log("data detail", this.props.dataDetail)
        let { invoice, note, date, status, ongkir, total_payment } = this.props.dataDetail
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="md">
                    <ModalHeader toggle={this.props.toggle}>Detail Pembelian</ModalHeader>
                    <ModalBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tanggal: {date}</span>
                            <Badge color={status == "Unpaid" ? "danger" : status == "Paid" ? "warning": "success"}>Status: {status}</Badge>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>Invoice: {invoice}</span>
                            <span>Note: {note}</span>
                        </div>
                        <Table>
                            <thead>
                                <td>Produk</td>
                                <td>Jumlah</td>
                                <td>Subtotal</td>
                            </thead>
                            <tbody>
                                {invoice && this.printCart()}
                            </tbody>
                            <tbody style={{ width: '100%', borderTop: '1px solid black', padding: '1%'}}>
                                <td colSpan={2}>Ongkir: </td>
                                <td>Rp. {ongkir && ongkir.toLocaleString()}</td>
                            </tbody>
                            <tbody style={{ width: '100%', borderTop: '1px solid black', padding: '1%', fontWeight: 'bold'}}>
                                <td colSpan={2} >Total Pembayaran: </td>
                                <td>Rp. {(ongkir + total_payment).toLocaleString()}</td>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>Close</Button>{' '}
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id
    }
}
export default connect(mapStateToProps)(ModalDetailTrans);
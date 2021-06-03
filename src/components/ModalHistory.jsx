import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Badge } from 'reactstrap';

class ModalHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { date, status, invoice, note, transactionDetail, total_payment, ongkir } = this.props.dataHistory
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="lg">
                    <ModalHeader toggle={this.props.toggle}>Detail Transaksi</ModalHeader>
                    <ModalBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tanggal: {date}</span>
                            <Badge color={status == "Unpaid" ? "danger" : status == "Paid" ? "warning": "success"}>Status: {status}</Badge>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>Invoice: {invoice}</span>
                            <span>Note: {note}</span>
                        </div>
                        <div>
                            <Table>
                                <thead>
                                    <td>No</td>
                                    <td>Produk</td>
                                    <td>Type</td>
                                    <td>Harga</td>
                                    <td>Qty</td>
                                    <td>Total</td>
                                </thead>
                                <tbody>
                                    {
                                        invoice && transactionDetail.map((item, index) => {
                                            console.log("detail transaksi: ", this.props.dataHistory.transactionDetail)
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama}</td>
                                                    <td>{item.type}</td>
                                                    <td>Rp. {item.harga.toLocaleString()}</td>
                                                    <td>{item.qty}</td>
                                                    <td>Rp. {(item.qty * item.harga).toLocaleString()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tbody style={{ width: '100%', borderTop: '1px solid black', padding: '1%' }}>
                                    <td colSpan={5}>Ongkir: </td>
                                    <td>Rp. {ongkir && ongkir.toLocaleString()}</td>
                                </tbody>
                                <tbody style={{ width: '100%', borderTop: '1px solid black', padding: '1%', fontWeight: 'bold' }}>
                                    <td colSpan={5} >Total Pembayaran: </td>
                                    <td>Rp. {(ongkir + total_payment).toLocaleString()}</td>
                                </tbody>
                            </Table>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalHistory;
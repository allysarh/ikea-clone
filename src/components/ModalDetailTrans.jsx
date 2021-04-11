import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { URL_API } from '../Helper';


class ModalDetailTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        this.getTransactions()
    }
    getTransactions = () => {
        axios.get(URL_API + `/transactions`)
            .then((res) => {
                this.setState({ transactions: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    printCart = () => {
        return this.props.cart.map((item, index) => {
            return (
                <tr>
                    <td className="d-flex">
                        <img src={item.image} height="100vh" />
                        <div>
                            <span><h6>{item.nama}</h6></span>
                            <span>TYPE: {item.type}</span>
                        </div>
                    </td>
                    <td>{item.qty}</td>
                    <td>Rp. {item.total.toLocaleString()}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="lg">
                    <ModalHeader toggle={this.props.toggle}>Detail Pembelian</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <td>Produk</td>
                                <td>Jumlah</td>
                                <td>Subtotal</td>
                            </thead>
                            <tbody>
                                {this.printCart()}
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
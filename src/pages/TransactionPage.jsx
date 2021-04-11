import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Table } from 'reactstrap';
import ModalDetailTrans from '../components/ModalDetailTrans';
import { URL_API } from '../Helper';
import { getTransactionAction } from '../action'

class TransactionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            modal: false,
            dataCart: []
        }
    }

    componentDidMount() {
        this.getTransactions()
    }
    getTransactions = () => {
        axios.get(URL_API + `/transactions`)
            .then((res) => {
                console.log("res transactions", res.data)
                this.setState({ transactions: res.data })
                this.props.getTransactionAction(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    printTransaction = () => {
        if (this.state.transactions.length > 0) {
            let { transactions } = this.state
            return transactions.map((item, index) => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.date}</td>
                        <td>{item.statusPaid}</td>
                        <td>
                            <Button onClick={() => this.setState({ dataCart: item.cart, modal: !this.state.modal })}>
                                Detail
                            </Button>
                        </td>
                    </tr>
                )
            })
        } else {
            return <tr>
                <td>Belum ada transaksi</td>
            </tr>
        }
    }


    render() {
        return (
            <Container fluid>
                <h1 style={{ textAlign: 'center' }}>Users Transaction Page</h1>
                <div style={{ width: '100%' }}>
                    <Table >
                        <thead>
                            <td>No</td>
                            <td>Username</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </thead>
                        <tbody>
                            {this.printTransaction()}
                        </tbody>
                    </Table>
                </div>

                {/* modal */}
                <ModalDetailTrans modal={this.state.modal} toggle={this.toggle} cart={this.state.dataCart} />
            </Container>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id
    }
}
export default connect(mapStateToProps, { getTransactionAction })(TransactionPage);
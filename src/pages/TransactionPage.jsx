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
            dataDetail: [],
            dataTransakiDetail: []
        }
    }

    componentDidMount() {
        this.props.getTransactionAction(0)
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    onBtnConfirm = async (id) => {
        try {
            console.log("idtrans", id)
            let res = await axios.patch(URL_API + `/transactions/update-trans/${id}`, {
                idstatus: 8
            })
            console.log(res.data)
            this.props.getTransactionAction(0)
        } catch (error) {
            console.log(error)
        }
    }
    printTransaction = () => {
        let { dataTrans } = this.props
        console.log("datatransa", dataTrans)
        if (dataTrans.length > 0) {
            return dataTrans.map((item, index) => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        <td>
                            <Button color="warning" onClick={() => this.setState({ dataDetail: item, modal: !this.state.modal })}>
                                Detail
                            </Button>
                            <Button className="mx-3" color="success" disabled={item.status == "Unpaid" && true} onClick={() => this.onBtnConfirm(item.idtransaction)}>
                                Confirm
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
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Table style={{ textAlign: 'center', width: '80%' }}>
                        <thead style={{ fontWeight: 'bolder', backgroundColor: '#f5f5f5' }}>
                            <td>No</td>
                            <td>ID user</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td >Action</td>
                        </thead>
                        <tbody>
                            {this.printTransaction()}
                        </tbody>
                    </Table>
                </div>

                {/* modal */}
                <ModalDetailTrans modal={this.state.modal} toggle={this.toggle} dataDetail={this.state.dataDetail} dataTrans={this.state.dataTransakiDetail} />
            </Container>
        );
    }
}

const mapStateToProps = ({ authReducer, TransactionsReducer }) => {
    return {
        id: authReducer.id,
        dataTrans: TransactionsReducer.transaction_list
    }
}
export default connect(mapStateToProps, { getTransactionAction })(TransactionPage);
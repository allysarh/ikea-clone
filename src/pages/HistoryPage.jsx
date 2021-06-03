import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux'
import { Table, Button } from 'reactstrap';
import { getTransactionAction } from '../action'
import ModalHistory from '../components/ModalHistory';
import { URL_API } from '../Helper';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionsHistory: [],
            modal: false,
            dataHistory: []

        }
    }

    componentDidMount() {
        this.getTransactionsHistory()
    }
    getTransactionsHistory = async () => {
        try {
            let res = await axios.get(URL_API + `/transactions/get-trans/${this.props.id}`)
            this.setState({ transactionsHistory: res.data }, () => console.log(this.state.transactionsHistory))
        } catch (error) {
            console.log(error)
        }
        
    }

    onBtnDetail = (item) => {
        console.log(item)
        this.toggle()
        this.setState({ dataHistory: item })
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    printHistory = () => {
        // console.log(this.props.transactions)
        let historyUser = this.state.transactionsHistory.filter(e => e.id === this.props.id)
        return historyUser.map((item, index) => {
            return (
                <tr>
                    <td>{item.date}</td>
                    <td>
                        {
                            item.transactionDetail.map((i, index) => {
                                return (
                                    <div className="d-flex">
                                        {/* <img src={i.image} style={{height: '10vh', margin: '3%'}}/> */}
                                        <div className="d-flex flex-column">
                                            <span>{i.nama}</span>
                                            <span>{i.type}</span>
                                            <span>{i.qty} x {i.harga}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </td>
                    <td>{item.status}</td>
                    <td>Rp. {item.total_payment.toLocaleString()}</td>
                    <td>
                        <Button onClick={() => this.onBtnDetail(item)}>Detail</Button>

                    </td>
                </tr>
            )
        })
    }
    render() {

        return (
            <>
                <h1 style={{ textAlign: 'center' }}>Your History</h1>
                <h6>{this.props.transactions.username}</h6>
                <div>
                    <Table >
                        <thead style={{ fontWeight: 'bolder' }}>
                            <td>Tanggal</td>
                            <td>Produk</td>
                            <td>Status</td>
                            <td>Total Harga</td>
                            <td>Action</td>
                        </thead>
                        <tbody>
                            {this.printHistory()}
                        </tbody>
                    </Table>
                </div>
                {/* MODAL */}
                <ModalHistory modal={this.state.modal} toggle={this.toggle} dataHistory={this.state.dataHistory}/>

            </>
        );
    }
}

const mapStateToProps = ({ authReducer, TransactionsReducer }) => {
    return {
        id: authReducer.id,
        transactions: TransactionsReducer.transaction_list
    }
}
export default connect(mapStateToProps, { getTransactionAction })(HistoryPage);
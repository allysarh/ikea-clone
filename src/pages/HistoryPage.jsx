import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';
import { getTransactionAction } from '../action'
import { URL_API } from '../Helper';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionsHistory: []
        }
    }

    componentDidMount(){
        this.getTransactionsHistory()
    }
    getTransactionsHistory = () =>{
        axios.get(URL_API + `/transactions`)
        .then((res) =>{
            console.log("respon data transaksi", res.data)
            this.setState({transactionsHistory: res.data})
        })
        .catch((err) =>{
            console.log("erro get transaction history", err)
        })
    }
    printHistory = () =>{
        // console.log(this.props.transactions)
        let historyUser =  this.state.transactionsHistory.filter(e => e.idUser === this.props.idUser)
        return historyUser.map((item, index) =>{
            return(
                <tr>
                    <td>{item.date}</td>
                    <td>
                        {
                            item.cart.map((item, index) =>{
                                return (
                                    <div className="d-flex">
                                        <img src={item.image} style={{height: '10vh', margin: '3%'}}/>
                                        <div className="d-flex flex-column">
                                            <span>{item.nama}</span>
                                            <span>{item.type}</span>
                                            <span>{item.qty} x {item.harga}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </td>
                    <td>{item.statusPaid}</td>
                    <td>Rp. {item.totalPayment.toLocaleString()}</td>
                </tr>
            )
        })
    }
    render() {
        
        return (
            <>
                <h1 style={{textAlign: 'center'}}>Your History</h1>
                <h6>{this.props.transactions.username}</h6>
                <div>
                    <Table >
                        <thead style={{fontWeight: 'bolder'}}>
                            <td>Tanggal</td>
                            <td>Produk</td>
                            <td>Status</td>
                            <td>Total Harga</td>
                        </thead>
                        <tbody>
                            {this.printHistory()}
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ authReducer, TransactionsReducer }) => {
    return {
        idUser: authReducer.id,
        transactions: TransactionsReducer.transaction_list
    }
}
export default connect(mapStateToProps, { getTransactionAction })(HistoryPage);
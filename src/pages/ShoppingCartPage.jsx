import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Container, Table, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import { updateCart, getProductAction, updateProducts } from '../action'
import { URL_API } from '../Helper';
import { Redirect } from 'react-router-dom';
// import { authReducer } from '../reducer/AuthReducer';

class ShoppingCartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // output: this.props.cart,
            statusPaid: "unpaid",
            redirectCO: false
        }
    }
    componentDidMount() {
        this.props.getProductAction()
        // this.productDecrement()
        // this.cartMerged()
    }
    // cartMerged = () => {
    //     let arr = [...this.props.cart]
    //     let merged = arr.reduce((acc, cur) => {
    //         let nama = cur.nama
    //         let type = cur.type
    //         let found = acc.find((elem) => {
    //             if (elem.nama === nama && elem.type === type) {
    //                 return [nama, type]
    //             }
    //         });
    //         if (found) {
    //             // console.log("found",found)
    //             found.qty += cur.qty;
    //         } else {
    //             acc.push(cur);
    //         }
    //         return acc;
    //     }, []);

    //     axios.patch(URL_API + `/users/${this.props.id}`, {
    //         cart: merged
    //     }).then((res) => {
    //         console.log("hasil patch:", res.data)
    //         //update di reducer
    //         this.props.updateCart([...merged])
    //     })

    //     this.props.getProductAction()
    //     console.log("merged", merged)
    //     return merged
    // }

    onBtnIncrement = (index) => {
        this.props.cart[index].qty++
        // agar memperbaharui komponen, harus disediakan temporary data
        this.props.updateCart([...this.props.cart])
        // console.log("props cart sesudah", this.props.cart[index].qty)
    }

    onBtnDecrement = (index) => {
        if (this.props.cart[index].qty > 1) {
            this.props.cart[index].qty--
            this.props.updateCart([...this.props.cart])
        }
    }
    getAllQty = () => {
        return this.props.cart.map((item, index) => {
            return item.qty
        }).reduce((a, b) => a + b, 0)
    }

    getAllPrice = () => {
        return this.props.cart.map((item, index) => {
            return (item.qty * item.harga)
        }).reduce((a, b) => a + b, 0)
    }
    printCart = () => {

        return this.props.cart.map((item, index) => {
            return (
                <tr>
                    <td>
                        <div className="d-flex ">
                            <img src={item.image} height="150vh" />
                            <span className="m-2">
                                <h6>{item.nama}</h6>
                                TYPE: {item.type}
                                <h5>Rp. {item.harga.toLocaleString()}</h5>

                            </span>
                        </div>
                    </td>
                    <td>
                        <span className="d-flex align-items-right justify-content-center m-3">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend" className="border append-prepend">
                                    <span class="material-icons" onClick={() => this.onBtnDecrement(index)}>
                                        remove
                                                </span>
                                </InputGroupAddon>
                                <Input size="sm" placeholder="qty" style={{ textAlign: 'center', width: "10px" }} value={item.qty} innerRef={el => this.inputQty = el} />
                                <InputGroupAddon addonType="append" className="append-prepend">
                                    <span className="material-icons border" onClick={() => this.onBtnIncrement(index)}>
                                        add
                                                </span>
                                </InputGroupAddon>
                            </InputGroup>
                        </span>
                    </td>
                    <td className="d-flex justify-content-center align-tems-center">
                        <h5>
                            Rp. {(item.harga * item.qty).toLocaleString()}
                        </h5>
                    </td>
                    <div style={{ float: 'right', marginTop: '15vh', display: 'flex' }}>
                        <div className="d-flex align-items-center m-2">
                            <Button className="d-flex align-items-center">
                                <span className="material-icons mx-1">
                                    visibility
                            </span>
                                <span>Lihat Sekilas</span>
                            </Button>
                        </div>
                        <div className="d-flex align-items-center m-1">
                            <Button color="warning" className="d-flex align-items-center" onClick={() => this.onBtnRemove(index)}>
                                <span className="material-icons">
                                    delete_outline
                            </span>
                                <span>Hapus</span>
                            </Button>
                        </div>
                    </div>
                </tr>
            )
        })
    }

    onBtnRemove = (index) => {
        this.props.cart.splice(index, 1)
        axios.patch(URL_API + `/users/${this.props.id}`, { cart: this.props.cart })
            .then((res) => {
                this.props.updateCart([...this.props.cart])
            })
            .catch((err) => {
                console.log("error remove", err)
            })
    }

    resetCart = () => {
        let cartReset = []
        axios.patch(URL_API + `/users/${this.props.id}`, {
            cart: cartReset
        })
            .then((res) => {
                console.log("respon reset cart", res.data)
            })
            .catch((err) => [
                console.log("error reset cart", err)
            ])
    }

    onBtnCheckOut = () => {
        // console.log(this.props.cart.qty)
        //mengurangi qty produk dulu (patch)
        //idUser,, username , date, totalPayment, status(paid/unpaid), cart
        console.log(this.props.cart)
        console.log(this.props.product)

        this.props.cart.forEach((item, index) =>{
            this.props.product.forEach((value, idx) =>{
                if(item.nama === value.nama){
                    console.log(item.nama, value.nama)
                    console.log(value.stok, item.type)
                    let idxStok = value.stok.findIndex(val =>{
                        return val.type === item.type
                    })
                    // console.log(idxStok+1)
                    // console.log("itemqty",item.qty)
                    // console.log("befor", value.stok[idxStok+1].qty)
                    value.stok[idxStok].qty -= item.qty
                    // console.log("after",value.stok[idxStok+1].qty)
                    // console.log(value.stok)
                    axios.patch(URL_API + `/products/${value.id}`, {
                        stok: parseInt(value.stok)
                    })
                    .then((res) =>{
                        console.log("respon patch produk", res.data)
                    }).catch(err => console.log(err))
                }
            })
        })
        let idUser = this.props.id
        let username = this.props.username
        let totalPayment = this.getAllPrice()
        let statusPaid = this.state.statusPaid
        let cart = this.props.cart

        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();

        date = mm + '/' + dd + '/' + yyyy;
        let cartReset = []

        console.table([{ idUser, username, totalPayment, statusPaid, cart, date }])
        
        if (cart.length > 0) {
            ///post data ke database transaksi
            axios.post(URL_API + `/transactions`, {
                idUser, username, totalPayment, statusPaid, cart, date
            })
                .then((res) => {
                    console.log(res.data)
                    this.props.updateCart(cartReset)
                    this.resetCart()
                    this.setState({ redirectCO: !this.state.redirectCO })
                })
                .catch((err) => console.log(err))
            
                //post hapus data di database produk
                
        } else {
            alert("anda belum memilih barang!")
        }

        //tugas 1: kalo add cart yang sama, yg berubah cuma qty nya
        // TUGAS 2: CO 
        // Tgas3: nampilin  produk di navbar

        //axios post ke table user transaction
        //data user transaction ditampilkan history page user, transaction page admin

        //patch data di database produk
        
    }
    render() {
        if (this.state.redirectCO) {
            return <Redirect to="/check-out" />
        } else {
            return (
                <Container>
                    <h3 style={{ textAlign: 'center', margin: '1%' }}>Keranjang Belanja Anda</h3>
                    <p style={{ textAlign: 'center', fontSize: '15px', margin: '2%' }}>{this.getAllQty()} PRODUK,
                    <span style={{ fontWeight: 'bolder' }}>
                            Rp. {this.getAllPrice().toLocaleString()}
                        </span>
                    </p>
                    {/* {this.productDecrement()} */}
                    <div>
                        <Table hover style={{ borderTop: 'none' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th>Produk</th>
                                    <th>Jumlah</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printCart()}
                            </tbody>
                        </Table>
                    </div>
                    <hr />
                    <Button color="primary" className="d-flex align-items-center" onClick={this.onBtnCheckOut}>
                        <span className="material-icons m-1">
                            shopping_bag
                    </span>
                        <span>Check Out</span>
                    </Button>
                </Container>
            );
        }
    }
}

const mapStateToProps = ({ authReducer, ProductReducers }) => {
    return {
        cart: authReducer.cart,
        id: authReducer.id,
        username: authReducer.username,
        product: ProductReducers.products_list
    }
}
export default connect(mapStateToProps, { updateCart, getProductAction, updateProducts })(ShoppingCartPage);
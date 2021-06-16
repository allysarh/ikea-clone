import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { URL_API } from '../Helper';
import { updateCart, getProductAction, updateCartQty } from '../action'
import './ProductDetail.css'
import { authReducer } from '../reducer/AuthReducer';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false,
            output: 1,
            typeCO: "",
            total: 0,
            selectedType: {}
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }
    getProductDetail = () => {
        //mendapatkan query ID
        console.log("location", this.props.location)
        let idProduk = this.props.location.search.split("=")[1]
        console.log(idProduk)
        axios.get(URL_API + `/products/read?idProduk=${idProduk}`)
            .then(res => {
                console.log("data detail", res.data)
                this.setState({ detail: res.data[0] })
            })
            .catch((err) => [
                console.log("err", err)
            ])
    }

    renderImages = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image" src={item.images} key={index} width="100%"
                    onClick={() => this.setState({ thumbnail: index })} />
            )
        })
    }

    onBtnIncrement = () => {
        if (this.state.output < this.state.selectedType.qty) {
            this.setState({ output: this.state.output + 1 })
        } else {
            alert('Produk out of stock!')
        }

    }

    onBtnDecrement = () => {
        if (this.state.output > 1) {
            this.setState({ output: this.state.output - 1 })


        }
    }



    onBtnAddToCart = async () => {
        if (this.state.selectedType.type) {
            console.log("cart", this.props.cart)
            console.log(this.state.selectedType)
            let { stok, idProduk } = this.state.detail
            let id = this.props.id
            let idproduk_stok = this.state.selectedType.idproduk_stok
            let qty = this.state.output
            let index = this.props.cart.findIndex(i => i.idproduk_stok === idproduk_stok && i.type === this.state.selectedType.type)
            console.log("index", index)
            console.log({ id, idProduk, idproduk_stok, qty })

            try {
                if (index < 0) {
                    let token = localStorage.getItem("tkn_id")
                    const headers = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                    let addCart = await axios.post(URL_API + `/transactions/post-cart`, { idProduk, idproduk_stok, qty }, headers)
                    this.props.updateCart(addCart.data)
                } else {
                    this.props.cart[index].qty++
                    console.log("qty cart baru:", this.props.cart[index].qty)
                    this.props.updateCartQty({ id, qty: this.props.cart[index].qty, idcart: this.props.cart[index].idcart })
                }
                alert("add to cart success✅✅")
            } catch (error) {
                alert("error add cart")
                console.log(error)
            }

            // add ke cart
            // console.log("cart", this.props.cart)
            // let qtyCO = this.state.output
            // let type = this.state.typeCO
            // let nama = this.state.detail.nama
            // let harga = this.state.detail.harga
            // let image = this.state.detail.images[0].images

            // console.log("total",this.state.total)
            // this.setState({total: this.state.output * this.state.detail.harga})


            // let cart = { qty: qtyCO, nama: nama, harga: harga, total: this.state.total, image: image, type: type }
            // console.log("cart:",cart)
            // console.log("data detail", this.state.detail)
            // console.log("idstok:", this.state.detail.stok[0].idproduk_stok)

            // this.props.cart.push({
            //     qty: qtyCO,
            //     nama: nama,
            //     harga: harga,
            //     total: this.state.output * this.state.detail.harga,
            //     image: image,
            //     type: type
            // })

            // let arr = [...this.props.cart]
            // kalau tipenya sama tambhain qty bukan array baru
            // let merged = arr.reduce((acc, cur) => {
            //     let nama = cur.nama
            //     let type = cur.type
            //     let found = acc.find((elem) => {
            //         if (elem.nama === nama && elem.type === type) {
            //             return [nama, type]
            //         }
            //     });
            //     if (found) {
            //         // console.log("found",found)
            //         found.qty += cur.qty;
            //     } else {
            //         acc.push(cur);
            //     }
            //     return acc;
            // }, []);

            // update data cart di reducer
            // axios.patch(URL_API + `/users/${this.props.id}`, {
            //     cart: {id, idProduk, idproduk_stok, qty}
            // })
            //     .then((res) => {
            //         console.log("hasil patch:", res.data)
            //         this.props.getProductAction()
            //     })

            // alert("Berhasil menambahkan!")
            // reset ke 0

            this.setState({ output: 1 })

        }

    }
    render() {
        // console.log(this.state.output)
        // if (this.state.detail) {

        // }
        // let { brand, nama, harga } = this.state.detail
        return (
            <div className="row p-5">
                {
                    this.state.detail.idProduk ?
                        <>
                            <div className="col-md-1">
                                {this.renderImages()}
                            </div>
                            <div className="col-md-7">
                                <img src={this.state.detail.images[this.state.thumbnail].images} width="100%" />
                            </div>
                            <div className="col-md-4">
                                <div style={{ borderBottom: '1px solid grey' }}>
                                    <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.nama}</h4>
                                    <h6 className="text-mute">{this.state.detail.brand}</h6>
                                    <h2>Rp. {this.state.detail.harga.toLocaleString()}</h2>
                                    <p>Batas pembelian 10pcs</p>
                                </div>
                                <div style={{ borderBottom: '1px solid grey', cursor: 'pointer' }}>
                                    <span className="d-flex justify-content-between m-1" onClick={() => this.setState({ openType: !this.state.openType })}>
                                        <h6>Type : {this.state.typeCO}</h6>
                                        <span class="material-icons" >
                                            expand_more
                                        </span>
                                    </span>
                                    <Collapse isOpen={this.state.openType}>
                                        {
                                            this.state.detail.stok.map((item, index) => {
                                                return (
                                                    <div>
                                                        <Button outline color="secondary" size="sm" style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                            onClick={() => this.setState({ typeCO: item.type, selectedType: item, output: 1 })}>
                                                            {item.type} : {item.qty}
                                                        </Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </div>

                                <div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span> Jumlah: </span>
                                    <span className="d-flex align-items-right justify-content-center m-3">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend" className="border append-prepend">
                                                <span class="material-icons" onClick={this.onBtnDecrement}>
                                                    remove
                                                </span>
                                            </InputGroupAddon>
                                            <Input size="sm" placeholder="qty" style={{ textAlign: 'center' }} value={this.state.output} innerRef={el => this.inputQty = el} />
                                            <InputGroupAddon addonType="append" className="append-prepend">
                                                <span className="material-icons border" onClick={this.onBtnIncrement}>
                                                    add
                                                </span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </span>
                                </div>
                                <div>
                                    <Button color="warning" style={{ width: '100%' }} className="d-flex align-items-center justify-content-center m-3"
                                        onClick={this.onBtnAddToCart}>
                                        <h6>Tambahkan ke Keranjang </h6>
                                        <span className="material-icons m-1">
                                            shopping_cart
                                        </span>
                                    </Button>
                                    <Button outline color="secondary" style={{ width: '100%' }} className="d-flex align-items-center justify-content-center m-3">
                                        <h6 className="mt-1">Tambahkan ke favorit </h6>
                                        <span className="material-icons m-1">
                                            favorite
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </> :
                        <h3 style={{ textAlign: 'center' }}>Detail Produk Not Found!</h3>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        cart: authReducer.cart,
        id: authReducer.id,
    }
}


export default connect(mapStateToProps, { updateCart, getProductAction, updateCartQty })(ProductDetail);
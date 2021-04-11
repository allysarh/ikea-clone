import React from 'react';
import CardProducts from '../components/CardProducts';
import { getProductAction, sortProducts } from '../action'
import { connect } from 'react-redux'
import CarouselProduct from '../components/CarouselProduct';
import { Col, Container, Form, Input, Row } from 'reactstrap';
import { URL_API } from '../Helper';
import axios from 'axios'

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: this.props.products
        }
    }

    printProduk = () => {
        // if (this.state.data.length > 0) {
        return this.props.products.map((item, index) => {
            return <CardProducts
                nama={item.nama}
                deskripsi={item.deskripsi}
                harga={item.harga}
                images={item.images[0]}
                iitem={item}
                id={item.id}
                index={index}/>
        })

        // }
    }

    handleChange = () => {
        // duplikay dulu ke temporary data
        // selama data sblmnya tidak sama data yang baru maka akan tertrigger
        // let field = this.orders.value.split('-')[0]
        // let sortType = this.orders.value.split('-')[1]
        let tempData = [...this.props.products]
        // if(this.orders.value === "huruf-asc"){
        //     let dataSorted = tempData.sort((a, b) =>{
        //         let namaA = a.nama.toUpperCase()
        //         let namaB = b.nama.toUpperCase()

        //         if(namaA < namaB){
        //             return -1;
        //         } 
        //     })
        //     this.setState({data: dataSorted})
        // } else if (this.orders.value === "huruf-desc"){
        //     let dataSorted = tempData.sort((a, b) =>{
        //         let namaA = a.nama.toUpperCase()
        //         let namaB = b.nama.toUpperCase()

        //         if(namaA > namaB){
        //             return -1;
        //         } 
        //     })
        //     this.setState({data: dataSorted})
        // } else if(this.orders.value === "harga-asc"){
        //     let dataSorted = tempData.sort((a, b) =>{
        //         return a.harga - b.harga 
        //     })
        //     this.setState({data: dataSorted})
        // } else if (this.orders.value === "harga-desc"){
        //     let dataSorted = tempData.sort((a, b) =>{
        //         return b.harga - a.harga 
        //     })
        //     this.setState({data: dataSorted})
        // } else {
        //     let dataSorted = tempData
        //     return dataSorted
        // }
        // console.log("data sorted:",this.state.data)
        // this.setState(this.props.products)
        // this.props.getProductAction()


        //    handle axios.get(URL_API + `/products?_sort=${field}&_order=${sortType}`)
        //         .then((res) => {
        //             console.log(field, sortType, res.data)
        //             this.props.sortProducts(res.data)
        //             // this.setState({ dataProduk: res.data })
        //         })
        //         .catch((err) => {
        //             console.log("err", err)
        //         })

        if (this.orders.value === "nama-asc") {
            this.props.products.sort((a, b) => {
                let namaA = a.nama.toUpperCase()
                let namaB = b.nama.toUpperCase()

                if (namaA < namaB) {
                    return -1;
                }
            })
            console.log(this.props.products)
        } else if (this.orders.value === "nama-desc") {
            this.props.products.sort((a, b) => {
                let namaA = a.nama.toUpperCase()
                let namaB = b.nama.toUpperCase()

                if (namaA > namaB) {
                    return -1;
                }
            })
            // this.setState(this.props.products)
        } else if (this.orders.value === "harga-asc") {
            this.props.products.sort((a, b) => {
                return a.harga - b.harga
            })
            // this.setState(this.props.products)
        } else if (this.orders.value === "harga-desc") {
            this.props.products.sort((a, b) => {
                return b.harga - a.harga
            })
            // this.setState(this.props.products)
        } else {
            return this.props.products
        }
        this.setState({data: this.props.products})
        console.log(this.state.data)
        // console.log(this.props.products)
    }

    render() {
        // console.table(this.state.data)
        return (
            <Container fluid>
                <hr />
                <Row className="m-1">
                    <Col xs="4"></Col>
                    <Col xs="4">
                        <h4 style={{ textAlign: 'center' }}>Produk Pilihan</h4>
                    </Col>
                    <Col xs="4">
                        <div style={{ width: '60%', float: 'right' }}>
                            <Form>
                                <Input type="select" onChange={e => this.handleChange(e)} innerRef={element => this.orders = element}>
                                    <option selected disabled value="">Urutkan berdasarkan .. </option>
                                    <option value="harga-asc">Harga Termurah</option>
                                    <option value="harga-desc">Harga Termahal</option>
                                    <option value="nama-asc">A-Z</option>
                                    <option value="nama-desc">Z-A</option>
                                </Input>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex flex-wrap justify-content-center">
                    {this.printProduk()}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = ({ ProductReducers }) => {
    return {
        products: ProductReducers.products_list
    }
}
export default connect(mapStateToProps, { getProductAction })(ProductsPage);
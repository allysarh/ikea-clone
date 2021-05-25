import React from 'react';
import { Badge, Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Alert, Row, Col } from 'reactstrap';
import axios from 'axios'
import { URL_API } from '../Helper';
import ModalComp from '../components/ModalComp';
import ModalEdit from '../components/ModalEdit';
import { connect } from 'react-redux'
import { getProductAction } from '../action'
// import { getProductAction } from '../action'
// let kursor = {
//     cursor: "pointer",

// }

// TUGAS: BUAT CRUD UNTUK PRODUCT MANAGEMENT!
class ProductManagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduk: [],
            modal: false,
            selectedIndex: null,
            modalEdit: false,
            editedObj: {},
            stok: [],
            images: [],
            thumbnail: 0,
            order: '',
            dataEdit: {}
        }
    }

    // getDataProduk = () => {
    //     axios.get(URL_API + `/products`)
    //         .then((res) => {
    //             // console.log("data produk", res.data)
    //             this.setState({ dataProduk: res.data })
    //             this.props.getProductAction(res.data)
    //         })
    //         .catch((err) => {
    //             console.log("err", err)
    //         })
    // }

    // componentDidMount() {
    //     this.props.getProductAction()
    // }

    // EDIT
    toggleEdit = () => {
        this.setState({ modalEdit: !this.state.modalEdit })
    }

    // printStokEdit = (stok) => {
    //     // let { stok } = this.state.dataProduk
    //     // console.log(stok)

    //     return stok.map((item, index) => {
    //         return <>
    //             <Input type="text" defaultValue={item.type} />
    //             <Input type="text" defaultValue={item.qty} />
    //         </>
    //     })
    // }


    // printImageEdit = (image) => {
    //     return image.map((item, index) => {
    //         return <>
    //             <Input type="text" defaultValue={item} />
    //         </>
    //     })
    // }


    printDataProduk = () => {
        console.log("data produk", this.props.products)

        return this.props.products.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    {/* render tipe data array */}
                    <td >
                        {
                            index === this.state.thumbnail[0] ?
                                <img src={item.images[this.state.thumbnail[1]]} width="50%" alt={item.nama + index} />
                                :
                                <img src={item.images[0]} width="60%" alt={item.nama + index} />
                        }
                        <hr />
                        <div className="d-flex">
                            {
                                item.images.map((value, idx) => {
                                    return <img src={value} style={{ cursor: "pointer" }} width="20%" alt={item.nama + idx}
                                        onClick={() => this.setState({ thumbnail: [index, idx] })} />
                                })
                            }
                        </div>

                    </td>
                    <td>{item.deskripsi}</td>
                    <td>{item.brand}</td>
                    <td>{item.kategori}</td>

                    {/* render tipe data array of object */}
                    <td>
                        {
                            item.stok &&
                            item.stok.map((item, index) => {
                                return <>
                                    <h5>{item.type}
                                        <Badge color="secondary">{item.qty}</Badge>
                                    </h5>
                                </>
                            })}
                    </td>


                    <td>Rp. {item.harga.toLocaleString()}</td>
                    <td>
                        <Button className="m-2" onClick={() => this.setState({ dataEdit: item, modalEdit: !this.state.modalEdit })}>Edit</Button>
                        <Button onClick={() => this.onBtnDelete(item.id)}>Delete</Button>
                    </td>
                </tr>
            )

        })

    }


    // onBtnEdit = () => {
    //     this.setState({ modalEdit: !this.state.modalEdit })
    // }

    onBtnDelete = (id) => {
        axios.delete(URL_API + `/products/${id}`)
            .then((res) => {
                this.props.getProductAction()
            })
            .catch(err => console.log("error delete", err))

    }



    // componentDidUpdate(){
    //     this.getDataProduk()
    // }

    // onBtnSave = (id) => {
    //     let nama = this.editProduk.value
    //     let deskripsi = this.editDeskripsi.value
    //     let brand = this.editBrand.value
    //     let kategori = this.editKategori.value
    //     let stok = [
    //         {
    //             "type": this.editStokType1.value,
    //             "qty": this.editStokQty1.value
    //         },
    //         {
    //             "type": this.editStokType2.value,
    //             "qty": this.editStokQty2.value
    //         },
    //         {
    //             "type": this.editStokType3.value,
    //             "qty": this.editStokQty3.value
    //         }
    //     ]
    //     let images = [
    //         this.editImages1.value,
    //         this.editImages2.value,
    //         this.editImages3.value
    //     ]
    //     let harga = this.editHarga.value

    //     axios.patch(URL_API + `/products/${id}`,
    //         { nama, deskripsi, brand, kategori, stok, images, harga })
    //         .then(res => {
    //             this.getDataProduk()
    //             this.setState({ selectedIndex: null })
    //             // alert("data berhasil diubah")
    //         })
    //         .catch(err => console.log(err))
    // }

    toggle = () => {
        this.setState((state, props) => ({
            modal: !this.state.modal
        }))
    }

    // fungsi di dalam modal
    // onBtnAdd = () => {
    //     let nama = this.inProduk.value
    //     let deskripsi = this.inDeskripsi.value
    //     let brand = this.inBrand.value
    //     let kategori = this.inKategori.value
    //     let stok = this.state.stok
    //     let images = this.state.images
    //     let harga = parseInt(this.inHarga.value)

    //     console.log(nama, deskripsi, brand, kategori, stok, images, harga)

    //     axios.post(URL_API + `/products`,
    //         { nama, deskripsi, brand, kategori, stok, images, harga })
    //         .then((res) => {
    //             console.table(res.data)
    //             this.getDataProduk()
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     console.log(this.state.stok)
    //     console.log(this.state.images)
    //     this.toggle()
    // }
    // onBtnAddStok = () => {
    //     // kaklau langsung, akan jadi error, mencegah adanya kesealahan modifikasi dari data asli, jadi di duplicate
    //     let tempStok = [...this.state.stok]
    //     // diisi null karena datanya belum kita isi
    //     tempStok.push({ id: null, type: null, qty: null })
    //     this.setState({ stok: tempStok })
    // }

    // printStok = () => {
    //     // jika stoknya lebih dari 0 (udah di push dari yang sebelumnya)
    //     if (this.state.stok.length > 0) {
    //         return this.state.stok.map((item, index) => {
    //             return (
    //                 <Row>
    //                     <Col className="my-2">
    //                         <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
    //                     </Col>
    //                     <Col className="my-2">
    //                         <Input type="number" min={0} placeholder={`Qty-${index + 1}`} onChange={(e) => this.handleStok(e, index)} />
    //                     </Col>
    //                     <Col className="my-2">
    //                         <Button onClick={() => this.onBtnDeleteStok(index)}>
    //                             <span class="material-icons">
    //                                 delete
    //                             </span>
    //                         </Button>
    //                     </Col>
    //                 </Row>
    //             )
    //         })
    //     }
    // }
    // //onCLick; eksekusi fungsi saat ada klik mouse
    // //onChange: eksekusi fungsi saat ada perubahan

    // handleStok = (e, index) => {
    //     this.state.stok[index].qty = parseInt(e.target.value)
    // }

    // onBtnCancel = () => {
    //     // fungsi yang digunakan untuk close modal
    //     this.setState({ stok: [] })
    //     this.setState({ images: [] })
    //     this.toggle()
    // }
    // handleType = (e, index) => {
    //     // menyimpan data ke dalam stok
    //     // gapake setState karena tidak perlu render ulang (tanpa ada modifikasi dari segi tampilan)
    //     this.state.stok[index].type = e.target.value
    // }

    // onBtnDeleteStok = (index) => {
    //     this.state.stok.splice(index, 1)
    //     this.setState({ stok: this.state.stok })
    // }

    // //IMAGE

    // //render element ipnut form image
    // printImage = () => {
    //     return this.state.images.map((item, index) => {
    //         return (
    //             <Row className="my-2">
    //                 <Col><Input type="text" placeholder={`Image - ${index + 1}`} onChange={(e) => this.handleImage(e, index)} /></Col>
    //                 <Col>
    //                     <Button onClick={() => this.onBtnDeleteImage(index)}>
    //                         <span class="material-icons">
    //                             delete
    //                             </span>
    //                     </Button>
    //                 </Col>
    //             </Row>
    //         )
    //     })
    // }
    // // menambah penamoung data image 
    // onBtnAddImage = () => {
    //     this.state.images.push([null])
    //     this.setState({ images: this.state.images })
    // }

    // // untuk set value ke dalam state images
    // handleImage = (e, index) => {
    //     this.state.images[index] = e.target.value
    // }

    // printModal = () => {
    //     return (
    //         <>
    //             {/* MODAL */}
    //             <Modal isOpen={this.state.modal} toggle={this.onBtnCancel}>
    //                 <ModalHeader toggle={this.toggle}>Tambahkan Produk</ModalHeader>
    //                 <ModalBody>
    //                     <Form>
    //                         <FormGroup>
    //                             <Label >Nama Produk</Label>
    //                             <Input type="text" name="email" placeholder="Masukkan nama produk..." innerRef={element => this.inProduk = element} />
    //                         </FormGroup>
    //                         <FormGroup>
    //                             <Label >Deskripsi</Label>
    //                             <Input type="text-area" name="email" placeholder="Masukkan deskripsi produk..." innerRef={element => this.inDeskripsi = element} />
    //                         </FormGroup>
    //                         <FormGroup>
    //                             <Label >Brand</Label>
    //                             <Input type="text" name="email" placeholder="Masukkan brand produk..." innerRef={element => this.inBrand = element} />
    //                         </FormGroup>
    //                         <FormGroup>
    //                             <Label >Kategori</Label>
    //                             <Input type="text" name="email" placeholder="Masukan kategori produk..." innerRef={element => this.inKategori = element} />
    //                         </FormGroup>
    //                         {/* ini buat stok */}
    //                         <FormGroup>
    //                             <Label>Stok</Label>
    //                             <Button color="success" onClick={this.onBtnAddStok} style={{ float: 'right' }}>Add Stok</Button>
    //                         </FormGroup>
    //                         {this.printStok()}

    //                         {/* ini buat images */}
    //                         <FormGroup>
    //                             <Label>Image</Label>
    //                             <Button color="success" onClick={this.onBtnAddImage} style={{ float: 'right' }}>Add Image</Button>
    //                         </FormGroup>
    //                         {this.printImage()}

    //                         <FormGroup>
    //                             <Label >Harga</Label>
    //                             <Input type="number" name="email" placeholder="Masukan harga produk..." innerRef={element => this.inHarga = element} />
    //                         </FormGroup>
    //                     </Form>
    //                 </ModalBody>
    //                 <ModalFooter>
    //                     <Button color="primary" onClick={this.onBtnAdd}>Add</Button>
    //                     <Button color="secondary" onClick={this.onBtnCancel}>Cancel</Button>
    //                 </ModalFooter>
    //             </Modal>
    //         </>
    //     )
    // }

    // SORTING

    handleChange = (e) => {
        // // this.state.orderHarga = e.target.value
        // let field = this.orders.value.split('-')[0]
        // let sortType = this.orders.value.split('-')[1]

        // alert(this.props.products)
        if (this.orders.value === "huruf-asc") {
            this.props.products.sort((a, b) => {
                let namaA = a.nama.toUpperCase()
                let namaB = b.nama.toUpperCase()

                if (namaA < namaB) {
                    return -1;
                }
            })
            console.log(this.props.products)
        } else if (this.orders.value === "huruf-desc") {
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
        this.setState(this.props.products)
        // console.log(this.props.products)
        // Tanpa dihubungkan ke server
        // this.setState({dataProduk: this.state.dataProduk.sort((a, b) =)
        // })
        // console.log("state data produk: ",this.state.dataProduk)

        // Dengan menghubngkan ke server
        // axios.get(URL_API + `/products?_sort=${field}&_order=${sortType}`)
        //     .then((res) => {
        //         console.log(field, sortType, res.data)
        //         this.props.getProductAction(res.data)
        //         // this.setState({ dataProduk: res.data })
        //     })
        //     .catch((err) => {
        //         console.log("err", err)
        //     })

    }


    render() {
        console.log("data edit:", this.state.dataEdit)
        // console.log(this.state.modalEdit)
        return (
            <Container >
                <h1 style={{ textAlign: 'center' }} className="m-2">Product Management Page</h1>
                <div>
                    <div className="m-2" style={{ float: 'right' }}>
                        <Button color="danger" onClick={this.toggle}>ADD</Button>
                    </div>
                    <div className="m-3" style={{ float: 'right' }}>
                        <h6>Tambahkan Produk:</h6>
                    </div>
                    <div style={{ float: 'right' }}>
                        <Form>
                            <Input type="select" onChange={e => this.handleChange(e)} innerRef={element => this.orders = element}>
                                <option selected disabled value="">Urutkan berdasarkan .. </option>
                                <option value="harga-asc">Harga Termurah</option>
                                <option value="harga-desc">Harga Termahal</option>
                                <option value="huruf-asc">A-Z</option>
                                <option value="huruf-desc">Z-A</option>
                            </Input>
                        </Form>
                    </div>
                    <div style={{ float: 'right' }}>
                        <h6>Urut berdasarkan: </h6>
                    </div>

                </div>

                <ModalComp toggle={this.toggle} modal={this.state.modal} />
                <ModalEdit
                    modalEdit={this.state.modalEdit}
                    dataEdit={this.state.dataEdit}
                    toggle={this.toggleEdit}
                    stok={this.state.dataEdit.stok}
                    images={this.state.dataEdit.images}
                />
                {/* TABEL */}
                <div>
                    <Table bordered style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Image</th>
                                <th style={{ width: '20%' }}>Deskripsi</th>
                                <th>Brand</th>
                                <th>Kategori</th>
                                <th>Stok</th>
                                <th>Harga</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printDataProduk()}
                        </tbody>
                    </Table>
                </div>
            </Container>
        );
    }
}

const MapToProps = ({ ProductReducers }) => {
    return {
        products: ProductReducers.products_list
    }
}

export default connect(MapToProps, { getProductAction })(ProductManagePage);
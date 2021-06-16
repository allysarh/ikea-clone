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
            dataEdit: {},
            kategori: []
        }
    }

    componentDidMount() {
        this.getKategori()
    }
    
    getKategori = async () =>{
        try {
            let kategori = await axios.get(URL_API + `/products/kategori`)
            console.log("kategori: ",kategori.data)
            this.setState({ kategori: await kategori.data })

        } catch (error) {
            console.log(error)
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
        return this.props.products.map((item, index) => {
            
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    {/* render tipe data array */}
                    <td>
                        <div style={{ display: 'flex', width: '100%', display: 'flex', justifyContent: 'center'}}>
                            {
                                index === this.state.thumbnail[0] ?
                                    <img src={item.images[0].images.includes('http') ? item.images[this.state.thumbnail[1]].images : `${URL_API}/${item.images[this.state.thumbnail[1]].images}}`} width="50%" alt={item.nama + index} />
                                    :
                                    <img src={item.images[0].images.includes('http') ? item.images[0].images : `${URL_API}/${item.images[0].images}`} width="50%" alt={item.nama + index} />
                            }
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center">
                            {
                                item.images.map((value, idx) => {
                                    return <img src={value.images} style={{ cursor: "pointer", marginRight: 10 }} width="20%" height="15%" alt={item.nama + idx}
                                        onClick={() => this.setState({ thumbnail: [index, idx] })} />
                                })
                            }
                        </div>

                    </td>
                    <td>{item.deskripsi}</td>
                    <td>{item.brand}</td>
                    <td>{item.kategori.length > 0 ? item.kategori[0].kategori : 'None'}</td>

                    {/* render tipe data array of object */}
                    <td>
                        {
                            item.stok &&
                            item.stok.map((item, index) => {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '80%' }}>{item.type}:</div>
                                        <div style={{ width: '20%' }}>
                                            <Badge color="secondary" style={{ alignSelf: 'center' }}>{item.qty}</Badge>
                                        </div>

                                    </div>
                                )
                            })}
                    </td>


                    <td style={{width: '10%', textAlign: 'center'}}>Rp. {item.harga.toLocaleString()}</td>
                    <td style={{display: 'flex', borderBottom: 'none', borderLeft: 'none', borderRight: 'none'}}>
                        <Button className="m-2" color="warning" onClick={() => this.setState({ dataEdit: item, modalEdit: !this.state.modalEdit })}>Edit</Button>
                        <Button className="m-2" onClick={() => this.onBtnDelete(item.idProduk)} color="danger">Delete</Button>
                    </td>
                </tr>
            )

        })

    }


    // onBtnEdit = () => {
    //     this.setState({ modalEdit: !this.state.modalEdit })
    // }

    onBtnDelete = (id) => {
        console.log("id: ", id)
        axios.delete(URL_API + `/products/delete?id=${id}`)
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
        console.log("data edit: --->", this.state.dataEdit.images)
        // console.log(this.state.modalEdit)
        return (
            <Container fluid style={{ width: '100%', padding: '1%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1%' }}>
                    <h4 style={{ textAlign: 'left', fontWeight: '500' }} className="m-2"> Product Management Page</h4>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ float: 'right', marginRight: 10 }}>
                            <Form >
                                <Input type="select" onChange={e => this.handleChange(e)} innerRef={element => this.orders = element} style={{backgroundColor: '#f5f5f5', borderRadius: '30px'}}>
                                    <option selected disabled value="">Urutkan...</option>
                                    <option value="harga-asc">Harga Termurah</option>
                                    <option value="harga-desc">Harga Termahal</option>
                                    <option value="huruf-asc">A-Z</option>
                                    <option value="huruf-desc">Z-A</option>
                                </Input>
                            </Form>
                        </div>
                        <Button style={{backgroundColor: '#417ab1', border: 'none'}} onClick={this.toggle}>ADD</Button>
                    </div>
                </div>


                <ModalComp toggle={this.toggle} modal={this.state.modal} kategori={this.state.kategori}/>
                <ModalEdit
                    modalEdit={this.state.modalEdit}
                    dataEdit={this.state.dataEdit}
                    toggle={this.toggleEdit}
                    stok={this.state.dataEdit.stok}
                    images={this.state.dataEdit.images}
                    kategori={this.state.kategori}
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
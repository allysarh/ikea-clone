import React from 'react';
import { Badge, Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Alert, Row, Col } from 'reactstrap';
import axios from 'axios'
import { URL_API } from '../Helper';
import { connect } from 'react-redux'
import { getProductAction } from '../action'
class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stok: props.dataEdit.stok,
            images: props.dataEdit.images,

        }
    }

    onBtnCancel = () => {
        this.props.toggle()
    }

    printStokEdit = () => {
        if (this.props.stok) {
            let { stok } = this.props
            return stok.map((item, index) => {
                return <div className="d-flex">
                    <Input type="text" defaultValue={item.type} className="m-1" onChange={(e) => this.handleType(e, index)} placeholder={`Tipe - ${index+1}`}/>
                    <Input type="text" defaultValue={item.qty} className="m-1" onChange={(e) => this.handleStok(e, index)} />
                    <span className="material-icons btn btn-outline-danger" style={{ float: 'right' }} onClick={() => this.onBtnDeleteStok(index)}>
                        remove
                    </span>
                </div>
            })
        } else {
            return null
        }
    }
    printImageEdit = () => {
        // console.log("data edit:",this.props.dataEdit)
        // console.log("data edit state", this.state.dataEdit)
        if (this.props.stok) {
            return this.props.images.map((item, index) => {
                return <>
                    <Input type="text" defaultValue={item} className="m-1" onChange={(e) => this.handleImage(e, index)} />
                    <Col xs="2">
                        <span className="material-icons btn btn-outline-danger" style={{ float: 'right' }} onClick={() => this.onBtnDeleteImages(index)}>
                            remove
                            </span>
                    </Col>
                </>
            })
        } else {
            return null
        }
    }

    // ADD IMAGES
    onBtnAddImages = () => {

        this.props.images.push("")
        // console.log(this.state.images)
        // this.setState({ images: tempImages })
        this.setState(this.props.images)

    }

    onBtnDeleteImages = (index) => {
        this.props.images.splice(index, 1)
        this.setState({ images: this.state.stok })
        // this.setState(this.props.images)
        // console.log(this.state.images)
    }

    onBtnDeleteStok = (index) => {
        this.props.stok.splice(index, 1)
        this.setState({ stok: this.state.stok })
        // this.setState(this.props.stok)
        // console.log(this.state.images)
    }

    // ADSTOK
    onBtnAddStok = () => {
        // let tempStok = [...this.state.stok]
        // tempStok.push({id: null, type: null, qty: null})
        // this.setState({ stok: tempStok })


        this.props.stok.push({ id: null, type: null, qty: null })
        this.setState({ stok: this.props.stok })

    }

    onBtnDeleteStok = (index) => {
        
        this.props.stok.splice(index, 1)
        this.setState(this.props.stok)
    }

    handleImage = (e, index) => {
        alert("hai")
        this.props.images[index] = e.target.value
    }

    handleStok = (e, index) => {
        this.props.stok[index].qty = e.target.value
        // console.log("handle", this.props.stok)
    }

    handleType = (e, index) => {
        this.props.stok[index].type = e.target.value
    }
    onBtnSave = () => {
        let nama = this.editProduk.value
        let deskripsi = this.editDeskripsi.value
        let brand = this.editBrand.value
        let kategori = this.editKategori.value
        let stok = this.props.stok
        let images = this.props.images
        let harga = this.editHarga.value
        // console.log(nama, deskripsi, brand, kategori, harga)
        // console.table("gambar", images)
        // console.table("stok", stok)
        // console.table(images)
        // console.log("id", this.props.dataEdit.id)
        
        axios.patch(URL_API + `/products/${this.props.dataEdit.id}`,
            { nama, deskripsi, brand, kategori, stok, images, harga })
            .then(res => {
                // this.setState({ selectedIndex: null })
                // this.props.getProductAction()
                this.props.toggle()

            })
            .catch(err => console.log(err))

    }


    //PRINT STOK
    render() {
        console.log("props data edit", this.props.dataEdit)
        console.log("state stok di child", this.state.stok)
        return (
            <>
                <Modal isOpen={this.props.modalEdit} toggle={this.onBtnCancel}>
                    <ModalHeader toggle={this.onBtnCancel}>Edit Produk</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label >Nama Produk</Label>
                                <Input type="text" name="email" placeholder="Masukkan nama produk..." innerRef={element => this.editProduk = element} defaultValue={this.props.dataEdit.nama} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Deskripsi</Label>
                                <Input type="text-area" name="email" placeholder="Masukkan deskripsi produk..." innerRef={element => this.editDeskripsi = element} defaultValue={this.props.dataEdit.deskripsi} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Brand</Label>
                                <Input type="text" name="email" placeholder="Masukkan brand produk..." innerRef={element => this.editBrand = element} defaultValue={this.props.dataEdit.brand} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Kategori</Label>
                                <Input type="text" name="email" placeholder="Masukan kategori produk..." innerRef={element => this.editKategori = element} defaultValue={this.props.dataEdit.kategori} />
                            </FormGroup>
                            {/* Ini buat stok 👇🏼*/}
                            <FormGroup>
                                <Label>Stok</Label>
                                <span className="material-icons btn btn-outline-success" style={{ float: 'right' }} color="success" onClick={this.onBtnAddStok}>
                                    add
                                </span>
                                {this.printStokEdit()}
                            </FormGroup>
                            {/* ini buat gambar 👇🏼*/}
                            <FormGroup>
                                <Label>Gambar</Label>
                                <span className="material-icons btn btn-outline-success" style={{ float: 'right' }} color="success" onClick={this.onBtnAddImages}>
                                    add
                                </span>
                                {this.printImageEdit()}
                            </FormGroup>
                            <FormGroup>
                                <Label >Harga</Label>
                                <Input type="number" name="email" placeholder="Masukan harga produk..." innerRef={element => this.editHarga = element} defaultValue={this.props.dataEdit.harga} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.onBtnSave()}>Save</Button>
                        <Button color="secondary" onClick={this.onBtnCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default connect(null, { getProductAction })(ModalEdit);
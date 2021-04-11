import React from 'react';
import { Badge, Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Alert, Row, Col } from 'reactstrap';
import axios from 'axios'
import { URL_API } from '../Helper';
import { connect } from 'react-redux';
import { getProductAction } from '../action'

class ModalComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedIndex: null,
            modalEdit: false,
            editedObj: [],
            stok: [],
            images: [],
            thumbnail: 0,
            order: ''
        }
    }

    onBtnAdd = () => {
        let nama = this.inNamaProduk.value
        let deskripsi = this.inDeskripsi.value
        let brand = this.inBrand.value
        let kategori = this.inKategori.value
        let stok = this.state.stok
        let images = this.state.images
        let harga = parseInt(this.inHarga.value)

        // console.log(nama, deskripsi, brand, kategori, stok, images, harga)
        axios.post(URL_API + `/products`, { nama, deskripsi, brand, kategori, stok, images, harga })
            .then((res) => {
                console.log(res.data)
                this.props.getProductAction()
            })

        this.props.toggle()
    }

    // FUNGSI UNTUK ADD STOK TEROS
    onBtnAddStok = () => {
        let tempStok = [...this.state.stok]
        tempStok.push({ id: null, type: null, qty: null })
        this.setState({ stok: tempStok })
    }

    onBtnDeleteStok = (index) => {
        this.state.stok.splice(index, 1)
        this.setState({ stok: this.state.stok })
    }

    onBtnCancel = () => {
        this.setState({ stok: [], images: [] })
        this.props.toggle()

    }

    handleType = (e, index) => {
        this.state.stok[index].type = e.target.value

    }

    handleQty = (e, index) => {
        this.state.stok[index].qty = e.target.value
    }

    printStok = () => {
        return this.state.stok.map((item, index) => {
            return (
                <Row className="m-3" style={{ width: '100%' }}>
                    <Col >
                        <Input type="text" placeholder={`Type - ${index + 1}`} style={{ float: 'left' }} onChange={e => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="text" placeholder={`Qty - ${index + 1}`} style={{ float: 'left' }} onChange={e => this.handleQty(e, index)} />
                    </Col>
                    <Col xs="2" className="mx-1">
                        <span className="material-icons btn btn-outline-danger" style={{ float: 'right' }} onClick={() => this.onBtnDeleteStok(index)}>
                            remove
                        </span>
                    </Col>
                </Row>
            )
        })
    }

    //IMAGES

    onBtnAddImages = () => {
        this.state.images.push([null])
        this.setState({ images: this.state.images })
    }

    onBtnDeleteImages = (index) => {
        this.state.images.splice(index, 1)
        this.setState({ images: this.state.stok })
    }

    printImages = () => {
        return this.state.images.map((item, index) => {
            return (
                <>
                    <Row className="m-3 border">
                        <Col xs="auto">
                            <Input type="text" placeholder={`Gambar - ${index + 1}`} onChange={e => this.handleImages(e, index)} />
                        </Col>
                        <Col xs="2">
                            <span className="material-icons btn btn-outline-danger" style={{ float: 'right' }} onClick={() => this.onBtnDeleteImages(index)}>
                                remove
                            </span>
                        </Col>
                    </Row>
                </>
            )
        })
    }

    handleImages = (e, index) => {
        this.state.images[index] = e.target.value
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.onBtnCancel} >
                    <ModalHeader toggle={this.onBtnCancel}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Nama Produk</Label>
                                <Input type="text" innerRef={e => this.inNamaProduk = e} placeholder="Masukkan nama produk..." />
                            </FormGroup>
                            <FormGroup>
                                <Label>Deskripsi</Label>
                                <Input type="text" innerRef={e => this.inDeskripsi = e} placeholder="Masukkan deskripsi produk..." />
                            </FormGroup>
                            <FormGroup>
                                <Label>Brand</Label>
                                <Input type="text" innerRef={e => this.inBrand = e} placeholder="Masukkan nama brand..." />
                            </FormGroup>
                            <FormGroup>
                                <Label>Kategori</Label>
                                <Input type="text" innerRef={e => this.inKategori = e} placeholder="Masukkan kategori..." />
                            </FormGroup>
                            <FormGroup>
                                <Label >Stok</Label>
                                <span className="material-icons btn btn-outline-success" style={{ float: 'right' }} color="success" onClick={this.onBtnAddStok}>
                                    add
                                    </span>
                                {this.printStok()}
                            </FormGroup>
                            <FormGroup>
                                <Label>Gambar</Label>
                                <span className="material-icons btn btn-outline-success" style={{ float: 'right' }} color="success" onClick={this.onBtnAddImages}>
                                    add
                                    </span>
                                {this.printImages()}
                            </FormGroup>
                            <FormGroup>
                                <Label>Harga</Label>
                                <Input type="number" innerRef={e => this.inHarga = e} placeholder="Masukkan harga..." />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onBtnAdd}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.onBtnCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default connect(null, { getProductAction })(ModalComp);
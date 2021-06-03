import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ModalView from './ModalView';
import { Link } from 'react-router-dom'

class CardProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    render() {

        return (
            <div className="d-flex justify-content-center m-1">
                <Card className="m-1" style={{ width: '20vw', height: 'auto' }}>
                    <Link to={`/products-detail?id=${this.props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <div style={{ width: '100%', height: '35vh', margin: 'auto', padding: '5%' }}>
                            <CardImg top style={{ margin: 'auto', objectFit: 'contain', height: '100%' }} src={this.props.images} alt="Card image cap" />
                        </div>
                        <CardBody>
                            <CardTitle tag="h5">{this.props.nama}</CardTitle>
                            <div style={{height: '10vh'}}>
                                <CardSubtitle style={{ fontSize: '14px' }} className="mb-2 text-muted">{this.props.deskripsi}</CardSubtitle>
                            </div>
                            <CardText tag="h5" style={{ fontWeight: 'bolder' }}>Rp. {this.props.harga.toLocaleString()} </CardText>
                        </CardBody>
                    </Link>
                    <div className="m-3">
                        <Button type="button" outline style={{ width: '100%' }} className="d-flex justify-content-center align-items-center" onClick={this.toggle}>
                            <span className="material-icons">
                                visibility
                            </span>
                            <span className="mx-2">Lihat Sekilas</span>
                        </Button>
                    </div>
                </Card>
                <ModalView toggle={this.toggle} modal={this.state.modal} images={this.props.images} />
            </div>
        );
    }
}

export default CardProducts;
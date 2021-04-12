import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PrintCarousel from '../components/PrintCarousel';
import CarouselProduct from '../components/CarouselProduct';
import { connect } from 'react-redux'
import { getProductAction } from '../action'
import CardProducts from '../components/CardProducts';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printProduk = () => {
        if (this.props.products.length > 0) {
            return this.props.products.map((item, index) => {
                return <CardProducts
                    nama={item.nama}
                    deskripsi={item.deskripsi}
                    harga={item.harga}
                    images={item.images[0]}
                    item={item}
                    id={item.id} />
            })

        } else {
            return null
        }
    }
    render() {
        return (
            <Container fluid>
                <PrintCarousel />
                <CarouselProduct isi={this.printProduk()} />
                <div>
                    <h3 style={{textAlign: 'center', margin: '3%'}}>Ide inspirasi lainnya</h3>
                    <Row>
                        <Col xs="7">
                            <div className="border">
                                <img 
                                width="100%"
                                src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__id_id_1613043625_1_1.jpeg"/>
                            </div>
                        </Col>
                        <Col xs="4">
                            <div className="border">
                                <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__id_id_1609142505_1_1.jpeg"
                                width="100%" height="80%"/>
                            </div>
                        </Col>
                    </Row>
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
export default connect(mapStateToProps, { getProductAction })(LandingPage);
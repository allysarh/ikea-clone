import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'
import CarouselProduct from './CarouselProduct';
class ModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnail: 0
        }
    }

    printImages = () => {
        // <img src={this.props.images}/>
        // console.table(this.props.products[0])
        // console.log(typeof(this.props.products[0]))
        return this.props.products.map((item, index) =>{
            return item.images.map((value, index) =>{
                return <img src={value}/>
            })
        })
    }
    render() {
        // console.log("a",this.printImages())
        // console.log("modal view gambar", this.props.products[0].images)
        let { images, nama } = this.props.products
        return (<>
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                    <ModalHeader toggle={this.toggle}>{nama}</ModalHeader>
                    <ModalBody className="m-auto">
                        {this.printImages()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>);
    }
}

const MapStateToProps = ({ ProductReducers }) => {
    return {
        products: ProductReducers.products_list
    }
}
export default connect(MapStateToProps)(ModalView);
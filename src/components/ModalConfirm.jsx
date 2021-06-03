import React, { useState } from 'react';

const ModalExample = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Hapus item dari cart?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Yes</Button>{' '}
                    <Button color="secondary" onClick={toggle}>No</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;
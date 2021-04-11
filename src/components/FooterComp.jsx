import React from 'react';

const FooterComp = (props) => {

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="d-flex justify-content-center mt-5">
                <h3>Ikuti Kami di</h3>
                <ul type="none" className="d-flex justify-content-left">
                    <li className="mr-3"><img src="https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png" width="40px" /></li>
                    <li className="mr-3"><img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" width="44px" /></li>
                    <li className="mr-3"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrFEDURVNLwmDliDO-6rWxU7rTk_c0hQZreA&usqp=CAU" width="40px" /></li>
                    <li className="mr-3"><img src="https://image.flaticon.com/icons/png/512/124/124021.png" width="40px" /></li>
                    <li className="mr-3"><img src="https://icons-for-free.com/iconfiles/png/512/tube+video+you+youtube+icon-1320185153402885670.png" width="40px" /></li>
                </ul>
            </div>
            <hr />
            <div style={{ width: '70%' }} className="m-auto">
                <div className="m-5">
                    <h4 className="m-5">Tautan yang berguna</h4>
                    <ul type="none" className="d-flex justify-content-around flex-wrap">
                        <li>Katalog & Brosur</li>
                        <li>Program perencanaan</li>
                        <li>IKEA untuk Bisnis</li>
                        <li>Hubungi Kami</li>
                        <li>Pick-up Point IKEA</li>
                    </ul>
                    <ul type="none" className="d-flex justify-content-around flex-wrap mb-4">
                        <li>Ini adalah IKEA</li>
                        <li>Bekerja di IKEA</li>
                        <li>FAQ</li>
                        <li>Layanan IKEA</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between m-5" style={{ fontSize: '14px' }}>
                <span>© Inter IKEA Systems B.V. 2014 - 2021</span>
                <div>
                    <ul className="d-flex justify-content-around" type="none">
                        <li className="mr-3"><a href="#">Kebijakan Privasi</a></li>
                        <li className="mr-3"><a href="#">Pembatasan Tanggung Jawab</a></li>
                        <li className="mr-3"><a href="#">Pengungkapan yang Bertanggung Jawab</a></li>
                        <li className="mr-3"><a href="#">Kebijakan Cookie</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FooterComp
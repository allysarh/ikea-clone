import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, InputGroupAddon, Input, InputGroup, Badge, Alert, UncontrolledAlert, Dropdown
} from 'reactstrap';
import { connect } from 'react-redux'
// action untuk mereset data pada reducer
import { authLogout } from '../action'
import axios from 'axios'
import { URL_API } from '../Helper';

// import { authLogin } from '../action'

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            openSearch: false,
            dataSearch: [],
            qty: 0,
            openCart: false
        }
    }
    getAllQty = () => {
        return this.props.cart.map((item, index) => {
            return item.qty
        }).reduce((a, b) => a + b, 0)
    }
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    handleSearch = () => {
        if (this.search.value === "") {
            this.setState({ openSearch: false, dataSearch: [] })
        } else {
            let dataSearch = this.props.products.filter(item => item.nama.toLowerCase().includes(this.search.value.toLowerCase()))
            this.setState({ openSearch: dataSearch.length > 0 ? true : false, dataSearch }, () => console.log("data search: ", this.state.dataSearch))
        }
    }

    printSearch = () => {
        return this.state.dataSearch.map((item, index) => {
            return (
                <Link to={`/products-detail?nama=${item.nama}`} style={{ textDecoration: 'none' }}>
                    <DropdownItem>{item.nama}</DropdownItem>
                </Link>)
        })
    }

    showCart = () => {
        this.setState({ openCart: !this.state.openCart })
    }

    // componentDidMount(){
    //     this.cartMerged()
    // }
    // cartMerged = () => {
    //     let arr = [...this.props.cart]
    //     let merged = arr.reduce((acc, cur) => {
    //         let nama = cur.nama
    //         let type = cur.type
    //         let found = acc.find((elem) => {
    //             if (elem.nama === nama && elem.type === type) {
    //                 return [nama, type]
    //             }
    //         });
    //         if (found) {
    //             // console.log("found",found)
    //             found.qty += cur.qty;
    //         } else {
    //             acc.push(cur);
    //         }
    //         return acc;
    //     }, []);
    //     return merged
    // }

    printShowCart = () => {
        return this.props.cart.map((item, index) => {
            return (
                <DropdownItem><img src={item.image} height="20vh" /> {item.nama} x {item.qty}</DropdownItem>
            )
        })
    }
    render() {
        return (
            <div className="container-fluid" style={{ fontSize: '11px' }}>
                <div className="d-flex justify-content-between" style={{ width: '100%', height: '30px' }}>
                    <ul type="none" className="d-flex justify-content-between m-1" style={{ color: '#717a82e' }}>
                        <li className="nav-link" >Indonesia</li>
                        <li className="nav-link">
                            <Link className="d-flex inline-flex black-ikea">
                                <span className="material-icons" style={{ position: 'relative', bottom: '4px' }}>public</span>
                                <span>Bahasa</span>
                            </Link>
                        </li>
                    </ul>
                    <ul type="none" className="d-flex justify-content-between m-1" >
                        <li className="nav-link">
                            <Link className="d-flex inline-flex blue-ikea">
                                <span className="material-icons" style={{ position: 'relative', bottom: '4px' }}>
                                    room
                            </span>
                                <span>
                                    Informasi Toko
                            </span>
                            </Link>
                        </li>
                        <li className="nav-link" >
                            <Link className="blue-ikea">Kebijakan Pengembalian</Link>
                        </li>
                        <li className="nav-link blue-ikea" ><Link>IKEA Bisnis</Link></li>
                        <li className="nav-link" >
                            <Link className="d-flex inline-flex blue-ikea">
                                <span className="material-icons" style={{ position: 'relative', bottom: '4px' }}>
                                    room
                            </span>
                                <span>
                                    Lacak Pengiriman Online
                            </span>
                            </Link>
                        </li>
                        <li className="nav-link blue-ikea" ><Link>Katalog dan Brosur</Link></li>
                        <li className="nav-link blue-ikea" ><Link>Program Perencanaan</Link></li>
                    </ul>
                    <ul className="d-flex justify-content-between m-">
                        <li className="nav-link">
                            <Link to="/client" className='blue-ikea'>Masuk atau Daftar</Link>
                        </li>
                    </ul>
                </div>
                <hr />
                <Navbar expand="md" style={{ backgroundColor: "white", fontSize: '14px' }}>
                    <Link to='/'>
                        <NavbarBrand>
                            <img width="100px" src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg" />
                        </NavbarBrand>
                    </Link>

                    {/* Buka tutup navbar */}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.IsOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to="/products" style={{ color: 'black', fontWeight: 'bold' }} className="nav-link">Products</Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: 'gray', fontWeight: 'bold' }}>
                                    Category
                            </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <InputGroup size="sm" style={{ width: '20%' }}>
                            <Input placeholder="Cari..." onChange={this.handleSearch} innerRef={el => this.search = el} />
                            <InputGroupAddon addonType="append">
                                <Dropdown isOpen={this.state.openSearch} toggle={this.handleSearch}>
                                    <DropdownToggle className="btn btn-secondary material-icons" >
                                        search
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {this.printSearch()}
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroupAddon>
                        </InputGroup>


                        {
                            this.props.username &&
                            <UncontrolledDropdown>
                                <DropdownToggle nav caret style={{ color: 'grey' }}>
                                    Hello, {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {
                                        this.props.role === "user" ?
                                            <>
                                                <DropdownItem>
                                                    Profile
                                                </DropdownItem>
                                                <Link to="/shopping-cart" style={{ color: 'black', textDecoration: 'none' }}>
                                                    <DropdownItem>
                                                        Cart
                                                    </DropdownItem>
                                                </Link>
                                                <Link to="/history" style={{ color: 'black', textDecoration: 'none' }}>
                                                    <DropdownItem>
                                                        History
                                                    </DropdownItem>
                                                </Link>
                                            </> :
                                            <>
                                                <Link to="/product-management" style={{ textDecoration: 'none', color: 'black' }}>
                                                    <DropdownItem>
                                                        Product Management
                                                </DropdownItem>
                                                </Link>
                                                <Link to="/transaction-management" style={{ textDecoration: 'none', color: 'black' }}>
                                                    <DropdownItem>
                                                        Transaction Management
                                                    </DropdownItem>
                                                </Link>
                                            </>
                                    }
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.props.authLogout}>
                                        Logout
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }

                        <div className="d-flex" >
                            <span className="material-icons m-1">
                                shopping_cart
                                    </span>
                            <h5>
                                {/* <Badge color="warning" className="m-auto">
                                </Badge> */}
                                <Dropdown isOpen={this.state.openCart} toggle={this.showCart}>
                                    {
                                        this.props.username &&
                                        <>
                                            <DropdownToggle color="warning" className="m-auto" size="sm" >
                                                {this.getAllQty()}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                {this.printShowCart()}
                                            </DropdownMenu>
                                        </>

                                    }
                                </Dropdown>
                            </h5>
                        </div>


                        {/* <div className="d-flex" onClick={this.showCart}>
                            <span className="material-icons m-1">
                                shopping_cart
                                </span>
                            <h5><Badge color="warning" className="m-auto">{this.getAllQty()}</Badge></h5>
                        </div> */}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer, ProductReducers }) => {
    return {
        username: authReducer.username,
        role: authReducer.role,
        products: ProductReducers.products_list,
        cart: authReducer.cart

    }
}
export default connect(mapStateToProps, { authLogout })(NavbarComp);


// unctional component
// const NavbarComp = (props) => {
//     // Penulisan react hooks
//     //ustate: nilai awal
//     let [isOpen, setIsOpen] = useState(false);

//     const toggle = () => {
//         setIsOpen(!isOpen)
//     }

//     return (
//         <div className="container-fluid" style={{ fontSize: '11px' }}>
//             <div className="d-flex justify-content-between" style={{ width: '100%' , height: '30px'}}>
//                 <ul type="none" className="d-flex justify-content-between m-1" style={{ color: '#717a82e' }}>
//                     <li className="nav-link" >Indonesia</li>
//                     <li className="nav-link">
//                         <Link className="d-flex inline-flex black-ikea">
//                             <span className="material-icons" style={{ position: 'relative', bottom: '4px' }}>public</span>
//                             <span>Bahasa</span>
//                         </Link>
//                     </li>
//                 </ul>
//                 <ul type="none" className="d-flex justify-content-between m-1" >
//                     <li className="nav-link">
//                         <Link className="d-flex inline-flex blue-ikea">
//                             <span className="material-icons" style={{ position: 'relative', bottom: '4px' }}>
//                                 room
//                             </span>
//                             <span>
//                                 Informasi Toko
//                             </span>
//                         </Link>
//                     </li>
//                     <li className="nav-link" >
//                         <Link className="blue-ikea">Kebijakan Pengembalian</Link>
//                     </li>
//                     <li className="nav-link blue-ikea" ><a>IKEA Bisnis</a></li>
//                     <li className="nav-link" >
//                         <Link className="d-flex inline-flex blue-ikea">
//                             <span className="material-icons" style={{ position: 'relative', bottom: '4px' }}>
//                                 room
//                             </span>
//                             <span>
//                                 Lacak Pengiriman Online
//                             </span>
//                         </Link>
//                     </li>
//                     <li className="nav-link blue-ikea" ><a>Katalog dan Brosur</a></li>
//                     <li className="nav-link blue-ikea" ><a>Program Perencanaan</a></li>
//                 </ul>
//                 <ul className="d-flex justify-content-between m-">
//                     <li className="nav-link">
//                         <Link to="/client" className='blue-ikea'>Masuk atau Daftar</Link>
//                     </li>
//                 </ul>
//             </div>
//             <hr />
//             <Navbar expand="md" style={{ backgroundColor: "white" , fontSize: '14px'}}>
//                 <Link to='/'>
//                     <NavbarBrand>
//                         <img width="100px" src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/logos/IKEA_logo.svg" />
//                     </NavbarBrand>
//                 </Link>

//                 {/* Buka tutup navbar */}
//                 <NavbarToggler onClick={toggle} />
//                 <Collapse isOpen={setIsOpen} navbar>
//                     <Nav className="mr-auto" navbar>
//                         <NavItem>
//                             <NavLink href="/components/" style={{ color: 'gray', fontWeight: 'bold' }}>Products</NavLink>
//                         </NavItem>
//                         <UncontrolledDropdown nav inNavbar>
//                             <DropdownToggle nav caret style={{ color: 'gray', fontWeight: 'bold' }}>
//                                 Category
//                             </DropdownToggle>
//                             <DropdownMenu right>
//                                 <DropdownItem>
//                                     Option 1
//                                 </DropdownItem>
//                                 <DropdownItem>
//                                     Option 2
//                                 </DropdownItem>
//                                 <DropdownItem divider />
//                                 <DropdownItem>
//                                     Reset
//                                 </DropdownItem>
//                             </DropdownMenu>
//                         </UncontrolledDropdown>
//                     </Nav>
//                     <InputGroup size="sm" style={{ width: '25%' }}>
//                         <Input placeholder="Cari..." style={{ height: '32px' }} />
//                         <InputGroupAddon addonType="append">
//                             <span className="btn btn-outline-secondary material-icons">
//                                 search
//                             </span>
//                         </InputGroupAddon>

//                     </InputGroup>
//                             <div className="d-flex">
//                                 <span className="material-icons m-1">
//                                     shopping_cart
//                                 </span>
//                                 <h5><Badge color="warning" className="m-auto">0</Badge></h5>
//                             </div>
//                 </Collapse>
//             </Navbar>
//         </div>
//     )
// }

// export default NavbarComp
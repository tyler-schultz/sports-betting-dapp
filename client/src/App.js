import React, { useState } from 'react';
import logo from './Balln Chain Logo.png';
import Betting from "./pages/Betting.js";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

const App = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Ball'n Chain</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Create Game</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="./pages/Betting.js">Place Bet</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Make Your Millions</NavbarText>
                </Collapse>
            </Navbar>
            <img src={logo}/>
        </div>


    );
}


export default App;

import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/app.slice'
import { toast } from 'react-toastify'

const NavBar = () => {

    const token = useSelector(state => state.app.token);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast('successfully logged out', { theme: 'dark' });
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark" >
            <Container>
                <Navbar.Brand
                    as={Link}
                    to={'/'}
                    className='text-white'
                >
                    Hotels app
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to={'/bookings'}
                            className='text-white'
                        >
                            My bookings
                        </Nav.Link>
                        {token ? (
                            <Nav.Link
                                className='text-white'
                                onClick={handleLogout}
                                as={Link}
                                to={'/login'}
                            >
                                Log out
                            </Nav.Link>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to={'/login'}
                                className='text-white'
                            >
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
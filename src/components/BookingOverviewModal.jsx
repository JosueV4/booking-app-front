import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import getDatesDays from '../utils/getDateDays'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { formatDateLong } from '../utils/formatDate'
import generateFlag from '../utils/generateFlag'
import axios from '../utils/axios'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../store/slices/app.slice'

const BookingOverviewModal = ({ show, handleClose, booking, hotel}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    if (!booking) return <></>

    const createBooking = () => {
        dispatch(setIsLoading(true));
        axios.post('/bookings', booking)
            .then(() => {
                toast('Booking created successfully', {
                    theme: 'dark',
                    type: 'success',
                });
                navigate('/bookings');
            })
            .finally(() => dispatch(setIsLoading(false)));
    }

    const days = getDatesDays(booking.checkIn, booking.checkOut);
    const total = days * hotel.price;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Booking overview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mb-5'>
                    <Col xs={8}>
                        <h4>{hotel.name}</h4>
                        <img src={generateFlag(hotel.city.countryId)} alt="flag" style={{width: 25}} />
                        <span> {hotel.city.name}, {hotel.city.country}</span>
                    </Col>
                    <Col xs={4}>
                        <img src={hotel.images[0].url} alt="hotel image" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex align-items-center gap-2'>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            <b style={{width: 80}}>Check in: </b>
                            {formatDateLong(booking.checkIn)}
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            <b style={{width: 80}}>Check out: </b>
                            {formatDateLong(booking.checkOut)}
                        </div>
                    </Col>
                    <Col className='d-flex align-items-end justify-content-end'>
                        <div className='d-flex gap-2 fw-bold align-items-center mt-3'>
                            <span>{days} days</span>
                            <i className="fa-solid fa-x" style={{fontSize: 9}}></i> 
                            <span className="text-success">${hotel.price}</span>
                            <i className="fa-solid fa-equals" style={{fontSize: 9}}></i>
                            <span className="text-success fs-5">$ {total}</span>
                        </div>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={createBooking}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BookingOverviewModal
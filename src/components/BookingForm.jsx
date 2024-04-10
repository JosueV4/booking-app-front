import React, { useEffect, useState } from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { formatDateShort } from '../utils/formatDate';
import { useForm } from 'react-hook-form'
import addDays from '../utils/addDays'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingOverviewModal from './BookingOverviewModal';

const defaultValues = {
    checkIn: formatDateShort(addDays(new Date(), 5)),
    checkOut: formatDateShort(addDays(new Date(), 10)),
}

const BookingForm = ({ hotel }) => {

    const [showModal, setShowModal] = useState({ show: true, booking: null });
    const openModal = (booking) => setShowModal({ show: true, booking });
    const closeModal = () => setShowModal({ ...showModal, show: false });

    const { register, handleSubmit, reset } = useForm({
        defaultValues
    });

    const token = useSelector(state => state.app.token);
    const navigate = useNavigate();

    useEffect(() => { reset(defaultValues) }, [])

    const submit = data => {
        if (!token) {
            navigate('/login')
            toast('You must be logged in to make a booking', {
                theme: 'dark',
                type: 'warning',
            });
        }
        data.hotelId = hotel.id;
        openModal(data);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Book now!</Card.Title>
                    <form onSubmit={handleSubmit(submit)}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text style={{ minWidth: "100px" }}>
                                Check In
                            </InputGroup.Text>
                            <Form.Control
                                type="date"
                                aria-label="Check in"
                                {...register("checkIn")}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text style={{ minWidth: "100px" }}>
                                Check Out
                            </InputGroup.Text>
                            <Form.Control
                                type="date"
                                aria-label="Check out"
                                {...register("checkOut")}
                            />
                        </InputGroup>
                        <Button style={{ width: "100%" }} type='submit'>
                            Book
                        </Button>
                    </form>
                </Card.Body>
            </Card>
            <BookingOverviewModal 
                booking={showModal.booking} 
                show={showModal.show}
                handleClose={closeModal}
                hotel={hotel}
            />
        </>
    )
}

export default BookingForm
import React, { useEffect, useState } from 'react'
import { formatDateLong } from '../utils/formatDate'
import { Button } from 'react-bootstrap'
import axios from '../utils/axios'
import { useSelector } from 'react-redux'
import ReviewForm from './ReviewForm'
import getDatesDays from '../utils/getDateDays'
import { useNavigate } from 'react-router-dom'

const BookingItem = ({ booking }) => {

    const userId = useSelector(state => state.app.userId);
    const [review, setReview] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const onChangeReview = review => setReview(review);
    const navigate = useNavigate();

    const price = getDatesDays(booking.checkIn, booking.checkOut) + booking.hotel.price;

    useEffect(() => {
        axios.get(`/reviews?hotelId=${booking.hotelId}&userId=${userId}`)
            .then(res => {
                if (res.data.total === 1) {
                    setReview(res.data.results[0]);
                }
            })
    }, [])

    return (
        <>
            <tr>
                <td>
                    <img
                        src={booking.hotel.images[0].url}
                        alt="Hotel image"
                        style={{ maxWidth: '150px' }}
                    />
                </td>
                <td 
                    onClick={() => navigate(`/hotels/${booking.hotel.id}`)} 
                    style={{cursor: 'pointer'}}
                >
                    {booking.hotel.name}
                </td>
                <td>{formatDateLong(booking.checkIn)}</td>
                <td>{formatDateLong(booking.checkOut)}</td>
                <td className='text-success fw-bold'>$ {price}</td>
                <td>
                    {review ? (
                        <Button variant='warning' onClick={openForm}>
                            <i className="fa-solid fa-pen-to-square"></i> {" "}
                            See review
                        </Button>
                    ) : (
                        <Button variant='success' onClick={openForm}>
                            <i className="fa-regular fa-square-plus"></i> {" "}
                            Create review
                        </Button>
                    )}
                </td>
            </tr>
            <ReviewForm 
                show={showForm} 
                handleClose={closeForm} 
                hotel={booking.hotel} 
                review={review}
                onChangeReview={onChangeReview}
            />
        </>
    )
}

export default BookingItem
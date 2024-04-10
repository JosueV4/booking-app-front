import React, { useEffect, useState } from 'react'
import axios from '../utils/axios';
import BookingItem from '../components/BookingItem';
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/app.slice';
import '../styles/bookings.css';

const Bookings = () => {

  const [ bookings, setBookings ] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true))
    axios.get('/bookings')
      .then(res => setBookings(res.data))
      .finally(() => dispatch(setIsLoading(false)));
  }, []);

  return (
    <>
      <h2 className='text-center mb-5'>My bookings</h2>
      {bookings.length > 0 ? (
        <Table striped bordered hover className='center-table-elements'>
          <thead>
            <tr>
              <th></th>
              <th>Hotel</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Total</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <BookingItem booking={booking} key={booking.id} />
            ))}
          </tbody>
        </Table>
      ) : (
        <div className='text-center fs-3 text-muted'>
          <i className="fa-solid fa-magnifying-glass"></i>
          You don't have any bookings yet {" "}
        </div>
      )}
    </>
  )
}

export default Bookings
import React, { useEffect, useState } from 'react'
import { Col, Modal, Offcanvas, Row } from 'react-bootstrap'
import StarInput from './StarInput'
import axios from '../utils/axios';
import ReviewCard from './ReviewCard';
import '../styles/sidebar-styles.css';

const ReviewsModal = ({ show, handleClose, hotel }) => {

  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`/reviews?hotelId=${hotel.id}&offset=0&perPage=12`)
      .then(res => {
        setTotal(res.data.total);
        setReviews(res.data.results)
      })
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header closeButton>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='reviews-average mb-4'>
            <div className="number">
              {hotel.rating}
            </div>
            <div>
              <StarInput value={hotel.rating} editable={false} />
              <div className='total text-body-secondary'>{total} reviews</div>
            </div>
          </div>
          <Row md={2} className='g-4'>
            {reviews.map(review => (
              <Col key={review.id}>
                <ReviewCard review={review} />
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReviewsModal
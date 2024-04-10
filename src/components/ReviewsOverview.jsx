import React, { useEffect, useState } from 'react'
import useWindowWidth from '../utils/useWindowWidth';
import axios from '../utils/axios';
import ReviewCard from './ReviewCard';
import { Button, Col, Row } from 'react-bootstrap';
import ReviewsModal from './ReviewsModal';

const ReviewsOverview = ({ hotel }) => {

  const width = useWindowWidth();
  const [reviews, setReviews] = useState([]);
  const [ showModal, setShowModal ] = useState(false);

  const openSidebar = () => setShowModal(true);
  const closeSidebar = () => setShowModal(false);

  useEffect(() => {
    axios.get(`/reviews?hotelId=${hotel.id}&offset=0&perPage=4`)
      .then(res => setReviews(res.data.results))
  }, [])

  const getReviews = () => {
    if (width <= 576) {
      return reviews.slice(0, 1);
    } if (width <= 992) {
      return reviews.slice(0, 2);
    } if (width <= 1200) {
      return reviews.slice(0, 3);
    }
    return reviews.slice(0, 4);
  }

  return (
    <>
      <div className="d-flex align-items-center gap-4 mb-3">
        <h3>Reviews</h3>
        {reviews.length > 0 && (
          <Button size='sm' variant='success' onClick={openSidebar}>
            See all
          </Button>
        )}
      </div>
      {reviews.length ? (
        <Row sm={2} lg={3} xl={4}>
          {getReviews().map(review => (
            <Col key={review.id}>
              <ReviewCard review={review} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className='text-muted'>Nobody has reviewed <b>{hotel.name}</b> yet</div>
      )}
      <ReviewsModal 
        show={showModal} 
        handleClose={closeSidebar} 
        hotel={hotel} 
      />
    </>
  )
}

export default ReviewsOverview
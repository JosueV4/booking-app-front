import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import ImagesCarousel from '../components/ImagesCarousel';
import { Col, Row } from 'react-bootstrap';
import BookingForm from '../components/BookingForm';
import HotelMap from '../components/HotelMap';
import HotelInfo from '../components/HotelInfo';
import StarInput from '../components/StarInput';
import ReviewsOverview from '../components/ReviewsOverview';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelsThunk } from '../store/slices/hotel.slice';
import HotelCard from '../components/HotelCard';

const HotelDetail = () => {

  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const hotelsSuggestions = useSelector(state => state.hotels.filtered);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0 })
    axios.get('/hotels/' + id)
      .then(res => {
        setHotel(res.data);
        dispatch(getHotelsThunk({ cityId: res.data.cityId, clear: true }));
      });
  }, [ id ]);

  if (!hotel) return <></>

  return (
    <div>
      <h2 className='mb-2 text-center'>{hotel.name}</h2>
      <p className='text-center mb-4'>
        <i className="fa-solid fa-location-dot text-info"></i> {" "}
        {hotel.address}
      </p>
      <Row className='mb-5'>
        <Col md={8}>
          <ImagesCarousel images={hotel.images} />
        </Col>
        <Col md={4} className='d-flex flex-column row-gap-2'>
          <BookingForm hotel={hotel} />
          <HotelMap lat={hotel.lat} lon={hotel.lon} />
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col md={8}>
          <p>{hotel.description}</p>
        </Col>
        <Col md={4}>
          <HotelInfo hotel={hotel} />
        </Col>
      </Row>
      <ReviewsOverview hotel={hotel} />
      <h3 className='mt-5 mb-3'>Other recomendations</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {hotelsSuggestions.map((hotel) => (
          <Col key={hotel.id}>
            <HotelCard hotel={hotel} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HotelDetail
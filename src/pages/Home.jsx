import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import axios from '../utils/axios';
import HotelCard from '../components/HotelCard';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelsThunk } from '../store/slices/hotel.slice';
import SearchHotelInput from '../components/SearchHotelInput';
import Filters from '../components/Filters';

const Home = () => {

    const dispatch = useDispatch();
    const hotels = useSelector(state => state.hotels.filtered);

    useEffect(() => {
        dispatch(getHotelsThunk({ clear: true }));
    }, []);

    return (
        <>
            <h3 className='mb-5'>Find your ideal hotel...</h3>
            <Row>
                <Col sm="3">
                    <Filters />
                </Col>
                <Col sm="9">
                    
                    <SearchHotelInput />

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {hotels.map((hotel) => (
                            <Col key={hotel.id}>
                                <HotelCard hotel={hotel} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Home
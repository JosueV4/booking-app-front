import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import StarInput from './StarInput';

const HotelCard = ({ hotel }) => {

    const navigate = useNavigate();

    return (
        <Card 
            style={{ height: '100%', cursor: 'pointer' }}
            onClick={() => navigate(`/hotels/${hotel.id}`)}
        >
            <Card.Img
                variant="top"
                src={hotel.images?.[0]?.url}
                style={{ height: "250px", objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title style={{ height: "48px" }}>
                    {hotel.name}
                </Card.Title>
                <p style={{color: '#ffc107'}}>
                    <span>{hotel.rating} </span>
                    <StarInput
                        value={hotel.rating}
                        editable={false}
                    />
                </p>
                <Card.Text>
                    {hotel.description.slice(0, 160) + '...'}
                </Card.Text>
                <p className='text-success text-end fw-bold'>
                    $ {hotel.price} per night
                </p>
            </Card.Body>
        </Card>
    )
}

export default HotelCard
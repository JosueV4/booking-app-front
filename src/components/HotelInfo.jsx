import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import generateFlag from '../utils/generateFlag'
import StarInput from './StarInput'

const HotelInfo = ({ hotel }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Details</Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        Price per Night: {" "}
                        <span className='text-success fw-bold'>
                            $ {hotel.price}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex  align-items-center gap-1'>
                        <i className="fa-solid fa-city"></i> {" "}
                        City: {" "}
                        <span className='text-success fw-bold'>
                            {hotel.city.name}, {hotel.city.country}
                        </span>
                        <img
                            src={generateFlag(hotel.city.countryId)}
                            alt={`${hotel.city.country} flag`}
                            style={{ width: 30 }}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <i className="fa-solid fa-location-dot text-info"></i> {" "}
                        Address: {" "}
                        <span className='fw-bold'>
                            {hotel.address}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Rating: {" "}
                        <span style={{color: '#ffc107'}}>
                            {hotel.rating}
                            <StarInput
                                value={hotel.rating}
                                editable={false}
                            />
                        </span>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default HotelInfo
import React, { useMemo } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import StarInput from './StarInput';

const ReviewCard = ({ review }) => {

  const { firstName, lastName } = review.user;
  const backgrounds = ['ffff9f', 'ffb6ad', '7ecaca', 'cda0cb', 'a6ead1', 'ff7e88']

  const avatarUrl = useMemo(() => {
    const name = `${firstName}+${lastName}`;
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    return `https://ui-avatars.com/api/?background=${background}&size=128&name=${name}`;
  }, []);

  return (
    <Card className='h-100'>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <img 
              src={avatarUrl} 
              style={{borderRadius: '100%'}} 
              alt={`${firstName} avatar`} 
            />
          </Col>
          <Col xs={9}>
            <Card.Title>{firstName} {lastName}</Card.Title>
            <Card.Subtitle className='mb-3'>
              <StarInput
                value={review.rating}
                editable={false}
              />
            </Card.Subtitle>
            {review.comment}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default ReviewCard
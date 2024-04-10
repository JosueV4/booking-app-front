import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/app.slice';

const Signup = () => {
  const { handleSubmit, register, formState: { isValid } } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submit = data => {
    dispatch(setIsLoading(true));
    axios.post('/users', data)
      .then(() => {
        toast('Account created! loggin with your new credentials', {
          theme: 'dark',
          type: 'success'
        });
        navigate('/login');
      })
      .catch(error => {
        console.log(error.response?.data);
        if (error.response?.data?.message?.includes('Validation error')) {
          toast('Email already exists', {
            theme: 'dark',
            type: 'error',
          });
          return;
        }
      })
      .finally(() => dispatch(setIsLoading(false)));
  }

  return (
    <Card style={{ maxWidth: '568px', margin: '0 auto' }}>
      <Card.Body>
        <h3 className='mb-4'>Login</h3>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register('email')}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </Form.Group>

          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Firstname"
                  {...register('firstName')}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lastname"
                  {...register('lastName')}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="lastname">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Gender" {...register('gender', {required: true})}>
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <p className='mb-5'>
            Already have and account? <Link to='/login'>Login</Link>
          </p>

          <Button
            variant="primary"
            type="submit"
            style={{ width: '100%' }}
            disabled={!isValid}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Signup
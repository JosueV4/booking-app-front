import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setIsLoading } from '../store/slices/app.slice';

const Login = () => {

  const { handleSubmit, register, formState: {isDirty} } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submit = data => {
    dispatch(setIsLoading(true));
    axios.post('/users/login', data)
      .then(res => {
          toast('Successfully logged in!', {
            theme: 'dark',
            type: 'success'
          });
          dispatch(login({
            token: res.data.token, 
            userId: res.data.user.id
          }));
          navigate('/');
      })
      .catch(error => {
        console.log(error.response?.data);
        if (error.response?.data?.message?.includes('Invalid credentials')) {
          toast('Invalid credentials', {
            theme: 'dark',
            type: 'error',
          });
          return;
        }
      })
      .finally(() => dispatch(setIsLoading(false)));
  }

  return (
    <Card style={{ maxWidth: '568px', margin: '0 auto'}}>
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

          <p className='mb-5'>
            Dont have and account? <Link to='/signup'>Sign up</Link>
          </p>

          <Button 
            variant="primary" 
            type="submit" 
            style={{width: '100%'}} 
            disabled={!isDirty}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Login
import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import StarInput from './StarInput';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/app.slice';

const defaultValues = { rating: 0, comment: "" }

const ReviewForm = ({ show, handleClose, hotel, review, onChangeReview }) => {

    const { register, handleSubmit, control, reset } = useForm({ defaultValues });
    const dispatch = useDispatch();

    useEffect(() => {
        if (review) reset(review);
        else reset(defaultValues);
    }, [review]);

    const saveReview = (result) => {
        handleClose();
        toast('Review saved successfully', {
            theme: 'dark',
            type: 'success',
        });
        onChangeReview(result);
    }

    const submit = (data) => {
        data.hotelId = hotel.id;
        dispatch(setIsLoading(true));
        const request = review ? axios.put(`/reviews/${review.id}`, data) : axios.post('/reviews', data)
        request
            .then((res) => saveReview(res.data))
            .finally(() => dispatch(setIsLoading(false)));
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(submit)}>

                <Modal.Header closeButton>
                    <Modal.Title>Your review</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>{hotel.name}</h4>

                    <Controller
                        control={control}
                        name="rating"
                        render={({ field: { onChange, value } }) => (
                            <StarInput
                                size={30}
                                className='d-block text-center mb-5 mt-4'
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Tell us about your experience</Form.Label>
                        <Form.Control
                            type="text"
                            as='textarea'
                            placeholder="Enter your review"
                            rows={4}
                            {...register('comment')}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ width: '100%' }}
                    >
                        <i className="fa-regular fa-floppy-disk"></i> {" "}
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ReviewForm
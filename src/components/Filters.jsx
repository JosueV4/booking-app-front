import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import axios from '../utils/axios';
import '../styles/filters.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterPriceThunk, getHotelsThunk } from '../store/slices/hotel.slice';
import { useForm } from 'react-hook-form';
import generateFlag from '../utils/generateFlag';

const Filters = () => {

    const [cities, setCities] = useState([]);

    const dispatch = useDispatch();

    const selectedCity = useSelector(state => state.hotels.cityId);
    const selectedName = useSelector(state => state.hotels.name);
    const prices = useSelector(state => state.hotels.price);

    const defaultPrice = { min: "", max: "" }
    const { register, handleSubmit, reset, formState: {isDirty} } = useForm({ 
        defaultValues: defaultPrice 
    });

    const submitPrice = (data) => {
        const { min, max } = data;
        dispatch(filterPriceThunk([min || 0, max || Infinity]));
        reset(defaultPrice);
    }

    useEffect(() => {
        axios.get('/cities')
            .then(res => setCities(res.data))
    }, []);

    const filterCity = (cityId) => {
        dispatch(getHotelsThunk({ cityId }))
    }

    const arePriceSelected = () => prices[0] !== 0 || prices[1] !== Infinity

    return (
        <div>
            {(selectedCity || selectedName || arePriceSelected()) && (
                <Button
                    variant='outline-light'
                    onClick={() => dispatch(getHotelsThunk({ clear: true }))}
                    className='mb-5'
                >
                    Clear filters
                </Button>
            )}

            <strong className='d-block mb-2'>Filter by price</strong>
            <form onSubmit={handleSubmit(submitPrice)}>
                <InputGroup className="mb-3">
                    <Form.Control 
                        type="numeric" 
                        aria-label="First name" 
                        placeholder='Min' 
                        {...register('min')}
                    />
                    <InputGroup.Text>
                        <i className="fa-solid fa-minus"></i>
                    </InputGroup.Text>
                    <Form.Control 
                        type="numeric" 
                        aria-label="Last name" 
                        placeholder='Max' 
                        {...register('max')}
                    />
                </InputGroup>
                <Button style={{width: "100%"}} disabled={!isDirty} type="submit" className='mb-5'>
                    Filter price
                </Button>
            </form>


            <strong className='d-block mb-2'>Filter by city</strong>
            <ListGroup>
                {cities.map(city => (
                    <ListGroup.Item
                        key={city.id}
                        style={{ cursor: 'pointer' }}
                        className='city-item'
                        onClick={() => filterCity(city.id)}
                        active={city.id === selectedCity}
                    >
                        <img src={generateFlag(city.countryId)} alt={city.country} />
                        {city.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Filters
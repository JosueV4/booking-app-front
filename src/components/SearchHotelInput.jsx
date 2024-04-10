import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getHotelsThunk } from '../store/slices/hotel.slice';

const SearchHotelInput = () => {

  const dispatch = useDispatch();
  const [ hotelName, setHotelName ] = useState("");

  const search = () => {
    if (!hotelName) return;
    dispatch(getHotelsThunk({ name: hotelName }));
    setHotelName("");
  }

  const onEnter = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      search();
    }
  }

  return (
    <InputGroup className="mb-5">
      <Form.Control
        placeholder="Search by hotel name"
        aria-label="Search by hotel name"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
        onKeyUp={onEnter}
      />
      <Button variant="outline-primary" onClick={search} disabled={!hotelName}>
        Buscar
      </Button>
    </InputGroup>
  )
}

export default SearchHotelInput
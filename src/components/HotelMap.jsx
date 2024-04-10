import React, { useEffect, useRef } from 'react'
import mapboxgl from '../utils/mapboxgl';

const HotelMap = ({lat, lon}) => {

    const mapContainerRef = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lon, lat],
            zoom: 11,
        })
        new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .addTo(map.current);
    }, [])

    return (
        <div 
            className='map-container'
            style={{ height: "100%", width: '100%', borderRadius: 5}}
            ref={mapContainerRef}
        ></div>
    )
}

export default HotelMap
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'
import '../styles/image-carousel.css';
import { useParams } from 'react-router-dom';

const ImagesCarousel = ({ images }) => {

    const { id } = useParams();

    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        setImageIndex(0);
    }, [id])

    const handleSelect = (selectedIndex) => {
        setImageIndex(selectedIndex);
    };

    return (
        <>
            <Carousel activeIndex={imageIndex} onSelect={handleSelect} interval={3000} className='mb-3'>
                {images.map(image => (
                    <CarouselItem key={image.id}>
                        <img
                            src={image.url}
                            alt="hotel image"
                            className='carousel-img'
                        />
                    </CarouselItem>
                ))}
            </Carousel>
            <div className="images-previews">
                {images.map((image, i) => (
                    <div className="image-container" key={image.id}>
                        <img 
                            src={image.url} 
                            alt="hotel image"
                            className={`${i === imageIndex && 'active border-primary'}`} 
                            onClick={() => setImageIndex(i)}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default ImagesCarousel
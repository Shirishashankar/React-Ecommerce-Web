import Carousel from 'react-bootstrap/Carousel';
import './Style.css';
import Cards from './Cards';
import IMG1 from '../assets/img1.png';
import IMG2 from '../assets/img2.png';
import IMG3 from '../assets/img3.png';

function CarouselDemo() {
    return (
        <div className="carousel-container">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="carousel-img"
                        src={IMG1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-img"
                        src={IMG2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="carousel-img"
                        src={IMG3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
<Cards/>
export default CarouselDemo;
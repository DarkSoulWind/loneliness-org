import React from 'react';
import { Container, Card, Row, Col, CardGroup, Carousel } from 'react-bootstrap';
import Clarks from '../images/Clarks.png';
import Group from '../images/Group.png';
import CollectedFood from '../images/Collected-food.png';
import HomelessMan from '../images/Homelessman.png';

const About = () => {
    return (
        <div className='aboutPage'>
            <Container style={{'marginTop' : '4em' }}>
                
                {/* SVG BACKGROUND */}
                <section>
                    <div style={{'marginTop' : '3em'}} className="custom-shape-divider-top-1644270470">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                        </svg>
                    </div>
                    <div className="custom-shape-divider-bottom-1644271346">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" className="shape-fill"></path>
                        </svg>
                    </div>
                </section>

                <div style={{'color' : 'pink'}}>
                    <h1>Loneliness affects us all</h1>
                    <h3>Page under development</h3>
                </div>

                <Carousel>

                    <Carousel.Item>
                        <img className='d-block w-100' src={HomelessMan} />
                        <Carousel.Caption>
                            <h3>Under development</h3>
                            <p>This page is under development</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    
                    <Carousel.Item>
                        <img className='d-block w-100' src={Group} />
                        <Carousel.Caption>
                            <h3>Under development</h3>
                            <p>This page is under development</p>
                        </Carousel.Caption>
                    </Carousel.Item>


                    <Carousel.Item>
                        <img className='d-block w-100' src={CollectedFood} />
                        <Carousel.Caption>
                            <h3>Under development</h3>
                            <p>This page is under development</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </Container>
        </div>
    );
};

export default About;

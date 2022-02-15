import React from 'react';
import { Container, Card, Row, Col, CardGroup, Carousel } from 'react-bootstrap';
import Clarks from '../images/Clarks.png';
import Group from '../images/Group.png';
import CollectedFood from '../images/Collected-food.png';
import HomelessMan from '../images/Homelessman.png';
import Background from '../layered-waves-haikei.svg';

const About = () => {
    return (
        <>
        <div className='aboutPage'>
            <div id='bg'>
                <img src={Background} alt='background'/>
            </div>

            <Container style={{'marginTop' : '4em' }}>

                <div style={{'color' : 'pink'}}>
                    <h1>Loneliness affects us all</h1>
                    <h3>We are a group of college students trying to raise awareness of the issues and vulnerabilities that come with being alone.</h3>
                </div>

                <Carousel>

                    <Carousel.Item>
                        <img className='d-block w-100' src={HomelessMan} />
                        <Carousel.Caption>
                            <h3>Visiting the homeless shelter</h3>
                            <p>NCS October 2021</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    
                    <Carousel.Item>
                        <img className='d-block w-100' src={Group} />
                        <Carousel.Caption>
                            <h3>Team Home Aware</h3>
                            <p>collecting food for the homeless</p>
                        </Carousel.Caption>
                    </Carousel.Item>


                    <Carousel.Item>
                        <img className='d-block w-100' src={CollectedFood} />
                        <Carousel.Caption>
                            <h3>Food and supplies collected</h3>
                            <p>Generous donations from other shops for the homeless</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div style={{'color' : 'white'}} >
                    <h3>It's never easy to deal with things alone, whether you're a child, an adult or an elderly person. In these times, it's especially essential to stay connected with people you trust and love.</h3>
                    <h3>We created this platform for people to interact and care for each other during these difficult times.</h3>
                    
                </div>
            </Container>
        </div>
        </>
    );
};

export default About;

import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col, Card, Fade } from 'react-bootstrap';
import Group from '../images/Group.png';
import CollectedFood from '../images/Collected-food.png';
import HomelessMan from '../images/Homelessman.png';
import RaftBuilding from '../images/Raft-Building.jpeg';
import NCSGroup from '../images/NCS-Group.jpeg';
import CarePackages from '../images/Care-Packages.jpeg';
import BarkingLibrary from '../images/Barking-Library.jpeg';
import Background from '../layered-waves-haikei.svg';

const About = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setOpen(true), 250)
    }, [])

    return (
        <>
        <div className='aboutPage' style={{'padding' : '4em 0em 12em 0em'}}>
            <div id='bg'>
                <img src={Background} alt='background'/>
            </div>
            
            <Fade in={open}>
                <div>

                    <Container >
                        <div style={{'color' : 'pink', 'padding' : '1em 0em 2em 0em'}}>
                            <h1>Loneliness affects us all</h1>
                            <h3>
                                We are a group of college students working with the National Citizen Service to raise awareness of the issues and vulnerabilities that come with being alone.
                            </h3>
                        </div>
                    </Container>

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

                    {/* CARD GRID */}
                    <Container>
                        <div style={{'color' : 'white', 'padding' : '2em 0em 2em 0em'}} >
                            <h3>It's never easy to deal with things alone, whether you're a child, an adult or an elderly person. In these times, it's especially essential to stay connected with people you trust and love.</h3>
                            <h3>We created this platform for people to interact and care for each other during these difficult times.
                                 Whether you need to rant or get things off your chest or you're simply looking for support, this community is built for you.</h3>
                        </div>

                        <Row md={2} className='g-4'>

                            <Col>
                                <Card>
                                    <Card.Img className='h-100' src={RaftBuilding} variant='top' alt='Building a raft' />
                                    <Card.Body>
                                        <Card.Title>What is NCS?</Card.Title>
                                        <Card.Text>
                                            NCS is a programme that helps young people (like us) to get out of their comfort zone and try new things. The creator of this website has worked closely with NCS to bring this experience to you. Learn more about NCS <a href='https://wearencs.com/'>here</a>.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col>
                                <Card>
                                    <Card.Img className='h-100' src={NCSGroup} variant='top' alt='Photo of NCS group'/>
                                    <Card.Body>
                                        <Card.Title>Why do NCS?</Card.Title>
                                        <Card.Text>
                                            NCS gives us young people the opportunity to work as a collective to help our community, largen our social circle through meeting new people and reap the necessary skills for when we become future independent adults.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col>
                                <Card>
                                    <Card.Img className='h-100' src={CarePackages} variant='top' alt='Stock photo of care packages'/>
                                    <Card.Body>
                                        <Card.Title>What is our mission?</Card.Title>
                                        <Card.Text>
                                            On Saturday 19th of February, we will be delivering care packages to children's care homes. This is part of our initiative to care for the community and also our sole purpose for this project to prevent loneliness for young children that may be experiencing neglect or lack of welfare.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col>
                                <Card>
                                    <Card.Img className='h-100' src={BarkingLibrary} variant='top' alt='Barking Library'/>
                                    <Card.Body>
                                        <Card.Title>Where is this?</Card.Title>
                                        <Card.Text>This will take place in Barking Library, and we'll be delivering care packages to childrens homes in Barking and Dagenham through the partnerships that we have acquired.</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                </div>
            </Fade>
        </div>
        </>
    );
};

export default About;

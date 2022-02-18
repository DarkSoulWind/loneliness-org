import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
    return (
      <MDBFooter className='text-center fixed-bottom' color='white' bgColor='dark'>
        <MDBContainer className='p-2'>
          <section className='mb-2'>
            <a className='btn btn-outline-light btn-floating m-1' href='https://twitter.com/SAM_S00NG' role='button'>
              <MDBIcon fab icon='twitter' />
            </a>
    
            <a className='btn btn-outline-light btn-floating m-1' href='https://www.instagram.com/s.mohd.a/' role='button'>
              <MDBIcon fab icon='instagram' />
            </a>
    
            <a className='btn btn-outline-light btn-floating m-1' href='https://github.com/DarkSoulWind' role='button'>
              <MDBIcon fab icon='github' />
            </a>

            <a className='btn btn-outline-light btn-floating m-1' href='https://discord.com/api/oauth2/authorize?client_id=782336206384922647&permissions=8&scope=bot%20applications.commands' role='button'>
              <MDBIcon fab icon='discord' />
            </a>

          </section>
    
          <section className=''>
            <p>
              Contact us: harryazaan@gmail.com
            </p>
          </section>
    
          
        </MDBContainer>
    
        <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2022 SMA
        </div>
      </MDBFooter>
    );
}

export default Footer
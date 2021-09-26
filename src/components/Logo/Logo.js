import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';
const Logo = () => {
  return(
    <div style={{ paddingLeft: '3rem' }}>
    	<Tilt className='bg-attributes displayTilt z-depth-4 valign-wrapper '>
       <div>
         <img alt='brainLogo' src={brain} />
       </div>
      </Tilt> 
    </div>
  )
}

export default Logo;
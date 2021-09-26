import './NavigationBar.css'
import { Link } from "react-router-dom";

const NavigationBar = ({ clearStateOnsignOut }) => {
  return(
    <nav className='navBar z-depth-0 valign-wrapper'>
  	  <Link 
        to='/SignIn' 
        style={{paddingRight: '3rem'}}
        onClick={clearStateOnsignOut}
      >
          Sign Out
      </Link>
    </nav>
  )
}

export default NavigationBar;
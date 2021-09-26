import { Fragment } from 'react';

const Rank = ({ name, enteries }) => {
  return(
  	<>	
	  <div style={{color: 'white', fontSize: '2rem', marginTop: '2rem'}}>
	    {`${name}, your current entry count ...`}
	  </div>
	  <div style={{color: 'white', fontSize: '2rem'}}>
	    {`${enteries}`}
	  </div>
  	</>
  )
}

export default Rank;
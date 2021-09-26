import { Fragment } from 'react';
import './LinkInputField.css'

const LinkInputField = ({ onInputChange, OnButtonSubmit }) => {
  return(
  	<>
  	<div className="blurred-box z-depth-3 diplay-input-field">
  	  <div>
  	    {'This app will recognize any face in your image, give it a try'}
  	  </div>
  	  <div className="input-field col s6">
  		<input
        onChange={onInputChange} 
        style={{color: 'white'}} 
        placeholder="Enter the image url here" 
        id="first_name" 
        type="text"
      />
  		<button 
        className="z-depth-0 waves-effect waves-light btn"
        onClick={OnButtonSubmit}
      >
        detect
      </button>
  	  </div>
  	</div>
  	</>
  )
}

export default LinkInputField;
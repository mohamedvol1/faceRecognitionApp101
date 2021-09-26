import './FaceRecognitionImage.css'

const FaceRecognitionImage = ({ imgUrl, box}) => {
  if(imgUrl === ''){
    return(
      <div>
      	
      </div>
    )
  } else if (Object.keys(box).length === 0) {
    return(
    <div id='imgdivid' className='bg-style positioning'>
      <img id='faceimageid' className='faceimg' alt='face'  src={imgUrl} />
    </div> 
    )
  } else {
  	return(
  	<div id='imgdivid' className='bg-style positioning'>
  	  <img id='faceimageid' className='faceimg' alt='face'  src={imgUrl} />
      <div 
        id='boxid' 
        className='face-box-border' 
        style={{top: box.top, left: box.left, right: box.right, bottom: box.bottom}}
      >
      </div>
  	</div> 
	)
  }
}

export default FaceRecognitionImage;
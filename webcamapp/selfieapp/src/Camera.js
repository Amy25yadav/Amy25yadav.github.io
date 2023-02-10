import React, { useRef,useEffect, useState } from 'react'

import Webcam from 'react-webcam';


const videoConstraints = {
    width:540,
    facingMode:'enviroment'
}

const Camera = () =>{

    const [isShowVideo, setIsShowVideo] = useState(false);
   
    const webcamRef = useRef(null)

    const [url,setUrl] = useState(null)

    const capturePhoto = React.useCallback(async() =>{
        const imageSrc = webcamRef.current.getScreenshot()

        setUrl(imageSrc)
    },[webcamRef])

    const onUserMedia = (e) =>{
        console.log(e);
    }

    const startCam = () => {
        setIsShowVideo(true);
    }

    const stopCam = () => {
        let stream = webcamRef.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setIsShowVideo(false);
    }

    return (
        <div className="Container">
      <div className="card" style={{width: "18rem"}}>
        <div id=' buttongrp'>
        <div id='btnleft'>
      <button type='submit' onClick={startCam}>
        <img src='https://cdn-icons-png.flaticon.com/512/2983/2983067.png' alt='camlogo'/>
        </button>
        </div>
        <div id='btnrght'>
      <button  onClick={stopCam}>
        <img  src='https://cdn-icons-png.flaticon.com/512/9247/9247575.png' alt='goback'/>
        </button>
        </div>
        </div>
      {isShowVideo &&
      <Webcam
      ref={webcamRef}
      audio = {false}
      screenshotFormat="image/png"
      minScreenshotHeight={50}
      minScreenshotWidth={40}
      videoConstraints={videoConstraints}
      onuser={onUserMedia}
      mirrored={true}
     
      />}
     
           
  <div className="card-body">
  <div>
        {url && (
        // <div className='screenshot'>
            
            <img  src={url} alt="Screenshot"/>
        // </div>
      
      )}
<div className='capture'>
    <button className='btn btn-primary' onClick={capturePhoto}>
        <img  src='https://cdn-icons-png.flaticon.com/512/3318/3318274.png'/>
        </button>
    </div>
    </div>
      <button className='btn btn-secondary' onClick={() => setUrl(null)}>Delete</button>
      </div>
      </div>
  </div>

    )
    }
export default  Camera;


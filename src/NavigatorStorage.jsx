import React, { useRef , useEffect , useState} from 'react';



function APP () {
  const [a, setA] = useState(null)
  
  useEffect(()=>{
    if(navigator.storage){
      navigator.storage.estimate().then(( {usage, quota})=>{
          setA(`using ${usage} bytes out of ${(quota/1073741824).toFixed(2)} gigabytes`)
        
      })
    }
  },[])
  return (
    <div>
      <p>{a}</p>
    </div>
  )
}

export default APP

/*
function PhotoCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // State to manage the captured image
  const [capturedImage, setCapturedImage] = useState(null);

  // Function to start the webcam and set up the video stream
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing the webcam:', error);
    }
  };
  
  const downloadImage = () => {
    if (capturedImage) {
      const a = document.createElement('a');
      a.href = capturedImage;
      a.download = 'captured_image.png';
      a.click();
    }
  };

  // Function to capture a photo
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content into a data URL (PNG image)
      const imageSrc = canvas.toDataURL('image/png');

      // Set the captured image in the state
      setCapturedImage(imageSrc);
    }
  };
  
  useEffect(()=>{
    downloadImage()
  },[capturedImage])


  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={startWebcam}>Start Webcam</button>
      <button onClick={capturePhoto}>Capture Photo</button>
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured Photo" style={{ width: '100%' }} />
          <button onClick={downloadImage}>Download Photo</button>
        </div>
      )}
    </div>
  );
}

*/


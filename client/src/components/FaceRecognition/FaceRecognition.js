import React from 'react';
import './FaceRecognition.css';


const FacaRecognition = ({ imageUrl, boxes }) => {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
            <img id='inputImage' src={imageUrl} alt='' width='500' height='auto'/>
            {
                boxes.map((box, index)=> {
                    return (
                        <div className='bounding-box' 
                            key={index}
                            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                        </div>
                    );
                })
            }
            
        </div>
      </div>
    );
};

export default FacaRecognition;

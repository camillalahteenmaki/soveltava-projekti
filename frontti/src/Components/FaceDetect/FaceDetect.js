import React from 'react';
import './FaceDetect.css';

const FaceDetect = (props) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={props.imageUrl} width="500px" heigh="auto" />
      <div
          className="bounding-box"
          style={{
            top: props.box.topRow,
            right: props.box.rightCol,
            bottom: props.box.bottomRow,
            left: props.box.leftCol,              
          }}
      ></div>
      </div>
    </div>
  );
};
export default FaceDetect;
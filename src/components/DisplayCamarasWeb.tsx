/**
 * DespliegaCamarasWeb.js  - Get and display thumbnails of City Web Cameras
 * 
 */
//, {useState}
import React from 'react'
import { WebCamObjects, WebCamObject  } from '../config/types';

const EXTEND_IMG_FRAME = 100;

const DisplayFrameWebCams = (webCamItem:WebCamObject) => {
  return (
      <div key={webCamItem.id}>
       <iframe title={webCamItem.id} src={webCamItem.player.day.embed}
           style={{height: (webCamItem.image.sizes.preview.height+EXTEND_IMG_FRAME)+'px', width:(webCamItem.image.sizes.preview.height+EXTEND_IMG_FRAME) +'px'}}>
        </iframe>
        <label>{webCamItem.title}</label>
      </div>
    )
  }

export const DisplayWebCams =( listaCams: WebCamObjects): JSX.Element => {
  //const [ wWebCamsFrames, setlistWebCamsFrames] = useState<displayWebCamFrames>([])
  //const [showVideo, setShowVideo] = useState <Array<[number,string]>>([])
    
  console.log('En componente DisplayWebCams, long de listaCams:',listaCams.length)  
     return (
         <div>
          <p>Si hay camaras</p>
             { listaCams.map((item:WebCamObject) => DisplayFrameWebCams(item) )}
        </div>  
        );
    }

  

/**
 * DespliegaCamarasWeb.js  - Display thumbnails of City Web Cameras on state var array listaCams prop
 * 
 */
//, {useState}
import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { WebCamObjects, WebCamObject  } from '../config/types';
import { TFunction } from 'i18next';
import './DisplayCamarasWeb.css'; 

const EXTEND_IMG_FRAME = 100; 

const DisplayFrameWebCams = (webCamItem:WebCamObject) => {
  return (
      <div key={webCamItem.id}>
        <Card>
          <Card.Body>
        <iframe title={webCamItem.id} src={webCamItem.player.day.embed}
            style={{height: (webCamItem.image.sizes.preview.height+EXTEND_IMG_FRAME)+'px', width:(webCamItem.image.sizes.preview.height+EXTEND_IMG_FRAME) +'px'}}>
          </iframe>
          </Card.Body>
          <Card.Footer>
              {webCamItem.title}
          </Card.Footer>
        </Card>
      </div>
    )
  }

export const DisplayWebCams =( listaCams: WebCamObjects, t:TFunction): JSX.Element => {
       return (
         <div className="web-cameras-frame">
           <h3> {t("camera.cameras")}</h3>
           <CardGroup className="mt-2 justify-content-center" style={{ fontSize:'0.65rem'}}>
             { listaCams.map((item:WebCamObject) => DisplayFrameWebCams(item) )}
          </CardGroup>
        </div>  
        );
    }

  

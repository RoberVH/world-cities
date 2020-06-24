/**
 * ChangeLanguage.- Component to display and select page Language
 *                  API's result is brougth using language selected swicht so is returned in that language
 *                  If user change language after  API's resulset is obtained their data won't change either, only
 *                  App's onw labels and titles
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import il8n from '../config/i18n';
import englisLangIcon from '../data/imgs/united-kingdom.png'
//import germanLangIcon from '../data/imgs/icons8-germany-48.png'
import germanLangIcon from '../data/imgs/germany.png'
import spanishLangIcon from '../data/imgs/spain.png'
import frenchLangIcon from '../data/imgs/france.png'
import portugueseLangIcon from '../data/imgs/brazil.png'



const WIDTH_RESIZE="20";
const HIGH_REZISE="20";


const LanguageSelector = (props:{id:string,title:string, src:string}) => {
    return (
    <img id={props.id} title= {props.title} src={props.src}  alt='Language Selector' 
         onClick= {(event:React.MouseEvent<HTMLElement>) => 
        il8n.changeLanguage(event.currentTarget.id)} 
        width={WIDTH_RESIZE} height={HIGH_REZISE} style={{marginRight:"3px", cursor:'pointer'}} ></img>
    )
}

/**
 * ChangeLanguage - Component to change language of the Page. It requires to be passed the prop labelColor to 
 *                  change color of the labels, this is to customize it as the background parent could be anything 
  */
const ChangeLanguage:React.FC<{labelColor:string}> = ({labelColor}) => {
    const { t } = useTranslation('translation');
    return (
        <div style={{  display:"inline-block"}}>
          
            <LanguageSelector id={'en'} title={t('main.selectlanguage.english')} src={englisLangIcon} />
            <LanguageSelector id={'de'} title={t('main.selectlanguage.german')} src={germanLangIcon} />                
            <LanguageSelector id={'sp'} title={t('main.selectlanguage.spanish')} src={spanishLangIcon} />                
            <LanguageSelector id={'fr'} title={t('main.selectlanguage.french')} src={frenchLangIcon} />                
            <LanguageSelector id={'pt'} title={t('main.selectlanguage.portuguese')} src={portugueseLangIcon} />
        </div>
    )   
}
export default ChangeLanguage;
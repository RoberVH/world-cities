/**
 * ChangeLanguage.- Component to display and select Page Language
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



const WIDTH_RESIZE="25";
const HIGH_REZISE="25";


const LanguageSelector = (props:{id:string,title:string, src:string}) => {
    return (
    <img id={props.id} title= {props.title} src={props.src}  alt='Language Selector' onClick= {(event:React.MouseEvent<HTMLElement>) => 
        il8n.changeLanguage(event.currentTarget.id)} width={WIDTH_RESIZE} height={HIGH_REZISE} style={{marginRight:"5px"}} ></img>
    )
}

const ChangeLanguage = () => {

    const { t } = useTranslation('translation');
    

    return (
        <div style={{width:"50%", display:"inline-block"}}>
            <label style={{marginRight:"5px"}}>{t('main.selectlanguage.prompt')}:</label> 
            <LanguageSelector id={'en'} title={t('main.selectlanguage.english')} src={englisLangIcon} />
            <LanguageSelector id={'de'} title={t('main.selectlanguage.german')} src={germanLangIcon} />                
            <LanguageSelector id={'sp'} title={t('main.selectlanguage.spanish')} src={spanishLangIcon} />                
            <LanguageSelector id={'fr'} title={t('main.selectlanguage.french')} src={frenchLangIcon} />                
            <LanguageSelector id={'pt'} title={t('main.selectlanguage.portuguese')} src={portugueseLangIcon} />
                          
            
        </div>
    )   
}
export default ChangeLanguage;
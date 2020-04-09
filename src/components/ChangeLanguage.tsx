/**
 * ChangeLanguage.- Component to display and select Page Language
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import il8n from '../config/i18n';
import englisLangIcon from '../data/imgs/icons8-great-britain-48.png'
import germanLangIcon from '../data/imgs/icons8-germany-48.png'
import spanishLangIcon from '../data/imgs/icons8-spain-48.png'
import frenchLangIcon from '../data/imgs/icons8-france-48.png'
import portugueseLangIcon from '../data/imgs/icons8-brazil-48.png'




const ChangeLanguage = () => {

    const { t } = useTranslation('translation');
    const setNewLanguage = (event: React.MouseEvent<HTMLElement>) => {
            console.log(event.currentTarget.id); 
            il8n.changeLanguage(event.currentTarget.id);
        }
    return (
        <div>
            <label>{t('main.selectlanguage.prompt')}:</label> 
            <img id='en' title={t('main.selectlanguage.english')} src={englisLangIcon} alt='English' onClick= {(event) => setNewLanguage(event)} />
            <img id='de' title={t('main.selectlanguage.german')} src={germanLangIcon} alt='German' onClick= {(event) => setNewLanguage(event)} />
            <img id='sp' title={t('main.selectlanguage.spanish')} src={spanishLangIcon} alt='Spanish' onClick= {(event) => setNewLanguage(event)} />
            <img id='fr' title={t('main.selectlanguage.french')} src={frenchLangIcon} alt='French' onClick= {(event) => setNewLanguage(event)} />
            <img id='pt' title={t('main.selectlanguage.portuguese')} src={portugueseLangIcon} alt='Portuguese' onClick= {(event) => setNewLanguage(event)} />
        </div>
    )   
}
export default ChangeLanguage;
import { useTranslation } from 'react-i18next';
import    './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
<div className="myfooter">
      <footer className="ali   ">
        <p  dir='auto'>{t("designed_by")} <span className='Omar'>{t("omar")}</span><span>🧡</span></p>
        
      </footer>
</div>
  );
};

export default Footer;

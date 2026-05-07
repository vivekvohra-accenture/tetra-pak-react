import { FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Preferences.css';

const Preferences = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="preferences-container">
      <h1 className="page-title">{t("User Preferences")}</h1>

      <div className="preferences-card">
        <h2 className="card-subtitle">{t("Preferences")}</h2>

        <div className="preferences-grid">
          
          {/* Row 1 */}
          <div className="pref-item password-section">
            <span className="pref-label bold">{t("Change password")}</span>
            <button className="change-pwd-btn">
              {t("Change password")} <FaChevronRight className="chevron-icon" />
            </button>
          </div>

          <div className="pref-item">
            <label className="pref-label">{t("Language")}</label>
            <select 
              className="pref-select"
              value={i18n.language || 'en'}
              onChange={handleLanguageChange}
            >
              <option value="en">English (United States)</option>
              <option value="sv">Svenska (Swedish)</option>
              <option value="es">Español (Spanish)</option>
            </select>
          </div>

          {/* Row 2 */}
          <div className="pref-item">
            <label className="pref-label">{t("Short date format")}</label>
            <select className="pref-select" defaultValue="dd/mm/yyyy">
              <option value="dd/mm/yyyy">dd/mm/yyyy</option>
              <option value="mm/dd/yyyy">mm/dd/yyyy</option>
              <option value="yyyy-mm-dd">yyyy-mm-dd</option>
            </select>
          </div>

          <div className="pref-item">
            <label className="pref-label">{t("Short time format")}</label>
            <select className="pref-select" defaultValue="hh:mm AM/PM">
              <option value="hh:mm AM/PM">hh:mm AM/PM</option>
              <option value="HH:mm">HH:mm (24-hour)</option>
            </select>
          </div>

          {/* Row 3 */}
          <div className="pref-item">
            <label className="pref-label">{t("Long date format")}</label>
            <select className="pref-select" defaultValue="DAY DD MONTH YYYY">
              <option value="DAY DD MONTH YYYY">DAY DD MONTH YYYY</option>
              <option value="Month DD, YYYY">Month DD, YYYY</option>
            </select>
          </div>

          <div className="pref-item">
            <label className="pref-label">{t("Long time format")}</label>
            <select className="pref-select" defaultValue="hh:mm:ss AM/PM">
              <option value="hh:mm:ss AM/PM">hh:mm:ss AM/PM</option>
              <option value="HH:mm:ss">HH:mm:ss (24-hour)</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Preferences;
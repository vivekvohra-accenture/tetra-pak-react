import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './Preferences.css';

const Preferences = () => {
  // We store the language in state so you can easily wire this up to i18n later!
  const [language, setLanguage] = useState('English (United States)');

  return (
    <div className="preferences-container">
      <h1 className="page-title">User Preferences</h1>

      <div className="preferences-card">
        <h2 className="card-subtitle">Preferences</h2>

        <div className="preferences-grid">
          
          {/* Row 1 */}
          <div className="pref-item password-section">
            <span className="pref-label bold">Change password</span>
            <button className="change-pwd-btn">
              Change your password <FaChevronRight className="chevron-icon" />
            </button>
          </div>

          <div className="pref-item">
            <label className="pref-label">Language</label>
            <select 
              className="pref-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English (United States)">English (United States)</option>
              <option value="Svenska">Svenska (Swedish)</option>
              <option value="Español">Español (Spanish)</option>
            </select>
          </div>

          {/* Row 2 */}
          <div className="pref-item">
            <label className="pref-label">Short date format</label>
            <select className="pref-select" defaultValue="dd/mm/yyyy">
              <option value="dd/mm/yyyy">dd/mm/yyyy</option>
              <option value="mm/dd/yyyy">mm/dd/yyyy</option>
              <option value="yyyy-mm-dd">yyyy-mm-dd</option>
            </select>
          </div>

          <div className="pref-item">
            <label className="pref-label">Short time format</label>
            <select className="pref-select" defaultValue="hh:mm AM/PM">
              <option value="hh:mm AM/PM">hh:mm AM/PM</option>
              <option value="HH:mm">HH:mm (24-hour)</option>
            </select>
          </div>

          {/* Row 3 */}
          <div className="pref-item">
            <label className="pref-label">Long date format</label>
            <select className="pref-select" defaultValue="DAY DD MONTH YYYY">
              <option value="DAY DD MONTH YYYY">DAY DD MONTH YYYY</option>
              <option value="Month DD, YYYY">Month DD, YYYY</option>
            </select>
          </div>

          <div className="pref-item">
            <label className="pref-label">Long time format</label>
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
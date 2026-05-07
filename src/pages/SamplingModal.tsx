import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SamplingModalProps {
  onClose: () => void;
}

export default function SamplingModal({ onClose }: SamplingModalProps) {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    // Format date as YYYY-MM-DD for input[type="date"]
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setCurrentDate(`${year}-${month}-${day}`);
    
    // Format time as HH:MM:SS for input[type="time"]
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t("Manual sampling not event driven")}</h2>
        </div>
        
        <div className="modal-body">
          <div className="modal-grid">
            
            <div className="form-group">
              <label>{t("Lines")}</label>
              <select className="standard-select" defaultValue="">
                <option value="" disabled hidden>{t("Search & Select")}</option>
                <option>Packaging Line A</option>
                <option>Packaging Line B</option>
                <option>Packaging Line C</option>
                <option>Packaging Line D</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t("Production date")}</label>
              <input 
                type="date" 
                className="standard-input" 
                value={currentDate} 
                onChange={(e) => setCurrentDate(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>{t("Production time")}</label>
              <input 
                type="time" 
                step="1" 
                className="standard-input" 
                value={currentTime} 
                onChange={(e) => setCurrentTime(e.target.value)} 
              />
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>{t("Cancel")}</button>
        </div>
      </div>
    </div>
  );
}
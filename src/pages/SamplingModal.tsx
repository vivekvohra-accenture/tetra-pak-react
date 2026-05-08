import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddQualityCheckMutation } from '../features/api/apiSlice';

interface SamplingModalProps {
  onClose: () => void;
}

export default function SamplingModal({ onClose }: SamplingModalProps) {
  const { t } = useTranslation();
  const [addQualityCheck, { isLoading }] = useAddQualityCheckMutation();
  
  const [line, setLine] = useState('');
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

  const formatTimeAMPM = (timeStr: string) => {
    const [hoursStr, minutes, seconds] = timeStr.split(':');
    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = hours < 10 ? '0' + hours : hours.toString();
    return `${strHours}:${minutes}:${seconds || '00'} ${ampm}`;
  };

  const handleSave = async () => {
    if (!line) return; // Basic validation
    
    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const [year, month, day] = currentDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    
    try {
      await addQualityCheck({
        line: line,
        date: formattedDate,
        time: formatTimeAMPM(currentTime),
        status: "New",
        samplingPoint: "Manual Entry",
        occasion: "Manual sampling",
        testArea: "Unassigned",
        samples: "0/1",
        productType: "-",
        productBrandName: "-",
        batchId: "-",
        expectedInsertionDate: formattedDate,
        buc: false
      }).unwrap();
      
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Failed to save the quality check: ", err);
    }
  };

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
              <select 
                className="standard-select" 
                value={line} 
                onChange={(e) => setLine(e.target.value)}
              >
                <option value="" disabled hidden>{t("Search & Select")}</option>
                <option value="Packaging Line A">Packaging Line A</option>
                <option value="Packaging Line B">Packaging Line B</option>
                <option value="Packaging Line C">Packaging Line C</option>
                <option value="Packaging Line D">Packaging Line D</option>
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
          <button className="btn-cancel" onClick={onClose} disabled={isLoading}>{t("Cancel")}</button>
          <button 
            className="btn-apply" 
            onClick={handleSave} 
            disabled={!line || isLoading}
            style={{ marginLeft: '12px' }}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
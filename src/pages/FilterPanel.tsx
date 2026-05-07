// src/pages/FilterPanel.tsx
import React, { useState } from 'react';
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface FilterPanelProps {
  onClose: () => void;
  setAppliedFilters: (filters: any) => void;
  currentFilters: any;
}

export default function FilterPanel({ onClose, setAppliedFilters, currentFilters }: FilterPanelProps) {
  const { t } = useTranslation();
  // Main
  const [selectedLines, setSelectedLines] = useState<string[]>(currentFilters.lines || []);
  const [isLinesOpen, setIsLinesOpen] = useState(false);
  
  const [showExpired, setShowExpired] = useState(currentFilters.showExpired ?? true);
  const [notReady, setNotReady] = useState(currentFilters.notReady ?? true);

  // Accordions
  const [isTimeOpen, setIsTimeOpen] = useState(true);
  const [isProductOpen, setIsProductOpen] = useState(false); // Closed by default to save space

  const handleLineToggle = (lineName: string) => {
    setSelectedLines(prev => 
      prev.includes(lineName) 
        ? prev.filter(l => l !== lineName) 
        : [...prev, lineName]
    );
  };

  const handleClearAll = () => {
    setSelectedLines([]);
    setShowExpired(false);
    setNotReady(false);
  };

  const onClickApply = () => {
    setAppliedFilters({
      ...currentFilters,
      lines: selectedLines,
      showExpired,
      notReady,
      dateRange: '01/04/2026 - 02/04/2026',
      timeRange: '12:00:00 AM - 11:59:59 PM',
    });
    onClose();
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="filter-drawer">
        <div className="drawer-header">
          <h2>{t("Filters")}</h2>
          <button className="icon-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="drawer-body">
          {/* MAIN SECTION */}
          <h3 className="section-title">{t("Main")}</h3>
          
          <div className="filter-grid">
            <div className="form-group">
              <label>{t("Lines")}</label>
              <div className="custom-select" onClick={() => setIsLinesOpen(!isLinesOpen)}>
                <span style={{ color: selectedLines.length ? '#334155' : '#94a3b8' }}>
                  {selectedLines.length > 0 ? `${selectedLines.length} selected` : t("Search & Select")}
                </span>
                {isLinesOpen ? <FaChevronUp color="#0f3a61" /> : <FaChevronDown color="#0f3a61" />}
              </div>
              {isLinesOpen && (
                <div className="select-dropdown-menu">
                  {['Packaging Line A', 'Packaging Line B', 'Packaging Line C', 'Packaging Line D'].map(line => (
                    <label key={line} className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={selectedLines.includes(line)}
                        onChange={() => handleLineToggle(line)} 
                      /> 
                      {line}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>{t("Sampling point")}</label>
              <select className="standard-select">
                <option value="" disabled selected hidden>{t("Search & Select")}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t("Test Area Group")}</label>
              <select className="standard-select">
                <option value="" disabled selected hidden>{t("Search & Select")}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t("Test area")}</label>
              <select className="standard-select">
                <option value="" disabled selected hidden>{t("Search & Select")}</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label>{t("Sampling Occasion")}</label>
            <select className="standard-select">
              <option value="" disabled selected hidden>{t("Search & Select")}</option>
            </select>
          </div>

          <div className="toggle-group">
            <span className="toggle-label">{t("Show expired")}</span>
            <label className="switch">
              <input type="checkbox" checked={showExpired} onChange={(e) => setShowExpired(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="toggle-group" style={{ marginBottom: '16px' }}>
            <span className="toggle-label">{t("Not ready for result insertion")}</span>
            <label className="switch">
              <input type="checkbox" checked={notReady} onChange={(e) => setNotReady(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>

          {/* TIME SECTION */}
          <div className="accordion-section">
            <div className="accordion-header" onClick={() => setIsTimeOpen(!isTimeOpen)}>
              <h3 className="section-title" style={{ margin: 0 }}>{t("Time")}</h3>
              {isTimeOpen ? <FaChevronUp color="#0f3a61" /> : <FaChevronDown color="#0f3a61" />}
            </div>
            
            {isTimeOpen && (
              <div className="accordion-body">
                <div className="radio-group" style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '13px', color: '#0f3a61', fontWeight: 500 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="timeType" defaultChecked style={{ accentColor: '#0f3a61' }} /> {t("Occasion date")}
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="timeType" style={{ accentColor: '#0f3a61' }} /> {t("Expected insertion date")}
                  </label>
                </div>

                <div className="filter-grid" style={{ marginBottom: 0 }}>
                  <div className="form-group">
                    <label>{t("Date from")}</label>
                    <input type="date" className="standard-input" defaultValue="2026-04-01" />
                  </div>
                  <div className="form-group">
                    <label>{t("Time from")}</label>
                    <input type="time" className="standard-input" defaultValue="00:00" />
                  </div>
                  <div className="form-group">
                    <label>{t("Date to")}</label>
                    <input type="date" className="standard-input" defaultValue="2026-04-02" />
                  </div>
                  <div className="form-group">
                    <label>{t("Time to")}</label>
                    <input type="time" className="standard-input" defaultValue="23:59" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PRODUCT SECTION */}
          <div className="accordion-section">
            <div className="accordion-header" onClick={() => setIsProductOpen(!isProductOpen)}>
              <h3 className="section-title" style={{ margin: 0 }}>{t("Product")}</h3>
              {isProductOpen ? <FaChevronUp color="#0f3a61" /> : <FaChevronDown color="#0f3a61" />}
            </div>
            
            {isProductOpen && (
              <div className="accordion-body">
                <div className="form-group">
                  <label>{t("Batch ID")}</label>
                  <select className="standard-select">
                    <option value="" disabled selected hidden>{t("Search & Select")}</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>{t("Product Type")}</label>
                  <select className="standard-select">
                    <option value="" disabled selected hidden>{t("Search & Select")}</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>{t("Product Brand Name")}</label>
                  <select className="standard-select">
                    <option value="" disabled selected hidden>{t("Search & Select")}</option>
                  </select>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="drawer-footer">
          <button className="btn-clear" onClick={handleClearAll}>{t("Clear All")}</button>
          <button className="btn-apply" onClick={onClickApply}>{t("Apply")}</button>
        </div>
      </div>
    </>
  );
}
// src/pages/QualityChecks.tsx
import { useState } from 'react';
import { FaFilter, FaPlus, FaPen, FaCog } from 'react-icons/fa';
import FilterPanel from './FilterPanel';
import SamplingModal from './SamplingModal';
import { useGetQualityChecksQuery } from '../features/api/apiSlice';
import { useTranslation } from 'react-i18next';
import './QualityChecks.css';

export default function QualityChecks() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('New');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSamplingModalOpen, setIsSamplingModalOpen] = useState(false);

  // This is the "Single Source of Truth" for the active filters
  const [appliedFilters, setAppliedFilters] = useState({
    lines: [] as string[],
    showExpired: true,
    notReady: true,
    dateRange: '01/04/2026 - 02/04/2026',
    timeRange: '12:00:00 AM - 11:59:59 PM',
  });

  // THE MAGIC HOOK: It runs automatically when these variables change!
  const { data: records = [], isLoading, isFetching } = useGetQualityChecksQuery({
    status: activeTab, // Filter by Tab
    lines: appliedFilters.lines // Filter by Drawer selections
  });

  return (
    <div className="quality-container">
      {/* Page Header */}
      <div className="quality-header-main">
        <h1 className="page-title">{t("Quality checks")}</h1>
        <button className="btn-text-primary" onClick={() => setIsSamplingModalOpen(true)}>
          <FaPlus /> {t("New Sampling confirmation")}
        </button>
      </div>

      {/* Filter Badges Bar */}
      <div className="filter-bar">
        <div className="filter-badges-container">
          <span className="filter-label-text">{t("Filters:")}</span>
          {appliedFilters.showExpired && <span className="filter-badge">{t("Show expired")}</span>}
          {appliedFilters.notReady && <span className="filter-badge">{t("Not ready for result insertion")}</span>}
          {appliedFilters.dateRange && <span className="filter-badge">{appliedFilters.dateRange}</span>}
          {appliedFilters.timeRange && <span className="filter-badge">{appliedFilters.timeRange}</span>}
        </div>
        <button className="icon-btn" onClick={() => setIsFilterOpen(true)}>
          <FaFilter color="#0f3a61" />
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {['New', 'Pending', 'Completed'].map((tab) => (
          <button 
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="table-card">
        {isLoading || isFetching ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>{t("Loading mock data...")}</div>
        ) : (
          <div className="table-responsive">
            <table className="tetra-data-table">
              <thead>
                <tr>
                  <th>{t("Line")}</th>
                  <th>{t("Sampling point")}</th>
                  <th>{t("Occasion date")}</th>
                  <th>{t("Occasion")}</th>
                  <th>{t("Test area")}</th>
                  <th>{t("Samples")}</th>
                  <th>{t("Product Type")}</th>
                  <th>{t("Product Brand Name")}</th>
                  <th>{t("Batch ID")}</th>
                  <th>{t("Expected insertion date")}</th>
                  <th>{t("BUC")}</th>
                  <th style={{ textAlign: 'center' }}><FaCog style={{ fontSize: '16px', color: '#0f3a61' }} /></th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr><td colSpan={12} style={{textAlign: 'center'}}>{t("No records found for this filter.")}</td></tr>
                ) : (
                  // MAP OVER THE LIVE DATA FROM REDUX
                  records.map((record: any) => (
                    <tr key={record.id}>
                      <td>{record.line}</td>
                      <td>{record.samplingPoint}</td>
                      <td>{record.date} <br/> {record.time}</td>
                      <td className="text-blue" style={{ whiteSpace: 'normal', maxWidth: '150px' }}>
                        {record.occasion || 'Resampling from warehouse inspection POST'}
                      </td>
                      <td>{record.testArea || 'Immediate@ProdFloor'}</td>
                      <td>{record.samples || '1/1'}</td>
                      <td>{record.productType || ''}</td>
                      <td>{record.productBrandName || ''}</td>
                      <td>{record.batchId || ''}</td>
                      <td style={{ whiteSpace: 'normal', maxWidth: '120px' }}>
                        {record.expectedInsertionDate || '02/04/2026 Expired'}
                      </td>
                      <td>{record.buc !== undefined ? (record.buc ? 'True' : 'False') : 'False'}</td>
                      <td style={{ textAlign: 'center' }}><FaPen className="action-icon" /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isFilterOpen && (
        <FilterPanel 
          onClose={() => setIsFilterOpen(false)} 
          // Pass the setter down so the child can update the parent!
          setAppliedFilters={setAppliedFilters} 
          currentFilters={appliedFilters}
        />
      )}

      {isSamplingModalOpen && (
        <SamplingModal onClose={() => setIsSamplingModalOpen(false)} />
      )}
    </div>
  );
}
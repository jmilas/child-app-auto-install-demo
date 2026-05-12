import React, { useState } from 'react';
import { SlackCheckbox } from './SlackCheckbox';

interface AutoInstallOptionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  appName: string;
}

type RatingList = 'unrated' | 'low' | 'medium' | 'high';
type Operator = 'includes_any' | 'includes_none';

export function AutoInstallOption({ checked, onChange, appName }: AutoInstallOptionProps) {
  const [showCondition, setShowCondition] = useState(false);
  const [operator, setOperator] = useState<Operator>('includes_any');
  const [selectedRatings, setSelectedRatings] = useState<RatingList[]>(['unrated', 'low']);
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);

  const ratingLabels: Record<RatingList, string> = {
    unrated: 'Unrated list',
    low: 'Low risk list',
    medium: 'Medium risk list',
    high: 'High risk list',
  };

  const operatorLabels: Record<Operator, string> = {
    includes_any: 'includes any of those in',
    includes_none: 'includes none of those in',
  };

  const toggleRating = (rating: RatingList) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const removeCondition = () => {
    setShowCondition(false);
    setSelectedRatings(['unrated', 'low']);
    setOperator('includes_any');
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: '1px' }}>
          <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM7.25 5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zM7 7h2v4H7V7z" fill="var(--sk-color-primary)" />
        </svg>
        <span style={sectionTitleStyle}>Agent App Auto-Install</span>
        <span style={badgeStyle}>New</span>
      </div>
      <div style={bodyStyle}>
        <SlackCheckbox
          checked={checked}
          onChange={onChange}
          label="Allow this app to automatically install agent apps"
          description={`When enabled, ${appName} can install child agent apps on behalf of users without requiring individual admin approval for each one. Child apps are limited to bot scopes only. You can revoke this permission at any time from the AAA automation rules page.`}
        />
      </div>
      {checked && (
        <>
          {!showCondition ? (
            <div style={addConditionAreaStyle}>
              <button style={addConditionBtnStyle} onClick={() => setShowCondition(true)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="var(--sk-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add scope condition
              </button>
              <span style={addConditionHintStyle}>
                Optionally restrict which child apps can be auto-installed based on their requested scopes.
              </span>
            </div>
          ) : (
            <div style={conditionContainerStyle}>
              <div style={conditionLabelRowStyle}>
                <span style={conditionLabelStyle}>Condition</span>
                <button style={removeConditionBtnStyle} onClick={removeCondition} title="Remove condition">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div style={conditionRowStyle}>
                <div style={conditionFieldStyle}>
                  <span style={fieldLabelStyle}>Scopes requested</span>
                </div>
                <select
                  style={selectStyle}
                  value={operator}
                  onChange={e => setOperator(e.target.value as Operator)}
                >
                  {Object.entries(operatorLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <div style={ratingSelectWrapperStyle}>
                  <button
                    style={ratingSelectBtnStyle}
                    onClick={() => setRatingDropdownOpen(!ratingDropdownOpen)}
                  >
                    <span style={ratingSelectTextStyle}>
                      {selectedRatings.length === 0
                        ? 'Select lists...'
                        : selectedRatings.map(r => ratingLabels[r]).join(', ')}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ minWidth: '12px' }}>
                      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {ratingDropdownOpen && (
                    <>
                      <div style={dropdownBackdropStyle} onClick={() => setRatingDropdownOpen(false)} />
                      <div style={dropdownStyle}>
                        {(Object.keys(ratingLabels) as RatingList[]).map(rating => (
                          <label key={rating} style={dropdownItemStyle}>
                            <input
                              type="checkbox"
                              checked={selectedRatings.includes(rating)}
                              onChange={() => toggleRating(rating)}
                              style={{ accentColor: 'var(--sk-color-success)' }}
                            />
                            <span style={dropdownItemLabelStyle}>
                              {ratingLabels[rating]}
                            </span>
                            <span style={ratingDotStyle(rating)} />
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p style={conditionHelpStyle}>
                Only auto-approve child apps whose requested scopes {operator === 'includes_any' ? 'are found in' : 'are not found in'} the selected rating {selectedRatings.length === 1 ? 'list' : 'lists'}.
              </p>
            </div>
          )}
          <div style={infoBoxStyle}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: '2px', minWidth: '14px' }}>
              <path d="M7 0.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm-.5 3h1v1h-1V3.5zm0 2h1v5h-1v-5z" fill="var(--sk-color-success)" />
            </svg>
            <span style={infoTextStyle}>
              An automation rule will be created to auto-approve installation requests from apps managed by <strong>{appName}</strong>.
              {showCondition && selectedRatings.length > 0 && (
                <> Child apps will only be auto-installed if their scopes {operator === 'includes_any' ? 'include any of those in' : 'include none of those in'} the <strong>{selectedRatings.map(r => ratingLabels[r]).join(', ')}</strong>.</>
              )}
              {' '}You can view and modify this rule in your AAA automation settings.
            </span>
          </div>
        </>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: 'var(--sk-color-highlight-bg)',
  borderRadius: 'var(--sk-radius-md)',
  border: '1px solid #d0e3f5',
  padding: '16px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--sk-font-size-base)',
  fontWeight: 700,
  color: 'var(--sk-color-text-primary)',
};

const badgeStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  backgroundColor: 'var(--sk-color-primary)',
  color: 'white',
  padding: '2px 6px',
  borderRadius: '10px',
  letterSpacing: '0.3px',
};

const bodyStyle: React.CSSProperties = {};

const addConditionAreaStyle: React.CSSProperties = {
  marginTop: '12px',
  paddingTop: '12px',
  borderTop: '1px solid #d0e3f5',
};

const addConditionBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: 'none',
  border: 'none',
  color: 'var(--sk-color-primary)',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  padding: '4px 0',
};

const addConditionHintStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  color: 'var(--sk-color-text-secondary)',
  marginTop: '4px',
};

const conditionContainerStyle: React.CSSProperties = {
  marginTop: '12px',
  paddingTop: '12px',
  borderTop: '1px solid #d0e3f5',
};

const conditionLabelRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
};

const conditionLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: 'var(--sk-color-text-secondary)',
};

const removeConditionBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  border: 'none',
  background: 'none',
  color: 'var(--sk-color-text-secondary)',
  cursor: 'pointer',
  borderRadius: '4px',
};

const conditionRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
};

const conditionFieldStyle: React.CSSProperties = {
  padding: '6px 10px',
  backgroundColor: 'white',
  border: '1px solid var(--sk-color-border-medium)',
  borderRadius: 'var(--sk-radius-sm)',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--sk-color-text-primary)',
  whiteSpace: 'nowrap',
};

const fieldLabelStyle: React.CSSProperties = {};

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  backgroundColor: 'white',
  border: '1px solid var(--sk-color-border-medium)',
  borderRadius: 'var(--sk-radius-sm)',
  fontSize: '13px',
  color: 'var(--sk-color-text-primary)',
  cursor: 'pointer',
  appearance: 'auto' as React.CSSProperties['appearance'],
};

const ratingSelectWrapperStyle: React.CSSProperties = {
  position: 'relative',
};

const ratingSelectBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 10px',
  backgroundColor: 'white',
  border: '1px solid var(--sk-color-border-medium)',
  borderRadius: 'var(--sk-radius-sm)',
  fontSize: '13px',
  color: 'var(--sk-color-text-primary)',
  cursor: 'pointer',
  minWidth: '160px',
  textAlign: 'left' as React.CSSProperties['textAlign'],
};

const ratingSelectTextStyle: React.CSSProperties = {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const dropdownBackdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99,
};

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: '4px',
  backgroundColor: 'white',
  border: '1px solid var(--sk-color-border-medium)',
  borderRadius: 'var(--sk-radius-md)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  zIndex: 100,
  minWidth: '200px',
  padding: '4px',
};

const dropdownItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 10px',
  cursor: 'pointer',
  borderRadius: '4px',
  fontSize: '13px',
};

const dropdownItemLabelStyle: React.CSSProperties = {
  flex: 1,
};

const ratingDotStyle = (rating: RatingList): React.CSSProperties => {
  const colors: Record<RatingList, string> = {
    unrated: '#9e9e9e',
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  };
  return {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: colors[rating],
  };
};

const conditionHelpStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--sk-color-text-secondary)',
  marginTop: '8px',
  lineHeight: '1.4',
};

const infoBoxStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  marginTop: '12px',
  padding: '10px 12px',
  backgroundColor: '#e8f5e9',
  borderRadius: 'var(--sk-radius-sm)',
  border: '1px solid #c8e6c9',
};

const infoTextStyle: React.CSSProperties = {
  fontSize: 'var(--sk-font-size-sm)',
  color: 'var(--sk-color-text-primary)',
  lineHeight: '1.4',
};

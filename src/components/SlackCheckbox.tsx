import React from 'react';

interface SlackCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function SlackCheckbox({ checked, onChange, label, description, disabled }: SlackCheckboxProps) {
  return (
    <label style={{
      display: 'flex',
      gap: '12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      alignItems: 'flex-start',
    }}>
      <span style={{
        width: '18px',
        height: '18px',
        minWidth: '18px',
        borderRadius: '4px',
        border: checked ? 'none' : '2px solid var(--sk-color-border)',
        backgroundColor: checked ? 'var(--sk-color-success)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1px',
        transition: 'all var(--sk-transition-fast)',
      }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
      <span>
        <span style={{ fontSize: 'var(--sk-font-size-base)', fontWeight: 700, display: 'block' }}>
          {label}
        </span>
        {description && (
          <span style={{ fontSize: 'var(--sk-font-size-sm)', color: 'var(--sk-color-text-secondary)', marginTop: '2px', display: 'block', lineHeight: '1.4' }}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

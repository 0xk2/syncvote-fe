// Toggle.tsx
import React from 'react';

interface Props {
  label?: string;
  isChecked?: boolean;
  isReview?: boolean;
  onColor?: string;
  offColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  buttonClass?: string;
  transClass?: string;
  onColorButton?: string;
  offColorButton?: string;
  onChange?: () => void;
}

const Toggle: React.FC<Props> = ({
  label = '',
  isReview,
  isChecked = false,
  onColor = 'primary',
  offColor = 'secondary',
  size = 'md',
  className = '',
  buttonClass,
  transClass,
  onColorButton = '',
  offColorButton = '',
  onChange = () => {},
}) => {
  return (
    <div
      className={`flex items-center space-x-2 text-${size} ${
        isChecked ? `border-${onColorButton}` : `border-${offColorButton}`
      } ${className}`}
    >
      {label && <span>{label}</span>}
      <button
        type="button"
        className={`w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
          isChecked ? `bg-${onColor}` : `bg-${offColor}`
        } ${isReview ? 'cursor-default' : ''}`}
        onClick={() => {
          if (isReview) return;
          onChange();
        }}
      >
        <span
          className={`
            block w-5 h-5 rounded-full shadow-md duration-300 ${buttonClass}
             ${
               isChecked
                 ? `translate-x-6 ${transClass} bg-${onColorButton}`
                 : `bg-${offColorButton}`
             }`}
        />
      </button>
    </div>
  );
};

export default Toggle;

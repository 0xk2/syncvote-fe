import React, { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose?: any;
  title?: string;
  children: React.ReactNode;
  className?: string;
  closeClickOverlay?: boolean;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  title = null,
  children,
  className = '',
  closeClickOverlay = true,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (!closeClickOverlay) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return (
    <>
      {isOpen && (
        <div className="overlay-modal" onClick={handleClose}>
          <div
            className={`modal max-h-[85%] overflow-y-scroll modal md:max-h-full md:overflow-y-auto  ${
              isClosing ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
            } ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

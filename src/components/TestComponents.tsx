import { useState } from 'react';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import PopupPublish from './PopupPublish/PopupPublish';

function TestComponents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-10">
      <div>
        <Button variant="primary" onClick={handleOpenModal}>
          Click to open modal
        </Button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <PopupPublish />
        </Modal>
      </div>
    </div>
  );
}

export default TestComponents;

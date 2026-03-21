'use client';

import { Button, Form, Modal } from '@/ui';
import { useNotesAddForm } from '../hooks/useNotesForm';

export function NotesAddModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const { methods, onSubmit } = useNotesAddForm(onClose);

  const handleClose = () => {
    methods.reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Modal.Header title="Add Note" />
        <Modal.Body>
          <Form.Input label="Title" name="title" />
          <Form.Input label="Content" name="content" />
        </Modal.Body>
        <Modal.Footer>
          <Button label="Cancel" onClick={handleClose} variant="secondary" />
          <Form.SubmitButton label="Add" variant="primary" />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

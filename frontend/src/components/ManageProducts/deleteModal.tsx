interface DeleteModalProps {
  productId: number;
  handleDelete: (id: number) => void;
  closeModal: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ productId, handleDelete, closeModal }) => {
  const confirmDelete = () => {
    handleDelete(productId);
    closeModal();
  };

  return (
    <div className="deleteModal">
      <h3 id="deleteHeader">Confirm Delete</h3>
      <p id="deleteMsg">
        Are you sure you want to remove this product?
      </p>
      <div className="deleteModalActions">
        <button className="yesButton" onClick={confirmDelete}>
          Yes (Delete Spot)
        </button>
        <button className="noButton" onClick={closeModal}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;

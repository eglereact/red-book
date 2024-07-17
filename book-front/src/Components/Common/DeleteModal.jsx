import { useContext } from "react";
import { ModalsContext } from "../../Contexts/Modals";

const DeleteModal = () => {
  const { deleteModal, setDeleteModal } = useContext(ModalsContext);

  if (deleteModal === null) {
    return null;
  }

  const submit = () => {
    deleteModal.doDelete(deleteModal.data);
    deleteModal.hideData(deleteModal.data);
    setDeleteModal(null);
  };

  return (
    <div className="delete-modal-container">
      <div className="modal">
        <button
          type="button"
          className="simple"
          aria-label="Close"
          onClick={() => setDeleteModal(null)}
        >
          <span className="icon solid fa-times"></span>
        </button>
        <div className="content">
          <h2>Are you sure you want to delete {deleteModal.data.name}?</h2>
          <ul className="actions">
            <li>
              <input
                onClick={submit}
                type="button"
                value="Delete"
                className="small"
              />
            </li>
            <li>
              <input
                type="button"
                value="Cancel"
                className="small"
                onClick={() => setDeleteModal(null)}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;

import { useContext } from "react";
import { ModalsContext } from "../../Contexts/Modals";

const DeleteModal = () => {
  const { deleteModal } = useContext(ModalsContext);

  if (deleteModal === null) {
    return null;
  }

  return (
    <div className="delete-modal-container">
      <div className="modal">
        <button
          type="button"
          className="simple"
          aria-label="Close"
          onClick={() => console.log("click")}
        >
          <span className="icon solid fa-times"></span>
        </button>
        <div className="content">
          <h2>Are you sure you want to delete user?</h2>
          <ul className="actions">
            <li>
              <input type="button" value="Delete" className="small" />
            </li>
            <li>
              <input type="button" value="Cancel" className="small" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;

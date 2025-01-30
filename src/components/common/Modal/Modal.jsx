import PropTypes from "prop-types";
import "./modal.css"; // Add your styles here

export const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;
  console.log("#>>", isOpen);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          {actions.map((action, index) => (
            <button
              key={index}
              className={action.className || "modal-action-button"}
              onClick={action.onClick}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.string,
    })
  ),
};

Modal.defaultProps = {
  actions: [],
};

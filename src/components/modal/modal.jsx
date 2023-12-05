import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./modal.module.scss";

const Modal = ({ playerName, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open, onClose]);

  return open ? (
    <div className={s.congratulationsMessage}>
      Congratulations, {playerName}!
    </div>
  ) : null;
};

Modal.propTypes = {
  playerName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

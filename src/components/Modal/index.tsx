import { ReactNode } from "react";
import { RxCross1 } from "react-icons/rx";
import "./modal.scss";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          <RxCross1 />
        </button>
        {title && (
          <div className="modal__header">
            <h2>{title}</h2>
          </div>
        )}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

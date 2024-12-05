import { RxCross1 } from "react-icons/rx";
import "./Header.scss";

type HeaderProps = {
  showModal: (value: boolean) => void;
};

function Header({ showModal }: HeaderProps) {
  return (
    <div className="header">
      <div className="header__inner inner">
        <div className="header__title">
          <h1>Simple Notes</h1>
        </div>
        <div className="header__actions">
          <button
            className="header__button button"
            onClick={() => showModal(true)}
          >
            Add note
            <RxCross1 className="header__button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

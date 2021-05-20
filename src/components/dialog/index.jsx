import "./styles.scss";
import CrossSign from "../../assets/cross.svg";

const Dialog = ({ title = "title", children, onClose }) => {
  return (
    <div className="dialog">
      <div className="dialogBox">
        {title && (
          <div className="dialog__titleContainer">
            <div className="dialog__title">
              <h3>{title}</h3>
              {onClose && <img onClick={onClose} src={CrossSign} alt="X"></img>}
            </div>
          </div>
        )}
        <div className="dialog__contentContainer">
          <div className="dialog__content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

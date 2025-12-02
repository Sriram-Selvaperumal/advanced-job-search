import './Popup.css';

function Popup({ onClose }) {
  return (
    <div className="popover" onClick={onClose}>
      <div className="pop" onClick={(e) => e.stopPropagation()}>
        <span>
          This Site is locked. hang tight, it’ll be unlocked soon!
        </span>

        <button onClick={onClose}>Okay!</button>
      </div>
    </div>
  );
}

export default Popup;


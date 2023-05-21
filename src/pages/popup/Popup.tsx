import React from "react";
import logo from "@assets/img/logo.png";
import copyIcon from "@assets/img/copy-icon.png";
import deleteIcon from "@assets/img/delete-icon.png";
import "@pages/popup/Popup.css";
import { useCopiedItems } from '@pages/popup/useCopiedItems';

const truncate = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  }

  return text.slice(0, limit - 3) + '...';
}

const Popup = () => {
  const [items, clearItems, removeItem, copyAll, copyItem] = useCopiedItems();

  return (
    <div className="popup">
      <div className="popup-header">
        <header className="popup-logo">
          <img src={logo} alt="Ecuaeloy multicopy logo"/>
        </header>

        <div className="popup-menu">
          <button className="popup-menu-button" title="Copy All" onClick={copyAll}>
            <img src={copyIcon} alt=""/>
          </button>

          <button className="popup-menu-button" title="Clear" onClick={clearItems}>
            <img src={deleteIcon} alt=""/>
          </button>
        </div>
      </div>

      <ul className="popup-list">
        {items.map(({key, value}) => (
          <li key={key} className="popup-item">
            <span>{truncate(value, 30)}</span>

            <span>
              <button className="popup-menu-button" title="Copy" onClick={() => copyItem(key)}>
                <img src={copyIcon} alt=""/>
              </button>
              <button className="popup-menu-button" title="Remove" onClick={() => removeItem(key)}>
                <img src={deleteIcon} alt=""/>
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;

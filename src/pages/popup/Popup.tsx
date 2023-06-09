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
      <header>
        <div className="popup-logo">
          <img src={logo} alt="EcuaEloy multicopy logo"/>
        </div>

        <div className="popup-menu">
          <button className="popup-menu-button" title={chrome.i18n.getMessage("copyAll")} onClick={copyAll}>
            <img src={copyIcon} alt=""/>
          </button>

          <button className="popup-menu-button" title={chrome.i18n.getMessage("clear")} onClick={clearItems}>
            <img src={deleteIcon} alt=""/>
          </button>
        </div>
      </header>

      <ul className="popup-list">
        {items.length === 0 && <div className="popup-empty-message">{chrome.i18n.getMessage("emptyItems")}</div>}

        {items.map(({key, value}) => (
          <li key={key} className="popup-item">
            <span>{truncate(value, 30)}</span>

            <span className="popup-button-group">
              <button className="popup-menu-button" title={chrome.i18n.getMessage("copy")} onClick={() => copyItem(key)}>
                <img src={copyIcon} alt=""/>
              </button>
              <button className="popup-menu-button" title={chrome.i18n.getMessage("remove")} onClick={() => removeItem(key)}>
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

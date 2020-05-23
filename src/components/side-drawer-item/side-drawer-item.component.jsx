import React from "react";
import "./side-drawer-item.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faChevronRight,
  faDollarSign,
  faQuestion,
  faDoorClosed
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import PropTypes from "prop-types";

const SideDrawerItem = ({ text, route, icon, alert }) => {
  let itemIcon;
  switch (icon) {
    case "deliver":
      itemIcon = <FontAwesomeIcon icon={faTruck} />;
      break;
    case "sell":
      itemIcon = <FontAwesomeIcon icon={faDollarSign} />;
      break;
    case "faq":
      itemIcon = <FontAwesomeIcon icon={faQuestion} />;
      break;
    case "exit":
      itemIcon = <FontAwesomeIcon icon={faDoorClosed} />;
      break;
    default:
      break;
  }
  const chevron = <FontAwesomeIcon icon={faChevronRight} />;

  return (
    <li className="sidedrawer_item_container">
      <a href="/" className="sidedrawer_item_link">
        <div
          className={cx("sidedrawer_item", {
            "is-alert": alert
          })}
        >
          <span className="list_item_icon">{itemIcon}</span>
          <span className="list_item_text">{text}</span>
          <span className="list_item_spacer"></span>
          <span className="list_item_chevron">{chevron}</span>
        </div>
      </a>
    </li>
  );
};

SideDrawerItem.propTypes = {
  alert: PropTypes.any,
  icon: PropTypes.any,
  route: PropTypes.any,
  text: PropTypes.any
};

export default SideDrawerItem;

import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./TableRow.scss";

export default function TableRow(props) {
  const [expand, setExpand] = useState(false);
  const [buttonClass, setButtonClass] = useState("notClicked");
  const [moreClass, setMoreClass] = useState("");
  const [arrow, setArrow] = useState(true);

  function handleButtonClick(e) {
    setExpand(!expand);
    setArrow(!arrow);
    if (buttonClass === "notClicked") {
      setButtonClass("clicked");
      setMoreClass("more");
    } else {
      setButtonClass("notClicked");
      setMoreClass("");
    }
  }

  const itemRows = [
    <tr className="TableRow" {...props}>
      <td className="notMore">{props.id}</td>
      <td className="notMore">
        {moment(props.time).format("MMMM D, YYYY @ HH:mm")}
      </td>
      <td className="notMore">{props.place}</td>
      <td className="notMore">{props.mag}</td>
      <td className={moreClass} id="noPadding">
        <button
          className={buttonClass}
          value={props}
          onClick={handleButtonClick}
        >
          Details {arrow ? <span>&#9660;</span> : <span>&#9650;</span>}
        </button>
      </td>
    </tr>
  ];

  if (expand) {
    itemRows.push(
      <tr>
        <td id="longlat" colSpan={5}>
          Longitude: {props.longitude} Latitude: {props.latitude}
        </td>
      </tr>
    );
  }

  return itemRows;
}

TableRow.propTypes = {
  id: PropTypes.string,
  time: PropTypes.string,
  place: PropTypes.string,
  mag: PropTypes.number,
  longitude: PropTypes.number,
  latitude: PropTypes.number
};

TableRow.defaultProps = {
  id: "",
  time: "",
  place: "",
  mag: 0,
  longitude: 0,
  latitude: 0
};

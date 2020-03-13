import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TableRow from "./components/TableRow/TableRow";
import TableHeader from "./components/TableHeader/TableHeader";
import "./index.scss";
import "./fonts.scss";

export function organizeEarthquakes(search, earthquakes) {
  let filtered = earthquakes;
  if (search !== "") {
    filtered = earthquakes.filter(function(e) {
      return e.place.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
  let sorted = filtered
    .sort((a, b) =>
      a.mag < b.mag ? 1 : a.mag === b.mag ? (a.time > b.time ? 1 : -1) : -1
    )
    .slice(0, 20);

  return sorted;
}

const api =
  "https://cors-anywhere.herokuapp.com/http://interviewtest.getguru.com/seismic/data.json";

function useEarthquakes() {
  const [earthquake, setEarthquakes] = useState([]);

  useEffect(() => {
    axios.get(api).then(res => {
      setEarthquakes(res.data);
    });
  }, []);

  return earthquake;
}

function EarthquakeApp() {
  const [filter, setFilterInput] = useState("");

  function handleChange(e) {
    setFilterInput(e.target.value);
  }

  return (
    <div className="Earthquakes">
      <form>
        {
          <input
            id="searchBox"
            type="search"
            value={filter}
            placeholder="Search By location..."
            onChange={handleChange}
          />
        }
      </form>

      <div id="tableWrapper">
        <table>
          {<TableHeader />}
          <tbody>
            {organizeEarthquakes(filter, useEarthquakes()).map(item => (
              <TableRow
                id={item.id}
                time={item.time}
                place={item.place}
                mag={item.mag}
                longitude={item.longitude}
                latitude={item.latitude}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  ReactDOM.render(<EarthquakeApp />, container);
}

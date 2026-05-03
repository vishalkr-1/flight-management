import axios from "axios";
import React, { useEffect, useState } from "react";
import FlightList from "./FlightList";
import Filter from "./FilterDropdown";
import FilterDropdown from "./FilterDropdown";

export default function Flight() {
  const [flights, setFlights] = useState([]);
  const [err, setError] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [allFlights, setAllFlights] = useState([]);
  async function getFlights() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/flights");
      setFlights(res.data);
      setAllFlights(res.data);
      console.log({ res });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getFlights();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const value = search.trim();

        if (value === "") {
          setFlights(allFlights);
          return;
        }

        const searchedData = allFlights.filter((element) => {
          if (
            value.toLowerCase() === "active" ||
            value.toLowerCase() === "inactive" ||
            value.toLowerCase() === "in active"
          ) {
            return element.status.toLowerCase() == value.toLowerCase();
          } else {
            return element.flightNumber
              .toLowerCase()
              .includes(value.toLowerCase());
          }
        });

        setFlights(searchedData);
      } catch (err) {
        setError(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, allFlights]);

  if (err) {
    return (
      <div>
        <p>some thing went wrong..</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="border border-gray-500 rounded-sm p-2">
        <input
          type="text"
          placeholder="Search Flights By Status and Flight Number..."
          className="w-[100%] "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <p>
          <FilterDropdown
            flight={flights}
            getFlights={getFlights}
            allFlights={allFlights}
            setFlights={setFlights}
          />
        </p>
      </div>

      <div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : flights?.length > 0 ? (
            <FlightList flight={flights} getFlights={getFlights} />
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    </div>
  );
}

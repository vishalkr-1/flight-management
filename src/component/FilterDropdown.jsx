import React, { useState } from "react";

export default function FilterDropdown({
  flight,
  getFlights,
  allFlights,
  setFlights,
}) {
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
    status: "",
    aoc: "",
  });

  function handleFilter(e) {
    const { name, value } = e.target;

    const updatedFilter = {
      ...dateFilter,
      [name]: value,
    };

    setDateFilter(updatedFilter);

    if (
      !updatedFilter.startDate &&
      !updatedFilter.endDate &&
      !updatedFilter.status &&
      !updatedFilter.aoc
    ) {
      setFlights(allFlights);
      return;
    }

    let filtered = allFlights;

    if (updatedFilter.startDate && updatedFilter.endDate) {
      filtered = filtered.filter((item) => {
        return (
          item.startDate >= updatedFilter.startDate &&
          item.endDate <= updatedFilter.endDate
        );
      });
    }

    if (updatedFilter.status) {
      filtered = filtered.filter((item) => {
        return item.status.toLowerCase() === updatedFilter.status.toLowerCase();
      });
    }

    if (updatedFilter.aoc) {
      filtered = filtered.filter((item) => {
        return item.aoc.toLowerCase() === updatedFilter.aoc.toLowerCase();
      });
    }

    setFlights(filtered);
  }
  const uniqueCategories = [...new Set(allFlights.map((item) => item.aoc))];

  return (
    <div className=" flex gap-4">
      <div className="flex gap-6">
        {" "}
        <div className="border border-green-700 p-2 rounded-sm">
          <p>select flight Start Date</p>
          <input
            type="date"
            name="startDate"
            onChange={handleFilter}
            value={dateFilter.startDate}
          />
        </div>
        <div className="border border-green-700 p-2 rounded-sm">
          <p>select flight End Date</p>
          <input
            type="date"
            name="endDate"
            onChange={handleFilter}
            value={dateFilter.endDate}
          />
        </div>
      </div>
      <div className="border border-green-700 p-2 rounded-sm">
        <p>select status</p>
        <select onChange={handleFilter} name="status">
          <option value="active">Active</option>
          <option value="inactive">In Active</option>
        </select>
      </div>
      <div className="border border-green-700 p-2 rounded-sm">
        <p>select Aoc</p>
        <select onChange={handleFilter} name="aoc">
          <option value="">All</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { FixedSizeList as List } from "react-window";

const FlightRow = ({ index, style, data }) => {
  const { flight, setSelectedId, getFlights } = data;
  const item = flight[index];

  const [editId, setEditId] = useState(0);
  const [form, setForm] = useState({
    id: item.id,
    flightNumber: item.flightNumber,
    status: item.status,
    sta: item.sta,
    startDate: item.startDate,
    endDate: item.endDate,
  });

  function handleCancel() {
    setEditId(0);
    setSelectedId(0);
  }

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    const finalValue =
      type === "checkbox" ? (checked ? "Active" : "Not Active") : value;

    setForm((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:3001/flights/${editId}`,
        form,
      );
      setEditId(0);
      setSelectedId(0);
      if (res.status === 200) {
        alert("updated successfully");
        getFlights();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:3001/flights/${id}`);
      if (res.status === 200) {
        alert("Deleted successfully");
        getFlights();
      }
    } catch (err) {
      console.log(err);
    }
  }
  const dateStart = new Date(item.startDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const endDate = new Date(item.endDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div style={style} className="border-b px-2 flex items-center h-[60px]">
      {editId !== item.id ? (
        <div className="grid grid-cols-[100px_150px_120px_220px_120px_120px_auto] items-center w-full">
          <div>{item.id}</div>
          <div>{item.status}</div>
          <div>{item.sta}</div>
          <div>
            {dateStart} - {endDate}
          </div>
          <div>{item.flightNumber}</div>
          <div>{item.aoc}</div>
          <div className="flex gap-2">
            <button
              className="border border-green-500 px-2 py-1 text-sm"
              onClick={() => {
                setEditId(item.id);
                setSelectedId(item.id);
                setForm({
                  status: item.status,
                  id: item.id,
                  flightNumber: item.flightNumber,
                  sta: item.sta,
                  startDate: item.startDate,
                  endDate: item.endDate,
                });
              }}
            >
              EDIT
            </button>

            <button
              className="border border-red-500 px-2 py-1 text-sm"
              onClick={() => handleDelete(item.id)}
            >
              DELETE
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[100px_150px_120px_220px_120Px_120px_auto] items-center w-full"
        >
          <div>
            <p>{form.id}</p>
          </div>

          <div className="flex items-center">
            <Switch
              name="status"
              checked={form.status === "Active"}
              onChange={handleChange}
              size="small"
            />
          </div>

          <div>
            <input
              type="time"
              name="sta"
              value={form.sta}
              onChange={handleChange}
              className="border px-1 py-[2px] text-sm w-full"
            />
          </div>

          <div className=" flex-cols gap-2">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border px-1 py-[2px] text-sm w-[50%] block"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="border px-1 py-[2px] text-sm w-[50%]"
            />
          </div>
          <div>
            <p>{form.flightNumber}</p>
          </div>
          <div>
            <p>{form.aoc}</p>
          </div>

          <div className="flex gap-1">
            <button type="submit" className="border px-2 py-[2px] text-sm">
              Save
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="border px-2 py-[2px] text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default function FlightList({ flight, getFlights }) {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <div className="bg-gray-100 p-4 rounded-sm">
      <div className="grid grid-cols-[100px_150px_120px_220px_120px_102px_auto] font-bold border-b p-2  ">
        <div>ID</div>
        <div>Status</div>
        <div>Time</div>
        <div>Date</div>
        <div>Flight Number</div>
        <div>Aoc Number</div>
        <div>Actions</div>
      </div>

      <List
        height={500}
        width={"100%"}
        itemSize={80}
        itemCount={flight.length}
        itemData={{ flight, setSelectedId, getFlights }}
      >
        {FlightRow}
      </List>
    </div>
  );
}

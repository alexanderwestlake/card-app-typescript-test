import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());
  let spam = setInterval(function () {
    let t = new Date();
    setCurrentTime(t);
  }, 1000);

  if (entries.length == 0) {
    return (
      <section>
        <h1 className="text-center font-semibold text-2xl m-5">You don't have any card</h1>
        <p className="text-center font-medium text-md">
          Lets{" "}
          <Link className="text-link underline hover:text-link2 underline-offset-1" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }

  //Adding a live timer because it's fun and I feel like it
  function dealTime(entry: Entry) {
    let startTime = new Date(entry.created_at.toString());
    let endTime = new Date(entry.due_at.toString());
    if (currentTime < startTime) {
      //Task hasn't started yet
      let diff = startTime.getTime() - currentTime.getTime();

      let hour = Math.floor(diff / 3600000);
      let min = Math.floor((diff - hour * 3600000) / 60000);
      let sec = Math.floor((diff - (min * 60000 + hour * 3600000)) / 1000);

      let display = hour + "h " + min + "m " + sec + "s ";

      return (
        <div>
          <p className="text-right">Starts in:</p>
          <p className="text-right">{display}</p>
        </div>
      );
    } else if (currentTime > endTime) {
      //Task overdue
      return (
        <div>
          <p>Overdue!</p>
        </div>
      );
    } else {
      //Task is in progress (hopefully!)
      let diff = endTime.getTime() - currentTime.getTime();

      let hour = Math.floor(diff / 3600000);
      let min = Math.floor((diff - hour * 3600000) / 60000);
      let sec = Math.floor((diff - (min * 60000 + hour * 3600000)) / 1000);

      let display = hour + "h " + min + "m " + sec + "s ";

      return (
        <div>
          <p className="text-right">Time left:</p>
          <p className="text-right">{display}</p>
        </div>
      );
    }
  }
  return (
    <section className="grid grid-cols-2 md:grid-cols-4">
      {entries.map((entry: Entry, index: number) => {
        return (
          <div
            id={entry.id}
            key={index}
            className="bg-window shadow-md shadow-shadow m-3 p-4 rounded flex flex-col justify-between"
          >
            <div className="w-full">
              <div className="flex">
                <h1 className="truncate text-left font-bold text-sm md:text-lg">{entry.title}</h1>
                <div className="ml-auto font-bold text-sm md:text-lg">{dealTime(entry)}</div>
              </div>
            </div>

            <p className="truncate text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
            <section className="grid items-center ">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    deleteEntry(entry.id as string);
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-delete hover:bg-delete2"
                >
                  ✖
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit/${entry.id}`, { replace: true });
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-hover hover:bg-hover2"
                >
                  🖊
                </button>
              </div>
              <div className="flex justify-center">
                <div className="grid ">
                  <div className="mb-2 text-center">
                    <p>Start date:</p>
                    <time className="mx-2 text-sm md:text-lg">
                      {new Date(entry.created_at.toString()).toLocaleDateString()}
                    </time>
                  </div>
                  <div className="text-center">
                    <p>Due date:</p>
                    <time className="mx-2 text-sm md:text-lg">
                      {new Date(entry.due_at.toString()).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </section>
  );
}

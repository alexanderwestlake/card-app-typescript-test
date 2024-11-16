import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";
import {useNavigate} from "react-router-dom";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), due_at: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  const [error, setError] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
      if(newEntry.title!=""){
          if(newEntry.description!=""){
              if(newEntry.created_at <= newEntry.due_at){
                  saveEntry(newEntry);
                  setNewEntry(emptyEntry);
                  navigate("/");
              } else setError("Due date cannot be before start date!")
          } else setError("Description cannot be blank!")
      } else setError("Title cannot be blank!")
  };
  let navigate = useNavigate();
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-window p-8 rounded-md">
        <p>{error}</p>
      <input
        className="p-3 rounded-md"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
        <p>Start date:</p>
      <input
        className="p-3 rounded-md"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
        <p>Date due:</p>
      <input
          className="p-3 rounded-md"
          type="date"
          name="due_at"
          value={new Date(newEntry.due_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-buttons hover:bg-hover2 font-semibold text-text p-3 rounded-md"
      >
        Create
      </button>
    </section>
  );
}

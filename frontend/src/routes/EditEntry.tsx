import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), due_at: new Date() };

  const { updateEntry, entries } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  useEffect(() => {
    const entry = entries.filter((entry) => entry.id == id)[0];
    setNewEntry(entry);
  }, []);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    updateEntry(id as string, newEntry);
  };
  let navigate = useNavigate();
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-window p-8 rounded-md">
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
      <input
        className="p-3 rounded-md"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
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
          navigate("/");
        }}
        className="bg-buttons hover:bg-hover2 font-semibold text-text p-3 rounded-md"
      >
        Update
      </button>
    </section>
  );
}

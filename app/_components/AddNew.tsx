import supabase from "@/lib/supabase";
import { colors, GroupType } from "@/lib/util";
import { IoIosCloseCircle } from "react-icons/io";
import { Dispatch, SetStateAction, useState } from "react";

type CardPropType = {
  group: GroupType;
  showAddCard: boolean;
  setShowAddCard: Dispatch<SetStateAction<boolean>>;
};

const AddNew = ({ showAddCard, setShowAddCard, group }: CardPropType) => {
  const [dare, setDare] = useState("");
  const [truth, setTruth] = useState("");
  const [selected, setSelected] = useState("truth");
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const insertData = async () => {
    try {
      const roomId = group.id;
      const query = supabase
        .from("Truths")
        .select("id", { count: "exact", head: true });
      const { count } = await query;
      await supabase.from("Truths").insert({
        id: count! + 1,
        truth: truth,
        dare: dare,
        roomId: roomId,
      });
      setTruth("");
      setDare("");
    } catch (error) {
      console.log("error in fetching data on next turn", error);
    }
  };

  const handleAdd = () => {
    const randomIdx = Math.floor(Math.random() * colors.length);
    setCurrentColorIndex(randomIdx);

    if (selected === "truth") {
      setSelected("dare");
      return;
    }

    insertData();
    setSelected("truth");
    setShowAddCard(false);
    window.dispatchEvent(new Event("New tasks added"));
  };

  return (
    <div
      style={{ backgroundColor: colors[currentColorIndex] }}
      className={`flex items-center justify-between flex-col absolute bottom-0 ${
        showAddCard ? "translate-y-0" : "translate-y-full"
      } transition-all duration-150 p-4 font-black text-3xl text-center w-full h-3/5 rounded-t-3xl outline-none border-none text-white`}
    >
      <div className="flex justify-end w-full ">
        <button
          onClick={() => {
            setShowAddCard(false);
            setTruth("");
            setDare("");
          }}
        >
          <IoIosCloseCircle className="text-white size-6" />
        </button>
      </div>
      {selected === "truth" ? (
        <textarea
          placeholder={`Click here to add new ${selected}`}
          onChange={(e) => setTruth(e.target.value)}
          value={truth}
          rows={3}
          className="placeholder:text-white/75 flex-center outline-none bg-transparent  text-center"
        ></textarea>
      ) : (
        <textarea
          placeholder={`Click here to add new ${selected}`}
          onChange={(e) => setDare(e.target.value)}
          value={dare}
          rows={3}
          className="placeholder:text-white/75 flex-center outline-none bg-transparent text-center"
        ></textarea>
      )}
      <button
        onClick={handleAdd}
        className="active:scale-95 bg-black w-4/5 p-4 rounded-2xl font-medium text-xl"
      >
        Add {selected}
      </button>
    </div>
  );
};

export default AddNew;

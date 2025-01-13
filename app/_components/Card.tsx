import supabase from "@/lib/supabase";
import { colors, GroupType, TaskType } from "@/lib/util";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type CardPropType = {
  group: GroupType;
  showCard: string;
  setShowCard: Dispatch<SetStateAction<string>>;
};

const Card = ({ showCard, setShowCard, group }: CardPropType) => {
  const [task, setTask] = useState<TaskType>({
    truth: "No truths found",
    dare: "No dares found",
  });
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const fetchData = async () => {
    try {
      const query = supabase.from("Truths").select("id");
      if (group.id != null) {
        query.eq("roomId", group.id);
      } else {
        query.is("roomId", group.id);
      }
      const { data } = await query;
      if (data) {
        const randIdx = data![Math.floor(Math.random() * data!.length)].id;
        const response = await supabase
          .from("Truths")
          .select("truth,dare")
          .eq("id", randIdx)
          .single();
        setTask((prvTask) => ({
          ...prvTask,
          truth: response.data?.truth,
          dare: response.data?.dare,
        }));
      }
    } catch (error) {
      setTask((prvTask) => ({
        ...prvTask,
        truth: "No truths found",
        dare: "No dares found",
      }));
      console.log("error in fetching data on next turn", error);
    }
  };
  useEffect(() => {
    handleNextTurn();
    window.addEventListener("New tasks added", () => {
      handleNextTurn();
    });
    return () =>
      window.removeEventListener("New tasks added", () => {
        handleNextTurn();
      });
  }, [group]);

  const handleNextTurn = () => {
    fetchData();
    setShowCard("");
    const randomIdx = Math.floor(Math.random() * colors.length);
    setCurrentColorIndex(randomIdx);
  };

  return (
    <div
      style={{ backgroundColor: colors[currentColorIndex] }}
      className={`flex-center flex-col absolute bottom-0 ${
        showCard ? "translate-y-0" : "translate-y-full"
      } transition-all duration-200 p-4 font-black text-3xl text-center w-full h-3/5 rounded-t-3xl outline-none border-none text-white`}
    >
      <p className="grow flex-center">
        {showCard === "truth" ? task.truth : task.dare}
      </p>
      <button
        onClick={handleNextTurn}
        className="active:scale-95 bg-black w-4/5 p-4 rounded-2xl font-medium text-xl"
      >
        Next Player&apos;s turn
      </button>
    </div>
  );
};

export default Card;

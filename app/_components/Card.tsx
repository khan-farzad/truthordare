import { colors, NUMBER_OF_TASKS } from "@/lib/util";
import supabase from "@/lib/supabase";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TaskType = {
  truth: string;
  dare: string;
};
type CardPropType = {
  showCard: string;
  setShowCard: Dispatch<SetStateAction<string>>;
};

const Card = ({ showCard, setShowCard }: CardPropType) => {
  const [task, setTask] = useState<TaskType>({ truth: "", dare: "" });
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const fetchData = async () => {
    try {
      const randIdx = Math.floor(Math.random() * NUMBER_OF_TASKS + 1);
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
    } catch (error) {
      console.log("error in fetching data on next turn", error);
    }
  };
  useEffect(() => {
    handleNextTurn();
  }, []);

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
      } transition-all duration-200 p-4 font-black text-3xl text-center w-full h-3/5 rounded-t-3xl  outline-none border-none text-white`}
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

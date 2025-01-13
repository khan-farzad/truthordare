import { colors, GroupType } from "@/lib/util";
import { useEffect, useState } from "react";

const Loading = ({group}: {group: GroupType}) => {
  const [loading, setLoading] = useState(true);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    setLoading(true)
    setCurrentColorIndex(Math.floor(Math.random() * colors.length));
    const id = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(id);
  }, [group]);

  return (
    <div
      style={{ backgroundColor: colors[currentColorIndex] }}
      className={`flex-center flex-col size-full z-10 absolute ${
        !loading && "-translate-y-full"
      } duration-700 text-white rounded-sm font-black text-8xl leading-none`}
    >
      <h1>Truth</h1>
      <h1 className="text-2xl leading-relaxed">or</h1>
      <h1>Dare</h1>
    </div>
  );
};

export default Loading;

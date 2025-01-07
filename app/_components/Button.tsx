import { IconType } from "react-icons";
import { Dispatch, SetStateAction } from "react";

type ButtonProps = {
  text: string;
  Icon: IconType;
  color: string;
  setShowModal: Dispatch<SetStateAction<string>>;
};

const Button = ({ text, setShowModal, color, Icon }: ButtonProps) => {
  return (
    <div
      style={{ color: color, outlineColor: color }}
      className="p-4 w-full h-24 flex-center text-lg font-bold gap-2 outline rounded-md shadow-lg active:scale-95 "
      onClick={() => setShowModal(text)}
    >
      {text}
      <Icon />
    </div>
  );
};

export default Button;

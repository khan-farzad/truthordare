import supabase from "@/lib/supabase";
import { GroupType } from "@/lib/util";
import { FaSearch } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { CgDanger } from "react-icons/cg";
import { IoIosCloseCircle } from "react-icons/io";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type CardPropType = {
  showSwitchRoomCard: boolean;
  setGroup: Dispatch<SetStateAction<GroupType>>;
  setShowSwitchRoomCard: Dispatch<SetStateAction<boolean>>;
};

const SwitchRoom = ({
  showSwitchRoomCard,
  setShowSwitchRoomCard,
  setGroup,
}: CardPropType) => {
  const [inputName, setInputName] = useState("");
  const [inputRoomId, setInputRoomId] = useState("");
  const [generatedRoomId, setGeneratedRoomId] = useState(0);

  const joinRoom = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("Rooms")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        return;
      }
      setGroup((prv) => ({ ...prv, id: data.id, name: data.name }));
      setShowSwitchRoomCard(false);
      setInputRoomId("");
      setInputName("");
      setGeneratedRoomId(0);
    } catch (error) {
      console.log("error in joing the room", error);
    }
  };

  const createRoom = async () => {
    if (inputName.length < 1) return;
    try {
      const newRoomId = Math.floor(Math.random() * 900000 + 100000);
      await supabase.from("Rooms").insert({ id: newRoomId, name: inputName });
      setGeneratedRoomId(newRoomId);
      setInputRoomId("");
    } catch (error) {
      console.log("error in creating a new room", error);
    }
  };

  return (
    <div
      className={`flex-center flex-col bg-gray-50 absolute bottom-0 ${
        showSwitchRoomCard ? "translate-y-0" : "translate-y-full"
      } transition-all duration-150 text-center w-full h-3/5 rounded-t-3xl outline-none border-none text-black`}
    >
      <button
        onClick={() => {
          setShowSwitchRoomCard(false);
          setInputName("");
          setInputRoomId("");
        }}
        className="absolute top-4 right-4"
      >
        <IoIosCloseCircle className="text-white size-6" />
      </button>
      <div className="items-center justify-evenly rounded-t-3xl w-full text-white bg-indigo-500 p-4 grow flex flex-col gap">
        {!generatedRoomId ? (
          <>
            <div className="w-full p-4 ">
              <h3 className="font-semibold text-xl text-center">Create room</h3>
              <div className="h-[1px] bg-black/60 mt-4"></div>
              <div className=" px-2 flex-center gap-2">
                <IoText className="size-5" />

                <input
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="grow bg-transparent placeholder:text-lg  placeholder:text-black/40 outline-none text-xl py-2"
                  type="text"
                  required
                  placeholder="Enter your group name"
                />
              </div>
              <div className="h-[1px] bg-black/60"></div>
            </div>
            <div>
              <button
                onClick={createRoom}
                className="bg-white rounded-lg py-2 px-4 text-blue-500 font-bold"
              >
                CREATE
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-start ">
              <div className="flex gap1 items-center">
                <CgDanger className="size-6 mr-1 text-red-600" />
                <h3 className="font-bold text-lg">Note</h3>
              </div>
              <p className="text-start bg-red-500 p-2">
                Please share the generated Room ID in your WhatsApp group for
                future reference.
              </p>
            </div>
            <div className="text-start select-text py-2 px-4 border-dashed border-black border rounded-3xl">
              <p>{` "Group room Id": ${generatedRoomId}`}</p>
            </div>

            <div className="flex items-center justify-between">
              Have you shared the roomId in your Whatsapp group?
              <div className="">
                <button
                  onClick={() => joinRoom(generatedRoomId)}
                  className="bg-white rounded-lg py-1 px-2 text-blue-500 font-bold"
                >
                  DONE
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full p-4">
        <h3 className="font-semibold text-xl text-center">
          Continue previous session?
        </h3>
        <div className="h-[1px] bg-gray-400 mt-2"></div>
        <div className="px-2 flex-center gap-2">
          <FaSearch />
          <input
            value={inputRoomId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              if (val.length > 6) return;
              setInputRoomId(val);
              if (val.length == 6) {
                joinRoom(parseInt(val));
              }
            }}
            className="grow bg-transparent outline-none placeholder:text-lg text-xl py-2"
            type="number"
            min={100000}
            max={999999}
            required
            placeholder="Enter 6-digit RoomId.e.g.,490219"
          />
        </div>
        <div className="h-[1px] bg-gray-400"></div>
      </div>
    </div>
  );
};

export default SwitchRoom;

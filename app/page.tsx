"use client";
import { useState } from "react";
import Card from "./_components/Card";
import { GroupType } from "@/lib/util";
import AddNew from "./_components/AddNew";
import Button from "./_components/Button";
import Loading from "./_components/Loading";
import SwitchRoom from "./_components/SwitchRoom";
import { ImEvil } from "react-icons/im";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";

const Home = () => {
  const [group, setGroup] = useState<GroupType>({ id: null, name: "Default" });
  const [showCard, setShowCard] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [showSwitchRoomCard, setShowSwitchRoomCard] = useState(false);
  return (
    <div className="h-dvh w-full overflow-hidden relative">
      <Loading group={group} />
      <div className="flex p-4 items-center justify-between">
        <div
          onClick={() => {
            setShowCard("");
            setShowAddCard(false);
            setShowSwitchRoomCard(true);
          }}
          className="flex items-center w-1/2"
        >
          <CgArrowsExchangeAltV className="size-6 text-green-500" />
          <p className="text-[#02060ceb] truncate font-semibold">
            {group.name}
          </p>
          <IoIosArrowDown className="size-5" />
        </div>
        <button
          onClick={() => {
            setShowCard("");
            setShowAddCard(true);
            setShowSwitchRoomCard(false);
          }}
          className="text-indigo-500"
        >
          <IoIosAddCircleOutline className="size-8"/>
        </button>
      </div>
      <div className="flex flex-col p-24 px-4 jusify-between h-dvh items-center">
        <div className="flex-center flex-col gap-8">
          <div className="flex-center gap-1">
            <h1 className="text-green-500 font-semibold text-4xl leading-none">
              Truth
            </h1>
            <span className="text-2xl font-medium text-sky-400">or</span>
            <h1 className="text-rose-500 font-semibold text-4xl leading-none">
              Dare
            </h1>
          </div>
          <h2 className="text-[#02060ceb] font-medium text-xl text-center leading-tight">
            Choose between answering a &apos;truth&apos; question honestly or
            performing a &apos;dare&apos;.
          </h2>
        </div>
        <div className="flex-center w-1/2 grow flex-col h-1/5 gap-8">
          <Button
            text="truth"
            Icon={BsEmojiSmileUpsideDown}
            setShowModal={setShowCard}
            color="#f43f5e"
          />
          <Button
            text="dare"
            Icon={ImEvil}
            setShowModal={setShowCard}
            color="#6366f1"
          />
        </div>
      </div>
      <Card group={group} showCard={showCard} setShowCard={setShowCard} />
      <AddNew
        group={group}
        showAddCard={showAddCard}
        setShowAddCard={setShowAddCard}
      />
      <SwitchRoom
        setGroup={setGroup}
        showSwitchRoomCard={showSwitchRoomCard}
        setShowSwitchRoomCard={setShowSwitchRoomCard}
      />
    </div>
  );
};

export default Home;

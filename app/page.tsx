"use client";
import { useState } from "react";
import Card from "./_components/Card";
import Button from "./_components/Button";
import Loading from "./_components/Loading";
import { ImEvil } from "react-icons/im";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";

const Home = () => {
  const [showCard, setShowCard] = useState("");
  return (
    <div className="h-dvh w-full overflow-hidden relative">
      <Loading />
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
      <Card showCard={showCard} setShowCard={setShowCard} />
    </div>
  );
};

export default Home;

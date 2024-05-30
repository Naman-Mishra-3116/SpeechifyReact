import React, { useEffect } from "react";
import { useVoiceToText } from "react-speakup";
import Button from "./Button";
import { useState } from "react";

const SpeechToText = ({ updateKey, goBack }) => {
  const { startListening, stopListening, transcript } = useVoiceToText();
  const [displayedTranscript, setDisplayedTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    setDisplayedTranscript(transcript);
  }, [transcript]);

  function clear() {
    setDisplayedTranscript("");
    stopListening();
    updateKey();
  }

  function onClickStartListening() {
    setIsListening(true);
    startListening();
  }

  function onClickStopListening() {
    stopListening();
    setIsListening(false);
  }

  return (
    <div className="h-screen">
      <h2 className="text-[32px] text-white">
        Mic is {isListening ? "On" : "Off"}
      </h2>

      <div className="flex gap-8 mb-4 p-4 justify-center ">
        <Button onCall={onClickStartListening} isListening={isListening}>
          Start Listening
        </Button>
        <Button onCall={onClickStopListening} isListening={!isListening}>
          Stop Listening
        </Button>
        <Button onCall={clear}>Clear</Button>
        <Button onCall={() => goBack("")}>Back</Button>
      </div>
      <div
        className={` w-full text-left ${
          displayedTranscript === "" ? null : "p-4"
        } text-slate-200 text-[26px] bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 mb-20 shadow-custom-black`}
      >
        {displayedTranscript}
      </div>
    </div>
  );
};
export default SpeechToText;

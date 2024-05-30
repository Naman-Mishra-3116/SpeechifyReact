import React from "react";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";

const TextToSpeech = ({ updateKey, goBack }) => {
  const [text, setText] = useState("");
  const inputRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const [uttrances, setUttrances] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUttrances(u);
    return () => {
      synth.cancel();
    };
  }, [text]);

  function onClickSetButton() {
    setText(inputRef.current.value);
  }

  function onClickClear() {
    inputRef.current.value = "";
    setText("");
  }

  function start() {
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
    }
    synth.speak(uttrances);
    setIsPaused(false);
  }

  function stop() {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
  }

  function pause() {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  }
  return (
    <div>
      {text === "" ? null : (
        <div className="flex gap-2 justify-center mb-[3rem]">
          <Button onCall={start} isListening={false}>
            Speak
          </Button>
          <Button onCall={pause} isListening={false}>
            {isPaused ? "Play" : "Pause"}
          </Button>
          <Button onCall={stop} isListening={false}>
            Stop
          </Button>
          {text === "" ? null : <Button onCall={updateKey}>Return</Button>}
        </div>
      )}
     
      {text === "" ? (
        <>
          <h1 className="uppercase text-white mb-3 text-2xl">Text To Speech</h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-8 mr-auto ml-auto w-[810px]">
            <textarea
              type="text"
              ref={inputRef}
              className="col-span-3 place-self-stretch p-3 border-2 bg-slate-700 bg-opacity-20 text-white text-lg"
            />
            <div className="col-span-3 flex gap-[3rem] place-self-center">
              <Button onCall={onClickSetButton} isListening={false}>
                Submit
              </Button>
              <Button onCall={onClickClear} isListening={false}>
                Clear
              </Button>
              <Button onCall={() => goBack("")}>Back</Button>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`${
            text === "" ? null : "p-2"
          } w-full text-left text-slate-200 text-[26px] bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 mb-20`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;

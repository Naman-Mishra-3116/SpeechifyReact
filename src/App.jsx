import "./App.css";
import { useState } from "react";
import SpeechToText from "./components/SpeechToText";
import TextToSpeech from "./components/TextToSpeech";
import Card from "./components/Card";
import micImage from "../public/mic.png";
import textImage from "../public/text.png";

function App() {
  const [selected, setSelected] = useState("");
  const [key, setKey] = useState(0);

  function onClickTextToSpeech() {
    setSelected("tts");
  }

  function onClickUpdate() {
    setKey((prevKey) => prevKey + 1);
  }

  function onClickSpeechToText() {
    setSelected("stt");
  }

  function onClickBackButton() {
    setSelected("");
  }

  if (selected === "stt") {
    return (
      <SpeechToText
        backButton={onClickBackButton}
        updateKey={onClickUpdate}
        goBack={setSelected}
        key={key}
      />
    );
  }

  if (selected === "tts") {
    return (
      <TextToSpeech
        backButton={onClickBackButton}
        goBack={setSelected}
        updateKey={onClickUpdate}
        key={key}
      />
    );
  }

  return (
    <div className="flex justify-center mt-[11rem] h-screen">
      <div className="flex gap-10">
        <Card
          title={"Text to Speech"}
          onClickCard={onClickTextToSpeech}
          image={textImage}
          altText={"logo showing text to speech"}
        />

        <Card
          title={"Speech to Text"}
          onClickCard={onClickSpeechToText}
          image={micImage}
          altText={"logo showing speech to text"}
        />
      </div>
    </div>
  );
}

export default App;

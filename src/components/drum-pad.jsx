import React, { useEffect, useRef, useCallback, useState } from "react";

const DrumPad = ({ name, value, handleClick, drumStatus, volume }) => {
  let clip_ref = useRef(null);
  const [pressed, setPressed] = useState(false);
  const playAudio = useCallback(() => {
    if (drumStatus) {
      clip_ref.current.volume = volume / 100;
      clip_ref.current.currentTime = 0;
      clip_ref.current.play().then(() => {
        setPressed(true);
      });
      handleClick(value.replace(/_/g, " ").toUpperCase());
      setTimeout(() => {
        setPressed(false);
      }, 100);
    }
  }, [drumStatus, handleClick, value, volume]);
  const handleLocalClick = () => {
    if (drumStatus) {
      playAudio();
    }
  };
  const handleKeyUp = useCallback(
    (e) => {
      if (drumStatus && name === e.key.toUpperCase()) {
        playAudio();
      }
    },
    [drumStatus, name, playAudio]
  );
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);
  return (
    <div
      className={`drum-pad ${!drumStatus ? "event-none" : ""} ${
        pressed ? "pressed" : ""
      }`}
      id={value}
      onClick={handleLocalClick}
    >
      <strong className="pad-name">{name}</strong>
      <audio
        className="clip"
        id={name}
        src={require(`../asset/audio/${value}.wav`)}
        ref={clip_ref}
        type="audio/wav"
      ></audio>
    </div>
  );
};

export default DrumPad;

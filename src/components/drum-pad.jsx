import React, { useEffect, useRef, useCallback, useState } from "react";
import clap from "../asset/audio/clap.wav";
import kick_zapper from "../asset/audio/kick_zapper.wav";
import kick from "../asset/audio/kick.wav";
import openhat_acoustic from "../asset/audio/openhat_acoustic.wav";
import ride_acoustic from "../asset/audio/ride_acoustic.wav";
import snare_analog from "../asset/audio/snare_analog.wav";
import snare_modular from "../asset/audio/snare_modular.wav";
import snare from "../asset/audio/snare.wav";
import tom_fm from "../asset/audio/tom_fm.wav";

const audioObj = {
  clap: clap,
  kick_zapper: kick_zapper,
  kick: kick,
  openhat_acoustic: openhat_acoustic,
  ride_acoustic: ride_acoustic,
  snare_analog: snare_analog,
  snare_modular: snare_modular,
  snare: snare,
  tom_fm: tom_fm,
};

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
        src={audioObj[value]}
        ref={clip_ref}
        type="audio/wav"
      ></audio>
    </div>
  );
};

export default DrumPad;

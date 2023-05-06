"use client";
import { useState } from "react";
import Image from 'next/image'
import LoadGif from '../../public/load.gif';
import { AudioContext, OfflineAudioContext } from 'standardized-audio-context';
 // this is a client component 👈🏽

const Form = () => {
  const [promptText, setPromptText] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlayAudio, setIsPlayAudio] = useState<boolean>(false);

  const getResponse = async() => {
    setIsLoading(true);
    const response = await fetch(`${process?.env?.API_URL}/questions`, {
      method: 'POST',
      body: JSON.stringify({
        text: promptText
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const audioBuffer = await response.arrayBuffer();
    const ctx = new AudioContext();
    //await ctx.resume();
    //await ctx.createGain();
    const decodedAudio = await ctx.decodeAudioData(audioBuffer);
    const playSound = await ctx.createBufferSource();
    playSound.buffer = decodedAudio;
    playSound.connect(ctx.destination);
    setPromptText("");
    setIsPlayAudio(true);
    playSound.start(ctx.currentTime);
    setIsLoading(false);
    playSound.addEventListener('ended', () => {
      setIsPlayAudio(false);
    });
  }

  const handleChange = (e: any) => setPromptText(e?.target?.value);

  return (
    <div className="w-full">
      {(!isLoading && !isPlayAudio) && (
        <>
          <label htmlFor="promptText" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Escribe un mensaje</label>
          <textarea
            id="promptText"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escribe algo aquí y te responderé lo más rápido que pueda..."
            onChange={handleChange}
          />
          <button
            onClick={getResponse}
            className="mt-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Enviar
          </button>
        </>
      )}
      {isLoading && <p>Dame un minuto...</p>}
      {isPlayAudio && (
        <div className="h-screen flex items-center justify-center">
          <Image className="" src={LoadGif} alt={""}/>
        </div>
      )}
    </div>
  )
}

export default Form;
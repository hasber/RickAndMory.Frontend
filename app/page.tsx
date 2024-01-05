"use client";
import Slider from "@/organisms/slider/Slider";
import BasicTabs from "@/organisms/table/BasicTabs";
import { alertMsg, getCharacters } from "@/services/request";
import { useEffect, useState } from "react";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([getCharacters()])
      .then(([r]) => {
        setCards(r);
      })
      .finally(() => setIsLoading(false))
      .catch(() => {
        alertMsg(
          "¡Alerta!",
          "Hubo un error trayendo los datos, intenta más tarde.",
          "error"
        );
      });
  }, []);

  return (
    <div>
      {!isLoading && (
        <>
          <Slider cards={cards}/>
          <BasicTabs />
        </>
      )}
    </div>
  );
}

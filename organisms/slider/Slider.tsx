"use client";
import React, { useEffect, useState } from "react";
import "./slider.css";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Card from "@/atoms/card/Card";
import { generarColorAleatorio } from "@/utils/getColors";

const Slider = (props: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrayAux, setArrayAux] = useState(props.cards.slice(0, 3));
  const [colores, setColores] = useState<any>([]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex: any) => {
      const count = prevIndex === props.cards.length - 1 ? 0 : prevIndex + 1;
      const remainingCards = props.cards.length - count;
      const endIndex = Math.min(count + 3, props.cards.length);
      let newArray;
      if (remainingCards < 3) {
        const aux1 = props.cards.slice(count, endIndex);
        const aux2 = props.cards.slice(0, 3 - remainingCards);
        newArray = aux1.concat(aux2);
      } else {
        newArray = props.cards.slice(count, endIndex);
      }
      setArrayAux(newArray);
      return count;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex: any) => {
      const count = prevIndex === 0 ? props.cards.length - 1 : prevIndex - 1;
      const remainingCards = props.cards.length - count;
      const endIndex = Math.min(count + 3, props.cards.length);
      let newArray;
      if (remainingCards < 3) {
        const aux1 = props.cards.slice(count, endIndex);
        const aux2 = props.cards.slice(0, 3 - remainingCards);
        newArray = aux1.concat(aux2);
      } else {
        newArray = props.cards.slice(count, endIndex);
      }
      setArrayAux(newArray);
      return count;
    });
  };

  useEffect(() => {
    for (let index = 0; index < props.cards.length; index++) {
      const nuevoColor = generarColorAleatorio();
      setColores((prevColores: any) => [...prevColores, nuevoColor]);
    }
  }, []);

  return (
    <div className="carousel-container">
      <button className="arrow-button" onClick={prevSlide}>
        <ArrowCircleLeftIcon />
      </button>
      {arrayAux.map((card: any, index: number) => (
        <Card
          title={card.title}
          content={card.content}
          index={index}
          colores={colores}
          currentIndex={currentIndex}
          card={card}
          button={true}
        />
      ))}
      <button className="arrow-button" onClick={nextSlide}>
        <ArrowCircleRightIcon />
      </button>
    </div>
  );
};

export default Slider;

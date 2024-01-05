"use client";
import Button from "../button/Button";
import "./card.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Rating, Typography } from "@mui/material";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Card = (props: any) => {
  const { index, colores, currentIndex, card, button, saveFavorito } = props;

  const { image, species, name, url, status, id, isFavorite } = card;

  const rating = (value: string) => {
    switch (value) {
      case "Human":
        return 5;
      case "Alien":
        return 1;
      default:
        return 3;
    }
  };

  return (
    <div key={index} className={`slide active`}>
      <div
        key={index + 1}
        className="card-slider"
        style={{ backgroundColor: colores[index + currentIndex] }}
      >
        <div key={index + 2} className="card-info">
          <img className="img-card" src={image} width={150} />
        </div>
        <div key={index + 3} className="card-info">
          <IconButton
            onClick={() =>
              saveFavorito({
                idCharacter: id,
                name: name,
                status: status,
              })
            }
            className="icon-button-card"
            title="Añadir a Favoritos"
          >
            {!button ? (
              isFavorite ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "red" }} />
              )
            ) : null}
          </IconButton>
          <Typography variant="h6" className="h2-card">
            {name}
          </Typography>
          <Rating name="read-only" value={rating(species)} readOnly />
          <Typography className="p-card">{species}</Typography>
          <Typography className="p-card">{status}</Typography>
          <Link href={url}>More Info</Link>
          {button && <Button>Ver</Button>}
        </div>
      </div>
    </div>
  );
};
export default Card;

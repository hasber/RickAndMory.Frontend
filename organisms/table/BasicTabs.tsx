"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Card from "@/atoms/card/Card";
import { Grid } from "@mui/material";
import {
  alertMsg,
  getCharactersByGender,
  getCharactersBySpecie,
  setFavorite,
} from "@/services/request";
import { Favorite } from "@/utils/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: "black" }}>
            <Grid container justifyContent="center">
              {children}
            </Grid>
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const drawCards = (cards: any, saveFavorito: (data: Favorite) => void) => {
  return (
    <>
      {cards.map((card: any, index: number) => (
        <Card
          title={card.title}
          content={card.content}
          colores={0}
          currentIndex={index}
          card={card}
          button={false}
          isFavorite={cards.isFavorite}
          saveFavorito={saveFavorito}
        />
      ))}
    </>
  );
};

export default function D() {
  const [value, setValue] = useState(1);
  const [cards, setCards] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getCardsGender = (value: string) => {
    Promise.all([getCharactersByGender(value)])
      .then(([r]) => {
        setCards(r);
      })
      .catch(() => {
        alertMsg(
          "¡Alerta!",
          "Hubo un error trayendo los datos, intenta más tarde.",
          "error"
        );
      });
  };

  const getCardsSpecie = (value: string) => {
    Promise.all([getCharactersBySpecie(value)])
      .then(([r]) => {
        setCards(r);
      })
      .catch(() => {
        alertMsg(
          "¡Alerta!",
          "Hubo un error trayendo los datos, intenta más tarde.",
          "error"
        );
      });
  };

  const saveFavorito = (data: Favorite) => {
    setFavorite(data).finally(() => {
      switch (value) {
        case 1:
          getCardsSpecie("human");
          break;
        case 2:
          getCardsSpecie("alien");
          break;
        case 3:
          getCardsGender("male");
          break;
        case 4:
          getCardsGender("female");
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    getCardsGender("male");
  }, []);

  return (
    <Box sx={{ width: "100%", background: "white" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab disabled={true} label="Popular by genre" />
          <Tab
            label="Human"
            {...a11yProps(1)}
            onClick={() => getCardsSpecie("human")}
          />
          <Tab
            label="Alien"
            {...a11yProps(2)}
            onClick={() => getCardsSpecie("alien")}
          />
          <Tab
            label="Male"
            {...a11yProps(3)}
            onClick={() => getCardsGender("male")}
          />
          <Tab
            label="Female"
            {...a11yProps(4)}
            onClick={() => getCardsGender("female")}
          />
        </Tabs>
      </Box>
      {Array.from({ length: 4 }, (_, index) => (
        <CustomTabPanel key={index + 1} value={value} index={index + 1}>
          {cards && drawCards(cards, saveFavorito)}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

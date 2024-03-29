import { useState } from "react";
import "../styles/Dropdown.css";
import { Character } from "../types";
import { apiQueryFiltered } from "../utils/apiConfig";

type Props = {
  setter: React.Dispatch<React.SetStateAction<Character[]>>;
};

type ChangeDataProps = {
  type: string;
  value: string;
};

export const Dropdown: React.FC<Props> = ({ setter }) => {
  const [openGender, setopenGender] = useState(false);
  const [openStatus, setopenStatus] = useState(false);
  const [openSpecie, setopenSpecie] = useState(false);

  const handleChangeData = async ({ type, value }: ChangeDataProps) => {
    const filter = { [type]: value }; // Crear el objeto de filtro
    const query = apiQueryFiltered(filter); // Obtener la consulta GraphQL con el filtro aplicado

    const response = await fetch("https://rickandmortyapi.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query, // Utiliza la consulta obtenida
      }),
    });

    const data = await response.json();
    setter(data.data?.characters.results);
  };

  return (
    <div className="dropdown-cnt">
      <div className="button-cnt">
        <button
          onClick={() => {
            setopenGender(!openGender);
          }}
        >
          Gender
        </button>
        {openGender ? (
          <ul className="dropdown-open">
            <li
              onClick={() => {
                handleChangeData({ type: "gender", value: "Male" });
              }}
            >
              Male
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "gender", value: "Female" });
              }}
            >
              Female
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "gender", value: "Genderless" });
              }}
            >
              Genderless
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "gender", value: "Unknown" });
              }}
            >
              Unknown
            </li>
          </ul>
        ) : (
          <div className="dropdown-closed"></div>
        )}
      </div>
      <div className="button-cnt">
        <button
          onClick={() => {
            setopenSpecie(!openSpecie);
          }}
        >
          Specie
        </button>
        {openSpecie ? (
          <ul className="dropdown-open">
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "Human" });
              }}
            >
              Human
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "Alien" });
              }}
            >
              Alien
            </li>
          </ul>
        ) : (
          <div className="dropdown-closed"></div>
        )}
      </div>
      <div className="button-cnt">
        <button
          onClick={() => {
            setopenStatus(!openStatus);
          }}
        >
          Status
        </button>
        {openStatus ? (
          <ul className="dropdown-open">
            <li
              onClick={() => {
                handleChangeData({ type: "status", value: "Alive" });
              }}
            >
              Alive
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "status", value: "Dead" });
              }}
            >
              Dead
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "status", value: "Unknown" });
              }}
            >
              Unknown
            </li>
          </ul>
        ) : (
          <div className="dropdown-closed"></div>
        )}
      </div>
    </div>
  );
};

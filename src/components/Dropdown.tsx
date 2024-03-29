import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import "../styles/Dropdown.css";
import { Character } from "../types";
import { apiQueryFiltered } from "../utils/apiConfig";

const graphQLClient = new GraphQLClient("https://rickandmortyapi.com/graphql");

type Props = {
  setter: React.Dispatch<React.SetStateAction<Character[]>>;
};

type ChangeDataProps = {
  type: string;
  value: string;
};

type DataProps = {
  characters: {
    results: any[];
  };
};

export const Dropdown: React.FC<Props> = ({ setter }) => {
  const [openGender, setopenGender] = useState(false);
  const [openStatus, setopenStatus] = useState(false);
  const [openSpecie, setopenSpecie] = useState(false);
  const [filters, setFilters] = useState([]);

  const handleChangeData = async ({ type, value }: ChangeDataProps) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    const query = apiQueryFiltered(newFilters);
    try {
      const data: DataProps = await graphQLClient.request(query);
      setter(data.characters.results);
    } catch (error) {
      console.error(error);
    }
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

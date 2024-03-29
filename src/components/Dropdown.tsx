import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import "../styles/Dropdown.css";
import { Character } from "../types";
import { apiQueryFiltered } from "../utils/apiConfig";

const graphQLClient = new GraphQLClient("https://rickandmortyapi.com/graphql");
type Props = {
  setter: React.Dispatch<React.SetStateAction<Character[] | undefined>>;
  aux: React.Dispatch<React.SetStateAction<Character[] | undefined>>;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  data: Character[] | undefined;
};

type ChangeDataProps = {
  type: string;
  value: string;
};

type DataProps = {
  characters: {
    results: Character[];
  };
};

export const Dropdown: React.FC<Props> = ({
  setter,
  data,
  setIsFilter,
  aux, //aux works like the copy of filteredData, because filter the data in the main array break the data filtering
}) => {
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
      aux(data.characters.results);
      setIsFilter(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setter(data);
    setIsFilter(false);
  };

  return (
    <div className="dropdown-cnt">
      <button onClick={handleClear}>Clear</button>
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
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "Humanoid" });
              }}
            >
              Humanoid
            </li>
            <li
              onClick={() => {
                handleChangeData({
                  type: "species",
                  value: "Mythological Creature",
                });
              }}
            >
              Mythological Creature
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "Animal" });
              }}
            >
              Animal
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "Robot" });
              }}
            >
              Robot
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "Cronenberg" });
              }}
            >
              Cronenberg
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "Disease" });
              }}
            >
              Disease
            </li>
            <li
              onClick={() => {
                handleChangeData({ type: "species", value: "unknown" });
              }}
            >
              unknown
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

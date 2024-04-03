import { GraphQLClient } from "graphql-request";
import React, { RefObject, useEffect, useState } from "react";
import "../styles/Dropdown.css";
import { Character } from "../types";
import { apiQueryFiltered } from "../utils/apiConfig";

const graphQLClient = new GraphQLClient("https://rickandmortyapi.com/graphql");
type Props = {
  setFiltered: React.Dispatch<React.SetStateAction<Character[] | undefined>>;
  setFilterPage: React.Dispatch<React.SetStateAction<number>>;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string | undefined;
  inputRef: RefObject<HTMLInputElement>;
  data: Character[] | undefined;
  filterPage: number;
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
  setFiltered,
  data,
  setIsFilter,
  inputRef,
  filterPage,
  setFilterPage,
  searchTerm,
}) => {
  const [openGender, setopenGender] = useState(false);
  const [openStatus, setopenStatus] = useState(false);
  const [openSpecie, setopenSpecie] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const handleChangeData = async ({ type, value }: ChangeDataProps) => {
      const newFilters = { ...filters, [type]: value };
      setFilters(newFilters);
      const query = apiQueryFiltered(newFilters, filterPage, searchTerm);
      try {
        const data: DataProps = await graphQLClient.request(query);
        setFiltered(data.characters.results);
        setIsFilter(true);
      } catch (error) {
        console.error(error);
      }
    };
    if (filterType !== "") {
      handleChangeData({ type: filterType, value: filterValue });
    }
  }, [filterPage, filterType, searchTerm]);

  const handleClear = () => {
    setFiltered(undefined);
    setFilters([]);
    setIsFilter(false);
    setFilterPage(1);
    inputRef.current && (inputRef.current.value = "");
  };

  const setFilterProps = (props: any) => {
    setFilterType(props.type);
    setFilterValue(props.value);
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
                setFilterProps({ type: "gender", value: "Male" });
              }}
            >
              Male
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "gender", value: "Female" });
              }}
            >
              Female
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "gender", value: "Genderless" });
              }}
            >
              Genderless
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "gender", value: "Unknown" });
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
                setFilterProps({ type: "species", value: "Human" });
              }}
            >
              Human
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "species", value: "Alien" });
              }}
            >
              Alien
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "species", value: "Humanoid" });
              }}
            >
              Humanoid
            </li>
            <li
              onClick={() => {
                setFilterProps({
                  type: "species",
                  value: "Mythological Creature",
                });
              }}
            >
              Mythological Creature
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "species", value: "Animal" });
              }}
            >
              Animal
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "species", value: "Robot" });
              }}
            >
              Robot
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "species", value: "Cronenberg" });
              }}
            >
              Cronenberg
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "species", value: "Disease" });
              }}
            >
              Disease
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "species", value: "unknown" });
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
                setFilterProps({ type: "status", value: "Alive" });
              }}
            >
              Alive
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "status", value: "Dead" });
              }}
            >
              Dead
            </li>
            <li
              onClick={() => {
                setFilterProps({ type: "status", value: "Unknown" });
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

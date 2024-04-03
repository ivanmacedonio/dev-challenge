import { motion } from "framer-motion";
import { GraphQLClient } from "graphql-request";
import React, { RefObject, useEffect, useState } from "react";
import arrowDown from "../assets/icons/arrowDown.svg";
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
  setIsFilter,
  inputRef,
  filterPage,
  setFilterPage,
  searchTerm,
}) => {
  const [filters, setFilters] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filtersShow, setFiltersShow] = useState<string[]>([]);

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

  const setFilterProps = (props: any) => {
    setFilterType(props.type);
    setFilterValue(props.value);
    setFiltersShow([...filtersShow, props.value]);
    window.scrollTo(0, 0);
  };

  const handleClear = () => {
    setFiltered(undefined);
    setFilters([]);
    setFiltersShow([]);
    setFilterType("");
    setIsFilter(false);
    setFilterPage(1);
    inputRef.current && (inputRef.current.value = "");
  };

  return (
    <div className="dropdown-cnt">
      <div className="filters">
        {filtersShow.map((filter) => (
          <p>{filter}</p>
        ))}
      </div>
      <motion.button
        onClick={handleClear}
        id="clear-btn"
        whileTap={{ scale: 1.1 }}
        transition={{ duration: 0.1 }}
      >
        Clear
      </motion.button>
      <div className="button-cnt">
        <button>
          Gender
          <img src={arrowDown} alt="" />
        </button>
        <div className="list-cnt">
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
        </div>
      </div>
      <div className="button-cnt">
        <button>
          Specie
          <img src={arrowDown} alt="" />
        </button>
        <div className="list-cnt">
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
        </div>
      </div>
      <div className="button-cnt">
        <button>
          Status
          <img src={arrowDown} alt="" />
        </button>
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
      </div>
    </div>
  );
};

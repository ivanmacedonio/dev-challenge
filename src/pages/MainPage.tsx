import { useState } from "react";
import { List } from "../components/List";
import { useFetch } from "../hooks/useFetch";
import "../styles/MainPage.css";
import { FetchType } from "../types";
import apiQuery from "../utils/apiConfig";

export const MainPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error }: FetchType = useFetch(apiQuery(page));

  return (
    <div className="main-cnt">
      <div className="list-cnt">
        <List
          page={page}
          data={data}
          isLoading={isLoading}
          error={error}
          setPage={setPage}
          initialStatePage={page}
        />
      </div>
    </div>
  );
};

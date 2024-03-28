import { List } from "../components/List";
import { useFetch } from "../hooks/useFetch";
import "../styles/MainPage.css";
import { FetchType } from "../types";
import apiQuery from "../utils/apiConfig";

export const MainPage = () => {
  const { data, isLoading, error }: FetchType = useFetch(apiQuery);

  return (
    <div className="main-cnt">
      <input type="text" placeholder="PLACEHOLDER" />
      <div className="list-cnt">
        <List data={data} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

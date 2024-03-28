import { List } from "../components/List";
import { useFetch } from "../hooks/useFetch";
import "../styles/MainPage.css";
import apiQuery from "../utils/apiConfig";

type FetchProps = {
  data: string[];
  isLoading: boolean;
  error: unknown;
};

export const MainPage = () => {
  const { data, isLoading, error }: FetchProps = useFetch(apiQuery);

  return (
    <div className="main-cnt">
      <input type="text" placeholder="PLACEHOLDER" />
      <List data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

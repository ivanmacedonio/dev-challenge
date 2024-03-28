import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";


const graphQLClient = new GraphQLClient("https://rickandmortyapi.com/graphql");

export const useFetch = (query: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string | unknown>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res:any = await graphQLClient.request(query);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { isLoading, data, error };
};

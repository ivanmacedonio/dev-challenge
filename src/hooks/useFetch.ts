import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";


const graphQLClient = new GraphQLClient("https://rickandmortyapi.com/graphql");

export const useFetch = (query: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]); //La data recibida por la API no esta tipada, Pues en un inicio se desconoce su contrato
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
    console.log(data)
  }, [query]);

  return { isLoading, data, error };
};

 export type FetchType = {
    data: {
      characters: {
        results: {
          name: string;
          image: string;
          id: string;
          status: string;
          species: string;
          origin: any;
        }[];
      };
      locations: {
        results: { name: string }[];
      };
      episodes: {
        results: { name: string }[];
      };
    } | null;
    error: string | unknown | null;
    isLoading: boolean;
  };

  
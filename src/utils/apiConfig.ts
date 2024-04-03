const apiQuery = (page:number) => {
  return `
  query {
    characters (page: ${page}){
      info{count}
      results{
        name,
        image,
        gender,
        id,
        status,
        species,
        origin{name}
      }
    }
    locations {
      info {
        count
      }
      results {
        name
      }
    }
    episodes {
      info {
        count
      }
      results {
        name
      }
    }
  }
  
  `
} 

export const apiQueryFiltered = (filters:any, page:number, searchTerm: string | undefined) => {
  const filterString = Object.entries(filters)
  .map(([key, value]) => `${key}: "${value}"`)
  .join(',');
  return `
    query {
      characters (page: ${page}, filter: { ${filterString}, name: "${searchTerm}" }) {
        info{count}
        results{
          name,
          image,
          gender,
          id,
          status,
          species,
          origin{name}
        }
      }
      locations {
        info {
          count
        }
        results {
          name
        }
      }
      episodes {
        info {
          count
        }
        results {
          name
        }
      }
    }
  `;
};

export const apiSpecies = `
query {
  characters {
    results {
      species
    }
  }
}

`



export default apiQuery;

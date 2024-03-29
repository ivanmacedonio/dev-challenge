const apiQuery = `
query {
  characters{
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

export const apiQueryFiltered = (filters:any) => {
  const filterString = Object.entries(filters)
    .map(([key, value]) => `${key}: "${value}"`)
    .join(", ");
  return `
    query {
      characters (filter: {${filterString}}) {
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



export default apiQuery;

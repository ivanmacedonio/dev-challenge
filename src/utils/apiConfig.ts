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

// apiConfig.ts
export const apiQueryFiltered = (type: any) => {
  const filterString = Object.entries(type)
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
  
  `
}



export default apiQuery;

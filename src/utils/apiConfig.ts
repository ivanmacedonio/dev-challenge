const apiQuery = `
query {
  characters{
    info{count}
    results{
      name,
      image,
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

export default apiQuery;

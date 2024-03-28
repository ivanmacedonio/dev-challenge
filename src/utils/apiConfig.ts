const apiQuery = `
query {
  characters {
    info {
      count
    }
    results {
      name
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

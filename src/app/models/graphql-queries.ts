import { gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { EntityType } from './util-types';

const ALL_FILMS = `{
  allFilms {
   films {
     id
     title
     director
   }
 }
 }`;
const ALL_PEOPLE = `{
  allPeople {
    people {
      id
      name
      homeworld {
        id
        name
      }
    }
  }
  }`;
const ALL_PLANETS = `{
  allPlanets {
    planets {
      id
      name
      terrains
    }
  }
  }`;
const ALL_SPECIES = `{
  allSpecies {
    species {
      id
      name
      classification
    }
  }
}
`;
const ALL_STARSHIPS = `{
  allStarships {
    starships {
      id
      name
      model
    }
  }
}
`;
const ALL_VEHICLES = `{
  allVehicles {
    vehicles {
      id
      name
      model
    }
  }
}
`;

const DETAIL_PEOPLE = `query GetPersonById($id: ID){
  person(id: $id) {
    id
    name
    birthYear
    gender
    height
    mass
    eyeColor
    hairColor
    filmConnection(first: 1) {
      films {
        id
        title
        director
      }
    }
    starshipConnection(first: 1) {
      starships {
        id
        name
        starshipClass
      }
    }
    vehicleConnection(first: 1) {
      vehicles {
        id
        name
        vehicleClass
      }
    }
    species {
      id
      name
      classification
    }
    homeworld {
      id
      name
      terrains
    }
  }
}
`;
const DETAIL_FILMS = `query getFilmById($id: ID) {
  film(id: $id) {
    id
    episodeID
    title
    director
    producers
    releaseDate
    openingCrawl
    speciesConnection(first: 1) {
      species {
        id
        name
        classification
      }
    }
    starshipConnection(first: 1) {
      starships {
        id
        name
        starshipClass
      }
    }
    vehicleConnection(first: 1) {
      vehicles {
        id
        name
        vehicleClass
      }
    }
    characterConnection(last: 3) {
      characters {
        id
        name
        homeworld {
          name
        }
      }
    }
		 planetConnection(first: 2) {
      planets {
        id
        name
        terrains
      }
    }
  }
}
`;
const DETAIL_PLANETS = `query getPlanetById($id: ID) {
  planet(id: $id) {
    id
    name
    gravity
    diameter
    climates
    terrains
    population
    residentConnection {
      residents {
        id
        name
        filmConnection {
          films {
            episodeID
          }
        }
      }
    }
    filmConnection {
      films {
        id
        title
        director
      }
    }
  }
}`;
const DETAIL_SPECIES = `query getSepeciesyId($id: ID) {
  species(id: $id) {
		id
    name
    classification
    averageHeight
    averageLifespan
    language
    designation
    homeworld {
      id
      name
      terrains
    }
    personConnection(first: 1) {
      people {
        id
        name
        birthYear
      }
    }
    filmConnection(first: 1) {
      films {
        id
        title
        director
      }
    }
    
  }
}`;
const DETAIL_STARSHIPS = `query getStarshipyId($id: ID) {
  starship(id: $id) {
    id
    name
    model
    starshipClass
    costInCredits
    manufacturers
    MGLT
    crew
    pilotConnection(first: 2) {
      pilots {
        id
        name
        birthYear
      }
    }
    filmConnection(first: 2) {
      films {
        id
        title
        episodeID
      }
    }
  }
}

`;
const DETAIL_VEHICLES = `query getVehicleyId($id: ID) {
  vehicle(id: $id) {
    id
    name
    model
    vehicleClass
    manufacturers
    costInCredits
    maxAtmospheringSpeed
    passengers
    cargoCapacity
    pilotConnection(first: 2) {
      pilots {
        id
        name
        birthYear
      }
    }
    filmConnection(first: 2) {
      films {
        id
        title
        episodeID
      }
    }
  }
}
`;

const list: { [key in EntityType]: DocumentNode } = {
  films: gql(ALL_FILMS),
  people: gql(ALL_PEOPLE),
  planets: gql(ALL_PLANETS),
  species: gql(ALL_SPECIES),
  starships: gql(ALL_STARSHIPS),
  vehicles: gql(ALL_VEHICLES)
};

const detail: { [key in EntityType]: DocumentNode } = {
  films: gql(DETAIL_FILMS),
  people: gql(DETAIL_PEOPLE),
  planets: gql(DETAIL_PLANETS),
  species: gql(DETAIL_SPECIES),
  starships: gql(DETAIL_STARSHIPS),
  vehicles: gql(DETAIL_VEHICLES)
};

export const QUERIES = {
  list,
  detail
};

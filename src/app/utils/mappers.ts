import { entitiesWithImg } from '../data/detail-img';
import { ItemDetail } from '../detail/models/ItemDetail';
import { ItemList } from '../collections/models/ItemList';
import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle
} from '../models/graphql-schema';
import { EntityType } from '../models/util-types';

enum Episode {
  I = 1,
  II = 2,
  III = 3,
  IV = 4,
  V = 5,
  VI = 6
}

export const personToItemList = ({ id, name, homeworld }: Person): ItemList => {
  return {
    id,
    entity: EntityType.PEOPLE,
    title: name,
    subtitle: homeworld.name
  };
};

export const personToItemDetail = ({
  id,
  name,
  birthYear,
  hairColor,
  eyeColor,
  mass,
  height,
  starshipConnection,
  filmConnection,
  vehicleConnection,
  species,
  homeworld
}: Person): ItemDetail => {
  const relatedStarships = starshipConnection.starships.map(
    ({ id, name, starshipClass }) => ({
      id,
      entity: EntityType.STARSHIPS,
      title: name,
      subtitle: starshipClass
    })
  );
  const relatedVehicles = vehicleConnection.vehicles.map(
    ({ id, name, vehicleClass }) => ({
      id,
      entity: EntityType.VEHICLES,
      title: name,
      subtitle: vehicleClass
    })
  );
  const relatedFilms = filmConnection.films.map(({ id, title, director }) => ({
    id,
    entity: EntityType.FILMS,
    title,
    subtitle: director
  }));
  const relatedSpecies = species
    ? [
        {
          id: species.id,
          entity: EntityType.SPECIES,
          title: species.name,
          subtitle: species.classification
        }
      ]
    : [];
  const relatedHomeworld = homeworld
    ? [
        {
          id: homeworld.id,
          entity: EntityType.PLANETS,
          title: homeworld.name,
          subtitle: (homeworld.terrains || []).slice(0, 3).join(', ')
        }
      ]
    : [];

  return {
    id,
    entity: EntityType.PEOPLE,
    title: name,
    subtitle: birthYear,
    img: entitiesWithImg.has(id) ? `${id}.jpg` : '',
    info: [
      {
        label: 'Hair color',
        value: hairColor
      },
      {
        label: 'Eye color',
        value: eyeColor
      },
      {
        label: 'Mass (Kg)',
        value: mass || 'N/A'
      },
      {
        label: 'Height (cm)',
        value: height
      }
    ],
    related: [
      ...relatedStarships,
      ...relatedVehicles,
      ...relatedFilms,
      ...relatedSpecies,
      ...relatedHomeworld
    ]
  };
};

export const filmToItemList = ({ id, title, director }: Film): ItemList => {
  return {
    id,
    entity: EntityType.FILMS,
    title,
    subtitle: director
  };
};

export const filmToItemDetail = ({
  id,
  title,
  episodeID,
  director,
  producers,
  releaseDate,
  openingCrawl,
  starshipConnection,
  vehicleConnection,
  speciesConnection,
  characterConnection,
  planetConnection
}: Film): ItemDetail => {
  const relatedStarships = starshipConnection.starships.map(
    ({ id, name, starshipClass }) => ({
      id,
      entity: EntityType.STARSHIPS,
      title: name,
      subtitle: starshipClass
    })
  );
  const relatedVehicles = vehicleConnection.vehicles.map(
    ({ id, name, vehicleClass }) => ({
      id,
      entity: EntityType.VEHICLES,
      title: name,
      subtitle: vehicleClass
    })
  );
  const relatedCharacters = characterConnection.characters.map(
    ({ id, name: title, homeworld: { name: subtitle } }) => ({
      id,
      entity: EntityType.PEOPLE,
      title,
      subtitle
    })
  );
  const relatedSpecies = speciesConnection.species.map(
    ({ id, name, classification }) => ({
      id,
      entity: EntityType.SPECIES,
      title: name,
      subtitle: classification
    })
  );
  const relatedPlanets = planetConnection.planets.map(
    ({ id, name, terrains }) => ({
      id,
      entity: EntityType.PLANETS,
      title: name,
      subtitle: (terrains || []).slice(0, 3).join(', ')
    })
  );

  return {
    id,
    entity: EntityType.FILMS,
    img: entitiesWithImg.has(id) ? `${id}.jpg` : '',
    title,
    subtitle: `Episode ${Episode[episodeID]}`,
    secondaryCard: {
      label: '',
      value: openingCrawl
    },
    info: [
      {
        label: 'Director',
        value: director
      },
      {
        label: 'Producer',
        value: producers.slice(0, 2).join(', ')
      },
      {
        label: 'Release date',
        value: releaseDate
      }
    ],
    related: [
      ...relatedCharacters,
      ...relatedStarships,
      ...relatedVehicles,
      ...relatedSpecies,
      ...relatedPlanets
    ]
  };
};
export const planetToItemDetail = ({
  id,
  name,
  gravity,
  diameter,
  climates,
  terrains,
  population,
  orbitalPeriod,
  rotationPeriod,
  residentConnection,
  filmConnection
}: Planet): ItemDetail => {
  const relatedCharacters = residentConnection.residents.map(
    ({ id, name, filmConnection }) => ({
      id,
      entity: EntityType.PEOPLE,
      title: name,
      subtitle: filmConnection.films
        .slice(0, 1)
        .map(({ episodeID }) => `Episode ${Episode[episodeID]}`)
        .join('')
    })
  );
  const relatedFilms = filmConnection.films.map(({ id, title, director }) => ({
    id,
    entity: EntityType.FILMS,
    title,
    subtitle: director
  }));

  const info = [
    {
      label: 'Population',
      value: population / 1000000 + ' M'
    },
    {
      label: 'Gravity',
      value: gravity
    },
    {
      label: 'Orbital Per.',
      value: orbitalPeriod
    },
    {
      label: 'Rotation Per.',
      value: rotationPeriod
    },
    {
      label: 'Diameter (Km)',
      value: diameter
    },
    {
      label: 'Climates',
      value: (climates ?? []).slice(0, 2).join(', ')
    }
  ].filter(({ value }) => value);

  return {
    id,
    entity: EntityType.PLANETS,
    title: name,
    subtitle: (terrains ?? []).slice(0, 3).join(', '),
    info,
    related: [...relatedFilms, ...relatedCharacters]
  };
};

export const planetsToItemList = ({ id, name, terrains }: Planet): ItemList => {
  return {
    id,
    entity: EntityType.PLANETS,
    title: name,
    subtitle: (terrains ?? []).slice(0, 3).join(', ')
  };
};

export const speciesToItemDetail = ({
  id,
  name,
  classification,
  averageHeight,
  averageLifespan,
  designation,
  language,
  homeworld,
  personConnection,
  filmConnection
}: Species): ItemDetail => {
  const relatedHomeworld = homeworld
    ? [
        {
          id: homeworld.id,
          entity: EntityType.PLANETS,
          title: homeworld.name,
          subtitle: (homeworld.terrains || []).slice(0, 3).join(', ')
        }
      ]
    : [];

  const relatedCharacters = personConnection.people.map(
    ({ id, name, birthYear }) => ({
      id,
      entity: EntityType.PEOPLE,
      title: name,
      subtitle: birthYear
    })
  );

  const relatedFilms = filmConnection.films.map(({ id, title, director }) => ({
    id,
    entity: EntityType.FILMS,
    title,
    subtitle: director
  }));

  const info = [
    {
      label: 'Language',
      value: language
    },
    {
      label: 'Lifespan',
      value: averageLifespan
    },
    {
      label: 'Height (Avg)',
      value: averageHeight
    },
    {
      label: 'Classification',
      value: designation
    }
  ].filter(({ value }) => value);

  return {
    id,
    entity: EntityType.SPECIES,
    title: name,
    subtitle: classification,
    info,
    related: [...relatedHomeworld, ...relatedCharacters, ...relatedFilms]
  };
};

export const specieToItemList = ({
  id,
  name,
  classification
}: Species): ItemList => {
  return {
    id,
    entity: EntityType.SPECIES,
    title: name,
    subtitle: classification
  };
};

export const starshipToItemList = ({ id, name, model }: Starship): ItemList => {
  return {
    id,
    entity: EntityType.STARSHIPS,
    title: name,
    subtitle: model
  };
};

export const starshipToItemDetail = ({
  id,
  name,
  model,
  starshipClass,
  MGLT,
  crew,
  manufacturers,
  costInCredits,
  cargoCapacity,
  pilotConnection,
  filmConnection
}: Starship): ItemDetail => {
  const relatedCharacters = pilotConnection.pilots.map(
    ({ id, name, birthYear }) => ({
      id,
      entity: EntityType.PEOPLE,
      title: name,
      subtitle: birthYear
    })
  );

  const relatedFilms = filmConnection.films.map(({ id, title, episodeID }) => ({
    id,
    entity: EntityType.FILMS,
    title,
    subtitle: `Episode ${Episode[episodeID]}`
  }));

  const info = [
    {
      label: 'Class',
      value: starshipClass
    },
    {
      label: 'Credits',
      value: costInCredits
    },
    {
      label: 'MGLT/h',
      value: MGLT
    },
    {
      label: 'Crew',
      value: crew
    },
    {
      label: 'Cargo',
      value: cargoCapacity
    },
    {
      label: 'Manufacturer',
      value: manufacturers.slice(0, 1).join(' ,')
    }
  ]
    .slice(0, 4)
    .filter(({ value }) => value);

  return {
    id,
    entity: EntityType.STARSHIPS,
    title: name,
    subtitle: model,
    info,
    related: [...relatedCharacters, ...relatedFilms]
  };
};

export const vehicleToItemList = ({ id, name, model }: Vehicle): ItemList => {
  return {
    id,
    entity: EntityType.VEHICLES,
    title: name,
    subtitle: model
  };
};

export const vehicleToItemDetail = ({
  id,
  name,
  model,
  vehicleClass,
  manufacturers,
  costInCredits,
  maxAtmospheringSpeed,
  passengers,
  cargoCapacity,
  pilotConnection,
  filmConnection
}: Vehicle): ItemDetail => {
  const relatedCharacters = pilotConnection.pilots.map(
    ({ id, name, birthYear }) => ({
      id,
      entity: EntityType.PEOPLE,
      title: name,
      subtitle: birthYear
    })
  );

  const relatedFilms = filmConnection.films.map(({ id, title, episodeID }) => ({
    id,
    entity: EntityType.FILMS,
    title,
    subtitle: `Episode ${Episode[episodeID]}`
  }));

  const info = [
    {
      label: 'Class',
      value: vehicleClass
    },
    {
      label: 'Credits',
      value: costInCredits
    },
    {
      label: 'Speed (Km/h)',
      value: maxAtmospheringSpeed
    },
    {
      label: 'Passengers',
      value: passengers
    },
    {
      label: 'Cargo',
      value: cargoCapacity
    },
    {
      label: 'Manufacturer',
      value: manufacturers.slice(0, 1).join(' ,')
    }
  ]
    .slice(0, 4)
    .filter(({ value }) => value);

  return {
    id,
    entity: EntityType.VEHICLES,
    title: name,
    subtitle: model,
    img: entitiesWithImg.has(id) ? `${id}.jpg` : '',
    info,
    related: [...relatedCharacters, ...relatedFilms]
  };
};

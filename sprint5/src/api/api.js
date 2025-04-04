const urlbase = "https://rickandmortyapi.com/api/character";

// {
//     characters: "https://rickandmortyapi.com/api/character",
//     locations: "https://rickandmortyapi.com/api/location",
//     episodes: "https://rickandmortyapi.com/api/episode"
// }

export const api = async () => {
  const response = await fetch(urlbase);
  const data = await response.json();
  return data;
};

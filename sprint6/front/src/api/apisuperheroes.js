const urlbase = "https://67ef0b8dc11d5ff4bf7b9f43.mockapi.io/api/v1/users";

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

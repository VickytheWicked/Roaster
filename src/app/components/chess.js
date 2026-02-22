async function fetchStats(username) {
  const result = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
  let content = await result.json();
  //chess_rapid data is used
  console.log(content.chess_rapid.best.rating);
  return await content.chess_rapid.best.rating;
  //   return await result.json();
}

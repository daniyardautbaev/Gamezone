export type Game = {
  id: number;
  title: string;
  imageId: string;
  short_description: string;
  genre: string;
  platform: string;
};

export const games: Game[] = [
  {
    "id": 1,
    "title": "Dauntless",
    "imageId": "game-dauntless",
    "short_description": "A free-to-play, co-op action RPG with a stylish art style that is heavily inspired by the Monster Hunter series.",
    "genre": "MMORPG",
    "platform": "PC (Windows)"
  },
  {
    "id": 2,
    "title": "World of Warships",
    "imageId": "game-warships",
    "short_description": "A free-to-play naval warfare-themed massively multiplayer online game from Wargaming.",
    "genre": "Naval",
    "platform": "PC (Windows)"
  },
  {
    "id": 3,
    "title": "Warframe",
    "imageId": "game-warframe",
    "short_description": "A cooperative free-to-play third-person online action game set in an evolving science-fiction world.",
    "genre": "Shooter",
    "platform": "PC (Windows)"
  },
  {
    "id": 4,
    "title": "ArcheAge",
    "imageId": "game-archeage",
    "short_description": "A free-to-play MMORPG with sandbox features that is developed by Korean studio XL Games.",
    "genre": "MMORPG",
    "platform": "PC (Windows)"
  },
  {
    "id": 5,
    "title": "World of Tanks",
    "imageId": "game-tanks",
    "short_description": "A team-based MMO action game dedicated to armored warfare in the mid-20th century.",
    "genre": "Tank",
    "platform": "PC (Windows)"
  },
  {
    "id": 6,
    "title": "Crossout",
    "imageId": "game-crossout",
    "short_description": "A post-apocalyptic MMO action game in which you can craft your unique battle machines from a myriad of interchangeable parts, ride them directly into combat and destroy your enemies in explosive PvP online battles!",
    "genre": "Shooter",
    "platform": "PC (Windows)"
  }
];

export const readmeContent = `# GameZone

GameZone is a comprehensive, free-to-play games database that provides information on a wide variety of games. All the data is provided by the [FreeToGame API](https://www.freetogame.com/api-doc).

## Features

- **Extensive Database**: Access a large collection of free-to-play games.
- **Detailed Information**: Get details such as genre, platform, publisher, and release date.
- **Regular Updates**: The database is regularly updated with new games and information.

## API

This project uses the FreeToGame API to fetch game data. The API is free to use and does not require an API key for access.

### Base URL
\`\`\`
https://www.freetogame.com/api/
\`\`\`

### Endpoints
- \`/games\`: Get all games.
- \`/game?id={id}\`: Get a specific game by its ID.

## Contributing

Contributions are welcome! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.

1.  **Fork the repository.**
2.  **Create a new branch:** \`git checkout -b my-new-feature\`
3.  **Make your changes.**
4.  **Commit your changes:** \`git commit -am 'Add some feature'\`
5.  **Push to the branch:** \`git push origin my-new-feature\`
6.  **Submit a pull request.**

## License
This project is open-source and available under the MIT License.
`;

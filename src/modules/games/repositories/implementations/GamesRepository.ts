import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where(`games.title ILIKE '%${param}%'`)
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    /* return this.repository
      .createQueryBuilder() */

    const users = await this.repository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.users", "user")
      .where("game.id = :id", { id })
      .getMany();

    console.log("###", users);

    return [
      {
        id: "1",
        first_name: "bob",
        last_name: "bia",
        email: "",
        games: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
  }
}

import { describe, it, expect } from "vitest";
import { Match } from "../src/match";

describe("Match en un set", () => {
  //double dummy pour juste remplir le constructeur 
  const classementDummy = { enregistrer: () => {} };

  it("commence avec aucun jeu gagné", () => {
    const match = new Match("Alice", "Bob", classementDummy);

    expect(match.jeux()).toBe("0-0");
  });

  it("compte un jeu au joueur qui gagne un jeu", () => {
    const match = new Match("Alice", "Bob", classementDummy);

    for (let i = 0; i < 4; i++) {
      match.pointPour("Alice");
    }

    expect(match.jeux()).toBe("1-0");
  });
});

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

  it("compte aussi les jeux gagnés par le second joueur", () => {
    const match = new Match("Alice", "Bob", classementDummy);

    for (let i = 0; i < 4; i++) {
      match.pointPour("Bob");
    }

    expect(match.jeux()).toBe("0-1");
  });

  it("enchaîne un nouveau jeu après chaque jeu gagné", () => {
    const match = new Match("Alice", "Bob", classementDummy);

    for (let i = 0; i < 8; i++) {
      match.pointPour("Alice");
    }

    expect(match.jeux()).toBe("2-0");
  });
});

import { describe, it, expect, vi } from "vitest";
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

  it("donne la victoire au premier joueur qui gagne 4 jeux", () => {
    const match = new Match("Alice", "Bob", classementDummy);

    for (let i = 0; i < 16; i++) {
      match.pointPour("Alice");
    }

    expect(match.score()).toBe("Victoire Alice 4-0");
  });

  it("affiche le score du jeu en cours pendant le match", () => {
    const match = new Match("Alice", "Bob", classementDummy);

    match.pointPour("Alice");

    expect(match.score()).toBe("Quinze-Zéro");
  });

  it("annonce la victoire avec le nombre de jeux du vainqueur en premier", () => {
    const match = new Match("Alice", "Bob", classementDummy);

    for (let i = 0; i < 4; i++) {
      match.pointPour("Alice");
    }
    for (let i = 0; i < 16; i++) {
      match.pointPour("Bob");
    }

    expect(match.score()).toBe("Victoire Bob 4-1");
  });

  //double spy pour verifier que le classement est appelé une seule fois à la fin du match avec le vainqueur en premier
  it("enregistre le résultat du match une seule fois à la fin, vainqueur en premier", () => {
    const classementSpy = { enregistrer: vi.fn() };
    const match = new Match("Alice", "Bob", classementSpy);

    for (let i = 0; i < 16; i++) {
      match.pointPour("Alice");
    }

    expect(classementSpy.enregistrer).toHaveBeenCalledTimes(1);
    expect(classementSpy.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });
});

import { describe, it, expect } from "vitest";
import { Jeu } from "../src/jeu";


describe("Jeu", () => {
  //double dummy pour juste remplir le constructeur vu qu'il y a pas de valeur à renvoyer ou verifier
  const classementDummy = { enregistrer: () => {} };

  it("annonce Zéro-Zéro au début du jeu", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    expect(jeu.score()).toBe("Zéro-Zéro");
  });

  it("annonce Quinze quand un joueur marque son premier point", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("affiche les points du second joueur à droite", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Zéro-Quinze");
  });
});

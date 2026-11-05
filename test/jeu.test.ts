import { describe, it, expect } from "vitest";
import { Jeu } from "../src/jeu";


describe("Jeu", () => {
    const classementDummy = { enregistrer: () => {} };

  it("annonce Zéro-Zéro au début du jeu", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    expect(jeu.score()).toBe("Zéro-Zéro");
  });
});

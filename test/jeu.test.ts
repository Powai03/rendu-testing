import { describe, it, expect, vi } from "vitest";
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

  it("annonce les points dans l'ordre Zéro, Quinze, Trente, Quarante", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Trente-Quinze");
  });

  it("annonce A quand les deux joueurs ont le même nombre de points", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Quinze-A");
  });

  it("annonce l'égalité avec le score des joueurs suivi de A", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    for (let i = 0; i < 2; i++) {
      jeu.pointPour("Alice");
      jeu.pointPour("Bob");
    }

    expect(jeu.score()).toBe("Trente-A");
  });

  it("annonce Égalité quand les deux joueurs sont à Quarante", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    for (let i = 0; i < 3; i++) {
      jeu.pointPour("Alice");
      jeu.pointPour("Bob");
    }

    expect(jeu.score()).toBe("Égalité");
  });

  it("donne la victoire au joueur qui marque alors qu'il est à Quarante", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Alice");
    }

    expect(jeu.score()).toBe("Victoire Alice");
  });

  it("donne aussi la victoire au second joueur", () => {
    const jeu = new Jeu("Alice", "Bob", classementDummy);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Bob");
    }

    expect(jeu.score()).toBe("Victoire Bob");
  });

  //double spy pour verifier apres coup que enregistrer est appelé avec les bons joueurs vu qu'un dummy ou un stub garde pas d'appels
  it("enregistre le résultat au classement à la fin du match, vainqueur en premier", () => {
    const classementSpy = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classementSpy);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Alice");
    }

    expect(classementSpy.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  //double spy aussi pour verifier que enregistrer reçoit bob en premier quand c'est lui qui gagne
  it("enregistre aussi la victoire du second joueur avec lui en premier", () => {
    const classementSpy = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classementSpy);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Bob");
    }

    expect(classementSpy.enregistrer).toHaveBeenCalledWith("Bob", "Alice");
  });

  //double spy pour compter combien de fois enregistrer est appelé, un dummy ou un stub peut pas compter les appels
  it("n'enregistre le résultat qu'une seule fois même si on marque après la fin du match", () => {
    const classementSpy = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classementSpy);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Alice");
    }
    jeu.pointPour("Bob");

    expect(classementSpy.enregistrer).toHaveBeenCalledTimes(1);
  });
});

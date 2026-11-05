import type { Classement } from "./classement";

export class Jeu {
  private pointsJoueur1 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string) {
    this.pointsJoueur1 = this.pointsJoueur1 + 1;
  }

  score(): string {
    if (this.pointsJoueur1 === 1) {
      return "Quinze-Zéro";
    }
    return "Zéro-Zéro";
  }
}

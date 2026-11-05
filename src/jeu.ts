import type { Classement } from "./classement";

export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string) {
    if (joueur === this.joueur1) {
      this.pointsJoueur1 = this.pointsJoueur1 + 1;
    } else {
      this.pointsJoueur2 = this.pointsJoueur2 + 1;
    }
  }

  score(): string {
    if (this.pointsJoueur1 === 1) {
      return "Quinze-Zéro";
    }
    if (this.pointsJoueur2 === 1) {
      return "Zéro-Quinze";
    }
    return "Zéro-Zéro";
  }
}

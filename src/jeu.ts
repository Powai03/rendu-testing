import type { Classement } from "./classement";

const PTS_WIN = 4;

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
    if (this.pointsJoueur1 === PTS_WIN) {
      this.classement.enregistrer("Alice", "Bob");
    }
  }

  score(): string {
    const annonces = ["Zéro", "Quinze", "Trente", "Quarante"];
    if (this.pointsJoueur1 === PTS_WIN) {
      return "Victoire Alice";
    }
    if (this.pointsJoueur2 === PTS_WIN) {
      return "Victoire Bob";
    }
    if (this.pointsJoueur1 === 3 && this.pointsJoueur2 === 3) {
      return "Égalité";
    }
    if (this.pointsJoueur1 === this.pointsJoueur2 && this.pointsJoueur1 > 0) {
      return annonces[this.pointsJoueur1] + "-A";
    }
    return annonces[this.pointsJoueur1] + "-" + annonces[this.pointsJoueur2];
  }
}

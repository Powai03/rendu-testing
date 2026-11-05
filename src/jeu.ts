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
    if (this.vainqueur()) {
      return;
    }
    if (joueur === this.joueur1) {
      this.pointsJoueur1 = this.pointsJoueur1 + 1;
    } else {
      this.pointsJoueur2 = this.pointsJoueur2 + 1;
    }
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const perdant = vainqueur === this.joueur1 ? this.joueur2 : this.joueur1;
      this.classement.enregistrer(vainqueur, perdant);
    }
  }

  score(): string {
    const annonces = ["Zéro", "Quinze", "Trente", "Quarante"];
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      return "Victoire " + vainqueur;
    }
    if (this.pointsJoueur1 === 3 && this.pointsJoueur2 === 3) {
      return "Égalité";
    }
    if (this.pointsJoueur1 === this.pointsJoueur2 && this.pointsJoueur1 > 0) {
      return annonces[this.pointsJoueur1] + "-A";
    }
    return annonces[this.pointsJoueur1] + "-" + annonces[this.pointsJoueur2];
  }

  vainqueur(): string | undefined {
    if (this.pointsJoueur1 === PTS_WIN) {
      return this.joueur1;
    }
    if (this.pointsJoueur2 === PTS_WIN) {
      return this.joueur2;
    }
    return undefined;
  }
}

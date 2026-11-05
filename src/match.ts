import type { Classement } from "./classement";

export class Match {
  private pointsJoueur1 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string) {
    this.pointsJoueur1 = this.pointsJoueur1 + 1;
  }

  jeux(): string {
    if (this.pointsJoueur1 === 4) {
      return "1-0";
    }
    return "0-0";
  }
}

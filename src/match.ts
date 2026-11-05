import type { Classement } from "./classement";
import { Jeu } from "./jeu";

export class Match {
  private jeuxJoueur1 = 0;
  private jeuxJoueur2 = 0;
  private jeuEnCours: Jeu;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {
    this.jeuEnCours = new Jeu(joueur1, joueur2, {
      enregistrer: (vainqueur) => {
        if (vainqueur === joueur1) {
          this.jeuxJoueur1 = this.jeuxJoueur1 + 1;
        } else {
          this.jeuxJoueur2 = this.jeuxJoueur2 + 1;
        }
      },
    });
  }

  pointPour(joueur: string) {
    this.jeuEnCours.pointPour(joueur);
  }

  jeux(): string {
    return this.jeuxJoueur1 + "-" + this.jeuxJoueur2;
  }
}

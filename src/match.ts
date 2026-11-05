import type { Classement } from "./classement";
import { Jeu } from "./jeu";

export class Match {
  private jeuxJoueur1 = 0;
  private jeuxJoueur2 = 0;
  private compteurJeux: Classement;
  private jeuEnCours: Jeu;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {
    this.compteurJeux = {
      enregistrer: (vainqueur) => {
        if (vainqueur === joueur1) {
          this.jeuxJoueur1 = this.jeuxJoueur1 + 1;
        } else {
          this.jeuxJoueur2 = this.jeuxJoueur2 + 1;
        }
      },
    };
    this.jeuEnCours = this.nouveauJeu();
  }

  pointPour(joueur: string) {
    this.jeuEnCours.pointPour(joueur);
    if (this.jeuEnCours.vainqueur()) {
      this.jeuEnCours = this.nouveauJeu();
    }
  }

  private nouveauJeu(): Jeu {
    return new Jeu(this.joueur1, this.joueur2, this.compteurJeux);
  }

  jeux(): string {
    return this.jeuxJoueur1 + "-" + this.jeuxJoueur2;
  }
}

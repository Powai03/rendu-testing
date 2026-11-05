import type { Classement } from "./classement";
import { Jeu } from "./jeu";

const JEUX_WIN = 4;

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
        const vainqueurMatch = this.vainqueur();
        if (vainqueurMatch) {
          this.classement.enregistrer(vainqueurMatch, this.adversaire(vainqueurMatch));
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

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const jeuxVainqueur = Math.max(this.jeuxJoueur1, this.jeuxJoueur2);
      const jeuxPerdant = Math.min(this.jeuxJoueur1, this.jeuxJoueur2);
      return "Victoire " + vainqueur + " " + jeuxVainqueur + "-" + jeuxPerdant;
    }
    return this.jeuEnCours.score();
  }

  jeux(): string {
    return this.jeuxJoueur1 + "-" + this.jeuxJoueur2;
  }

  vainqueur(): string | undefined {
    if (this.jeuxJoueur1 === JEUX_WIN) {
      return this.joueur1;
    }
    if (this.jeuxJoueur2 === JEUX_WIN) {
      return this.joueur2;
    }
    return undefined;
  }

  private adversaire(joueur: string): string {
    return joueur === this.joueur1 ? this.joueur2 : this.joueur1;
  }
}

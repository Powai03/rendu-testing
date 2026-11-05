import type { Classement } from "./classement";

export class Match {
  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  jeux(): string {
    return "0-0";
  }
}

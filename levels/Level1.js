import { BaseLevel } from "./BaseLevel";

export class Level1 extends BaseLevel {
  constructor() {
    super("Level1", 3, 5, 30, "Level2");
  }
}

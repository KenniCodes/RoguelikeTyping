export class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  init(data) {
    // Store the next level's key
    this.nextSceneKey = data.nextSceneKey;
  }

  create() {
    // Add continue button
    if (this.nextSceneKey) {
      const continueButton = this.add
        .text(600, 300, "Continue", { fontSize: "32px", fontFamily: "Pixelify Sans", fill: "#0f0" })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown", () => this.scene.start(this.nextSceneKey)); // Start the next level when the continue button is clicked
        // Also render animation on continueButton
        continueButton.rotation = -0.075;
        this.tweens.add({
          targets: continueButton,
          rotation: 0.075,
          ease: 'Sine.easeInOut',
          duration: 750,
          yoyo: true,
          repeat: -1
      });
    } else {
      const winText = this.add
        .text(600, 200, "Congratulations! You won the game!", {
          fontSize: "32px",
          fill: "#fff",
        })
        .setOrigin(0.5, 0.5);

      const backButton = this.add
        .text(600, 300, "Back to Menu", { fontSize: "32px", fontFamily: "Pixelify Sans", fill: "#0f0" })
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .on("pointerdown", () => this.scene.start("scene-menu")); // Go back to MenuScene when the back button is clicked
    };
  };
};
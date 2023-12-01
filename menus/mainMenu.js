export class MenuScene extends Phaser.Scene {
  constructor() {
    super("scene-menu");
  }

  preload() {
    this.load.image('bg', 'assets/bg.jpg');
  }

  create() {
    this.registry.set("points", 0);
    this.registry.set("speedDown", 150);
    this.registry.set("isColliding", false);
    this.registry.set("lives", 3);

    // Load background
    this.add.image(600,300,'bg');

    const gameTitle = "Project RLT";
    let startX = 350; // X position needs to be mutable, the value gets redefined in the forEach method below

    // Container to hold all letters
    const fallingLetters = this.add.group();

    // Loop through each letter
    gameTitle.split('').forEach((letter, index) => {
      // Create a text object for each letter
      const letterText = this.add.text(startX, -50, letter, {
        fontSize: '96px',
        fontFamily: 'Pixelify Sans',
        color: '#fff'
      }).setOrigin(0.5);

      // Add letter to the group
      fallingLetters.add(letterText);

      // Adjust startX for the next letter
      startX += letterText.width;

      // Animate each letter falling into place
      this.tweens.add({
        targets: letterText,
        y: 300,
        ease: 'Bounce.easeOut',
        duration: 1000,
        delay: index * 100 // Stagger the start of each letter's animation
      });
      // Define colour array to cycle through
      const colors = ['#FF0000', '#800000', '#FFC0CB', '#DC143C', '#B22222', '#FFA500', '#FFD700', '#FFFF00', '#FF4500', '#DAA520', '#008000', '#00FF00', '#228B22', '#32CD32', '#90EE90', '#0000FF', '#000080', '#87CEEB', '#1E90FF', '#4169E1', '#800080', '#EE82EE', '#8A2BE2', '#9400D3', '#9932CC', '#FF69B4', '#C71585', '#FF00FF', '#DB7093', '#FF1493'];
      let currentColor = 0;
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          letterText.setFill(colors[currentColor]);
          currentColor = (currentColor + 1) % colors.length;
        },
        loop: true
      });
    });

    // After all letters have fallen into place, resize and reposition
    this.time.delayedCall(gameTitle.length * 100 + 1000, () => {
      this.tweens.add({
        targets: fallingLetters.getChildren(),
        scaleX: 0.5,
        scaleY: 0.5,
        x: '+=0',
        y: 100,
        duration: 1000,
        ease: 'Power1'
      });
    });

    // Create start button and set initial alpha to 0 for it to fade in later
    const startButton = this.add.text(600, 300, "Start Game", { fontSize: "32px", fontFamily: "Pixelify Sans", fill: "#fff" })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setAlpha(0) // Invisible setting
      .on("pointerdown", () => this.scene.start("Level1")); // Start GameScene when the start button is clicked
    // Simple animation for startButton, starts after gameTitle animation
    this.time.delayedCall(gameTitle.length * 100 + 1500, () => {
      this.tweens.add({
        targets: startButton,
        scaleX: 2, // Grow on x axis
        scaleY: 2, // Grow on y axis
        ease: 'Linear', // Ease linear direction
        alpha: 0.25, // Fades out in 250 ms
        yoyo: true, // Reverses animation
        repeat: -1, // Repeat infinitely
        duration: 500, // Run animation for 500 ms
      });
    });
    // Menu title text with basic style and set initial alpha to 0 fades in at same time as startButton
    const menuHeader = this.add.text(600, 175, "Main menu", { fontSize: "32px", fontFamily: "Pixelify Sans", fill: "#fff" })
      .setOrigin(0.5, 0.5)
      .setAlpha(0); // Invisible setting

    // Options button takes user to options menu
    const options = this.add.text(600, 350, "Options", { fontSize: "32px", fontFamily: "Pixelify Sans", fill: "#fff" })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setAlpha(0) // Invisible setting
      .on("pointerdown", () => this.scene.start("scene-options"));

    // Fade in menu buttons after falling letters animation
    this.time.delayedCall(gameTitle.length * 100 + 1000, () => {
      this.tweens.add({
        targets: [startButton, menuHeader, options],
        alpha: 1,
        duration: 1000,
        ease: 'Power1'
      });
    });
  }
}

/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class BootScene extends Phaser.Scene
{
  constructor()
  {
    super("Boot");
  }

  preload()
  {
    //Preload assets
    this.load.audio('theme', './assets/sounds/InGame.wav');
    this.load.audio('select', './assets/sounds/select.wav');

    //Load cook spritesheet
    this.load.spritesheet('cookBoot', "./assets/resized/CookAnimation.png",
    {
      frameHeight: 61,
      frameWidth: 60
    });

    //Load buttons
    this.load.spritesheet("playbuttons", "./assets/fullSized/playButtons.png",
    {
      frameHeight: 165,
      frameWidth: 388
    });
    this.load.spritesheet("tutorialbuttons", "./assets/fullSized/TutButtons.png",
    {
      frameHeight: 158,
      frameWidth: 387
    });
    this.load.spritesheet("optionsbuttons", "./assets/fullSized/OptionsButtons.png",
    {
      frameHeight: 158,
      frameWidth: 383
    });

    //Load title
    this.load.image("title", "./assets/fullSized/Title Text.png")

    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY = this.cameras.main.height/2;
  }

  create()
  {
    //Add music
    this.music = this.sound.add('theme');
    this.music.play
    ({
      volume:.3,
      loop:true
    });

    //Add SFX
    this.select = this.sound.add('select');

    //Background
    this.cameras.main.setBackgroundColor(0xffe6cc);

    //Add title
    this.add.sprite(400, 150, 'title').setScale(0.6);

    //Add cook
    this.cook = this.add.sprite(150, 350, 'cookBoot').setScale(2);

    //Variable to check cook's direction
    this.cook.direction = "right";

    //Add cook animation
    this.anims.create
    ({
        key: "cook_running",
        frames: this.anims.generateFrameNumbers('cookBoot', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    //Add play button to scene
    var b1 = this.add.sprite(175, 500, 'playbuttons', 0).setScale(0.5).setInteractive();
    b1.on("pointerover", function()
    {
      this.setFrame(1);
    });
    b1.on("pointerout", function()
    {
      this.setFrame(0);
    });
    b1.on("pointerup", function()
    {
      this.music.stop();
      this.scene.start('level1');
      this.select.play
      ({
        volume:.3,
        loop: false
      });
    }, this
  );

    //Add tutorial button to scene
    var b2 = this.add.sprite(400, 500, 'tutorialbuttons', 2).setScale(0.5).setInteractive();
    b2.on("pointerover", function()
    {
      this.setFrame(1);
    });
    b2.on("pointerout", function()
    {
      this.setFrame(0);
    });
    b2.on("pointerup", function()
    {
      this.music.stop();
      this.scene.start('tutorial');
      this.select.play
      ({
        volume:.3,
        loop: false
      });
    }, this
  );

    //Add options button to scene
    var b3 = this.add.sprite(625, 500, 'optionsbuttons', 4).setScale(0.5).setInteractive();
    b3.on("pointerover", function()
    {
      this.setFrame(1);
    });
    b3.on("pointerout", function()
    {
      this.setFrame(0);
    });
    b3.on("pointerup", function()
    {
      this.music.stop();
      this.scene.start('Options');
    }, this
  );
  }

  update()
  {
    //Check for cook position
    if (this.cook.x <= 650 && this.cook.direction == "right")
    {
      this.cook.flipX = false;
      this.cook.anims.play("cook_running", true);
      this.cook.x += 3;
    }
    else if (this.cook.x >= 150)
    {
      this.cook.direction = "left"
      this.cook.flipX = true;
      this.cook.x -= 3;
    }
    else
    {
      this.cook.direction = "right";
    }
  }
}

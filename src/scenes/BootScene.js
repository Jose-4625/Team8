/*global Phaser*/
export default class BootScene extends Phaser.Scene
{
  constructor()
  {
    super("Boot");
  }

  preload()
  {
    //Preload assets
    this.load.audio('theme', './assets/sounds/Title.wav');
    this.load.audio('select', './assets/sounds/select.wav');

    //Load spritesheets
    this.load.spritesheet('cookBoot', "./assets/fullSized/Cook Animation.png",
    {
      frameHeight: 185,
      frameWidth: 181
    });
    this.load.spritesheet('redCookBoot', "./assets/fullSized/Cook Animation Red Version.png",
    {
      frameHeight: 185,
      frameWidth: 181
    });
    this.load.spritesheet('potatoBoot', "./assets/fullSized/potatoFullSized.png",
    {
      frameHeight: 350,
      frameWidth: 255
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

    //Load background
    this.load.image("background", "./assets/fullSized/Store Front.png")

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
      loop:true,
      mute:this.registry.get("musicmuted")
    });

    //Add SFX
    this.select = this.sound.add('select');

    //Background
    this.cameras.main.setBackgroundColor(0xffe6cc);

    //Add background
    this.add.sprite(400, 280, 'background').setScale(0.6);

    //Add sprites
    this.cook = this.add.sprite(150, 480, 'cookBoot').setScale(0.75);
    this.potato = this.add.sprite(350, 490, 'potatoBoot').setScale(0.3);

    //Variable to check cook's direction
    this.cook.direction = "right";

    //Add animations
    this.anims.create
    ({
        key: "cook_running",
        frames: this.anims.generateFrameNumbers('cookBoot', { start: 20, end: 26 }),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create
    ({
      key: "red_cook_running",
      frames: this.anims.generateFrameNumbers('redCookBoot', { start: 20, end: 26 }),
      frameRate: 20,
      repeat: -1
    })
    this.anims.create
    ({
        key: "potato_rolling",
        frames: this.anims.generateFrameNumbers('potatoBoot', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    //Add play button to scene
    var b1 = this.add.sprite(195, 315, 'playbuttons', 0).setScale(0.4).setInteractive();
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
        loop: false,
        mute:this.registry.get("sfxmuted")
      });
    }, this
  );

    //Add tutorial button to scene
    var b2 = this.add.sprite(575, 315, 'tutorialbuttons', 2).setScale(0.4).setInteractive();
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
        loop: false,
        mute:this.registry.get("sfxmuted")
      });
    }, this
  );

    //Add options button to scene
    var b3 = this.add.sprite(625, 110, 'optionsbuttons', 4).setScale(0.3).setInteractive();
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
      this.select.play
      ({
        volume:.3,
        loop: false,
        mute:this.registry.get("sfxmuted")
      });
      this.scene.start('Options');
    }, this
  );
}

  update()
  {
    //Check for cook position and play animations
    if (this.cook.x <= 500 && this.cook.direction == "right")
    {
      this.cook.flipX = false;
      this.cook.anims.play("red_cook_running", true);
      this.cook.x += 3.5;
      this.potato.anims.play("potato_rolling", true);
      this.potato.x += 3.5;
      this.potato.flipX = false;
    }
    else if (this.cook.x >= 150)
    {
      this.cook.anims.play("cook_running", true);
      this.cook.direction = "left"
      this.cook.flipX = true;
      this.cook.x -= 3.5;
      this.potato.x -= 3.5;
      this.potato.flipX = true;
    }
    else
    {
      this.cook.direction = "right";
    }
  }
}

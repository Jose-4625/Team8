/*global Phaser*/
import * as ChangeScene from './WinChangeScene.js';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('windown','./assets/sounds/Wind down.wav')
    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY=this.cameras.main.height/2;

    //Load background
    this.load.image("winScreen", "./assets/fullSized/Win Screen.png")
  }

  create() {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this,'level1')

    //Add music
    this.music=this.sound.add('windown')
    this.music.play({
      volume:.3,
      loop:false
    });
    //Create the scenes
    WebFont.load({
      google:{
        families: ['Candal', 'Modak', 'Anton']
      }
    });

    //Add background
    this.add.sprite(400, 290, 'winScreen').setScale(0.3);
    //Add text
    var content = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Fried or Flight",
        "",
        "Team Toadprac",
        "",
        "Producer",
        "Dr. Paul Toprac",
        "",
        "Associate Producer",
        "Jason Harron",
        "",
        "Artist",
        "Angelia Wu",
        "",
        "Programmer",
        "Jose-Angel Torres",
        "",
        "Sound Designer",
        "Carlos Canizales",
        "",
        "",
        "Splash by Michel Baradari",
        "https://opengameart.org/content/water-splashes",
        "",
        "Menu Selection Click by NenadSimic",
        "https://opengameart.org/content/menu-selection-click",
        "",
        "Kindlich Text by Daniel Eden",
        "unton.es",
        "",
        "Additional sounds by Zapsplat",
        "https://www.zapsplat.com"
    ];

    var graphics = this.make.graphics();

    // graphics.fillRect(topleftx,toplefty,width,height)
    graphics.fillRect(300, 100, 200, 200);

    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    var text = this.add.text(330, 110, content, { fontFamily: 'Candal', color: '#000000', wordWrap: { width: 2000 } }).setOrigin(0);

    text.setMask(mask);

    var tween = this.tweens.add({
    targets: text,
    y:-1500,
    //ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    delay:2000,
    duration: 50000,
    ease: 'Linear'
    });

    //Display text
    var text1 = 'You escaped the kitchen!'
    //var text3 = "Press Space to Skip"
    this.spellOutText(275, 50, 300, text1, 30, 50, '#000000', 'Neucha');
    //this.spellOutText(10,550, 300, text3,20,500,'#ffffff','Neucha');

  }

  //Gradually spells text out
  spellOutText(x, y, width, text, fontSize, speed, fill, font)
  {
    var sentence = this.add.text
    (x, y, "",
      {
        fontSize: fontSize,
        fill: fill,
        fontFamily: font
      }
    );
    var currentLine = this.add.text
    (10, 10, "",
      {
        fontSize:fontSize,
        fontFamily: font
      }
    );
    currentLine.alpha = 0;
    var index = 0;
    var timer;

    //Start the text loop
    startLoop(this);

    function startLoop(that)
    {
      timer = that.time.addEvent
      ({
        delay: speed,
        callback: addChar,
        callbackScope: this,
        loop: true
      });

      function addChar()
      {
        sentence.text += text[index];
        currentLine.text += text[index];

        if (currentLine.width > width && text[index] === " ")
        {
          sentence.text +=  "\n";
          currentLine.text = "";
        }

        if (index >= text.length - 1)
        {
          timer.remove();
          console.log("stop");
        }
        index++;
      }
    }
  }
}

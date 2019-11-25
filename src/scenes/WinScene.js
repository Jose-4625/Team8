/*global Phaser*/
import * as ChangeScene from './WinChangeScene.js';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('victory','./assets/sounds/Victory.wav')
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
    this.music=this.sound.add('victory')
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
    this.add.sprite(400, 280, 'winScreen').setScale(0.3);
    //Add text
    var content = [
        "Fried or Flight",
        "",
        "An Appeeling Tots Production",
        "",
        "Producer",
        " Dr. Paul Toprac",
        "Associate Producer",
        " Jason Harron",
        "",
        "Lead Designer",
        "Jose Torres",
        "",
        "Designers",
        "Angelia Wu",
        "Carlos Canizales",
        "",
        "Level Designer",
        "Jose Torres",
        "",
        "Programming",
        "",
        "Lead Programmer",
        "Jose Torres",
        "",
        "Graphics Programming",
        "Angelia Wu",
        "",
        "Music/Sound Programming",
        "Carlos Canizales",
        "",
        "Graphics",
        "",
        "Art Director",
        "Angelia Wu",
        "",
        "Lead Artist",
        "Angelia Wu",
        "",
        "Graphics/Artwork",
        "Angelia Wu",
        "",
        "Additional Graphics/Artwork",
        "Jose Torres",
        "",
        "Animation",
        "Angelia Wu",
        "Jose Torres",
        "",
        "Music and Sound",
        "Composer",
        "Carlos Canizales",
        "",
        "Sound effects",
        "",
        ""
    ];

    var graphics = this.make.graphics();

    // graphics.fillRect(topleftx,toplefty,width,height)
    graphics.fillRect(300, 100, 200, 200);

    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    var text = this.add.text(300, 100, content, { fontFamily: 'Candal', color: '#000000', wordWrap: { width: 200 } }).setOrigin(0);

    text.setMask(mask);

    var tween = this.tweens.add({
    targets: text,
    y:-900,
    //ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    delay:2000,
    duration: 60000,
    ease: 'Linear'
    });

    //  The rectangle they can 'drag' within
    /* var zone = this.add.zone(300, 100, 300, 300).setOrigin(0).setInteractive();

    zone.on('pointermove', function (pointer) {

        if (pointer.isDown)
        {
            text.y += (pointer.velocity.y / 10);

            text.y = Phaser.Math.Clamp(text.y, -400, 300);
        }

    });
    */

  }
}

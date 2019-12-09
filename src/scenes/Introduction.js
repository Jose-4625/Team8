import * as ChangeScene from './WinChangeScene.js';
export default class BootScene extends Phaser.Scene
{
  constructor()
  {
    super("Introduction");
  }

  preload()
  {
    //Load the trailer
    this.load.video("Video", './assets/Intro Scene.mp4');

    //Load web fonts
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');

    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this,'Introduction')
  }

  create()
  {
    //Display video
    this.video = this.add.video(400, 301, "Video").setScale(0.43);
    this.video.play();

    //Load the font
    WebFont.load
    ({
      google:
      {
        families: ['Permanent Marker', 'Modak', 'Solway', 'Neucha']
      }
    });

    //Display text
    var text = 'Press Space Bar to Skip';
    this.text = this.add.text(250, 550, text, { fontSize: '24px' });
  }
}

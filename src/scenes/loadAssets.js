export default loadAssets

function loadAssets(mapkey, mapPath, that){
  that.load.image("tiles", "./assets/tilemaps/newTileset.png");
  that.load.tilemapTiledJSON(mapkey, mapPath);
  that.load.image("crate", "./assets/resized/crate.png");
  that.load.image("Lcrate", "./assets/resized/Lcrate.png");
  //different song for tutorial
  that.load.audio("tutorial","./assets/sounds/Tutorial.wav");
  that.load.audio("InGame","./assets/sounds/InGame2.wav");
  that.load.audio("pausefx","./assets/sounds/Kindlich Text.mp3");
  that.load.audio("splash","./assets/sounds/splash.wav");
  that.load.audio("doorfx","./assets/sounds/Door.wav");
  that.load.audio("chefsfx","./assets/sounds/chefsfx.mp3");
  //Loads potato player sprite
  //that.load.image("potato", "./assets/potato.png");
  that.load.spritesheet('Potato', "./assets/resized/pot32.png",{
    frameHeight: 32,
    frameWidth: 22
  });
  that.load.json('Shape', "./assets/resized/shape.json")

  that.load.spritesheet('cookIdle', "./assets/resized/CookIdle.png",{
    frameHeight: 60,
    frameWidth: 63
  });
  that.load.spritesheet('Angry', "./assets/resized/AngeryGrid.png",{
    frameHeight: 63,
    frameWidth: 60
  })
  that.load.spritesheet('Cookwalk', "./assets/resized/Cookwalk.png",{
    frameHeight: 63,
    frameWidth: 60
  });
  that.load.spritesheet('CookAway', "./assets/resized/CookAwayAnimation.png",{
    frameHeight: 63,
    frameWidth: 60
  });
  that.load.spritesheet('onion', "./assets/resized/Onion_animation2331.png",{
    frameHeight: 31,
    frameWidth: 23
  });
  that.load.spritesheet('tomato', "./assets/resized/Tomato_animation3245.png",{
    frameHeight: 45,
    frameWidth: 32
  });
  that.load.spritesheet('door', "./assets/resized/Door_bak.png",{
    frameHeight: 32,
    frameWidth: 32
  });

  //Load cook sprite
  that.load.image("cook", "./assets/resized/cook64.png");

  //Load spill sprite
  that.load.image("spill","./assets/resized/spill32.png");

  //Load crack sprites
  that.load.image("crack", "./assets/resized/crack.png");

  //Load exit box
  that.load.image("exit", "./assets/resized/Exit Sign_bak.png");
  that.load.image("water","./assets/resized/waterParticle.png");
  that.load.image("void", "./assets/resized/voidParticle.png")

}

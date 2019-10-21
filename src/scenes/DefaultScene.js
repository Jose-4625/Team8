/*global Phaser*/
import * as ChangeScene from './InGameChangeScene.js'

export default class DefaultScene extends Phaser.Scene {
  constructor () {
    super(Phaser.Scene);
  }

  init (data) {
    // Initialization code goes here
    this.level = data.level;
    console.log(this.level);
  }


  preload (mapkey, mapPath) {
    // Preload assets
    //console.log("Level1")
    this.load.image("tiles", "./assets/tilemaps/newTileset.png");
    this.load.tilemapTiledJSON(mapkey, mapPath);
    this.load.image("crate", "./assets/resized/crate.png");
    this.load.image("Lcrate", "./assets/resized/Lcrate.png");
    this.load.audio("theme","./assets/sounds/InGame.wav");
    this.load.audio("splash","./assets/sounds/splash.wav");
    this.load.audio("doorfx","./assets/sounds/Door.wav");
    //Loads potato player sprite
    //this.load.image("potato", "./assets/potato.png");
    this.load.spritesheet('Potato', "./assets/resized/pot32.png",{
      frameHeight: 32,
      frameWidth: 22
    });

    this.load.spritesheet('Cook', "./assets/resized/CookAnimation.png",{
      frameHeight: 60,
      frameWidth: 60
    });
    this.load.spritesheet('CookAway', "./assets/resized/CookAwayAnimation.png",{
      frameHeight: 64,
      frameWidth: 53
    });
    this.load.spritesheet('onion', "./assets/resized/Onion_animation2331.png",{
      frameHeight: 31,
      frameWidth: 23
    });
    this.load.spritesheet('tomato', "./assets/resized/Tomato_animation3245.png",{
      frameHeight: 45,
      frameWidth: 32
    });
    this.load.spritesheet('door', "./assets/resized/Door_bak.png",{
      frameHeight: 32,
      frameWidth: 32
    });

    //Load cook sprite
    this.load.image("cook", "./assets/resized/cook64.png");

    //Load spill sprite
    this.load.image("spill","./assets/resized/spill32.png");

    //Load crack sprites
    this.load.image("crack", "./assets/resized/crack_3832.png");

    //Load exit box
    this.load.image("exit", "./assets/resized/exit.png");

    //Load NPC
    //this.load.image("onion", "./assets/resized/onion32.png")
    //this.load.image("tomato", "./assets/resized/tomato32.png")
  }


  create(mapKey,danger) {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.level);
    //add music
    this.music= this.sound.add('theme');
    this.music.play({
      volume:.3,
      loop:true
    });

    //preset sound effects
    this.splashfx=this.sound.add('splash');
    this.doorfx=this.sound.add('doorfx');
    //load map
    this.gameWin = false;
    this.gameLose = false;
    this.door = false;
    const map = this.make.tilemap({ key: mapKey});
    const tileset = map.addTilesetImage("newTileset", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    //create game timer
    if (danger){
      this.initialTime = 30
      var text = this.add.text(16, 16, 'Countdown: ' + formatTime(this.initialTime),{
        font: "24px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0)
      this.timedEvent = this.time.addEvent({ delay: 1000, callback: countDown, callbackScope: this, loop: true });
      function formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
      }
      function countDown ()
      {
        this.initialTime -= 1; // One second
        text.setText('Countdown: ' + formatTime(this.initialTime));
        if (this.initialTime == 0){
          this.gameLose = true;
        }
      }
    }
    worldLayer.setCollisionByProperty({ collides: true});
    aboveLayer.setDepth(10);
    //aboveLayer.setDepth(10);
    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    //player attributes
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "Potato");

    this.physics.add.collider(this.player, worldLayer);
    console.log(this.player.x, this.player.y)
    this.cursors = this.input.keyboard.createCursorKeys();
    const camera = this.cameras.main;
    camera.startFollow(this.player);

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //create all animations
    this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers('Potato', { start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
      });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('Potato', { start: 0, end: 0}),
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: 'cook_idle',
        frames: this.anims.generateFrameNumbers('Cook', { frames:[0,1,6,7]}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: "cook_walk_right",
        frames: this.anims.generateFrameNumbers('Cook', { start: 0, end: 2}),
        frameRate: 5,
        repeat: 1
      });
      this.anims.create({
          key: "cook_Cont_right",
          frames: this.anims.generateFrameNumbers('Cook', { start: 2, end: 3}),
          frameRate: 10,
          repeat: -1
        });
      this.anims.create({
          key: "cook_walk_up",
          frames: this.anims.generateFrameNumbers('CookAway', { start: 0, end: 1}),
          frameRate: 10,
          repeat: -1
        });
      this.anims.create({
          key: "cook_face_right",
          frames: this.anims.generateFrameNumbers('Cook', { start: 2, end: 3}),
          frameRate: 3,
          repeat: 1
        });
    this.anims.create({
        key: 'onion_pushed',
        frames: this.anims.generateFrameNumbers('onion', { start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'onion_idle',
        frames: this.anims.generateFrameNumbers('onion', { start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'tomato_pushed',
        frames: this.anims.generateFrameNumbers('tomato', { start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'tomato_idle',
        frames: this.anims.generateFrameNumbers('tomato', { start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'door_open',
        frames: this.anims.generateFrameNumbers('door', { start: 0, end: 3}),
        frameRate: 10,
        repeat: 0
    });


    //win condition
    var win = map.createFromObjects('Objects','winPoint', {key: 'door'});
    this.winGroup = this.physics.add.group();
    this.winGroup.children.iterate(function(child) {
      child.setImmoveable(true);
      child.refreshBody();
    });
    this.physics.add.collider(this.winGroup, worldLayer, function(s1){
      var b1 = s1.body;
      b1.stop();
    });
    this.physics.add.overlap(this.player, this.winGroup, this.endScene, null, this);
    for(var i = 0; i < win.length; i++){
      this.winGroup.add(win[i]);
    }

    //enemy attributes
    var enemy = map.createFromObjects('Objects','enemyPoint', {key: 'Cook'});
    this.enemyGroup = this.physics.add.group();
    this.enemyGroup.children.iterate(function(child) {
      child.setImmoveable(false);
      child.refreshBody();
      child.bringToTop(child)
    });
    this.physics.add.collider(this.enemyGroup, worldLayer, function(s1){
      var b1 = s1.body;
      b1.stop();
    });
    if (danger){
      this.physics.add.collider(this.player, this.enemyGroup, this.gameOver,null, this);
      //this.physics.add.collider(this.enemyGroup,this.crateGroup);
      this.physics.add.overlap(this.player, this.enemyGroup, this.gameOver, null, this);

    }else{
      this.physics.add.collider(this.player, this.enemyGroup);
      //this.physics.add.collider(this.enemyGroup,this.crateGroup);
      this.physics.add.overlap(this.player, this.enemyGroup);

    }

    this.physics.add.collider(this.enemyGroup);

    for(var i = 0; i < enemy.length; i++){
      this.enemyGroup.add(enemy[i]);
      enemy[i]
      .body
      .CollideWorldBounds = true;
      enemy[i]
      .body.bounce.set(0.1);
      enemy[i]
      .body.setDrag(100);
      enemy[i]
      .body.setSize(32,64,32,32);
      enemy[i]
      .body.width = 32;

      //Initialize with starting velocity
      enemy[i]
      .body.setVelocityX(Phaser.Math.Between(-100, 100));
      enemy[i]
      .body.setVelocityY(Phaser.Math.Between(-100, 100));

    }
    //waterspill attributes
    var spill = map.createFromObjects('Objects','spillPoint', {key: 'spill'});
    this.spillGroup = this.physics.add.group();
    this.spillGroup.children.iterate(function(child) {
      child.setImmoveable(true);
      child.refreshBody();
    });
    this.physics.add.overlap(this.player, this.spillGroup, this.slip, null, this);

    this.physics.add.collider(this.spillGroup, worldLayer);
    this.physics.add.overlap(this.enemyGroup, this.spillGroup, this.slip, null, this);


    for (var i = 0; i < spill.length; i++){
      this.spillGroup.add(spill[i]);
      spill[i]
      .body
      .CollideWorldBounds = true;
      spill[i]
      .body
      .setMaxVelocity(0);
      spill[i]
      .body.setSize(16,16,32,32);
      spill[i]
      .body.width = 32;
    }
    //Large Crate attributes
    var Lcrate = map.createFromObjects('Objects','LCratePoint', {key: 'Lcrate'});
    this.LcrateGroup = this.physics.add.group();
    this.LcrateGroup.children.iterate(function(child) {
      child.setImmoveable(false);
      child.refreshBody();
    });
    this.physics.add.collider(this.LcrateGroup, worldLayer, function(s1){
      var b1 = s1.body;
      b1.stop();
    });
    this.physics.add.collider(this.player, this.LcrateGroup);
    this.physics.add.overlap(this.player, this.LcrateGroup, function(s1,s2){
      s1.body.velocity.x = -1 * s1.body.velocity.x
      s1.body.velocity.y = -1 * s1.body.velocity.y
    })
    this.physics.add.collider(this.enemyGroup,this.LcrateGroup);
    this.physics.add.collider(this.LcrateGroup);

    for(var i = 0; i < Lcrate.length; i++){
      this.LcrateGroup.add(Lcrate[i]);
      Lcrate[i]
      .body.bounce.set(0.1);
      Lcrate[i]
      .body.setDrag(100);
      if (Lcrate[i].angle == 90 || Lcrate[i].angle == -90){
        Lcrate[i].body.setSize(32,64);
      }
    }
    //small Crate attributes
    var crate = map.createFromObjects('Objects','cratePoint', {key: 'crate'});
    this.crateGroup = this.physics.add.group();
    this.crateGroup.children.iterate(function(child) {
      child.setImmoveable(false);
      child.refreshBody();
    });
    this.physics.add.collider(this.crateGroup, worldLayer, function(s1){
      var b1 = s1.body;
      b1.stop();
    });
    this.physics.add.collider(this.player, this.crateGroup);
    this.physics.add.collider(this.enemyGroup,this.crateGroup);
    this.physics.add.collider(this.crateGroup);
    this.physics.add.collider(this.crateGroup, this.LcrateGroup)

    for(var i = 0; i < crate.length; i++){
      this.crateGroup.add(crate[i]);
      crate[i]
      .body.bounce.set(0.1);
      crate[i]
      .body.setDrag(100);
    }
    //Crack attributes
    var crack = map.createFromObjects('Objects','crackPoint', {key: 'crack'});
    this.crackGroup = this.physics.add.group();
    this.crackGroup.children.iterate(function(child) {
      child.setImmoveable(true);
      child.refreshBody();
    });
    if (danger){
      this.physics.add.overlap(this.player, this.crackGroup, this.gameOver, null, this);
    }else{
      this.physics.add.overlap(this.player, this.crackGroup);
    }
    //this.physics.add.collider(this.enemyGroup, this.crackGroup);
    this.physics.add.collider(this.crackGroup, worldLayer);
    for (var i = 0; i < crack.length; i++){
      this.crackGroup.add(crack[i]);
      crack[i]
      .body
      .CollideWorldBounds = true;
      crack[i]
      .body
      .setMaxVelocity(0);
      crack[i]
      .body.setSize(16,16,16,16);
      crack[i]
      .body.setDepth = -10;
    }
    //NPC attributes
    var NPC = map.createFromObjects('Objects','NPCPoint', {key: "onion"});
    this.NPCGroup = this.physics.add.group();
    this.physics.add.collider(this.NPCGroup, worldLayer);
    this.physics.add.collider(this.player, this.NPCGroup);
    this.physics.add.collider(this.NPCGroup,this.crateGroup);
    this.physics.add.collider(this.NPCGroup,this.LcrateGroup);
    this.physics.add.collider(this.NPCGroup);
    this.physics.add.collider(this.NPCGroup, this.crackGroup, this.gameOver, null, this);

    for(var i = 0; i < NPC.length; i++){
      this.NPCGroup.add(NPC[i]);
      NPC[i]
      .body
      .CollideWorldBounds = true;
      NPC[i]
      .body.bounce.set(0.1);
      NPC[i]
      .body.setDrag(100);
      var ran = Math.random() < 0.6 ? "onion" : "tomato";
      NPC[i].setTexture(ran);
      ////console.log(NPC[i].texture.key)
      if(String(NPC[i].texture.key) == 'tomato'){
        NPC[i]
        .body.setSize(32,32,32,32);
      }

    }


  }

  update (next) {

    // Update the scene

    this.NPCCheckSpeed();
    this.enemyCheckSpeed(); //keeps the enemies moving
    this.doorCheck(128);

    if (Math.sin(this.time.now) > 0.5){
      this.enemyView(200);
    }

    if(this.gameWin){
      this.music.stop();
      this.scene.start(next);


    }else if (this.gameLose) {
      this.music.stop();
      this.scene.start('GameOverScene',{scene: this.level});
    }
    const speed = 80;
    //const prevVelocity = this.player.body.velocity.clone();
    // Stop any previous movement from the last frame
    if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp){
        this.player.body.setVelocity(0);
          this.player.anims.play('idle', true);
          this.player.angle = 0
    }

    // Horizontal move4ent
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play('walk', true);
      this.player.flipX = true;
      this.player.angle = 0;
      this.player.body.setSize(22,32,32,32);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play('walk', true);
      this.player.flipX = false;
      this.player.angle = 0;
      this.player.body.setSize(22,32,32,32);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play('walk', true);
      this.player.angle = 90;
      this.player.body.setSize(32,22,32,32);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play('walk', true);
      this.player.angle = 270;
      this.player.body.setSize(32,22,32,32);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);
  }
  import_test(){
    console.log("import successful")
  }
  enemyView(distance){
    var enemies = this.enemyGroup.getChildren();
    for ( var i = 0; i < enemies.length; i++){
      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, enemies[i].x, enemies[i].y ) <= distance){
        this.enemyChase(enemies[i]);


      }/*else {
        this.enemyWander(enemies[i]);
      }*/
    }
  }

  doorCheck(distance){
    var win = this.winGroup.getChildren();
    if (this.door == false){
      for ( var i = 0; i < win.length; i++){
        let dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, win[i].x, win[i].y )
        if (dist <= distance){
          console.log('detected')
          win[i].anims.play('door_open')
          //doorfx
          this.doorfx.play({
            volume:.7,
            loop:false
          });
          this.door = true;
        }
      }
    }

}

 setEnemyFrame(enemy){

    if (enemy.body.velocity.x < 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
      //enemy.anims.play('cook_walk_right')
      enemy.anims.play('cook_Cont_right')
      enemy.flipX = true;
    } else if(enemy.body.velocity.x > 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
      //enemy.anims.play('cook_walk_right')
      enemy.anims.play('cook_Cont_right')
      enemy.flipX = false;
    }
    if (enemy.body.velocity.y < 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
      enemy.anims.play('cook_walk_up')
    } else if(enemy.body.velocity.y > 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
      enemy.anims.play('cook_idle')
    }

}
enemyChase(enemy){
  var  i = enemy
  function degrees(radians) {
    return radians * 180 / Math.PI;
  };
  var angleBetween = Phaser.Math.Angle.Between(i.x, i.y, this.player.x, this.player.y);
  //console.log(degrees(angleBetween))
  i.body.velocity.x = Math.cos(angleBetween) * 60;
  i.body.velocity.y = Math.sin(angleBetween) * 60;
  this.setEnemyFrame(i)

}

  enemyCheckSpeed(){
    var enemies = this.enemyGroup.getChildren();
    for ( var i = 0; i < enemies.length; i++){
      if (enemies[i].body.velocity.x == 0 && enemies[i].body.velocity.y == 0){
        enemies[i].body.setVelocityX(Phaser.Math.Between(-150, 150));
        enemies[i].body.setVelocityY(Phaser.Math.Between(-100, 100));
        this.setEnemyFrame(enemies[i])
      }else{
        enemies[i].body.setVelocityX(enemies[i].body.velocity.x * 1.01);
        enemies[i].body.setVelocityY(enemies[i].body.velocity.y * 1.01);

      }
    }
  }
  NPCCheckSpeed(){
    var NPCs = this.NPCGroup.getChildren();
    for ( var i = 0; i < NPCs.length; i++){
      if (NPCs[i].body.velocity.x == 0 && NPCs[i].body.velocity.y == 0){
        NPCs[i].angle = 0;
        if (String(NPCs[i].texture.key) === "onion"){
          NPCs[i].anims.play('onion_idle', true);
          NPCs[i].flipX = false;
        }else {
          NPCs[i].anims.play('tomato_idle', true);
          NPCs[i].flipX = false;
        }

      }
      else if (NPCs[i].body.velocity.x > 0) {
        if (String(NPCs[i].texture.key) === "onion"){
          NPCs[i].anims.play('onion_pushed', true);
        }else {
          NPCs[i].anims.play('tomato_pushed', true);
        }
      }
      else if (NPCs[i].body.velocity.x < 0) {
        if (String(NPCs[i].texture.key) === "onion"){
          NPCs[i].anims.play('onion_pushed', true);
          NPCs[i].flipX = true;
        }else {
          NPCs[i].anims.play('tomato_pushed', true);
          NPCs[i].flipX = true;
        }
      }
      else if (NPCs[i].body.velocity.y < 0) {
        if (String(NPCs[i].texture.key) === "onion"){
          NPCs[i].anims.play('onion_pushed', true);
          NPCs[i].angle = 90;
        }else {
          NPCs[i].anims.play('tomato_pushed', true);
          NPCs[i].angle = 90;
        }
      }
      else if (NPCs[i].body.velocity.y > 0) {
        if (String(NPCs[i].texture.key) === "onion"){
          NPCs[i].anims.play('onion_pushed', true);
          NPCs[i].angle = 270;
        }else {
          NPCs[i].anims.play('tomato_pushed', true);
          NPCs[i].angle = 270;
        }
      }

    }
  }

  endScene(player, winPoint){
    this.gameWin = true;
  }
  gameOver(player, winPoint){
    this.gameLose = true;
  }

  displace(){
    var int = Math.random() < 0.6 ? 40 : 30;
    var plusOrMinus = Math.random() < 0.6 ? -1 : 1;
    //console.log(int)
    return (int * plusOrMinus);
  }
  slip(s1,s2){
    s2.body.enable = false;
    var initialTime = 1
    var timedEvent = this.time.addEvent({ delay: 1000, callback: spillcountDown});
    this.splashfx.play({
      volume:.3,
      loop:false
    });
    function spillcountDown ()
    {
      initialTime -= 1; // One second
      //console.log(initialTime)
      if (initialTime == 0){
        s2.body.enable = true;

      }
    }
    var x = this.displace()
    var y = this.displace()
    this.tweens.add({
    targets: s1,
    x: s2.x + x,
    y: s2.y + y,
    ease: "Elastic",
    duration: 1000
  });
  }

  }
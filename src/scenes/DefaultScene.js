/*global Phaser*/
import * as ChangeScene from './InGameChangeScene.js'
import AllCollision from './collisions.js'
import {enemyMasterCheck, playerMasterCheck, worldMasterCheck} from './masterCheck.js'
import loadAssets from './loadAssets.js'
import loadAnims from './loadAnims.js'
import loadObjects from './loadObjects.js'
export default class DefaultScene extends Phaser.Scene {
  constructor () {
    super(Phaser.Scene);
  }

  init (data) {
    // Initialization code goes here
    this.level = data.level
    this.registry.set({"dog":"woof"})


  }


  preload (mapkey, mapPath) {
    // load assets
    loadAssets(mapkey,mapPath,this);
  }


  create(mapKey,danger) {
    this.danger = danger;
    this.chase = true;
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.level);
    //add music
    var level=this.level
    if (level=='tutorial'){
      this.music=this.sound.add('tutorial')
      this.music.play({
        volume:.3,
        loop: true
      });
    } else{
    this.music= this.sound.add('InGame');
    this.music.play({
      volume:.3,
      loop:true
    });}
    //different song for tutorial

    //preset sound effects
    this.splashfx=this.sound.add('splash');
    this.doorfx=this.sound.add('doorfx');
    this.pausefx=this.sound.add('pausefx');
    this.chefsfx=this.sound.add('chefsfx');
    //load map
    this.gameWin = false;
    this.gameLose = false;
    this.door = false;
    this.checkVel = true;
    const map = this.make.tilemap({ key: mapKey});
    const tileset = map.addTilesetImage("newTileset", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    this.worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    //create game timer
    if (danger){
      this.initialTime = 30
      this.text = this.add.text(16, 16, 'Countdown: ' + formatTime(this.initialTime),{
        font: "24px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      }).setDepth(10)
      .setScrollFactor(0);
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
        this.text.setText('Countdown: ' + formatTime(this.initialTime));
        if (this.initialTime == 0){
          this.gameLose = true;
        } else if (this.initialTime == 15){
          this.text.setBackgroundColor('#ff6666')
        } else if (this.initialTime == 10){
          this.text.setBackgroundColor('#ff0000')
        }
      }
    }
    this.worldLayer.setCollisionByProperty({ collides: true});
    aboveLayer.setDepth(20);

    this.matter.world.convertTilemapLayer(this.worldLayer);
    this.matter.world.convertTilemapLayer(aboveLayer);
    //this.matter.world.createDebugGraphic();

    //aboveLayer.setDepth(10);
    this.spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    //Load in animations
    loadAnims(this);
    //load all gameObjects and Player object
    loadObjects(level,map,this);


    this.cursors = this.input.keyboard.createCursorKeys();
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
<<<<<<< HEAD
=======
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
        frames: this.anims.generateFrameNumbers('cookIdle', {start:0, end:9}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'red_cook_idle',
        frames: this.anims.generateFrameNumbers('RedCookIdle', {start:0, end:9}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: "cook_walk_right",
        frames: this.anims.generateFrameNumbers('cookIdle', { start: 0, end: 2}),
        frameRate: 5,
        repeat: 1
      });
      this.anims.create({
          key: "cook_Cont_right",
          frames: this.anims.generateFrameNumbers('Cookwalk', { start: 0, end: 6}),
          frameRate: 10,
          repeat: -1
        });
      this.anims.create({
          key: "cook_walk_up",
          frames: this.anims.generateFrameNumbers('CookAway', { start: 0, end: 5}),
          frameRate: 5,
          repeat: -1
        });
      this.anims.create({
          key: "cook_face_right",
          frames: this.anims.generateFrameNumbers('Cookwalk', { start: 7, end: 13}),
          frameRate: 10,
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

    console.log(hitbox)
    //win condition
    this.winGroup = ObjectGenerator(map,'winPoint','door',1, this);
    this.winGroup.forEach(function(element){
      element.setStatic(element, true);
    })
    //enemy attributes
    this.enemyGroup = ObjectGenerator(map, 'enemyPoint', 'Cook', 2, this, );
    //(this.enemyGroup);
    this.enemyGroup.forEach(function(element){
      element.setBounce(0);
      element.setFriction(10);
      element.setSize(32,64,32,32);
      element.width = 32;
      element.setDepth(1);
      element.setDensity(100);
      element.setFixedRotation();
      //Initialize with starting velocity
      element.setVelocityX(Phaser.Math.Between(-1, 1));
      element.setVelocityY(Phaser.Math.Between(-1, 1));
    });

    this.crateGroup = ObjectGenerator(map, 'cratePoint','crate',3,this);
    this.crateGroup.forEach(function(element){
      element.setBounce(0);
      element.setFriction(1000);
      element.setDepth(1);
      element.setDensity(100);
      //element.setFixedRotation();

    });
    this.LcrateGroup = ObjectGenerator(map, 'LCratePoint','Lcrate',4,this);
    this.LcrateGroup.forEach(function(element){
      element.setBounce(0);
      element.setFriction(1000);
      element.setDepth(1);
      element.setDensity(100);
      var ran = Math.random() < 0.6 ? 0 : 90;
      element.setAngle(ran);
      //element.setFixedRotation();

    });
    this.spillGroup = ObjectGenerator(map,'spillPoint','spill',5,this,[hitbox.spill32,null]);
    this.spillGroup.forEach(function(element){
      console.log(element)
      element.setStatic(element, true);
      element.setScale(0.5);
      element.setSensor(true);
      var ran = Math.random() < 0.7 ? false : true;
      if (ran && level != "tutorial") {
        element.destroy();
      }
    });
    //this.physics.add.collider(this.enemyGroup);
    this.crackGroup = ObjectGenerator(map,'crackPoint','crack',6, this,[hitbox.crack, null]);
    this.crackGroup.forEach(function(element){
      element.setStatic(element, true);
      element.setScale(0.7);
      element.setSensor(true);
      var ran = Math.random() < 0.7 ? false : true;
      if (ran && level != "tutorial") {
        element.destroy();
      }
    });
    this.NPCGroup = ObjectGenerator(map, 'NPCPoint', 'onion', 7, this,[hitbox.Onion_Animation, null]);
    this.NPCGroup.forEach(function(element){
      var ran = Math.random() < 0.6 ? "onion" : "tomato";
      element.setTexture(ran);
      element.setScale(0.7);
      element.setDensity(100);
      element.setFriction(100);
      element.setDepth(1);
      element.setFixedRotation();

    });
    this.exit = ObjectGenerator(map, 'exitPoint','exit', 8, this);
    this.exit.forEach(function(element){
      element.setSensor(true);
    });
>>>>>>> 5591d3c93fecb2d7caa9866f6034ec9e65e30445
    AllCollision(this.danger,this);


  }

  update (next) {
    // Update the scene
    var musicmuted=this.music.mute; //For muting
    enemyMasterCheck(this);
    playerMasterCheck(this);
    worldMasterCheck(this);

    if(this.gameWin){
      this.music.stop();
      this.scene.start(next);


    }else if (this.gameLose) {
      this.music.stop();
      this.scene.start('GameOverScene',{scene: this.level});
    }
<<<<<<< HEAD
=======
    this.NPCCheckSpeed();
    this.enemyCheckSpeed(); //keeps the enemies moving
    this.doorCheck(128);
    //(this.player.body.velocity.x, this.player.body.velocity.y)
    if (Math.sin(this.time.now) > 0.3){
      this.enemyView(200);
    }
    this.playerSpeedCheck(this.checkVel);
    this.enemyMaxSpeedCheck();
    const speed = 1.5;
    //const prevVelocity = this.player.body.velocity.clone();
    // Stop any previous movement from the last frame
    if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp){
        this.player.setVelocity(0);
          this.player.anims.play('idle', true);
          this.player.angle = 0;
    }
>>>>>>> 5591d3c93fecb2d7caa9866f6034ec9e65e30445




    // Normalize and scale the velocity so that player can't move faster along a diagonal
    //this.player.normalize().scale(speed);
    }
<<<<<<< HEAD
=======

    doorCheck(distance){
      var win = this.winGroup;
      if (this.door == false){
        for ( var i = 0; i < win.length; i++){
          let dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, win[i].x, win[i].y )
          if (dist <= distance){
            ////('detected')
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
     //console.log("cook",enemy.body.velocity.x,enemy.body.velocity.y)
      if (enemy.body.velocity.x < 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
        //enemy.anims.play('cook_walk_right')
        enemy.anims.play('cook_Cont_right')
        enemy.flipX = false;
      } else if(enemy.body.velocity.x > 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
        //enemy.anims.play('cook_walk_right')
        enemy.anims.play('cook_Cont_right')
        enemy.flipX = true;
      }
      else if (enemy.body.velocity.y < 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
        enemy.anims.play('cook_walk_up')
      } else if(this.chase && enemy.body.velocity.y > 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
        enemy.anims.play('red_cook_idle')
      }
      //console.log(enemy.anims)

  }
  enemyChase(enemy){
    var  i = enemy
    function degrees(radians) {
      return radians * 180 / Math.PI;
    }
    var angleBetween = Phaser.Math.Angle.Between(i.x, i.y, this.player.x, this.player.y);
    ////(degrees(angleBetween))
    i.setVelocityX(Math.cos(angleBetween) * 1.5);
    i.setVelocityY(Math.sin(angleBetween) * 1.5);
    this.setEnemyFrame(i);
  }

    enemyCheckSpeed(){
      var enemies = this.enemyGroup;
      ////(enemies[0].body.velocity);
      if (!this.chase){
        for ( var i = 0; i < enemies.length; i++){
          if (Math.abs(enemies[i].body.velocity.y) < 0.05){
            enemies[i].setVelocityY(0);
          }
          if (Math.abs(enemies[i].body.velocity.x) < 0.003){
            enemies[i].setVelocityX(0);
          }
          if (enemies[i].body.velocity.x == 0 || enemies[i].body.velocity.y == 0){
            enemies[i].setVelocityX(Phaser.Math.Between(-1.5, 1.5));
            enemies[i].setVelocityY(Phaser.Math.Between(-1.5, 1.5));

          }else{
            enemies[i].setVelocityX(enemies[i].body.velocity.x);
            enemies[i].setVelocityY(enemies[i].body.velocity.y);

          }
          this.setEnemyFrame(enemies[i]);
        }
      }

    }
    NPCCheckSpeed(){
      var NPCs = this.NPCGroup;
      for ( var i = 0; i < NPCs.length; i++){
        var velXFLT = NPCs[i].body.velocity.x
        var velX = velXFLT.toPrecision(2)
        var velYFLT = NPCs[i].body.velocity.y
        var velY = velYFLT.toPrecision(2)

        if (Math.abs(velX) < 0.001){
          velX = 0;
        }
        if (Math.abs(velY) < 0.00045){
          velY = 0;
        }
        if (velX == 0 && velY == 0){
          NPCs[i].angle = 0;
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_idle', true);
            NPCs[i].flipX = false;
          }else {
            NPCs[i].anims.play('tomato_idle', true);
            NPCs[i].flipX = false;
          }

        }
        else if (velX > 0) {
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_pushed', true);
          }else {
            NPCs[i].anims.play('tomato_pushed', true);
          }
        }
        else if (velX < 0) {
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_pushed', true);
            NPCs[i].flipX = true;
          }else {
            NPCs[i].anims.play('tomato_pushed', true);
            NPCs[i].flipX = true;
          }
        }
        else if (velY < 0) {
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_pushed', true);
            NPCs[i].angle = 90;
          }else {
            NPCs[i].anims.play('tomato_pushed', true);
            NPCs[i].angle = 90;
          }
        }
        else if (velY > 0) {
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

>>>>>>> 5591d3c93fecb2d7caa9866f6034ec9e65e30445
    endScene(player, winPoint){
      //
      if (player.label == "Potato"){
        this.gameWin = true
      }

    }
    gameOver(player, winPoint){
      this.gameLose = true;
    }


    slip(s1,s2){

      //("slip")
      ////(s2.position.x,s2.position.y)
      var initialTime = 0.5
      var timedEvent = this.time.addEvent({ delay: 1000, callback: spillcountDown});
      //this.checkVel = false;

      function spillcountDown ()
      {
        initialTime -= 1; // One second
        ////(initialTime)
        if (initialTime <= 0){

          s1.gameObject.setStatic(false);
          timedEvent.remove();
        }
      }

      var x = s1.position.x + s1.velocity.x * 3;
      var y = s1.position.y + s1.velocity.y * 3
      s1.gameObject.setPosition(x,y)

      if (s1.label == "Lcrate"){
        s1.gameObject.setPosition(x,y)
        return
      }else if (s1.label == "crate"){
        s1.gameObject.setPosition(x,y)
        return
      }else{
        this.splashfx.play({
          volume:.3,
          loop:false
        });
        s1.gameObject.setPosition(x,y)
        //

      }
    }
    import_test(){
      //for stability
    }
  }

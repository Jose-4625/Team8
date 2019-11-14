import ObjectGenerator from './ObjGen.js'
export default loadObjects

function loadObjects(level,map,that){
  that.hitbox = that.cache.json.get("Shape")

  //player attributes
  that.player = that.matter.add.sprite(that.spawnPoint.x, that.spawnPoint.y, "Potato", "Potato" ,{shape: that.hitbox.pot32});
  that.player.setFriction(100)
  that.player.body.label = "Potato";
  that.player.setDepth(10);
  that.player.setSize(20,20)

  //win condition
  that.winGroup = ObjectGenerator(map,'winPoint','door',1, that);
  that.winGroup.forEach(function(element){
    element.setStatic(element, true);
  })
  //enemy attributes
  that.enemyGroup = ObjectGenerator(map, 'enemyPoint', 'Cook', 2, that );
  //(that.enemyGroup);
  that.enemyGroup.forEach(function(element){
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

  that.crateGroup = ObjectGenerator(map, 'cratePoint','crate',3,that);
  that.crateGroup.forEach(function(element){
    element.setBounce(0);
    element.setFriction(1000);
    element.setDepth(1);
    element.setDensity(100);
    //element.setFixedRotation();

  });
  that.LcrateGroup = ObjectGenerator(map, 'LCratePoint','Lcrate',4,that);
  that.LcrateGroup.forEach(function(element){
    element.setBounce(0);
    element.setFriction(1000);
    element.setDepth(5);
    element.setDensity(100);
    var ran = Math.random() < 0.6 ? 0 : 90;
    element.setAngle(ran);
    //element.setFixedRotation();

  });
  that.spillGroup = ObjectGenerator(map,'spillPoint','spill',5,that);
  that.spillGroup.forEach(function(element){

    element.setStatic(element, true);
    element.setScale(0.5);
    element.setSensor(true);
    element.setSensor(true);
    var ran = Math.random() < 0.7 ? false : true;
    if (ran && level != "tutorial") {
      element.destroy();
    }
  });
  //that.physics.add.collider(that.enemyGroup);
  that.crackGroup = ObjectGenerator(map,'crackPoint','crack',6, that);
  that.crackGroup.forEach(function(element){
    element.setStatic(element, true);
    element.setScale(0.7);
    element.setSensor(true);
    var ran = Math.random() < 0.7 ? false : true;
    if (ran && level != "tutorial") {
      element.destroy();
    }
  });
  that.NPCGroup = ObjectGenerator(map, 'NPCPoint', 'onion', 7, that,[that.hitbox.Onion_Animation, null]);
  that.NPCGroup.forEach(function(element){
    var ran = Math.random() < 0.6 ? "onion" : "tomato";
    element.setTexture(ran);
    element.setScale(0.7);
    element.setDensity(100);
    element.setFriction(100);
    element.setDepth(1);
    element.setFixedRotation();

  });
  that.exit = ObjectGenerator(map, 'exitPoint','exit', 8, that);
  that.exit.forEach(function(element){
    element.setSensor(true);
  });
}

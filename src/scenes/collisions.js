export default AllCollision;

function AllCollision(danger,that){
  that.matter.world.on('collisionstart', function(event){
    let pairs = event.pairs;
    pairs.forEach(function(pair){
      if (pair.bodyA.label === "Potato" && danger){
        //console.log(pair.bodyA);
        switch (pair.bodyB.label) {
          case 'Cook':
            that.gameOver();
            break;
          case 'spill':
            that.slip(pair.bodyA, pair.bodyB);
            console.log('slip')
            break;
          case 'crack':
            that.gameOver();
            break;
          case 'door':
            that.endScene();
          default:
            break;

        }
      }else{
        switch (pair.bodyB.label) {
          case 'spill':
            that.slip(pair.bodyA, pair.bodyB);
            console.log('slip')
            break;
          case 'door':
            that.endScene();
          default:
            break;
      }
    }
      if (pair.bodyA.label === "Cook"){
        switch (pair.bodyB.label){
          case 'spill':
            that.slip(pair.bodyA, pair.bodyB);
            break;
          default:
            break;

        }
      }
      if (pair.bodyA.label === "Lcrate"){
        switch (pair.bodyB.label){
          case 'spill':
            pair.isActive = false;
            break;
          default:
            break;

        }
      }
      if (pair.bodyB.label === "onion" && danger) {
        switch (pair.bodyA.label) {
          case 'crack':
            that.gameOver();
            break;
          default:
            break;

        }
      }
    //console.log("bodyA");
    //console.log(pair.bodyA.label);
    //console.log("bodyB");
    //console.log(pair.bodyB.label);
    });

  });
}

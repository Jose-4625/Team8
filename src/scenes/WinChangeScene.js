export { addSceneEventListeners };

function addSceneEventListeners(that, scene){
  that.input.keyboard.on(
    "keydown_SPACE",
      function() {
        that.music.stop();
        that.scene.stop(scene);
        that.scene.start('Boot');
      }
  )
}

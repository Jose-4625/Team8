export { addSceneEventListeners };

function addSceneEventListeners(that, scene)
{
  that.input.keyboard.on
  (
    "keydown_SPACE",
      function()
      {
        that.video.stop();
        that.scene.stop(scene);
        that.scene.start('Boot');
      }
  )
}

export { addSceneEventListeners };

function addSceneEventListeners(that, scene)
{
  that.input.keyboard.on
  (
    "keydown_SPACE",
      function()
      {
        if (that.scene == "Introduction.js")
        {
          that.video.stop();
        }
        else
        {
            that.music.stop();
        }
        that.scene.stop(scene);
        that.scene.start('Boot');
      }
  )
}

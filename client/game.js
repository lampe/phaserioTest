//the main game Object
MyGame = {};

//init the game and add states
MyGame.init = function(){
  MyGame.Game = new Phaser.Game(900, 650, Phaser.EXACT_FIT , '');
  MyGame.Game.state.add('boot', MyGame.boot);
  MyGame.Game.state.add('preload', MyGame.preload);
  MyGame.Game.state.add('main', MyGame.main);
  MyGame.Game.state.start('boot');
};

MyGame.boot = {};
//setting game configuration and loading the assets for the loading screen
MyGame.boot.preload = function() {
  //assets we'll use in the loading screen
  this.load.image('preloadbar', 'assets/images/preloader-bar.png');
};

MyGame.boot.create = function() {
  //loading screen will have a white background
  this.game.stage.backgroundColor = '#fff';
  //scaling options
  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  //have the game centered horizontally
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  //screen size will be set automatically
  this.scale.setScreenSize(true);
  //physics systemt
  this.game.physics.startSystem(Phaser.Physics.P2JS);
  this.state.start('preload');
};
Template.game.rendered = function(){
  MyGame.init();
};

MyGame.preload = {};

MyGame.preload.preload = function() {

  //show loading screen
  this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
  this.preloadBar.anchor.setTo(0.5);
  this.preloadBar.scale.setTo(3);
  this.load.setPreloadSprite(this.preloadBar);

  //load game assets
  // this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
  // this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
  this.load.spritesheet('player', 'assets/images/dude.png',32, 48);
  this.load.image("background", "assets/images/preview3.jpg");
  this.load.image("meteor", "assets/images/meteor.png");
  // this.load.image('planet', 'assets/images/planet.png');
  // this.load.image('playerDead', 'assets/images/player_dead.png');
  // this.load.image('goldCoin', 'assets/images/goldCoin.png');
  this.load.audio("bgmusic", "assets/audio/sinewaves.mp3");
};

MyGame.preload.create = function() {
  this.state.start('main');
};

MyGame.main = {};

MyGame.main.preload = function() {
  this.game.time.advancedTiming = true;
};

MyGame.main.create = function() {
  music = this.game.add.audio("bgmusic");
  music.play();
  // this.game.stage.backgroundColor = '#0072bc';
  this.backgroundImg = this.game.add.tileSprite(0, 0, 900, 650, "background");
  this.meteor = this.game.add.sprite(-300, 100, "meteor");
  this.meteor.scale.x = 0.2;
  this.meteor.scale.y = 0.2;
  this.backgroundImg.autoScroll(10,0);
  //create player
  this.player = this.game.add.sprite(450, 300, 'player');
  player = this.player;
  this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.player.animations.add('left', [0, 1, 2, 3], 10, true);
  this.player.animations.add('right', [5, 6, 7, 8], 10, true);
};

MyGame.main.update = function() {
  // console.log(this.backgroundImg);
  if(this.meteor.x > 1500){
    this.meteor.x = -300;
  }
  this.meteor.x += 2;
  // Calculate gravity as the normalised vector from the ship to the planet
  // Normalize and multiply by actual strength of gravity desired
  // this.player.body.gravity = this.player.body.gravity.normalize().multiply(0, 0);
  if (this.cursors.left.isDown)
    {
      // this.player.scale.x = 1; //flipped
      // this.player.animations.play('left');
      this.player.rotation += 0.01;
    }
    else if (this.cursors.right.isDown)
      {
        this.player.rotation -= 0.01;
      }
      else
        {
          this.player.animations.stop();
          this.player.frame = 4;
        }

        // if (this.cursors.up.isDown)
        // {
        // 	this.player.body.thrust(400);
        // }
        // else if (this.cursors.down.isDown)
        // {
        // 	this.player.body.reverse(400);
        // }
      };

      MyGame.main.render = function(){
        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
      };

# Rotate Sprite Extension for Phaser Framework

![Rotate Sprite Extension](https://raw.githubusercontent.com/jdnichollsc/Phaser-Rotate-Sprite-Extension/gh-pages/img/extension.png)

## Full Example

```javascript
var game = new Phaser.Game(w, h, Phaser.AUTO, '', {
    //...
    preload: function(){
      this.game.load.image('ionPhaser', ionPhaserUrl);
      this.game.load.image('rotate', rotateUrl);
    },
    create: function(){
      this.sprite = new Phaser.Extension.RotateSprite(this.game, this.game.world.centerX, this.game.world.centerY, 'ionPhaser');
    }
    //...
});
```

## Other Projects
- **[IonPhaser](http://market.ionic.io/plugins/ionphaser)**
- **[Kinetic Scrolling Plugin](https://github.com/jdnichollsc/Phaser-Kinetic-Scrolling-Plugin)**

## Happy scrolling
Made with <3

<img width="150px" src="http://phaser.azurewebsites.net/assets/nicholls.png" align="right">

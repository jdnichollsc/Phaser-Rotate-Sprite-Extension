/**
 * Phaser Rotate Sprite Extension
 * @author       Juan Nicholls <jdnichollsc@hotmail.com>
 * @copyright    2017 Juan Nicholls - http://jdnichollsc.github.io/Phaser-Rotate-Sprite-Extension/
 * @license      {@link http://opensource.org/licenses/MIT}
 * @version 1.0.0
 */

(function (Phaser) {
    'use strict';

    /**
    * The module pattern to create/extend the Phaser.Extension object.
    *
    */
    Phaser.Extension = Phaser.Extension || {};

    /**
    * Rotate Sprite is a Phaser extension that allows rotate a sprite in any direction.
    * It works with the Phaser.Sprite
    *
    * @class Phaser.Extension.RotateSprite
    * @constructor
    * @param {Object} game - The Game object is the instance of the game, where the magic happens.
    * @param {number} x - The x coordinate (in world space) to position the Sprite at.
    * @param {number} y - The y coordinate (in world space) to position the Sprite at.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    * @param {string|number} frame - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
    * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} keyRotate - This is the image or texture used by the Sprite of the Rotate control during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
    */
    Phaser.Extension.RotateSprite = function (game, x, y, key, frame, keyRotate) {
        Phaser.Sprite.call(this, game, x, y, key, frame);
        var self = this;
        self.anchor.set(0.5);
        self.inputEnabled = true;
        self.input.useHandCursor = true;
        self.input.enableDrag();
        game.add.existing(self);

        self.rotate = game.add.sprite(x, y, keyRotate || 'rotate');
        self.rotate.anchor.set(0.5);
        self.rotate.inputEnabled = true;
        self.rotate.input.useHandCursor = true;
        self.rotate.input.priorityID = 1;
        self.rotate.input.enableDrag();
        self.rotate.events.onDragStart.add(self.onDragStart, self);
        self.rotate.events.onDragStop.add(self.onDragStop, self);
        self.rotate.events.onDragUpdate.add(self.onRotateDragUpdate, self);
        self.rotate.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "crosshair";
        }, self);

        return this;
    };
    Phaser.Extension.RotateSprite.prototype = Object.create(Phaser.Sprite.prototype);
    Phaser.Extension.RotateSprite.prototype.constructor = Phaser.Extension.RotateSprite;
    
    /**
    * Event called after all the core subsystems and the State have updated, but before the render.
    */
    Phaser.Extension.RotateSprite.prototype.update = function () {
        var self = this;
        if (!self.isDragging) {
            var midX = self.width / 2;
            var midY = self.height / 2;
            self.rotate.x = self.x;
            self.rotate.y = self.y;
            self.rotate.pivot.y = midY + 30;
        }
    };
    Phaser.Extension.RotateSprite.prototype.onDragStart = function () {
        this.isDragging = true;
    };
    Phaser.Extension.RotateSprite.prototype.onDragStop = function () {
        this.isDragging = false;
    };
    Phaser.Extension.RotateSprite.prototype.onRotateDragUpdate = function () {
        var self = this;
        self.rotate.x = self.x;
        self.rotate.y = self.y;
        self.rotation = self.game.input.activePointer.position.angle(self.position) - Phaser.Math.degToRad(90);
        self.rotate.rotation = self.rotation;
    };

} (Phaser));
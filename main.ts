namespace SpriteKind {
    export const Pearl = SpriteKind.create()
    export const emptypearl = SpriteKind.create()
    export const gate = SpriteKind.create()
    export const opengate = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const bossdown = SpriteKind.create()
    export const L2Enemy = SpriteKind.create()
}
function Setwalls () {
    for (let value of tiles.getTilesByType(sprites.dungeon.collectibleInsignia)) {
        tiles.setWallAt(value, true)
    }
}
function L2_Boss_Punch () {
    if (bossdeath == false) {
        for (let value52 of sprites.allOfKind(SpriteKind.Boss)) {
            // bossfacing - 0 = right
            // use the timer to make it restart moving after the punch
            if (value52.vx > 0) {
                if (randint(0, 1) == 0) {
                    value52.setVelocity(150, 20)
                    value52.sayText("Hiyaaa!", 500, false)
                } else {
                    value52.setVelocity(50, 10)
                }
                animation.runImageAnimation(
                value52,
                assets.animation`L2_Boss_Attack_Right`,
                100,
                true
                )
                Bossfacing = 0
            } else if (value52.vx < 0) {
                if (randint(0, 1) == 0) {
                    value52.setVelocity(-100, -20)
                    value52.sayText("Hiyaaa!", 500, false)
                } else {
                    value52.setVelocity(-50, -10)
                }
                animation.runImageAnimation(
                value52,
                assets.animation`L2_Boss_Attack_Left`,
                100,
                true
                )
                Bossfacing = 1
            } else {
                if (Bossfacing == 0) {
                    value52.setVelocity(50, 0)
                    animation.runImageAnimation(
                    value52,
                    assets.animation`L2_Boss_Walk_Right`,
                    200,
                    true
                    )
                } else {
                    value52.setVelocity(-50, 0)
                    animation.runImageAnimation(
                    value52,
                    assets.animation`L2_Boss_Walk_Left`,
                    200,
                    true
                    )
                }
            }
        }
    }
}
function Commander_Animation () {
    if (Commander.vy < 0) {
        Commander.setImage(assets.image`Macho_Jump`)
        First_Move = 0
    } else if (Commander.vy > 0) {
        Commander.setImage(assets.image`Elbowdropper Down`)
        if (Facing_Right == 1) {
            Commander.image.flipX()
        }
        First_Move = 0
    } else if (Commander.vx > 0 && (Facing_Right == 1 || First_Move == 0)) {
        animation.runImageAnimation(
        Commander,
        assets.animation`myAnim0`,
        100,
        true
        )
        First_Move = 1
    } else if (Commander.vx < 0 && (Facing_Right == -1 || First_Move == 0)) {
        animation.runImageAnimation(
        Commander,
        assets.animation`myAnim`,
        100,
        true
        )
        First_Move = 1
    } else if (Commander.vx == 0) {
        Commander.setImage(assets.image`Macho_Right_Run_1`)
        if (Facing_Right == 1) {
            Commander.image.flipX()
        }
    }
    SetFacing()
}
function boss_walk_animation (_currentlevel: number) {
    if (_currentlevel == 0) {
        L1_Boss_Walk_Animation()
    } else if (_currentlevel == 1) {
        L2_Boss_Walk_Animation()
    }
}
function L2_boss_crash (_bosssprite: Sprite) {
    _bosssprite.sayText("I cant believe I was defeated by an elbow drop!!!", 5000, true)
    _bosssprite.startEffect(effects.spray, 1000)
    bossdeath = true
    _bosssprite.setVelocity(0, 0)
    _bosssprite.ay = 10
    _bosssprite.fy = 100
    animation.runImageAnimation(
    _bosssprite,
    assets.animation`L2_Boss_Down`,
    500,
    false
    )
    _bosssprite.setBounceOnWall(false)
    pause(2500)
    bossface = sprites.create(assets.image`L2_Boss_Face`, SpriteKind.bossdown)
    tiles.placeOnTile(bossface, tiles.getTileLocation(23, 16))
}
function DestoryAllEnemiesSprites () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.L2Enemy)
}
function L2_Boss_Walk_Animation () {
    if (bossdeath == false) {
        for (let value2222 of sprites.allOfKind(SpriteKind.Boss)) {
            if (value2222.isHittingTile(CollisionDirection.Left)) {
            	
            } else if (value2222.isHittingTile(CollisionDirection.Right)) {
            	
            }
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SharkyJumpCount < jumpmax) {
        Commander.vy = jumpvelocity
        SharkyJumpCount += 1
    }
})
function SetLevels () {
    current_level = 0
    Levels = [tilemap`level1`, tilemap`Level2`]
}
function L1Enemy_Animation () {
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value2.isHittingTile(CollisionDirection.Left)) {
            animation.runImageAnimation(
            value2,
            assets.animation`L1sharkswimright`,
            100,
            true
            )
        } else if (value2.isHittingTile(CollisionDirection.Right)) {
            animation.runImageAnimation(
            value2,
            assets.animation`L1Sharkswimleft`,
            100,
            true
            )
        }
    }
}
function DestroyAllSprites () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Pearl)
    sprites.destroyAllSpritesOfKind(SpriteKind.emptypearl)
    sprites.destroyAllSpritesOfKind(SpriteKind.gate)
    sprites.destroyAllSpritesOfKind(SpriteKind.opengate)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.bossdown)
    DestoryAllEnemiesSprites()
}
function L2Enemy_Animation () {
    for (let value22 of sprites.allOfKind(SpriteKind.L2Enemy)) {
        if (value22.isHittingTile(CollisionDirection.Left)) {
            animation.runImageAnimation(
            value22,
            assets.animation`L2sharkswimright`,
            80,
            true
            )
        } else if (value22.isHittingTile(CollisionDirection.Right)) {
            animation.runImageAnimation(
            value22,
            assets.animation`L2sharkswimleft`,
            80,
            true
            )
        }
    }
}
function Elbowcheck (_othersprite: Sprite) {
    if (Commander.y < _othersprite.y && Commander.vy > 0) {
        music.smallCrash.play()
        if (_othersprite.kind() == SpriteKind.Enemy) {
            info.changeScoreBy(1)
            info.changeLifeBy(0)
        } else if (_othersprite.kind() == SpriteKind.L2Enemy) {
            info.changeScoreBy(2)
            info.changeLifeBy(1)
        } else {
        	
        }
        Commander.vy = enemydownbounce
        _othersprite.destroy()
    } else {
        music.playTone(262, music.beat(BeatFraction.Half))
        if (_othersprite.kind() == SpriteKind.Enemy) {
            info.changeLifeBy(-1)
        } else if (_othersprite.kind() == SpriteKind.L2Enemy) {
            info.changeLifeBy(-2)
        } else {
        	
        }
        controller.moveSprite(Commander, 0, 0)
        if (_othersprite.x < Commander.x) {
            Commander.setVelocity(1 * enemyhitbounch, 10)
        } else {
            Commander.setVelocity(-1 * enemyhitbounch, 10)
        }
        pause(hitdelay_ms)
        controller.moveSprite(Commander, 100, 0)
    }
}
function Bosscrash (_othersprite: Sprite, _currentlevel: number) {
    if (_currentlevel == 0) {
        L1_boss_crash(_othersprite)
    } else if (_currentlevel == 1) {
        L2_boss_crash(_othersprite)
    }
}
function L1_boss_crash (_bosssprite: Sprite) {
    _bosssprite.sayText("The elbows! How can they be so strong!", 5000, true)
    _bosssprite.startEffect(effects.spray, 1000)
    bossdeath = true
    _bosssprite.setVelocity(0, 0)
    _bosssprite.ay = 10
    _bosssprite.fy = 100
    animation.runImageAnimation(
    _bosssprite,
    assets.animation`L1_Boss_Down`,
    500,
    false
    )
    _bosssprite.setBounceOnWall(false)
    pause(2500)
    bossface = sprites.create(assets.image`L1_Boss_Face`, SpriteKind.bossdown)
    tiles.placeOnTile(bossface, tiles.getTileLocation(8, 11))
}
function Setenemies () {
    for (let value3 of tiles.getTilesByType(assets.tile`myTile0`)) {
        L1_Enemy = sprites.create(assets.image`test`, SpriteKind.Enemy)
        tiles.placeOnTile(L1_Enemy, value3)
        tiles.setTileAt(value3, assets.tile`transparency16`)
        L1_Enemy.vx = -50
        L1_Enemy.setBounceOnWall(true)
        animation.runImageAnimation(
        L1_Enemy,
        assets.animation`L1Sharkswimleft`,
        100,
        true
        )
    }
    for (let value32 of tiles.getTilesByType(assets.tile`myTile3`)) {
        L2_Enemy = sprites.create(assets.image`test`, SpriteKind.L2Enemy)
        tiles.placeOnTile(L2_Enemy, value32)
        tiles.setTileAt(value32, assets.tile`transparency16`)
        L2_Enemy.vx = -70
        L2_Enemy.setBounceOnWall(true)
        animation.runImageAnimation(
        L2_Enemy,
        assets.animation`L2sharkswimleft`,
        80,
        true
        )
    }
}
function BossElbowcheck (_othersprite: Sprite, bosslife: number) {
    if (bossdeath == false) {
        if (Commander.y < _othersprite.y && Commander.vy > 0) {
            if (bosslife > 0) {
                music.smallCrash.play()
                BossLife += -1
                _othersprite.sayText(bosslife, 500, false)
                Commander.setVelocity(randint(-1, -1) * (enemyhitbounch * 5), enemydownbounce)
            } else {
                DestoryAllEnemiesSprites()
                music.bigCrash.play()
                info.changeScoreBy(1)
                Bosscrash(_othersprite, current_level)
            }
        } else {
            info.changeLifeBy(-1)
            music.playTone(262, music.beat(BeatFraction.Half))
            controller.moveSprite(Commander, 0, 0)
            if (_othersprite.x < Commander.x) {
                Commander.setVelocity(-5 * enemyhitbounch, -30)
            } else {
                Commander.setVelocity(5 * enemyhitbounch, -30)
            }
            pause(hitdelay_ms)
            controller.moveSprite(Commander, 100, 0)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.bossdown, function (sprite, otherSprite) {
    effects.confetti.startScreenEffect(500)
    DestroyAllSprites()
    if (current_level < Maxlevel) {
        current_level += 1
        Initialize()
    } else {
        game.splash("Congratulations, you have won the game ... and your lunch")
        game.splash("Now get off your bottom and go play outside!")
        game.splash("This game was written with love, from Dad")
    }
})
function SetBoss () {
    for (let value42 of tiles.getTilesByType(assets.tile`myTile1`)) {
        if (current_level == 0) {
            L1_Boss = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Boss)
            tiles.placeOnTile(L1_Boss, value42)
            tiles.setTileAt(value42, assets.tile`transparency16`)
            L1_Boss.vx = -50
            L1_Boss.setBounceOnWall(true)
            L1_Boss.ay = Gravity / 10
            animation.runImageAnimation(
            L1_Boss,
            assets.animation`L1_Boss_Walk_Left`,
            200,
            true
            )
        } else if (current_level == 1) {
            L1_Boss = sprites.create(assets.image`L2_Boss_Face`, SpriteKind.Boss)
            tiles.placeOnTile(L1_Boss, value42)
            tiles.setTileAt(value42, assets.tile`transparency16`)
            L1_Boss.vx = -50
            L1_Boss.setBounceOnWall(true)
            // L1_Boss.ay = Gravity / 10
            animation.runImageAnimation(
            L1_Boss,
            assets.animation`L2_Boss_Walk_Left`,
            200,
            true
            )
        } else if (current_level == 2) {
            L1_Boss = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Boss)
            tiles.placeOnTile(L1_Boss, value42)
            tiles.setTileAt(value42, assets.tile`transparency16`)
            L1_Boss.vx = -50
            L1_Boss.setBounceOnWall(true)
            L1_Boss.ay = Gravity / 10
            animation.runImageAnimation(
            L1_Boss,
            assets.animation`L1_Boss_Walk_Left`,
            200,
            true
            )
        } else if (current_level == 3) {
            L1_Boss = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Boss)
            tiles.placeOnTile(L1_Boss, value42)
            tiles.setTileAt(value42, assets.tile`transparency16`)
            L1_Boss.vx = -50
            L1_Boss.setBounceOnWall(true)
            L1_Boss.ay = Gravity / 10
            animation.runImageAnimation(
            L1_Boss,
            assets.animation`L1_Boss_Walk_Left`,
            200,
            true
            )
        } else if (current_level == 4) {
            L1_Boss = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Boss)
            tiles.placeOnTile(L1_Boss, value42)
            tiles.setTileAt(value42, assets.tile`transparency16`)
            L1_Boss.vx = -50
            L1_Boss.setBounceOnWall(true)
            L1_Boss.ay = Gravity / 10
            animation.runImageAnimation(
            L1_Boss,
            assets.animation`L1_Boss_Walk_Left`,
            200,
            true
            )
        }
    }
}
function Setpearls () {
    for (let value422 of tiles.getTilesByType(assets.tile`myTile`)) {
        Pearl_of_Wisdom = sprites.create(assets.image`pearl`, SpriteKind.Pearl)
        tiles.placeOnTile(Pearl_of_Wisdom, value422)
        tiles.setTileAt(value422, assets.tile`transparency16`)
    }
}
function SetJumpCount () {
    if (current_level == 0) {
        jumpmax = 0
    } else if (current_level == 1) {
        jumpmax = 1
    } else {
        jumpmax = 2
    }
}
function BossAttack (_currentlevel: number) {
    if (_currentlevel == 0) {
        L1_Boss_Punch()
    } else if (_currentlevel == 1) {
        L2_Boss_Punch()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.L2Enemy, function (sprite, otherSprite) {
    Elbowcheck(otherSprite)
    pause(1000)
})
function L1_Boss_Walk_Animation () {
    if (bossdeath == false) {
        for (let value222 of sprites.allOfKind(SpriteKind.Boss)) {
            if (value222.isHittingTile(CollisionDirection.Left)) {
                animation.runImageAnimation(
                value222,
                assets.animation`L1_Boss_Walk_Right`,
                200,
                true
                )
            } else if (value222.isHittingTile(CollisionDirection.Right)) {
                animation.runImageAnimation(
                value222,
                assets.animation`L1_Boss_Walk_Left`,
                200,
                true
                )
            }
        }
    }
}
function SetFacing () {
    if (Commander.vx > 0) {
        Facing_Right = -1
    } else if (Commander.vx < 0) {
        Facing_Right = 1
    }
}
function Initialize () {
    bossdeath = false
    hitdelay_ms = 750
    enemyhitbounch = 100
    BossLife = 5
    info.player1.setLife(5)
    SetJumpCount()
    scene.setBackgroundColor(6)
    tiles.setCurrentTilemap(Levels[current_level])
    Commander = sprites.create(assets.image`Macho_Right_Run_1`, SpriteKind.Player)
    controller.moveSprite(Commander, 100, 0)
    Gravity = 300
    SharkyJumpCount = 0
    tiles.placeOnRandomTile(Commander, sprites.dungeon.collectibleBlueCrystal)
    scene.cameraFollowSprite(Commander)
    First_Move = 0
    Commander.ay = Gravity
    Commander.fx = 100
    jumpvelocity = -200
    enemydownbounce = jumpvelocity
    Setwalls()
    Setpearls()
    Setenemies()
    Setgate()
    Facing_Right = -1
    if (current_level == 0) {
        game.splash("Sharks and wrestlers have teamed up to steal your lunch!")
        game.splash("There is only one thing left to do")
        game.splash("FIGHT!")
    } else {
        game.splash("LEVEL ", current_level + 1)
    }
}
function floorcheck () {
    if (Commander.isHittingTile(CollisionDirection.Bottom)) {
        SharkyJumpCount = 0
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.gate, function (sprite, otherSprite) {
    music.beamUp.playUntilDone()
    otherSprite.startEffect(effects.fire, 500)
    opengate2 = sprites.create(img`
        ................................
        ................................
        ................................
        ................................
        ................................
        ..........888888888888..........
        ........8887777777777888........
        ......88877666666666677888......
        .....8877666667777666667788.....
        ....887666667788887766666788....
        ....866666677888888996666678....
        ...88666667788877889976666688...
        ...88666677888677688877666688...
        ...88666778888888888887766688...
        ...88667788888888888888776688...
        ..cc866788866777777668887668cc..
        .ccbc8668866666666666688668cbcc.
        .fcbcc86666666666666666668ccbcf.
        .fcbbcc886666666666666688ccbdcf.
        .f8bbbccc88888888888888cccbddcf.
        .f8cbbbbccccccccccccccccbdddbcf.
        .f8ccbbbbbccccccccccccb11dddccf.
        .f6ccccbbbdddddddddddd111ddcccf.
        .f6ccccccbbddddddddddd11dbbcccf.
        .f6cccccccccccccbbbbbbbbbdbcccf.
        ..f6cccccccccbbbbbbbbbbbddbccf..
        ..f6cccccccccbbbbbbbbbbbddbccf..
        ..ff6ccccccccbbbbbbbbbbbddbcff..
        ...ff6cccccccbbbbbbbbbbbddbff...
        ....ffcccccccbbbbbbbbbbbdbff....
        ......ffccccbbbbbbbbbbbbff......
        ........ffffffffffffffff........
        `, SpriteKind.opengate)
    opengate2.setPosition(otherSprite.x, otherSprite.y)
    otherSprite.destroy()
    sprite.sayText("Boss Time! I hope my elbows can take it!", 2000, true)
    info.changeLifeBy(5)
    SetBoss()
})
function L1_Boss_Punch () {
    if (bossdeath == false) {
        for (let value5 of sprites.allOfKind(SpriteKind.Boss)) {
            // bossfacing - 0 = right
            // use the timer to make it restart moving after the punch
            if (value5.vx > 0) {
                if (randint(0, 2) == 0) {
                    value5.setVelocity(75, 10)
                } else {
                    value5.setVelocity(0, 10)
                }
                animation.runImageAnimation(
                value5,
                assets.animation`L1_Boss_Attack_Right`,
                500,
                true
                )
                Bossfacing = 0
            } else if (value5.vx < 0) {
                if (randint(0, 2) == 0) {
                    value5.setVelocity(-75, 10)
                } else {
                    value5.setVelocity(0, 10)
                }
                animation.runImageAnimation(
                value5,
                assets.animation`L1_Boss_Attack_Left`,
                500,
                true
                )
                Bossfacing = 1
            } else {
                if (Bossfacing == 0) {
                    value5.setVelocity(50, 0)
                    animation.runImageAnimation(
                    value5,
                    assets.animation`L1_Boss_Walk_Right`,
                    200,
                    true
                    )
                } else {
                    value5.setVelocity(-50, 0)
                    animation.runImageAnimation(
                    value5,
                    assets.animation`L1_Boss_Walk_Left`,
                    200,
                    true
                    )
                }
            }
        }
    }
}
function Setgate () {
    for (let value43 of tiles.getTilesByType(assets.tile`myTile2`)) {
        Gate = sprites.create(img`
            ..........666666666666..........
            ........6667777777777666........
            ......66677777777777777666......
            .....6677777779999777777766.....
            ....667777779966669977777766....
            ....677777799668866117777776....
            ...66777779966877861197777766...
            ...66777799668677686699777766...
            ...88777796688888888669777788...
            ...88777788888888888888777788...
            ...88977888679999997688877988...
            ...88977886777777777768877988...
            ...88997777777777777777779988...
            ...88799777777777777777711788...
            ...88679997777777777779117688...
            ..cc866679999999999999976668cc..
            .ccbc6666679999999999766666cbcc.
            .fcbcc66666666666666666666ccbcf.
            .fcbbcc666666666666666666ccbdcf.
            .f8bbbccc66666666666666cccbddcf.
            .f8cbbbbccccccccccccccccbdddbcf.
            .f8ccbbbbbccccccccccccb111ddccf.
            .f6ccccbbbddddddddddddd111dcccf.
            .f6ccccccbbddddddddddddddbbcccf.
            .f6cccccccccccccbbbbbbbbbdbcccf.
            ..f6cccccccccbbbbbbbbbbbddbccf..
            ..f6cccccccccbbbbbbbbbbbddbccf..
            ..ff6ccccccccbbbbbbbbbbbddbcff..
            ...ff6cccccccbbbbbbbbbbbddbff...
            ....ffcccccccbbbbbbbbbbbdbff....
            ......ffccccbbbbbbbbbbbbff......
            ........ffffffffffffffff........
            `, SpriteKind.gate)
        tiles.placeOnTile(Gate, value43)
        tiles.setTileAt(value43, assets.tile`transparency16`)
    }
}
// This block gains +1 when you go over a pearl to your jump
sprites.onOverlap(SpriteKind.Player, SpriteKind.Pearl, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.hearts, 500)
    Empty_Pearl = sprites.create(assets.image`pearlempty`, SpriteKind.emptypearl)
    Empty_Pearl.setPosition(otherSprite.x, otherSprite.y)
    otherSprite.destroy()
    jumpmax += 1
    sprite.sayText("The power of elbows Unleashed!", 2000, true)
    info.changeLifeBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    Elbowcheck(otherSprite)
    pause(1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    BossElbowcheck(otherSprite, BossLife)
    pause(1000)
})
let Empty_Pearl: Sprite = null
let Gate: Sprite = null
let opengate2: Sprite = null
let Pearl_of_Wisdom: Sprite = null
let Gravity = 0
let L1_Boss: Sprite = null
let BossLife = 0
let L2_Enemy: Sprite = null
let L1_Enemy: Sprite = null
let hitdelay_ms = 0
let enemyhitbounch = 0
let enemydownbounce = 0
let Levels: tiles.TileMapData[] = []
let current_level = 0
let jumpvelocity = 0
let jumpmax = 0
let SharkyJumpCount = 0
let bossface: Sprite = null
let First_Move = 0
let Facing_Right = 0
let Commander: Sprite = null
let Bossfacing = 0
let bossdeath = false
let Maxlevel = 0
Maxlevel = 1
SetLevels()
Initialize()
game.onUpdate(function () {
    Commander_Animation()
    floorcheck()
    L1Enemy_Animation()
    boss_walk_animation(current_level)
    L2Enemy_Animation()
})
game.onUpdateInterval(1500, function () {
    BossAttack(current_level)
})

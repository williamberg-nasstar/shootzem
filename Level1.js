class Level1 {

  tickCount = 0

  static purpleTankBodyColour = '#791394'
  static purpleTankTrackColour = '#b063db'

  static tealTankBodyColour = '#0ecf8b'
  static tealTankTrackColour = '#6cd494'

  static redTankBodyColour = '#bf1b1b'
  static redTankTrackColour = '#c26161'

  constructor() {}

  static bigTankPath1 = [
    ['forwards', 1.5, 150],
    ['forwards', 1, 15],
    ['forwards', 0.5, 25],
    ['wait', 0, 50],
    ['left', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 125],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['right', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 40],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['right', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 40],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['left', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 500]
  ]

  static bigTankPath2 = [
    ['wait', 0, 100],
    ['forwards', 0.75, 2000]
  ]

  static slowTankPath = [
    ['forwards', 0.5, 5000]
  ]

  static wave1() {
    enemies.set(1, new BigTank(
      1,
      canvasWidth + 100,
      175,
      Level1.bigTankPath1,
      Level1.tealTankBodyColour,
      Level1.tealTankTrackColour,
      2,
      { type: 'projectile', hitPoints: 5 },
      enemies
    ))

    enemies.set(2, new BigTank(
      2,
      canvasWidth + 100,
      300,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      undefined,
      enemies
    ))
  }

  static wave2() {
    enemies.set(4, new BigTank(
      4,
      canvasWidth + 100,
      300,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      undefined,
      enemies
    ))
  }

  static wave2a() {
    enemies.set(7, new BigTank(
      7,
      canvasWidth + 100,
      175,
      Level1.bigTankPath1,
      Level1.redTankBodyColour,
      Level1.redTankTrackColour,
      2,
      undefined,
      enemies
    ))
  }

  static wave3a() {
    enemies.set(3, new BigTank(
      3,
      canvasWidth + 100,
      175,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      undefined,
      enemies
    ))
  }

  static wave3() {
    enemies.set(5, new BigTank(
      5,
      canvasWidth + 100,
      175,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      undefined,
      enemies
    ))
  }

  static wave4() {
    enemies.set(6, new VeryBigTank(
      6,
      canvasWidth + 100,
      428,
      Level1.slowTankPath,
      Level1.redTankBodyColour,
      Level1.redTankTrackColour,
      5,
      enemies
    ))
  }

  draw() {
    ctx.save()

    ctx.fillStyle = '#db6377'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.fillStyle = '#42bfdb'
    ctx.fillRect(0, 0, 150, canvasHeight)

    const image = new Image()
    image.src = 'water_invert_transparency.png'
    ctx.globalAlpha = 0.5
    ctx.drawImage(image, 0, 0);
    ctx.globalAlpha = 1

    ctx.restore()

    background.forEach((backgroundElement) => {
      backgroundElement.update()
    })
    crumps.forEach((crump) => {
      crump.update()
    })
    enemies.forEach((enemy) => {
      enemy.update()
    })
    powerUps.forEach((powerUp) => {
      powerUp.update()
    })
    player.update()
    muzzleFlashes.forEach((muzzleFlash) => {
      muzzleFlash.update()
    })
    projectiles.forEach((projectile) => {
      projectile.update()
    })
    foreground.forEach((foregroundElement) => {
      foregroundElement.update()
    })

    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.fillStyle = '#DDDDDD'
    ctx.rect(10, 10, canvasWidth - 20, canvasHeight - 20)
    ctx.stroke()
    ctx.fillRect(0, 0, canvasWidth, 10)
    ctx.fillRect(0, 0, 10, canvasHeight)
    ctx.fillRect(canvasWidth - 10, 0, 10, canvasHeight)
    ctx.fillRect(0, canvasHeight - 10, canvasWidth, 10)
    ctx.restore()

    // if (failed) {
    //   ctx.fillStyle = 'black'
    //   ctx.font = "30px Comic Sans MS"
    //   ctx.fillText("doesnt matter now", 25, 50)

    //   ctx.fillStyle = '#'+Math.random().toString(16).substr(-6)
    //   ctx.font = "75px Comic Sans MS"
    //   ctx.fillText("CONGRATULATIONS", 48, canvasHeight / 2)
    //   ctx.fillText("YOU FAILED", 48, (canvasHeight / 2) + 100)
    // } else {
    //   ctx.fillStyle = 'black'
    //   ctx.font = "30px Arial"
    //   ctx.fillText(score, 25, 50)
    // }
  }

  tick() {
    if (this.tickCount == 0) {
      Level1.wave1()
    }
    if (this.tickCount == 300) {
      Level1.wave2()
    }
    if (this.tickCount == 400) {
      Level1.wave2a()
    }
    if (this.tickCount == 700) {
      Level1.wave3a()
    }
    if (this.tickCount == 1000) {
      Level1.wave3()
    }
    if (this.tickCount == 1300) {
      Level1.wave4()
    }

    this.tickCount++
  }

  mousedownListener(e) {
    for (let [id, powerUp] of powerUps) {
      if (Math.abs(e.clientX - powerUp.x) < 20
        && Math.abs(e.clientY - powerUp.y) < 20) {
        powerUp.hit()
        return
      }
    }

    if (e.clientX >= player.x
      && e.clientY <= player.y
      && e.clientX < canvasWidth
      && e.clientY < canvasHeight
      && projectiles.size < projectileCountLimit) {

      // calculate where the end of the barrel is using this code lifted from Player.js - yuck!
      var theta = Math.atan((yMouse - playerY) / (xMouse - playerX))
      if (xMouse - playerX < 0) {
        theta += Math.PI;
      }

      const d = 1 + (0.15 * Math.sqrt((xMouse - playerX) + (playerY - yMouse))) // foreshortening factor
      var a = 10 * d // fore barrel

      var ax = a * Math.cos(theta),
          ay = a * Math.sin(theta)

      projectiles.set(projectileId, new Projectile(
        projectileId,
        e.clientX,
        e.clientY,
        playerX + ax,
        playerY + ay
      ))
      projectileId++;

      muzzleFlashes.set(muzzleFlashId, new MuzzleFlash(
        muzzleFlashId,
        playerX + ax,
        playerY + ay
      ))
      muzzleFlashId++;
    }
  }

  mousemoveListener(e) {
    xMouse = e.clientX
    yMouse = e.clientY
  }

  start() {
    window.addEventListener('mousedown', this.mousedownListener)
    window.addEventListener('mousemove', this.mousemoveListener)
  }

  end() {
    window.removeEventListener('mousedown', this.mousedownListener)
    window.removeEventListener('mousemove', this.mousemoveListener)
  }

}

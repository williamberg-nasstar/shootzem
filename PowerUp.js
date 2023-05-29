class PowerUp {
  static projectileRadius = 15

  static projectileStrokeStyle = 'white'

  static deadWarningTickLimit1 = 300
  static deadFlashTime1 = 18
  static deadWarningTickLimit2 = 300
  static deadFlashTime2 = 6
  static deadTickLimit = 300

  static hitTickLimit = 10

  constructor(id, x, y, type, hitPoints) {
    this.id = id
    this.x = x
    this.y = y
    this.type = type
    this.hitPoints = hitPoints
    this.tick = 0
  }

  hit() {
    this.hitPoints--
    this.isHit = true
    this.hitTick = 0

    var text
    if (this.type == "projectile") {
      if (this.hitPoints == 0) {
        var bleep = new Audio('./powerup-doublebleep.mp3')
        bleep.volume = 0.25
        bleep.play()
        text = 'Extra shot!'
      } else {
        var bleep = new Audio('./powerup-bleep.mp3')
        bleep.volume = 0.25
        bleep.play()
        text = this.hitPoints
      }
    }
    foreground.set(foregroundId, new PowerUpHit(foregroundId, this.x, this.y, text, '0, 0, 0', '32px'))
    foregroundId++
  }

  update() {
    if (this.hitPoints <= 0) {
      powerUps.delete(this.id)
      if (this.type == 'projectile') {
        projectileCountLimit++
      }
      return
    }

    if (this.tick > PowerUp.deadWarningTickLimit1) {
      if (this.tick > PowerUp.deadWarningTickLimit1 + PowerUp.deadWarningTickLimit2) {
        if (this.tick > PowerUp.deadWarningTickLimit1 + PowerUp.deadWarningTickLimit2 + PowerUp.deadTickLimit) {
          powerUps.delete(this.id)
          return
        }

        if (this.tick % (PowerUp.deadFlashTime2 * 2) > PowerUp.deadFlashTime2) {
          this.tick++
          return
        }
      } else if (this.tick % (PowerUp.deadFlashTime1 * 2) > PowerUp.deadFlashTime1) {
        this.tick++
        return
      }
    }

    if (this.isHit) {
      this.drawWhite()
      if (this.hitTick > PowerUp.hitTickLimit) {
        this.isHit = false
        this.hitTick = 0
      }
      this.hitTick++
    } else {
      this.draw()
    }

    this.tick++
  }

  draw() {
    ctx.save()

    if (this.type == "projectile") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, PowerUp.projectileRadius, 0, Math.PI * 2, false)
      const octet = (((Math.sin(this.tick / 25) + 1) * 25 + 100).toString(16)).substr(0,2)
      const color = '#' + octet + octet + octet
      ctx.fillStyle = color
      ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeStyle = PowerUp.projectileStrokeStyle
      ctx.stroke()
    }

    ctx.restore()
  }

  drawWhite() {
    ctx.save()

    if (this.type == "projectile") {
      ctx.beginPath()
      ctx.arc(this.x, this.y, PowerUp.projectileRadius, 0, Math.PI * 2, false)
      ctx.fillStyle = 'white'
      ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeStyle = 'white'
      ctx.stroke()
    }

    ctx.restore()
  }
}
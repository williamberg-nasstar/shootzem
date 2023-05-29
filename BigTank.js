class BigTank {
  // body width
  static a = 21
  // track height
  static b = 17
  // track width
  static c = 25
  // body height
  static d = 10
  static turretCentre = -10
  static turretRadius = 8
  static led = -13

  static bodyStrokeStyle = '#3c0959'
  static turretColour = '#127bb8'
  static turretStrokeStyle = '#0e697d'
  static ledColour = '#F00'

  static deadFlashTime = 3
  static deadTickLimit = 30

  static hitTickLimit = 5

  constructor(id, x, y, path, bodyColour, trackColour, hitPoints, powerUp, enemies) {
    // a negative value causes the tracks to display incorrectly
    // too high will cause precision errors
    // to avoid either of these cases, start at 2^15
    const trackTickInitValue = 32768

    this.id = id
    this.x = x
    this.y = y
    this.path = path
    this.pathI = 0
    this.pathTick = 0
    this.ledTick = 0
    this.deadTick = 0
    this.hitTick = 0
    this.leftTrackTick = trackTickInitValue
    this.rightTrackTick = trackTickInitValue
    this.currentAction = 'wait'
    this.theta = 0
    this.bodyColour = bodyColour
    this.trackColour = trackColour
    this.hitPoints = hitPoints
    this.powerUp = powerUp
    this.enemies = enemies
  }

  update() {
    // path[0] = ['forwards', 0.5, 100]
    // path[0] = [direction, speed, pathTicks]

    if (this.hitPoints <= 0) {
      if (this.deadTick > BigTank.deadTickLimit) {
        score++
        enemies.delete(this.id)
        if (typeof this.powerUp !== "undefined") {
          powerUps.set(powerUpId, new PowerUp(powerUpId, this.x, this.y, this.powerUp.type, this.powerUp.hitPoints))
          powerUpId++
        }
      }

      this.currentAction = 'wait'
      if (this.deadTick % (BigTank.deadFlashTime * 2) > BigTank.deadFlashTime) {
        this.draw()
      }
      this.deadTick++
      return
    }

    if (this.isHit) {
      if (this.hitTick > BigTank.hitTickLimit) {
        this.isHit = false
        this.hitTick = 0
      }
      this.hitTick++
    }

    this.ledTick++

    if (this.pathI >= this.path.length) {
      this.currentAction = 'wait'
      if (this.isHit) {
        this.drawWhite()
      } else {
        this.draw()
      }
      return
    }

    this.currentAction = this.path[this.pathI][0]
    this.speed = this.path[this.pathI][1]
    const cosTheta = Math.cos(this.theta),
          sinTheta = Math.sin(this.theta)
    
    if (this.currentAction == 'forwards') {
      this.x -= this.speed * cosTheta
      this.y -= this.speed * sinTheta
      this.leftTrackTick += this.speed
      this.rightTrackTick += this.speed
    } else if (this.currentAction == 'left') {
      this.theta -= this.speed
      this.leftTrackTick -= this.speed * 50
      this.rightTrackTick += this.speed * 50
    } else if (this.currentAction == 'right') {
      this.theta += this.speed
      this.leftTrackTick += this.speed * 50
      this.rightTrackTick -= this.speed * 50
    }

    if (this.isHit) {
      this.drawWhite()
    } else {
      this.draw()
    }
    this.pathTick++

    const pathTicks = this.path[this.pathI][2]
    if (this.pathTick > pathTicks) {
      this.pathI++
      this.pathTick = 0
    }
  }

  draw() {
    const cosTheta = Math.cos(this.theta),
          sinTheta = Math.sin(this.theta),
          ledCosTheta = Math.cos(this.theta + 0.2),
          ledSinTheta = Math.sin(this.theta + 0.2)

    var ax = BigTank.a * cosTheta,
        ay = BigTank.a * sinTheta,
        bx = BigTank.b * sinTheta,
        by = BigTank.b * cosTheta,
        cx = BigTank.c * cosTheta,
        cy = BigTank.c * sinTheta,
        dx = BigTank.d * sinTheta,
        dy = BigTank.d * cosTheta,
        turretCentreX = BigTank.turretCentre * cosTheta,
        turretCentreY = BigTank.turretCentre * sinTheta,
        ledX = BigTank.led * ledCosTheta,
        ledY = BigTank.led * ledSinTheta

    ctx.save()

    ctx.strokeStyle = BigTank.bodyStrokeStyle

    ctx.beginPath()
    ctx.moveTo(this.x - ax - bx, this.y - ay + by)
    ctx.lineTo(this.x + ax - bx, this.y + ay + by)
    ctx.lineTo(this.x + ax + bx, this.y + ay - by)
    ctx.lineTo(this.x - ax + bx, this.y - ay - by)
    ctx.closePath()
    ctx.fillStyle = this.bodyColour
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(this.x - cx - bx, this.y - cy + by)
    ctx.lineTo(this.x + cx - bx, this.y + cy + by)
    ctx.lineTo(this.x + cx - dx, this.y + cy + dy)
    ctx.lineTo(this.x - cx - dx, this.y - cy + dy)
    ctx.closePath()
    ctx.fillStyle = this.trackColour
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(this.x - cx + bx, this.y - cy - by)
    ctx.lineTo(this.x + cx + bx, this.y + cy - by)
    ctx.lineTo(this.x + cx + dx, this.y + cy - dy)
    ctx.lineTo(this.x - cx + dx, this.y - cy - dy)
    ctx.closePath()
    ctx.fillStyle = this.trackColour
    ctx.fill()
    ctx.stroke()

    // n = track count
    const n = 5,
          leftTrackEndOffset = (this.leftTrackTick % 10) / 2.5,
          rightTrackEndOffset = (this.rightTrackTick % 10) / 2.5,
          leftTrackOffset = (this.leftTrackTick % 10) / 1.25,
          rightTrackOffset = (this.rightTrackTick % 10) / 1.25

    var leftTrackEndX = leftTrackEndOffset * cosTheta
    var leftTrackEndY = leftTrackEndOffset * sinTheta
    var rightTrackEndX = rightTrackEndOffset * cosTheta
    var rightTrackEndY = rightTrackEndOffset * sinTheta

    // left track front end
    ctx.beginPath()
    ctx.moveTo(this.x - cx - dx + leftTrackEndX, this.y - cy + dy + leftTrackEndY)
    ctx.lineTo(this.x - cx - bx + leftTrackEndX, this.y - cy + by + leftTrackEndY)
    ctx.closePath()
    ctx.stroke()

    // right track front end
    ctx.beginPath()
    ctx.moveTo(this.x - cx + bx + rightTrackEndX, this.y - cy - by + rightTrackEndY)
    ctx.lineTo(this.x - cx + dx + rightTrackEndX, this.y - cy - dy + rightTrackEndY)
    ctx.closePath()
    ctx.stroke()

    // left track back end
    ctx.beginPath()
    ctx.moveTo(this.x + ax - dx + leftTrackEndX, this.y + ay + dy + leftTrackEndY)
    ctx.lineTo(this.x + ax - bx + leftTrackEndX, this.y + ay + by + leftTrackEndY)
    ctx.closePath()
    ctx.stroke()

    // right track back end
    ctx.beginPath()
    ctx.moveTo(this.x + ax + dx + rightTrackEndX, this.y + ay - dy + rightTrackEndY)
    ctx.lineTo(this.x + ax + bx + rightTrackEndX, this.y + ay - by + rightTrackEndY)
    ctx.closePath()
    ctx.stroke()

    for (var i = 0; i < n; i++) {
      var leftTrackX = ((i / n) * (2 * ax)) + (leftTrackOffset * cosTheta)
      var leftTrackY = ((i / n) * (2 * ay)) + (leftTrackOffset * sinTheta)
      var rightTrackX = ((i / n) * (2 * ax)) + (rightTrackOffset * cosTheta)
      var rightTrackY = ((i / n) * (2 * ay)) + (rightTrackOffset * sinTheta)

      // left track
      ctx.beginPath()
      ctx.moveTo(this.x - ax - dx + leftTrackX, this.y - ay + dy + leftTrackY)
      ctx.lineTo(this.x - ax - bx + leftTrackX, this.y - ay + by + leftTrackY)
      ctx.closePath()
      ctx.stroke()

      // right track
      ctx.beginPath()
      ctx.moveTo(this.x - ax + bx + rightTrackX, this.y - ay - by + rightTrackY)
      ctx.lineTo(this.x - ax + dx + rightTrackX, this.y - ay - dy + rightTrackY)
      ctx.closePath()
      ctx.stroke()
    }

    ctx.beginPath()
    ctx.arc(this.x + turretCentreX, this.y + turretCentreY, BigTank.turretRadius, 0, Math.PI * 2, false)
    ctx.fillStyle = BigTank.turretColour
    ctx.fill()
    ctx.strokeStyle = BigTank.turretStrokeStyle
    ctx.stroke()

    if (this.ledTick % 70 >= 60) {
      ctx.beginPath()
      ctx.arc(this.x + ledX, this.y + ledY, 2, 0, Math.PI * 2, false)
      ctx.fillStyle = BigTank.ledColour
      ctx.fill()
    }

    ctx.restore()
  }

  drawWhite() {
    const cosTheta = Math.cos(this.theta),
          sinTheta = Math.sin(this.theta),
          ledCosTheta = Math.cos(this.theta + 0.2),
          ledSinTheta = Math.sin(this.theta + 0.2)

    var ax = BigTank.a * cosTheta,
        ay = BigTank.a * sinTheta,
        bx = BigTank.b * sinTheta,
        by = BigTank.b * cosTheta,
        cx = BigTank.c * cosTheta,
        cy = BigTank.c * sinTheta,
        dx = BigTank.d * sinTheta,
        dy = BigTank.d * cosTheta,
        turretCentreX = BigTank.turretCentre * cosTheta,
        turretCentreY = BigTank.turretCentre * sinTheta,
        ledX = BigTank.led * ledCosTheta,
        ledY = BigTank.led * ledSinTheta

    ctx.save()

    ctx.strokeStyle = 'white'

    ctx.beginPath()
    ctx.moveTo(this.x - ax - bx, this.y - ay + by)
    ctx.lineTo(this.x + ax - bx, this.y + ay + by)
    ctx.lineTo(this.x + ax + bx, this.y + ay - by)
    ctx.lineTo(this.x - ax + bx, this.y - ay - by)
    ctx.closePath()
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(this.x - cx - bx, this.y - cy + by)
    ctx.lineTo(this.x + cx - bx, this.y + cy + by)
    ctx.lineTo(this.x + cx - dx, this.y + cy + dy)
    ctx.lineTo(this.x - cx - dx, this.y - cy + dy)
    ctx.closePath()
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(this.x - cx + bx, this.y - cy - by)
    ctx.lineTo(this.x + cx + bx, this.y + cy - by)
    ctx.lineTo(this.x + cx + dx, this.y + cy - dy)
    ctx.lineTo(this.x - cx + dx, this.y - cy - dy)
    ctx.closePath()
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.stroke()

    // n = track count
    const n = 5,
          leftTrackEndOffset = (this.leftTrackTick % 10) / 2.5,
          rightTrackEndOffset = (this.rightTrackTick % 10) / 2.5,
          leftTrackOffset = (this.leftTrackTick % 10) / 1.25,
          rightTrackOffset = (this.rightTrackTick % 10) / 1.25

    var leftTrackEndX = leftTrackEndOffset * cosTheta
    var leftTrackEndY = leftTrackEndOffset * sinTheta
    var rightTrackEndX = rightTrackEndOffset * cosTheta
    var rightTrackEndY = rightTrackEndOffset * sinTheta

    // left track front end
    ctx.beginPath()
    ctx.moveTo(this.x - cx - dx + leftTrackEndX, this.y - cy + dy + leftTrackEndY)
    ctx.lineTo(this.x - cx - bx + leftTrackEndX, this.y - cy + by + leftTrackEndY)
    ctx.closePath()
    ctx.stroke()

    // right track front end
    ctx.beginPath()
    ctx.moveTo(this.x - cx + bx + rightTrackEndX, this.y - cy - by + rightTrackEndY)
    ctx.lineTo(this.x - cx + dx + rightTrackEndX, this.y - cy - dy + rightTrackEndY)
    ctx.closePath()
    ctx.stroke()

    // left track back end
    ctx.beginPath()
    ctx.moveTo(this.x + ax - dx + leftTrackEndX, this.y + ay + dy + leftTrackEndY)
    ctx.lineTo(this.x + ax - bx + leftTrackEndX, this.y + ay + by + leftTrackEndY)
    ctx.closePath()
    ctx.stroke()

    // right track back end
    ctx.beginPath()
    ctx.moveTo(this.x + ax + dx + rightTrackEndX, this.y + ay - dy + rightTrackEndY)
    ctx.lineTo(this.x + ax + bx + rightTrackEndX, this.y + ay - by + rightTrackEndY)
    ctx.closePath()
    ctx.stroke()

    for (var i = 0; i < n; i++) {
      var leftTrackX = ((i / n) * (2 * ax)) + (leftTrackOffset * cosTheta)
      var leftTrackY = ((i / n) * (2 * ay)) + (leftTrackOffset * sinTheta)
      var rightTrackX = ((i / n) * (2 * ax)) + (rightTrackOffset * cosTheta)
      var rightTrackY = ((i / n) * (2 * ay)) + (rightTrackOffset * sinTheta)

      // left track
      ctx.beginPath()
      ctx.moveTo(this.x - ax - dx + leftTrackX, this.y - ay + dy + leftTrackY)
      ctx.lineTo(this.x - ax - bx + leftTrackX, this.y - ay + by + leftTrackY)
      ctx.closePath()
      ctx.stroke()

      // right track
      ctx.beginPath()
      ctx.moveTo(this.x - ax + bx + rightTrackX, this.y - ay - by + rightTrackY)
      ctx.lineTo(this.x - ax + dx + rightTrackX, this.y - ay - dy + rightTrackY)
      ctx.closePath()
      ctx.stroke()
    }

    ctx.beginPath()
    ctx.arc(this.x + turretCentreX, this.y + turretCentreY, BigTank.turretRadius, 0, Math.PI * 2, false)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.stroke()

    if (this.ledTick % 70 >= 60) {
      ctx.beginPath()
      ctx.arc(this.x + ledX, this.y + ledY, 2, 0, Math.PI * 2, false)
      ctx.fillStyle = 'white'
      ctx.fill()
    }

    ctx.restore()
  }

  hit() {
    this.hitPoints--
    this.isHit = true
    this.hitTick = 0

    if (this.hitPoints == 0) {
      var dieAudio = new Audio('./die.mp3')
      dieAudio.volume = 0.75
      dieAudio.play()
      combo++
      if (combo > 1) {
        foreground.set(foregroundId, new PowerUpHit(foregroundId, this.x, this.y, 'Combo x' + combo, '255, 255, 255', '24px'))
        foregroundId++
      }
    } else {
      var hitAudio = new Audio('./hit.mp3')
      hitAudio.volume = 0.25
      hitAudio.play()
    }
  }
}
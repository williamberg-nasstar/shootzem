class Projectile {
  static airtime = 150

  constructor(id, targetX, targetY, currentX, currentY) {
    this.id = id
    this.targetX = targetX
    this.targetY = targetY
    this.startX = currentX
    this.startY = currentY
    this.currentX = currentX
    this.currentY = currentY
    this.fire2Audio = new Audio('./fire2.mp3')
    this.fire2Audio.volume = 0.3
    this.fire2Audio.play()
  }

  update() {
    const xRange = this.targetX - this.startX
    const xProgress = (this.currentX - this.startX) / xRange
    const zProgress = xProgress * Projectile.airtime

    this.currentX += xRange / Projectile.airtime
    this.currentY += (this.targetY - this.startY) / Projectile.airtime
    this.currentZ = (-2 * (zProgress * zProgress)) + (Projectile.airtime * 2 * zProgress)

    if (this.currentX >= this.targetX
      && this.currentY <= this.targetY) {
      this.fire2Audio.pause()

      enemies.forEach((enemy) => {
        if (Math.abs(this.currentX - enemy.x) < 30
          && Math.abs(this.currentY - enemy.y) < 30) {
          var quackAudio = new Audio('./quack.mp3')
          quackAudio.volume = 0.5
          quackAudio.play()
          enemy.hitPoints--
          enemy.isHit = true
          enemy.hitTick = 0
          score++
        }
      })

      projectiles.delete(this.id)

      crumps.set(crumpId, new Crump(crumpId, this.targetX, this.targetY))
      crumpId++
    } else {
      this.draw()
    }
  }

  draw() {
    const shadowOffset = ((2 * (this.currentZ * this.currentZ)) + (300 * this.currentZ)) / 5000000

    ctx.save()
    ctx.fillStyle = "rgba(0, 0, 0, " + (this.currentZ / 113000) + ")"
    ctx.beginPath()
    ctx.arc(this.currentX, this.currentY + shadowOffset, (this.currentZ / 500) * 1.5, 0, Math.PI * 2, false)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(this.currentX, this.currentY, (this.currentZ / 500) + 5, 0, Math.PI * 2, false)
    const octet = ("0" + (Math.floor(this.currentZ / 75) + 25).toString(16)).substr(-2,2)
    const color = '#' + octet + octet + octet
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  }
}

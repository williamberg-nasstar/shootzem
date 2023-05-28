class MuzzleFlash {
  static muzzleFlashDuration = 3

  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.alpha = 1
    this.muzzleFlashTick = 0
  }

  update() {
    if (this.alpha <= 0) {
      muzzleFlashes.delete(this.id)
    }
    this.alpha -= 0.2
    this.draw()

    this.muzzleFlashTick++
  }

  draw() {
    ctx.save()

    ctx.beginPath()
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")"
    ctx.fill()

    ctx.restore()
  }
}
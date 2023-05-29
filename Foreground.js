class PowerUpHit {
  static tickLimit = 100

  constructor(id, x, y, text, rgbColour, fontSize) {
    this.id = id
    this.x = x
    this.y = y
    this.text = text
    this.rgbColour = rgbColour
    this.fontSize = fontSize
    this.tick = 0
  }

  update() {
    this.draw()
    this.y -= 0.5

    if (this.tick > PowerUpHit.tickLimit) {
      foreground.delete(this.id)
    }

    this.tick++
  }

  draw() {
    ctx.save()
    ctx.font = this.fontSize + " menuText"
    const alpha = 1 - (this.tick / PowerUpHit.tickLimit)
    ctx.fillStyle = "rgba(" + this.rgbColour + ", " + alpha + ")"
    ctx.textAlign = 'center'
    ctx.fillText(this.text, this.x, this.y)
    ctx.restore()
  }
}

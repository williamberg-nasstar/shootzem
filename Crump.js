class Crump {
  static crumpDuration = 100
  static crumpFlashDuration = 2
  static crumpFlashFadeDuration = 4
  static bloomPointCount = 18
  static bloomSize = 12
  static bloomPointRandomScale = 4

  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.alpha = 1
    this.crumpFlashTick = 0
    this.boomAudio = new Audio('./boom2.mp3')
    this.boomAudio.volume = 0.75
    this.boomAudio.play()

    this.bloomPoints = []
    for (let i = 0; i < Crump.bloomPointCount; i++) {
      this.bloomPoints[i] = {}
      if (i%2==0) {
        this.bloomPoints[i].x = Math.sin((Math.PI * 2 / Crump.bloomPointCount) * (i + 1)) * (Crump.bloomSize + (Math.random() * Crump.bloomPointRandomScale)) + ((Math.random() - 0.5) * Crump.bloomPointRandomScale)
        this.bloomPoints[i].y = Math.cos((Math.PI * 2 / Crump.bloomPointCount) * (i + 1)) * (Crump.bloomSize + (Math.random() * Crump.bloomPointRandomScale)) + ((Math.random() - 0.5) * Crump.bloomPointRandomScale)
      } else {
        this.bloomPoints[i].x = Math.sin((Math.PI * 2 / Crump.bloomPointCount) * (i + 1)) * (Crump.bloomSize - (Math.random() * Crump.bloomPointRandomScale)) + ((Math.random() - 0.5) * Crump.bloomPointRandomScale)
        this.bloomPoints[i].y = Math.cos((Math.PI * 2 / Crump.bloomPointCount) * (i + 1)) * (Crump.bloomSize - (Math.random() * Crump.bloomPointRandomScale)) + ((Math.random() - 0.5) * Crump.bloomPointRandomScale)
      }
    }
  }

  update() {
    if (this.alpha <= 0) {
      crumps.delete(this.id)
    }
    this.alpha -= 1 / Crump.crumpDuration
    this.draw()

    this.crumpFlashTick++
  }

  draw() {
    ctx.save()

    ctx.beginPath()
    ctx.moveTo(this.x + this.bloomPoints[0].x, this.y + this.bloomPoints[0].y)
    for (let i = 1; i < this.bloomPoints.length; i++) {
      ctx.lineTo(this.x + this.bloomPoints[i].x, this.y + this.bloomPoints[i].y)
    }
    ctx.closePath()

    ctx.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")"
    ctx.fill()

    if (this.crumpFlashTick < Crump.crumpFlashDuration) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 40, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fillStyle = '#FFFFFF'
      ctx.fill()
    } else if (this.crumpFlashTick < Crump.crumpFlashFadeDuration) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 40, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.fill()
    }

    ctx.restore()
  }
}
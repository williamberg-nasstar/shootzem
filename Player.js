class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.oldXMouse = 0
    this.oldYMouse = 0
  }

  update() {
    this.draw()
  }

  draw() {
    ctx.save()

    // base
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()

    // fulcrum
    ctx.beginPath()
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false)
    ctx.fillStyle = '#DDDDDD'
    ctx.fill()


    var theta = Math.atan((yMouse - this.y) / (xMouse - this.x))
    if (xMouse - this.x < 0) {
      theta += Math.PI;
    }

    const b = 5 // barrel diameter
    const c = 15 // counterweight
    var d = 1 + (0.15 * Math.sqrt(Math.abs((xMouse - this.x) + (this.y - yMouse)))) // foreshortening factor
    d = d > 3 ? d : 3
    const a = 10 * d // fore barrel

    var ax = a * Math.cos(theta),
        ay = a * Math.sin(theta),
        bx = b * Math.sin(theta),
        by = b * Math.cos(theta),
        cx = c * Math.cos(theta),
        cy = c * Math.sin(theta)

    // barrel
    ctx.beginPath()
    ctx.moveTo(this.x - cx - bx, this.y - cy + by)
    ctx.lineTo(this.x + ax - bx, this.y + ay + by)
    ctx.lineTo(this.x + ax + bx, this.y + ay - by)
    ctx.lineTo(this.x - cx + bx, this.y - cy - by)
    ctx.closePath()
    ctx.fillStyle = 'black'
    ctx.fill()

    // counterweight
    ctx.beginPath()
    ctx.ellipse(this.x - cx, this.y - cy, 15/d, b, theta + Math.PI, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = 'black'
    ctx.fill()

    var dx = (xMouse - this.x),
        dy = (this.y - yMouse)

    // muzzle
    ctx.beginPath()
    ctx.ellipse(this.x + ax, this.y + ay, 15/d, b, theta + Math.PI, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = '#555555'
    ctx.fill()
    
    ctx.restore()
  }
}
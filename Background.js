class Background {
  constructor(vertices, color) {
    this.vertices = vertices
    this.color = color
  }

  update() {
    this.draw()
  }

  draw() {
    ctx.save()
    ctx.beginPath()

    ctx.moveTo(this.vertices[0][0], this.vertices[0][1])

    for (let i = 1; i < this.vertices.length; i++) {
      ctx.lineTo(this.vertices[i][0], this.vertices[i][1])
    }

    ctx.closePath()

    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
}

class Building1 {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.ifDrawBit = []
    for (var i = 0; i < 12; i++) {
      this.ifDrawBit[i] = Math.random() <= 0.5
    }
  }

  update() {
    this.draw()
  }

  draw() {
    ctx.save()

    ctx.lineWidth = 5
    ctx.fillStyle = '#f280d2'
    ctx.strokeStyle = '#b965bf'
    ctx.strokeRect(this.x, this.y, 50, 50)
    ctx.fillRect(this.x, this.y, 50, 50)
    ctx.lineWidth = 5
    ctx.fillStyle = '#fa4b74'
    ctx.strokeStyle = '#f26385'
    ctx.strokeRect(this.x + 10, this.y + 10, 30, 30)
    ctx.fillRect(this.x + 10, this.y + 10, 30, 30)

    ctx.lineWidth = 2
    ctx.fillStyle = '#6d6ff2'
    ctx.strokeStyle = '#f26385'
    if (this.ifDrawBit[0]) {
      ctx.strokeRect(this.x + 5, this.y + 5, 10, 5)
      ctx.fillRect(this.x + 5, this.y + 5, 10, 5)
    }
    if (this.ifDrawBit[1]) {
      ctx.strokeRect(this.x + 19, this.y + 5, 5, 5)
      ctx.fillRect(this.x + 19, this.y + 5, 5, 5)
    }
    if (this.ifDrawBit[2]) {
      ctx.strokeRect(this.x + 28, this.y + 5, 5, 5)
      ctx.fillRect(this.x + 28, this.y + 5, 5, 5)
    }
    if (this.ifDrawBit[3]) {
      ctx.strokeRect(this.x + 37, this.y + 5, 5, 5)
      ctx.fillRect(this.x + 37, this.y + 5, 5, 5)
    }
    if (this.ifDrawBit[4]) {
      ctx.strokeRect(this.x + 5, this.y + 15, 5, 5)
      ctx.fillRect(this.x + 5, this.y + 15, 5, 5)
    }
    if (this.ifDrawBit[5]) {
      ctx.strokeRect(this.x + 5, this.y + 26, 5, 5)
      ctx.fillRect(this.x + 5, this.y + 26, 5, 5)
    }
    if (this.ifDrawBit[6]) {
      ctx.strokeRect(this.x + 5, this.y + 37, 5, 5)
      ctx.fillRect(this.x + 5, this.y + 37, 5, 5)
    }
    if (this.ifDrawBit[7]) {
      ctx.strokeRect(this.x + 37, this.y + 15, 5, 5)
      ctx.fillRect(this.x + 37, this.y + 15, 5, 5)
    }
    if (this.ifDrawBit[8]) {
      ctx.strokeRect(this.x + 37, this.y + 26, 5, 5)
      ctx.fillRect(this.x + 37, this.y + 26, 5, 5)
    }
    if (this.ifDrawBit[9]) {
      ctx.strokeRect(this.x + 14, this.y + 37, 5, 5)
      ctx.fillRect(this.x + 14, this.y + 37, 5, 5)
    }
    if (this.ifDrawBit[10]) {
      ctx.strokeRect(this.x + 23, this.y + 37, 5, 5)
      ctx.fillRect(this.x + 23, this.y + 37, 5, 5)
    }
    if (this.ifDrawBit[11]) {
      ctx.strokeRect(this.x + 32, this.y + 37, 10, 5)
      ctx.fillRect(this.x + 32, this.y + 37, 10, 5)
    }

    ctx.restore()
  }
}

class Building2 {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.flairX = Math.floor(Math.random() * 3)
    this.flairY = Math.floor(Math.random() * 3)
  }

  update() {
    this.draw()
  }

  draw() {
    ctx.save()

    ctx.fillStyle = '#ef3e5c'
    ctx.strokeStyle = '#d48290'
    ctx.lineWidth = 3.3333333333333335
    ctx.fillRect(this.x + 0, this.y + 0, 52, 50)
    ctx.strokeRect(this.x + 0, this.y + 0, 52, 50)
    ctx.fillStyle = '#f47087'
    ctx.lineWidth = 0.3333333333333333
    ctx.beginPath()
    ctx.moveTo(this.x + 52, this.y + 0)
    ctx.lineTo(this.x + 52, this.y + 50)
    ctx.lineTo(this.x + 43, this.y + 42)
    ctx.lineTo(this.x + 43, this.y + 8)
    ctx.lineTo(this.x + 9, this.y + 8)
    ctx.lineTo(this.x + 0, this.y + 0)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#ff788f'
    ctx.strokeStyle = '#f15670'
    ctx.lineWidth = 3.3333333333333335
    ctx.fillRect(this.x + 9, this.y + 8, 33, 33)
    ctx.strokeRect(this.x + 9, this.y + 8, 33, 33)

    ctx.fillStyle = '#e53a36'
    ctx.strokeStyle = '#f45771'
    ctx.lineWidth = 1.6666666666666667
    ctx.fillRect(this.x + 13 + (this.flairX * 9.5), this.y + 12 + (this.flairY * 9.5), 6, 6)
    ctx.strokeRect(this.x + 13 + (this.flairX * 9.5), this.y + 12 + (this.flairY * 9.5), 6, 6)

    ctx.strokeStyle = '#f595a5'
    ctx.lineWidth = 3.3333333333333335
    ctx.strokeRect(this.x + 0, this.y + 50, 52, -51)

    ctx.restore()
   }
}

class Building3 {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
  }

  update() {
    this.draw()
  }

  draw() {
    ctx.save()

    var grdd1Ub2gj7gp = ctx.createLinearGradient(this.x + 82.14, this.y + 25, this.x + 21.43, this.y + 77.38)
    grdd1Ub2gj7gp.addColorStop(0, '#f47087')
    grdd1Ub2gj7gp.addColorStop(1, '#ef3e5c')
    ctx.fillStyle = grdd1Ub2gj7gp
    ctx.strokeStyle = '#f595a5'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(this.x + 100, this.y + 50)
    ctx.bezierCurveTo(this.x + 100, this.y + 77, this.x + 77, this.y + 100, this.x + 50, this.y + 100)
    ctx.bezierCurveTo(this.x + 22, this.y + 100, this.x + 0, this.y + 77, this.x + 0, this.y + 50)
    ctx.bezierCurveTo(this.x + 0, this.y + 22, this.x + 22, this.y + 0, this.x + 50, this.y + 0)
    ctx.bezierCurveTo(this.x + 77, this.y + 0, this.x + 100, this.y + 22, this.x + 100, this.y + 50)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#b71eda'
    ctx.strokeStyle = '#cc57f4'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(this.x + 70, this.y + 35)
    ctx.bezierCurveTo(this.x + 70, this.y + 40, this.x + 65, this.y + 45, this.x + 60, this.y + 45)
    ctx.bezierCurveTo(this.x + 54, this.y + 45, this.x + 50, this.y + 40, this.x + 50, this.y + 35)
    ctx.bezierCurveTo(this.x + 50, this.y + 29, this.x + 54, this.y + 25, this.x + 60, this.y + 25)
    ctx.bezierCurveTo(this.x + 65, this.y + 25, this.x + 70, this.y + 29, this.x + 70, this.y + 35)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.restore()
   }
}

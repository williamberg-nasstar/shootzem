class CircleEnemy {

  constructor(id, x, y, fabulous, enemyPath) {
    this.id = id
    this.startX = x
    this.startY = y
    this.currentX = x
    this.currentY = y
    this.fabulous = fabulous
    this.enemyPath = enemyPath
    this.enemyPathI = 0
    this.enemyPathCurrentSegmentDistance = 0
  }

  update() {
    if (this.enemyPathI >= this.enemyPath.length) {
      this.draw()
      return
    }

    this.enemyPathCurrentSegmentDistance++
    if (this.enemyPath[this.enemyPathI][0] == 'up') {
      this.currentY--
    } else if (this.enemyPath[this.enemyPathI][0] == 'down') {
      this.currentY++
    } else if (this.enemyPath[this.enemyPathI][0] == 'left') {
      this.currentX--
    } else if (this.enemyPath[this.enemyPathI][0] == 'right') {
      this.currentX++
    }

    if (this.enemyPath[this.enemyPathI][1] < this.enemyPathCurrentSegmentDistance) {
      this.enemyPathI++
      this.enemyPathCurrentSegmentDistance = 0
    }

    if (this.currentX <= playerX) {
      if (!failed) {
        const failedAudio = new Audio('./rickroll.mp3')
        failedAudio.volume = 1
        failedAudio.play()
      }
      failed = true
    }

    this.draw()
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.currentX, this.currentY, 20, 0, Math.PI * 2, false)
    if (this.fabulous) {
      ctx.fillStyle = '#'+Math.random().toString(16).substr(-6)
    } else {
      ctx.fillStyle = 'red'
    }
    ctx.fill()
  }
}

function createCircleEnemy(fabulous, startX, startY, enemyPath) {
  enemies.set(enemyId,
    new CircleEnemy(
    enemyId,
    startX,
    startY,
    fabulous,
    enemyPath))
  enemyId++
}
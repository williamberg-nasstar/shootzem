// audio clip that invokes loadedAudio() when it's loaded

// var audio = new Audio();
// // once this file loads, it will call loadedAudio()
// // the file will be kept by the browser as cache
// audio.addEventListener('canplaythrough', loadedAudio, false);
// audio.src = url;

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const canvasWidth = 800
const canvasHeight = 600

var xMouse, yMouse;

canvas.width = canvasWidth
canvas.height = canvasHeight

const playerX = 50
const playerY = canvasHeight - 50

const background = new Map()
const enemies = new Map()
const crumps = new Map()
const muzzleFlashes = new Map()
const projectiles = new Map()

var storyboardFrame = ''

var projectileCountLimit = 1
var crumpId = 1
var muzzleFlashId = 1
var enemyId = 1
var projectileId = 1
var backgroundId = 1

const player = new Player(playerX, playerY, 30, '#2222FF')
var score = 0
var tick = 0
var failed = false

for (var i = 430; i <= 680; i += 125) {
  for (var j = 90; j <= 500; j += 125) {
    background.set(backgroundId, new Building2(backgroundId, i, j))
    backgroundId++
  }
}

background.set(backgroundId, new Building3(backgroundId, 250, 50))
backgroundId++

const level1 = new Level1()

function draw() {
  level1.tick()

  ctx.save()

  ctx.fillStyle = '#ffb0bd'
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
  player.update()
  muzzleFlashes.forEach((muzzleFlash) => {
    muzzleFlash.update()
  })
  projectiles.forEach((projectile) => {
    projectile.update()
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

  tick++
}

// var blueprint_background = new Image();
// blueprint_background.src = 'future.png'; 
// blueprint_background.onload = function() {
//   background.set(3, new Background(
//     [
//       [canvasWidth, 150],
//       [canvasWidth, 250],
//       [canvasWidth - 600, 250],
//       [canvasWidth - 600, 150]
//     ],
//     ctx.createPattern(this, "repeat")
//   ))
// }

window.addEventListener('mousedown', (e) => {
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
})

window.addEventListener('mousemove', (e) => {
  xMouse = e.clientX
  yMouse = e.clientY
})

// game loop

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  draw()
}

animate()
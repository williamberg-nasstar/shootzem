class Level1 {

  static purpleTankBodyColour = '#791394'
  static purpleTankTrackColour = '#b063db'

  static tealTankBodyColour = '#0ecf8b'
  static tealTankTrackColour = '#6cd494'

  static redTankBodyColour = '#bf1b1b'
  static redTankTrackColour = '#c26161'

  constructor() {}

  static bigTankPath1 = [
    ['forwards', 1.5, 150],
    ['forwards', 1, 15],
    ['forwards', 0.5, 25],
    ['wait', 0, 50],
    ['left', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 125],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['right', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 40],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['right', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 40],
    ['forwards', 1, 25],
    ['forwards', 0.5, 15],
    ['wait', 0, 50],
    ['left', 0.01, 155],
    ['wait', 0, 50],
    ['forwards', 0.5, 25],
    ['forwards', 1, 15],
    ['forwards', 1.5, 500]
  ]

  static bigTankPath2 = [
    ['wait', 0, 100],
    ['forwards', 0.75, 2000]
  ]

  static slowTankPath = [
    ['forwards', 0.25, 5000]
  ]

  static wave1() {
    enemies.set(1, new BigTank(
      1,
      canvasWidth + 100,
      175,
      Level1.bigTankPath1,
      Level1.tealTankBodyColour,
      Level1.tealTankTrackColour,
      2,
      enemies
    ))

    enemies.set(2, new BigTank(
      2,
      canvasWidth + 100,
      300,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      enemies
    ))
  }

  static wave2() {
    enemies.set(3, new BigTank(
      3,
      canvasWidth + 100,
      175,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      enemies
    ))

    enemies.set(4, new BigTank(
      4,
      canvasWidth + 100,
      300,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      enemies
    ))
  }

  static wave3() {
    enemies.set(5, new BigTank(
      5,
      canvasWidth + 100,
      425,
      Level1.bigTankPath2,
      Level1.purpleTankBodyColour,
      Level1.purpleTankTrackColour,
      1,
      enemies
    ))
  }

  static wave4() {
    enemies.set(6, new VeryBigTank(
      6,
      canvasWidth + 100,
      428,
      Level1.slowTankPath,
      Level1.redTankBodyColour,
      Level1.redTankTrackColour,
      5,
      enemies
    ))
  }


  tick() {
    if (tick == 0) {
      Level1.wave1()
    }
    if (tick == 300) {
      Level1.wave2()
    }
    if (tick == 1000) {
      Level1.wave3()
    }
    if (tick == 1300) {
      Level1.wave4()
    }
  }

}

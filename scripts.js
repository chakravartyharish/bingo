  window.addEventListener("load", function () {
        var row = []
        var col = []
        var diag = []
        var isClicked = ["cell12"]

        const array = [
          "Ball Drop",
          "Balloons",
          "Calendar",
          "Champagne",
          "Clock",
          "Countdown",
          "Dancing",
          "December 31st",
          "Fireworks",
          "Games",
          "Hat",
          "Invitation",
          "Jan 1st",
          "Midnight",
          "Music",
          "Love",
          "NewYearEve",
          "Parade",
          "Resolution",
          "AuldSyne",
          "Sparklers",
          "Streamers",
          "Times Square",
          "Toast",
          "Tradition",
        ]

        const shuffle = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
          return array
        }

        console.log(shuffle(array))

        const newShuffledCard = () => {
          const shuffledArray = shuffle(array)
          for (let i = 0; i < 25; i++) {
            document.getElementById("cell" + i).innerHTML = shuffledArray[i]
            document.getElementById("cell" + i).style.backgroundColor = ""
          }
        }

        document
          .getElementById("newShuffledCard")
          .addEventListener("click", newShuffledCard)

        const cleanCard = () => {
          const shuffledArray = shuffle(array)
          for (let i = 0; i < 25; i++) {
            // document.getElementById("cell" + i).innerHTML = shuffledArray[i]
            document.getElementById("cell" + i).style.backgroundColor = ""
          }
          isClicked = ["cell12"]
          row = []
          col = []
          diag = []
        }

        document
          .getElementById("cleanCard")
          .addEventListener("click", cleanCard)

        let btncounter = document.querySelector("#btncounter")
        btncounter.addEventListener("click", function () {
          localStorage.setItem("count", 0)
          localStorage.removeItem("count")
          updateCount()
        })

        function getCount() {
          let count = Number(localStorage.getItem("count")) || 1
          localStorage.setItem("count", count + 1)
          return count
        }

        function updateCount() {
          let count = Number(localStorage.getItem("count")) || 0
          if (count > 0) {
            document.getElementById(
              "name"
            ).innerHTML = `Congratulations! You have won ${count - 1} Bingo!`
          } else {
            document.getElementById("name").innerHTML = ``
          }
        }

        updateCount()

        function confirmAction(count) {
          windowReload1()
          let confirmAction = confirm("Bingo!!! Would you like to continue ?")
          if (confirmAction) {
            windowReload()
            getCount()
            updateCount()
          } else {
            windowReload1()
            getCount()
            updateCount()
            balloons()
            Confetti()
            localStorage.setItem("count", 0)
          }
        }

        // window reload if the game is over
        const windowReload = () => {
          setTimeout(function () {
            window.location.reload()
          }, 10)
        }

        const windowReload1 = () => {
          setTimeout(function () {
            window.location.reload()
          }, 5000)
        }

        // here is the code for the color palette of the players
        // and the click event for each player to change the color of the cell when clicked on it.
        document.getElementById("ClickPurple").classList.add("ClickActive")
        document.getElementById("ClickPurple").style.backgroundColor = "purple"
        document.getElementById("ClickWhite").style.backgroundColor = "white"
        document.getElementById("ClickRed").style.backgroundColor = "red"
        document.getElementById("ClickBlue").style.backgroundColor = "blue"
        document.getElementById("ClickWhite").style.backgroundColor = "white"
        document.getElementById("ClickGreen").style.backgroundColor = "green"
        document.getElementById("ClickOrange").style.backgroundColor = "orange"

        function clickColor(cell) {
          document.querySelector(".ClickActive").classList.remove("ClickActive")
          document.getElementById(cell.id).classList.add("ClickActive")
        }

        // here is the code for the click event for each cell to change the color of the cell when clicked on it.
        document
          .getElementById("ClickRed")
          .addEventListener("click", function () {
            clickColor(this)
          })
        document
          .getElementById("ClickBlue")
          .addEventListener("click", function () {
            clickColor(this)
          })
        document
          .getElementById("ClickWhite")
          .addEventListener("click", function () {
            clickColor(this)
          })
        document
          .getElementById("ClickGreen")
          .addEventListener("click", function () {
            clickColor(this)
          })
        document
          .getElementById("ClickPurple")
          .addEventListener("click", function () {
            clickColor(this)
          })
        document
          .getElementById("ClickOrange")
          .addEventListener("click", function () {
            clickColor(this)
          })

        // get the color of the active player and set it to the clicked cell
        // and add it to the array of clicked cells to check for a winner later on
        const clickCell = (cell) => {
          cell.style.backgroundColor =
            document.querySelector(".ClickActive").style.backgroundColor

          isClicked.push(cell.id)
        }

        // check if all elements of target are in arr (isClicked) and return true if so
        const compareArray = (arr, target) =>
          target.every((v) => arr.includes(v))

        // balloons animation
        const balloons = () => {
          var canvas = document.createElement("canvas")
          var container = document.querySelector(".canvasRel")
          container.appendChild(canvas)

          let Balloon, balloons, options, sketch, sortBySize

          sketch = Sketch.create()

          balloons = []

          options = {
            amount: 50,
            sizeMin: 1,
            sizeMax: 10,
          }

          sortBySize = function (a, b) {
            if (a.size < b.size) {
              return 1
            }
            if (a.size > b.size) {
              return -1
            }
            return 0
          }

          Balloon = function (config) {
            this.x = config.x
            this.y = config.y
            this.vx = 0
            this.vy = 0
            return (this.size = config.size)
          }

          Balloon.prototype.update = function () {
            let dt
            dt = sketch.dt <= 0 ? 0.001 : sketch.dt / 16
            this.vx += this.size * (random(-1, 1) / 1000)
            this.x += this.vx * dt
            this.vy -= this.size / 2000
            this.y += this.vy * dt
            if (this.y <= this.size * -0.9) {
              this.size = random(options.sizeMin, options.sizeMax)
              this.x = random(sketch.width)
              this.vx = 0
              this.y = sketch.height + this.size * 10.2
              return (this.vy = 0)
            }
          }

          Balloon.prototype.render = function () {
            function getRandomColor() {
              let r = (255 * Math.random()) | 0,
                g = (255 * Math.random()) | 0,
                b = (255 * Math.random()) | 0,
                mt = (255 * Math.random()) | 0,
                ml = (255 * Math.random()) | 0,
                dur = (255 * Math.random()) | 0
              return (
                "rgb(" +
                r +
                "," +
                g +
                "," +
                b +
                ", " +
                mt +
                " + " +
                ml +
                " + " +
                dur +
                ")"
              )
            }
            sketch.strokeStyle = getRandomColor()
            sketch.stroke()
            sketch.save()
            sketch.translate(this.x, this.y)
            sketch.beginPath()
            sketch.moveTo(this.size * -0.5, 0)
            sketch.bezierCurveTo(
              this.size * -5,
              this.size * -1,
              this.size * -6,
              this.size * -10,
              0,
              this.size * -10
            )
            sketch.bezierCurveTo(
              this.size * 6,
              this.size * -10,
              this.size * 5,
              this.size * -1,
              this.size * 0.5,
              0
            )
            sketch.lineTo(this.size * 0.8, this.size * 0.7)
            sketch.lineTo(this.size * -0.8, this.size * 0.7)
            sketch.closePath()
            sketch.fillStyle = getRandomColor()
            sketch.stroke()
            sketch.lineWidth = this.size * 0.4
            sketch.stroke()
            sketch.restore()
            sketch.save()
            sketch.translate(
              this.x - this.size * 1.75,
              this.y - this.size * 7.5
            )
            sketch.rotate(PI / 4)
            sketch.scale(1, 2)
            sketch.beginPath()
            sketch.arc(0, 0, this.size * 0.5, 0, TWO_PI)
            sketch.fillStyle = "hsla( 210, 90%, 60% )"
            sketch.fill()
            return sketch.restore()
          }

          sketch.setup = function () {
            function getRndColor() {
              let rr = (255 * Math.random()) | 0,
                gg = (255 * Math.random()) | 0,
                bb = (255 * Math.random()) | 0
              return "rgb(" + rr + "," + gg + "," + bb + ")"
            }
            let i, _results
            sketch.lineJoin = "round"
            sketch.strokeStyle = getRndColor()
            sketch.stroke()
            i = options.amount
            _results = []
            while (i--) {
              _results.push(
                balloons.push(
                  new Balloon({
                    x: random(sketch.width),
                    y: random(sketch.height),
                    size: random(options.sizeMin, options.sizeMax),
                  })
                )
              )
            }
            return _results
          }

          sketch.clear = function () {
            return sketch.clearRect(0, 0, sketch.width, sketch.height)
          }

          sketch.update = function () {
            let i, _results
            balloons.sort(sortBySize)
            i = balloons.length
            _results = []
            while (i--) {
              _results.push(balloons[i].update(i))
            }
            return _results
          }

          sketch.draw = function () {
            let i, _results
            i = balloons.length
            _results = []
            while (i--) {
              _results.push(balloons[i].render(i))
            }
            return _results
          }
        }

        // confetti animation
        function Confetti() {
          const usedColors = [
            "#FF6633",
            "#FFB399",
            "#FF33FF",
            "#FFFF99",
            "#00B3E6",
            "#E6B333",
            "#3366E6",
            "#999966",
            "#99FF99",
            "#B34D4D",
            "#80B300",
            "#809900",
            "#E6B3B3",
            "#6680B3",
            "#66991A",
            "#FF99E6",
            "#CCFF1A",
            "#FF1A66",
            "#E6331A",
            "#33FFCC",
            "#66994D",
            "#B366CC",
            "#4D8000",
            "#B33300",
            "#CC80CC",
            "#66664D",
            "#991AFF",
            "#E666FF",
            "#4DB3FF",
            "#1AB399",
            "#E666B3",
            "#33991A",
            "#CC9999",
            "#B3B31A",
            "#00E680",
            "#4D8066",
            "#809980",
            "#E6FF80",
            "#1AFF33",
            "#999933",
            "#FF3380",
            "#CCCC00",
            "#66E64D",
            "#4D80CC",
            "#9900B3",
            "#E64D66",
            "#4DB380",
            "#FF4D4D",
            "#99E6E6",
            "#6666FF",
          ]
          var canvas = document.createElement("canvas")

          const ctx = canvas.getContext("2d")

          var container = document.querySelector(".canvasRel")
          container.appendChild(canvas)

          const maxNumber = 200
          const arrConfetti = []
          let W = window.innerWidth
          let H = window.innerHeight

          function confettiSize(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from)
          }

          function confettiParticle() {
            this.x = Math.random() * W // x
            this.y = Math.random() * H - H // y
            this.r = confettiSize(7, 7) // radius
            this.d = Math.random() * maxNumber + 11
            this.color =
              usedColors[Math.floor(Math.random() * usedColors.length)]
            this.tilt = Math.floor(Math.random() * 33) - 11
            this.tiltAngleIncremental = Math.random() * 0.07 + 0.05
            this.tiltAngle = 0.0

            this.design = function () {
              ctx.beginPath()
              ctx.lineWidth = this.r
              ctx.strokeStyle = this.color
              ctx.moveTo(this.x + this.tilt + this.r, this.y)
              ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r)
              return ctx.stroke()
            }
          }

          window.addEventListener(
            "resize",
            function () {
              W = window.innerWidth
              H = window.innerHeight
              canvas.width = window.innerWidth
              canvas.height = window.innerHeight
            },
            false
          )

          function design() {
            const results = []
            requestAnimationFrame(design)
            ctx.clearRect(1.0, 1.0, window.innerWidth, window.innerHeight)

            for (let i = 0; i < maxNumber; i++) {
              results.push(arrConfetti[i].design())
            }

            let particle = {}
            let remainingFlakes = 0
            for (let i = 0; i < maxNumber; i++) {
              particle = arrConfetti[i]
              particle.tiltAngle += particle.tiltAngleIncremental
              particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2
              particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15
              if (particle.y <= H) remainingFlakes++
              if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                particle.x = Math.random() * W
                particle.y = -10
                particle.tilt = Math.floor(Math.random() * 10) - 50
              }
            }
            return results
          }

          for (let i = 0; i < maxNumber; i++) {
            arrConfetti.push(new confettiParticle())
          }

          canvas.width = W
          canvas.height = H
          design()
        }

        // here is the code for checking the row of the clicked cell and comparing it the isClicked array to see if the row is already clicked or not
        // and generating the confetti animation if the row is complete

        const myHarry = true
        const checkRow = () => {
          if (
            compareArray(isClicked, [
              "cell0",
              "cell1",
              "cell2",
              "cell3",
              "cell4",
            ])
          ) {
            //alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell5",
              "cell6",
              "cell7",
              "cell8",
              "cell9",
            ])
          ) {
            if (reloadCount === 1) {
              //alert(`" Bingo!!! you won bingo " ${reloadCount} " times!!!"`)
            }

            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell10",
              "cell11",
              "cell12",
              "cell13",
              "cell14",
            ])
          ) {
            // alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell15",
              "cell16",
              "cell17",
              "cell18",
              "cell19",
            ])
          ) {
            //alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell20",
              "cell21",
              "cell22",
              "cell23",
              "cell24",
            ])
          ) {
            // alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          }
        }

        for (let i = 0; i < 25; i++) {
          document
            .getElementById("cell" + i)
            .addEventListener("click", function () {
              clickCell(this)

              if (
                "cell" + i === "cell0" ||
                "cell" + i === "cell1" ||
                "cell" + i === "cell2" ||
                "cell" + i === "cell3" ||
                "cell" + i === "cell4"
              ) {
                checkRow()
              } else if (
                "cell" + i === "cell5" ||
                "cell" + i === "cell6" ||
                "cell" + i === "cell7" ||
                "cell" + i === "cell8" ||
                "cell" + i === "cell9"
              ) {
                checkRow()
              } else if (
                "cell" + i === "cell10" ||
                "cell" + i === "cell11" ||
                "cell" + i === "cell12" ||
                "cell" + i === "cell13" ||
                "cell" + i === "cell14"
              ) {
                checkRow()
              } else if (
                "cell" + i === "cell15" ||
                "cell" + i === "cell16" ||
                "cell" + i === "cell17" ||
                "cell" + i === "cell18" ||
                "cell" + i === "cell19"
              ) {
                checkRow()
              } else if (
                "cell" + i === "cell20" ||
                "cell" + i === "cell21" ||
                "cell" + i === "cell22" ||
                "cell" + i === "cell23" ||
                "cell" + i === "cell24"
              ) {
                checkRow()
              }
            })
        }

        // here is the code for checking the column of the clicked cell
        //and comparing it with the isClicked array to see if the column is already clicked or not

        const checkCol = () => {
          if (
            compareArray(isClicked, [
              "cell0",
              "cell5",
              "cell10",
              "cell15",
              "cell20",
            ])
          ) {
            // alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell1",
              "cell6",
              "cell11",
              "cell16",
              "cell21",
            ])
          ) {
            //alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell2",
              "cell7",
              "cell12",
              "cell17",
              "cell22",
            ])
          ) {
            //alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell3",
              "cell8",
              "cell13",
              "cell18",
              "cell23",
            ])
          ) {
            //alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell6",
              "cell7",
              "cell8",
              "cell11",
              "cell12",
              "cell13",
              "cell16",
              "cell17",
              "cell18",
            ])
          ) {
            // alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          } else if (
            compareArray(isClicked, [
              "cell4",
              "cell9",
              "cell14",
              "cell19",
              "cell24",
            ])
          ) {
            //alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          }
        }

        for (let i = 0; i < 25; i++) {
          document
            .getElementById("cell" + i)
            .addEventListener("click", function () {
              clickCell(this)

              if (
                "cell" + i === "cell0" ||
                "cell" + i === "cell5" ||
                "cell" + i === "cell10" ||
                "cell" + i === "cell15" ||
                "cell" + i === "cell20"
              ) {
                checkCol()
              } else if (
                "cell" + i === "cell1" ||
                "cell" + i === "cell6" ||
                "cell" + i === "cell11" ||
                "cell" + i === "cell16" ||
                "cell" + i === "cell21"
              ) {
                checkCol()
              } else if (
                "cell" + i === "cell2" ||
                "cell" + i === "cell7" ||
                "cell" + i === "cell12" ||
                "cell" + i === "cell17" ||
                "cell" + i === "cell22"
              ) {
                checkCol()
              } else if (
                "cell" + i === "cell3" ||
                "cell" + i === "cell8" ||
                "cell" + i === "cell13" ||
                "cell" + i === "cell18" ||
                "cell" + i === "cell23"
              ) {
                checkCol()
              } else if (
                "cell" + i === "cell4" ||
                "cell" + i === "cell9" ||
                "cell" + i === "cell14" ||
                "cell" + i === "cell19" ||
                "cell" + i === "cell24"
              ) {
                checkCol()
              } else if (
                "cell" + i === "cell6" ||
                "cell" + i === "cell7" ||
                "cell" + i === "cell8" ||
                "cell" + i === "cell11" ||
                "cell" + i === "cell12" ||
                "cell" + i === "cell13" ||
                "cell" + i === "cell16" ||
                "cell" + i === "cell17" ||
                "cell" + i === "cell18"
              ) {
                checkCol()
              }
            })
        }

        // here is the code for checking the diagonal of the clicked cell and comparing it with the isClicked array to see if the diagonal is already clicked or not
        const checkLeftDiag = () => {
          if (
            compareArray(isClicked, [
              "cell0",
              "cell6",
              "cell12",
              "cell18",
              "cell24",
            ])
          ) {
            // alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          }
        }

        const checkRightDiag = () => {
          if (
            compareArray(isClicked, [
              "cell4",
              "cell8",
              "cell12",
              "cell16",
              "cell20",
            ])
          ) {
            //alert(`" Bingo!!! you won bingo " ${reloadCount} " times."`)
            confirmAction()
          }
        }

        for (let i = 0; i < 25; i++) {
          document
            .getElementById("cell" + i)
            .addEventListener("click", function () {
              clickCell(this)

              if (
                "cell" + i === "cell0" ||
                "cell" + i === "cell6" ||
                "cell" + i === "cell12" ||
                "cell" + i === "cell18" ||
                "cell" + i === "cell24"
              ) {
                checkLeftDiag()
              }
              if (
                "cell" + i === "cell4" ||
                "cell" + i === "cell8" ||
                "cell" + i === "cell12" ||
                "cell" + i === "cell16" ||
                "cell" + i === "cell20"
              ) {
                checkRightDiag()
              }
            })
        }

        // to clean the card after the game is over and shuffle the cards again

        // cleanCard()
        newShuffledCard()

        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        document.getElementById("date").innerHTML = date + "   " + time
      })

      // const checkRow = () => {
      //   for (let i = 0; i < 5; i++) {
      //     row = []
      //     for (let j = 0; j < 5; j++) {
      //       row.push(
      //         document.getElementById("cell" + i + j).style.backgroundColor
      //       )
      //     }
      //     if (compareArray(isClicked, row)) {
      //       for (let j = 0; j < 5; j++) {
      //         document.getElementById("cell" + i + j).style.backgroundColor =
      //           "white"
      //       }
      //       windowReload()
      //     }
      //   }
      // }

      // const randomArrayShuffle = (array) => {
      //   var currentIndex = array.length,
      //     temporaryValue,
      //     randomIndex
      //   while (0 !== currentIndex) {
      //     randomIndex = Math.floor(Math.random() * currentIndex)
      //     currentIndex -= 1
      //     temporaryValue = array[currentIndex]
      //     array[currentIndex] = array[randomIndex]
      //     array[randomIndex] = temporaryValue
      //   }
      //   return array
      // }
      // var data = ["Ball Drop", "Balloons", "Calendar", "Champagne", "Clock"]
      // console.log(randomArrayShuffle(data))

      // const checkCol = () => {
      //   for (let i = 0; i < 5; i++) {
      //     col = []
      //     for (let j = 0; j < 5; j++) {
      //       col.push(
      //         document.getElementById("cell" + j + i).style.backgroundColor
      //       )
      //     }
      //     if (compareArray(isClicked, col)) {
      //       for (let j = 0; j < 5; j++) {
      //         document.getElementById("cell" + j + i).style.backgroundColor =
      //           "white"
      //       }
      //       windowReload()
      //     }
      //   }
      // }

      // const randomColor = () => {
      //   const letters = "0123456789ABCDEF"
      //   let color = "#"
      //   for (let i = 0; i < 6; i++) {
      //     color += letters[Math.floor(Math.random() * 16)]
      //   }
      //   return color
      // }

      // const checkDiag = () => {
      //   diag = []
      //   for (let i = 0; i < 5; i++) {
      //     diag.push(
      //       document.getElementById("cell" + i + i).style.backgroundColor
      //     )
      //   }
      //   if (compareArray(isClicked, diag)) {
      //     for (let i = 0; i < 5; i++) {
      //       document.getElementById("cell" + i + i).style.backgroundColor =
      //         "white"
      //     }
      //     windowReload()
      //   }

      //   diag = []
      //   for (let i = 0; i < 5; i++) {
      //     diag.push(
      //       document.getElementById("cell" + i + (4 - i)).style
      //         .backgroundColor
      //     )
      //   }
      //   if (compareArray(isClicked, diag)) {
      //     for (let i = 0; i < 5; i++) {
      //       document.getElementById(
      //         "cell" + i + (4 - i)
      //       ).style.backgroundColor = "white"
      //     }
      //     windowReload()
      //   }
      // }

      // const checkWin = () => {
      //   checkRow()
      //   checkCol()
      //   checkDiag()
      // }

      // for (let i = 0; i < 25; i++) {
      //   document.getElementById("cell" + i).addEventListener("click", function () {
      //     clickCell(this)
      //     checkWin()
      //   })
      // }

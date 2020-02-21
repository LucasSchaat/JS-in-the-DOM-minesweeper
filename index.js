const landing = document.querySelector('.start-button-box')
const board = document.getElementsByTagName('table')
let firstMove = true
let matrix
let mines
let flagged = []
let clicks = 0
let restarting = false
let id

function clicked(number) {
    matrix = number
    id = 0

    if(!restarting){
        let tableBody = document.createElement('tbody')
        let tableRow = document.createElement('tr')
    
        for (let i = 0; i < matrix; i++) {
            tableRow = document.createElement('tr')
            for (let j = 0; j < matrix; j++) {
                let square = document.createElement('td')
                square.classList.add(`${id}`)
                square.classList.add('notClicked')
                square.innerText = `${id}`
                id++;
                square.addEventListener('click', clickEvent)
                square.addEventListener('contextmenu', rightClick)
                tableRow.appendChild(square)
            }
            tableBody.appendChild(tableRow)
        }    
        document.querySelector('table').appendChild(tableBody)
    } else {
        for (let i=0; i<matrix * matrix; i++){
            document.getElementsByClassName(i)[0].addEventListener('click', clickEvent)
            document.getElementsByClassName(i)[0].addEventListener('contextmenu', rightClick)
            document.getElementsByClassName(i)[0].classList.add('notClicked')
            document.getElementsByClassName(i)[0].classList.remove('mine')
            document.getElementsByClassName(i)[0].classList.remove('flagged')
            document.getElementsByClassName(i)[0].classList.remove('question')
            id = matrix * matrix
        }
    }

    mines = []
    if (id === 81) {
        while (mines.length < 10) {
            let num = Math.floor(Math.random() * 81)
            if (mines.indexOf(num) === -1) {
                mines.push(num)
            }
        }
    } else if (id === 256) {
        while (mines.length < 40) {
            let num = Math.floor(Math.random() * 256)
            if (mines.indexOf(num) === -1) {
                mines.push(num)
            }
        }
    } else {
        while (mines.length < 99) {
            let num = Math.floor(Math.random() * 576)
            if (mines.indexOf(num) === -1) {
                mines.push(num)
            }
        }
    }
    
    let noMines = []
    for(let i = 0; i < matrix * matrix; i++){
        noMines.push(i)
    }

    console.log(noMines)
    console.log(mines)
    mines.forEach(element => {
        console.log(element)
        let mine = document.getElementsByClassName(element)
        console.log(mine[0])
        mine[0].classList.add('mine')
        mine[0].innerText = '*'
        let index = noMines.indexOf(element)
        noMines.splice(index, 1)
    })

    let count = 0
    noMines.forEach(element => {
        count = 0
        let square = document.getElementsByClassName(element)
        if (element === 0) {
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element === matrix - 1) {
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix - 1)[0].classList.contains('mine') === true) count +=1
        } else if (element === (matrix * (matrix - 1))) {
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element === (matrix * matrix) - 1) {
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix - 1)[0].classList.contains('mine') === true) count +=1
        } else if (element/matrix < 1) {
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element%matrix === 0) {
            if(document.getElementsByClassName(element - matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element%matrix === matrix - 1) {
            if(document.getElementsByClassName(element - matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix - 1)[0].classList.contains('mine') === true) count +=1
        } else if (element/matrix > matrix - 1) {
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix + 1)[0].classList.contains('mine') === true) count +=1
        } else {
            if(document.getElementsByClassName(element - matrix - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - matrix + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + matrix + 1)[0].classList.contains('mine') === true) count +=1
        }
        square[0].innerText = `${count}`
    })

    landing.style.visibility = 'hidden'
}

function clickEvent() {
    let square = document.getElementsByClassName(`${event.srcElement.classList[0]}`)
    square = square[0]
	if (firstMove === true) {
		firstMove = false;
		if (square.innerText === "*") {
			alert(
				`Happy Birthday! You chose a mine on your first try making you very unlucky. Good news, I won't let you lose like this on your first try, so choose another square!`
			);
		} else if (square.innerText === "0"){
            square.innerText = " ";
            let currentId = +square.classList[0]
            if (currentId === 0) {
                if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else if (currentId === matrix - 1) {
                if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else if (currentId === matrix * (matrix - 1)) {
                if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else if (currentId === matrix * matrix - 1) {
                if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else if (currentId / matrix < 1) {
                if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else if (currentId % matrix === 0) {
                if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else if (currentId % matrix === matrix - 1) {
                if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else if (currentId / matrix > matrix - 1) {
                if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                }
            } else {
                if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                }
                if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                    }
                    }
                if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                    }
                if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                    }
                    }
                if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                    }
                    }
                if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                    }
                    }
                if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                    }
                    }
                if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
                    if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                        document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                    }
                    }
            }
        } else {
            square.classList.remove("notClicked");
        }
	} else if (square.innerText === "*") {
		square.classList.remove("notClicked");
		square.classList.add("lost");
		alert("You lose!");
		for (let i = 0; i < matrix * matrix; i++) {
            let eachSquare = document.getElementsByClassName(`${i}`);
            eachSquare = eachSquare[0]
			eachSquare.removeEventListener("click", clickEvent);
        }
        mines.forEach(mine => {
            document.getElementsByClassName(mine)[0].classList.remove('notClicked')
        })
	} else if (square.innerText === "0") {
        square.innerText = " ";
        let currentId = +square.classList[0]
        if (currentId === 0) {
            if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else if (currentId === matrix - 1) {
            if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else if (currentId === matrix * (matrix - 1)) {
            if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else if (currentId === matrix * matrix - 1) {
            if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else if (currentId / matrix < 1) {
            if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
                if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else if (currentId % matrix === 0) {
            if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else if (currentId % matrix === matrix - 1) {
            if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else if (currentId / matrix > matrix - 1) {
            if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
        } else {
            if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - matrix + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix - 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix - 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix - 1)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix)[0].dispatchEvent(new Event("click"))
                }
                }
            if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText !== "*"){
                document.getElementsByClassName(currentId + matrix + 1)[0].classList.remove("notClicked")
            if (document.getElementsByClassName(currentId + matrix + 1)[0].innerText === "0"){
                    document.getElementsByClassName(currentId + matrix + 1)[0].dispatchEvent(new Event("click"))
                }
                }
        }
		square.classList.remove("notClicked");
	} else {
		square.classList.remove("notClicked");
    }
    checkWinner()
};

function rightClick(){
    event.preventDefault()
    let square = document.getElementsByClassName(`${event.srcElement.classList[0]}`)
    square = square[0]
    if(!square.classList.contains('question') && !square.classList.contains('flagged')) {
        square.classList.add('flagged')
        square.removeEventListener("click", clickEvent);
    } else if (square.classList.contains('flagged')) {
        square.classList.toggle('flagged')
        square.classList.add('question')
        square.removeEventListener("click", clickEvent);
    } else {
        square.classList.toggle('question')
        square.addEventListener("click", clickEvent);
    }
    console.log('hit')
}

function checkWinner() {
    clicks = 0
    for (let i=0; i < matrix * matrix; i++) {
        if (!document.getElementsByClassName(i)[0].classList.contains('notClicked') && !document.getElementsByClassName(i)[0].classList.contains('lost')){
            clicks += 1
        }
    }
    if (clicks === matrix * matrix - mines.length){
        document.querySelector(".winner").style.visibility = "visible";
    }
    console.log(clicks)
    console.log('checking for a winner')
}

function restart(){
    restarting = true
    landing.style.visibility = "visible";
    document.querySelector('.winner').style.visibility = "hidden"
}

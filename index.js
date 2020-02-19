const landing = document.querySelector('.start-button-box')
const board = document.getElementsByTagName('table')
let firstMove = true

function clicked(num) {
    let id = 0
    let tableBody = document.createElement('tbody')
    let tableRow = document.createElement('tr')

    for (let i = 0; i < num; i++) {
        tableRow = document.createElement('tr')
        for (let j = 0; j < num; j++) {
            let square = document.createElement('td')
            square.classList.add(`${id}`)
            square.classList.add('notClicked')
            square.innerText = `${id}`
            square.addEventListener('click', event => {
                if (firstMove === true) {
                    firstMove = false
                    if(square.innerText === '*'){
                        alert('Choose a different square!')
                    }
                } else if(square.innerText == 0){
                    square.innerText = ' '
                }
                square.classList.remove('notClicked')
            })
            id++
            tableRow.appendChild(square)
        }
        tableBody.appendChild(tableRow)
    }    
    document.querySelector('table').appendChild(tableBody)

    let mines = []
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
    for(let i = 0; i < num * num; i++){
        noMines.push(i)
    }

    mines.forEach(element => {
        let mine = document.getElementsByClassName(element)
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
            if(document.getElementsByClassName(element + num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element === num - 1) {
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num - 1)[0].classList.contains('mine') === true) count +=1
        } else if (element === (num * (num - 1))) {
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element === (num * num) - 1) {
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num - 1)[0].classList.contains('mine') === true) count +=1
        } else if (element/num < 1) {
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element%num === 0) {
            if(document.getElementsByClassName(element - num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num + 1)[0].classList.contains('mine') === true) count +=1
        } else if (element%num === num - 1) {
            if(document.getElementsByClassName(element - num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num - 1)[0].classList.contains('mine') === true) count +=1
        } else if (element/num > num - 1) {
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num + 1)[0].classList.contains('mine') === true) count +=1
        } else {
            if(document.getElementsByClassName(element - num - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - num + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num - 1)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num)[0].classList.contains('mine') === true) count +=1
            if(document.getElementsByClassName(element + num + 1)[0].classList.contains('mine') === true) count +=1
        }
        square[0].innerText = `${count}`
    })

    landing.style.display = 'none'
}



const landing = document.querySelector('.start-button-box')
const board = document.getElementsByTagName('table')

function clicked(num) {
    let id = 0
    let tableBody = document.createElement('tbody')
    let tableRow = document.createElement('tr')

    for (let i = 0; i < num; i++) {
        tableRow = document.createElement('tr')
        for (let j = 0; j < num; j++) {
            let square = document.createElement('td')
            square.classList.add(`${id}`)
            square.innerText = `${id}`
            id++
            tableRow.appendChild(square)
        }
        tableBody.appendChild(tableRow)
    }    
    document.querySelector('table').appendChild(tableBody)

    let mines = []
    if (id === num * num) {
        while (mines.length < 10) {
            let num = Math.floor(Math.random() * 81)
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

    let count = null
    noMines.forEach(element => {
        count = null
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
        // console.log(square[0].innerText)
        square[0].innerText = `${count}`
        // console.log(count)
    })


    

    landing.style.display = 'none'
}



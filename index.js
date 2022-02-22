const foods = [
    'Nasi Goreng#20000',
    'Salmon Mentai',
    'Gado Gado#10000',
    'Kupat Tahu#41000',
    'Wagyu Steak',
    'Nasi Padang#25000',
    'Papeda#15000',
    'Ayam Rebus',
    'Tempe Goreng#5000',
    'Tahu Goreng#4000'
  ]
  
  function convertMenu(foods) {
    // code here
    let output = []
    for (let i = 0; i < foods.length; i++) {
      let tempFoods = []
      let temp = ''
      for (let j = 0; j < foods[i].length; j++) {
        if (foods[i][j] === '#') {
          tempFoods.push(temp)
          temp = ''
        } else if (j === foods[i].length - 1) {
          temp += foods[i][j]
          tempFoods.push(temp)
        } else {
          temp += foods[i][j]
        }
      }
      output.push(tempFoods)
    }
    return output
  }
  // console.log(convertMenu(foods))
  
  function filterMenu(foods) {
    // code here
    let output = []
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].length === 2) {
        let newArr = []
        newArr.push(foods[i][0], Number(foods[i][1]))
        output.push(newArr)
      }
    }
    return output
  }
  // const foods =  [
  //   ['Nasi Goreng', '20000'],
  //   ['Salmon Mentai'],
  //   ['Gado gado', '10000'],
  //   ['Kupat tahu', '41000'],
  //   ['Wagyu Steak'],
  //   ['Nasi Padang', '25000'],
  //   ['Papeda', '15000'],
  //   ['Ayam rebus'],
  //   ['Tempe Goreng', '5000'],
  //   ['Tahu Goreng', '4000']
  // ]
  // console.log(filterMenu(foods))
  
  function statusMenu(foods) {
    // code here
    let output = []
    for (let i = 0; i < foods.length; i++) {
      let status = ''
      let tempFoods = []
      if (foods[i][1] > 30000) {
        status = 'expensive'
        tempFoods.push(foods[i][0], foods[i][1], status)
      } else if (foods[i][1] >= 15000) {
        status = 'standard'
        tempFoods.push(foods[i][0], foods[i][1], status)
      } else {
        status = 'cheap'
        tempFoods.push(foods[i][0], foods[i][1], status)
      }
      output.push(tempFoods)
    }
    return output
  }
  // const foods = [
  //   ['Nasi Goreng', 20000],
  //   ['Gado gado', 10000],
  //   ['Kupat tahu', 41000],
  //   ['Nasi Padang', 25000],
  //   ['Papeda', 15000],
  //   ['Tempe Goreng', 5000],
  //   ['Tahu Goreng', 4000]
  // ]
  // console.log(statusMenu(foods))
  function statisticMenu(foods) {
    // code here
    let result = {}
    let expensiveCount = 0
    let standardCount = 0
    let cheapCount = 0
    for (let i = 0; i < foods.length; i++) {
      let status = foods[i][2]
      if (status === 'expensive') {
        expensiveCount++
      } else if (status === 'standard') {
        standardCount++
      } else if (status === 'cheap') {
        cheapCount++
      }
    }
    result = {
      standard: standardCount,
      cheap: cheapCount,
      expensive: expensiveCount
    }
    return result
  }
  // const foods = [
  //   ['Nasi Goreng', 20000, 'standard'],
  //   ['Gado gado', 10000, 'cheap'],
  //   ['Kupat tahu', 41000, 'expensive'],
  //   ['Nasi Padang', 25000, 'standard'],
  //   ['Papeda', 15000, 'standard'],
  //   ['Tempe Goreng', 5000, 'cheap'],
  //   ['Tahu Goreng', 4000, 'cheap']
  // ]
  
  // console.log(statisticMenu(foods))
  function generateMenu(foods) {
    // code here
    let result = {}
    let convert = convertMenu(foods)
    let filter = filterMenu(convert)
    let status = statusMenu(filter)
    result.statistic = statisticMenu(status)
    result.menu = []
    for (let i = 0; i < status.length; i++) {
      let obj = {
        name: status[i][0],
        price: status[i][1],
        status: status[i][2]
      }
      result.menu.push(obj)
    }
    return result
  }
  
  console.log(generateMenu(foods))
  
  // // Silahkan tulis kode kamu untuk Manipulasi DOM disini
  let result = generateMenu(foods)
  document.getElementById("expensiveCount").innerText = result.statistic.expensive
  document.getElementById("standardCount").innerText = result.statistic.standard
  document.getElementById("cheapCount").innerText = result.statistic.cheap
  
  // RENDER DI BROWSER
  // selectors
  const menuList = document.querySelector('.menu-list')
  
  // ABAIKAN code dibawah ini
  function render() {
    // get todo list
    let menuObject = generateMenu(foods)
    // put all task to html
    for (let i = 0; i < menuObject.menu.length; i++) {
      // create div
      const menu = document.createElement('div')
      menu.classList.add('menu')
      // create list
      const newMenu = document.createElement('li')
      newMenu.innerText = `${menuObject.menu[i].name} -- ${new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(menuObject.menu[i].price)}`
      newMenu.classList.add('menu-item')
      menu.appendChild(newMenu)
  
      // create completed button
      const infoButton = document.createElement('button')
      infoButton.innerHTML = menuObject.menu[i].status[0].toUpperCase() + menuObject.menu[i].status.substring(1)
      if (infoButton.innerHTML === 'Cheap') {
        infoButton.classList.add('cheap-btn')
      } else if (infoButton.innerHTML === 'Standard') {
        infoButton.classList.add('standard-btn')
      } else {
        infoButton.classList.add('expensive-btn')
      }
      menu.appendChild(infoButton)
      // append to todoList
      menuList.appendChild(menu)
    }
  }
  render()
  
  // Uncomment baris ini untuk melakukan testing
  // Comment juga semua code yang berhubungan dengan DOM untuk menjalankan testing
  // module.exports = {
  //   convertMenu,
  //   filterMenu,
  //   statusMenu,
  //   statisticMenu,
  //   generateMenu
  // }
  
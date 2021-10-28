//currentPage fortæller vhilken sider appen er på 
let currentPage = '#names'

//players er et array med alle spillerne i - vi lægger lige et par "testspillere" ind med det samme
let players = ['anna', 'tina', 'kim', 'poul']

//currentPlayer er den spiller som har tur 
let currentPlayer = 0

//
let bodyparts = ['venstre knæ', 'højre knæ', 'venstre skulder', 'højre skulder', 'venstre albue', 'højre albue',  'venstre fod', 'højre fod', 'hoved']
let playerhands = ['venstre hånd', 'højre hånd']

function setup(){
    select('#addPlayer').mousePressed( () => {
        //to do - check input field
        let name = select('#name').value()
        players.push(name)
        console.log(players)
        select('#name').value('')
        select('#playerList').html(players.join('<br>'))
    })

    select('#start').mousePressed( () => {
        turn()
        shift('#task') 
    })

    select('#nextTurn').mousePressed(turn)
    select('#toEnd').mousePressed(finish)
    select('#new').mousePressed( () => {
        shift('#names') 
        setTimeout(()=>shift('#names'), 2000)
    })
}
function turn () {
    if(currentPlayer < players.length - 1){
        currentPlayer = currentPlayer + 1
    }else{
        currentPlayer = 0
    }

    let playerhand = random(playerhands)
    let bodypart = random(bodyparts)
    let nextPlayer = findNextPlayer()

    console.log(playerhand)
    console.log(bodypart)
    console.log(nextPlayer)

    let description = players[currentPlayer] + ', tag fat i ' + nextPlayer + '\'s ' + bodypart + ' med ' + playerhand 
    select('#description').html('')
    select('#spinner').show()
    select('#turnButtons').hide()
    
    
    setTimeout(()=>{
        select('#description').html(description)
        select('#spinner').hide()
        select('#turnButtons').show()
    }, 200)
}

function findNextPlayer () {
    let randomPlayer = random(players)
    if(players[currentPlayer]!= randomPlayer){
        return randomPlayer
    }else{
        return findNextPlayer()
    }
}

function finish(){
    let string = 'Okay ' + players.join(' og ') + '- tak for spillet! I klarede x runder' 
    select('#thanks').html(string)
    players = []
    select('#playerList').html('')
    shift('#end')
}

function shift (newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}    

function keyPressed(key) {
    let pageNumber = key.key - 1
    let pages = selectAll('.page')
    pages[pageNumber] && shift('#' + pages[pageNumber].elt.id)
}


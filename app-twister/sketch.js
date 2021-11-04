//currentPage fortæller hvilken side appen er på når den starter 
let currentPage = '#names'

//players er et array med alle spillerne i - vi lægger lige et par "testspillere" ind med det samme
let players = ['anna', 'tina', 'kim', 'poul']

//currentPlayer er den spiller som har tur 
let currentPlayer = 0

//rounds tæller hvor mange runder spillerne har klaret
let rounds = 0

//bodyparts er alle de kropsdele der skal være med i spillet 
let bodyparts = ['venstre knæ', 'højre knæ', 'venstre skulder', 'højre skulder', 'venstre albue', 'højre albue',  'venstre fod', 'højre fod', 'hoved']

//playerhands er de kropsdele den spiller som har tur, skal bruge
let playerhands = ['venstre hånd', 'højre hånd']

function setup(){
    //vi begynder lige med at vise de spillere vi allerede har lagt ind i vores liste
    select('#playerList').html(players.join('<br>'))

    //når der trykkes på knappen med id='addPlayer', kaldes funktionen addPlayer (den er længere nede)
    select('#addPlayer').mousePressed( addPlayer)

    //når der trykkes på knappen med id='start', kaldes funktionen begin (den er længere nede)
    select('#start').mousePressed( begin )

    //når der trykkes på knappen med id='nextTurn', kaldes funktionen turn (den er længere nede)
    select('#nextTurn').mousePressed(turn)

    //når der trykkes på knappen med id='toEnd', kaldes funktionen finish (den er længere nede)
    select('#toEnd').mousePressed(finish)

    //når der trykkes på knappen med id='new', kaldes funktionen newGame (den er længere nede)
    select('#new').mousePressed( newGame)

}

function turn () {
    //hver gang denn funktion kaldes, skal der tælles en ny runde
    rounds += 1

    let playerhand = random(playerhands)
    let bodypart = random(bodyparts)
    let nextPlayer = findNextPlayer()

    //udkommenter linjerne nedenfor hvis du vil holde øje med værdierne 
    //console.log(playerhand)
    //console.log(bodypart)
    //console.log(nextPlayer)

    let description = players[currentPlayer] + ', tag fat i ' + nextPlayer + '\'s ' + bodypart + ' med ' + playerhand 
    select('#description').html('')
    select('#spinner').show()
    select('#turnButtons').hide()

    //vi skifter til den næste spiller i listen - men hvis alle spillere har haft tur, begynder vi forfra
    if(currentPlayer < players.length - 1){
        currentPlayer = currentPlayer + 1
    }else{
        currentPlayer = 0
    }

    //setTimeout gør noget efter et antal millisekunder, her 200
    setTimeout(()=>{
        select('#description').html(description)
        select('#spinner').hide()
        select('#turnButtons').show()
    }, 200)
}

//finder en spiller som IKKE er den spiller der har tur nu
function findNextPlayer () {
    let randomPlayer = random(players)
    if(players[currentPlayer]!= randomPlayer){
        return randomPlayer
    }else{
        return findNextPlayer()
    }
}

function newGame(){
    rounds = 0
    players = []
    select('#playerList').html('')
    shift('#names') 
    shift('#names')
}

function finish(){
    let string = 'Okay ' + players.join(' og ') + '- tak for spillet! I klarede ' + rounds + ' runder' 
    select('#thanks').html(string)
    shift('#end')
}

function addPlayer() {
    //to do - check input field
    let name = select('#name').value()
    players.push(name)
    select('#name').value('')
    select('#playerList').html(players.join('<br>'))
}

function begin(){
    turn()
    shift('#task') 
}

























//skifter sider ud fra et id 
function shift (newPage) {
    //currentpage har hele tiden klassen 'show' - nu fjerner vi den og giver den til 'newPage'
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}    

//bliver kaldt når der trykkes på keyboardet
function keyPressed(key) {
    let pageNumber = key.key - 1
    //her henter vi en liste med alle de div'er der har class='page'
    let pages = selectAll('.page')
    //og hvis der findes en side i listen med det nummer der bli er trykket på, kalder vi shift
    pages[pageNumber] && shift('#' + pages[pageNumber].elt.id)
}


const mqttInit = () => {
    //opret et id med en random talkode og sæt gem servernavnet i en variabel
    const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    const host = 'wss://mqtt.nextservices.dk'
  
    //opret et objekt med de oplysninger der skal bruges til at forbinde til serveren
    const options = {
      keepalive: 300,
      clientId: clientId,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    }
  
    console.log('connecting mqtt client')
  
    //forsøg at oprette forbindelse 
    client = mqtt.connect(host, options)
  
    //hvis der sker en fejl kaldes denne funktion
    client.on('error', (err) => {
      console.log('Connection error: ', err)
      client.end()
    })
  
    //og hvis forbindelsen mistes kaldes denne funktion
    client.on('reconnect', () => {
      console.log('Reconnecting...')
    })
  
    //hvis forbindelsen lykkes kaldes denne funktion
    client.on('connect', () => {
      console.log('Client connected:' + clientId)
    })
  
    //når forbindelsen lukkes kaldes denne funktion
    client.on('close', () => {
      console.log(clientId + ' disconnected')
    })
  } 
  
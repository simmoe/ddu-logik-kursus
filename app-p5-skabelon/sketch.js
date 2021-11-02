let currentPage = '#side-1'

function setup(){
    
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



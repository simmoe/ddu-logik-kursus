let currentPage = '#side-1'

function setup(){

}

function shift (newPage) {
    select(newPage).addClass('show')
    select(currentPage).removeClass('show')
    currentPage = newPage
}    

function keyPressed(key) {
    function keyPressed(key) {
        let pages = selectAll('.page')
        pages[key.key] && shift('#' + pages[key.key].elt.id)
    }
}


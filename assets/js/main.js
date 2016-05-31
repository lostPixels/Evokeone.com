if( document.querySelector('.section-wrap.home') ) {
    var randomBG = 'background-'+(Math.ceil( Math.random() * 6));
    document.querySelector('.introduction').classList.add(randomBG);
}

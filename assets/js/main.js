if( document.querySelector('.section-wrap.home') ) {
    var randomBG = 'background-'+(Math.ceil( Math.random() * 6));
    document.querySelector('.introduction').classList.add(randomBG);
}


if( document.querySelector('.section-wrap.single-art') ) {

    document.querySelector('.art-img').addEventListener('click', function(e) {
        document.querySelector('.section-wrap.single-art').classList.toggle('expanded');
    })

}

function setDisplayParams(){
    $('.slide1Body, .slide2Body').css('height', window.innerHeight*0.77+'px');
    //$('.menuList').css('height', (window.innerHeight+window.innerHeight*1/3)+'px');
    $('.leftList, .phoneList, .rightList').css('height', window.innerHeight*0.7+'px');
    $('.filterDogIcon').css('margin-top', ($('.slide1Body').height()-160)+'px');

}
setDisplayParams();

$(window).resize(function(){
    setDisplayParams();
    if(document.body.clientWidth <700){
        $('.phoneWithTelematic').css('height', document.body.clientWidth*1.23+'px');
    }else{
        $('.phoneWithTelematic').css('height', '604px');
    }
});




    var slideItem = 0;
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        smartSpeed:500,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    owl.trigger('to.owl.carousel', 1);
    $("#slideBar1").click(function(){
        $('.tab').removeClass('active');
        $(this).addClass('active');
        owl.trigger('to.owl.carousel', 2);
        slideItem = 2;
    });
    $("#slideBar2").click(function(){
        $('.tab').removeClass('active');
        $(this).addClass('active');
        owl.trigger('to.owl.carousel', 3);
        slideItem = 3;
    });
    $("#slideBar3").click(function(){
        $('.tab').removeClass('active');
        $(this).addClass('active');
        owl.trigger('to.owl.carousel', 1);
        slideItem = 1;
    });

function setTab(item){
        $('.tab').removeClass('active');
        $("#slideBar"+item).addClass('active');
        owl.trigger('to.owl.carousel', item);
}

owl.on('changed.owl.carousel', function(event) {
    switch (event.item.index){
        case 1:
            slideItem = 2;
            break;
        case 2:
            slideItem = 3;
            break;
        case 3:
            slideItem = 1;
            break;
        case 4:
            slideItem = 2;
            break;
        case 5:
            slideItem = 3;
            break;
    }
    setTab(slideItem);
});

$('#rightButton').click(function(){
    $('.owl-next').click();
});
$('#leftButton').click(function(){
    $('.owl-prev').click();
});
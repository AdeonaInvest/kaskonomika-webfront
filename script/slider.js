/**
 * Created by Taron on 29.09.2016.
 */
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
owl.on('changed.owl.carousel', function(event) {
    switch (event.item.index){
        case 1:
            slideItem = 3;
            break;
        case 2:
            slideItem = 4;
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
        case 6:
            slideItem = 4;
            break;
    };
    getSlide();
});
owl.trigger('to.owl.carousel', 1);
function getSlide(){
    $('.elsePageBarNumber').css('color','rgba(253, 253, 253, 253)');
    $('.elsePageBars').find('.elsePageBarNumber').css('background-color', 'rgba(253, 253, 253, 0)');
    $('#slideBar'+(slideItem-1)).css('background-color', 'rgba(253, 253, 253, 253)');
    $('#slideBar'+(slideItem-1)).css('color', '#000000');
    if(window.innerWidth<700){
        switch (slideItem){
            case 1:
                $('.elsePageBars').css('margin-left','44%');
                break;
            case 2:
                $('.elsePageBars').css('margin-left','-46%');
                break;
            case 3:
                $('.elsePageBars').css('margin-left','-134%');
                break;
            case 4:
                $('.elsePageBars').css('margin-left','-222%');
                break;
        }
    }
}
$(".panelFillterWithDog").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        //$(this).text("You swiped " + direction );
        if(direction == 'left'){
            $('.owl-next').click();
        }
        if(direction == 'right') {
                $('.owl-prev').click();
            }else{
            if(direction == 'up'){
                $("html, body").animate({ scrollTop: $(document).scrollTop()+400 }, 200);
            }else if(direction == 'down'){
                $("html, body").animate({ scrollTop: $(document).scrollTop()-400 }, 200);
            }
        }
    },
    threshold:0
});

$("#slideBar0").click(function(){
    owl.trigger('to.owl.carousel', 1);
    slideItem = 1;
    getSlide();
});
$("#slideBar1").click(function(){
    owl.trigger('to.owl.carousel', 2);
    slideItem = 2;
    getSlide();
});
$("#slideBar2").click(function(){
    owl.trigger('to.owl.carousel', 3);
    slideItem = 3;
    getSlide();
});
$("#slideBar3").click(function(){
    owl.trigger('to.owl.carousel', 4);
    slideItem = 4;
    getSlide();
});

$(window).resize(function() {
    getSlide();
});
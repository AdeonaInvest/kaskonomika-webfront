/**
 * Created by Taron on 29.09.2016.
 */

function mobileShowPhone(){
        if(document.body.clientWidth<700){
            if($('#phone').css('margin-left') =='6px'){
                $('#phone').animate({'margin-left':'-200px'});
                $('#phone').css({'z-index':'900000'});
                $('.parallaxPages .parallaxPage .page4Item').css({'z-index':'1000000'});
            }else{
                $('#phone').animate({'margin-left':'6px', 'z-index':'1000'});
                $('.parallaxPages .parallaxPage .page4Item').css({'z-index':'100'});
            }
        }
}
var calcUp = 0;
var calcDown = 0;
function mobileShowPhoneForTablet(){
        if(window.scrollY > $('#homePage').height()-200 && calcDown == 0 && $('#phone').css('margin-left') =='-220px'){
            $('#phone').animate({'margin-left':'43px'});
            calcDown = 1;
            calcUp =0;
        }else{
            if(window.scrollY < $('#homePage').height()-400 && calcUp == 0 && $('#phone').css('margin-left') =='43px'){
                $('#phone').animate({'margin-left':'-220px'});

                calcDown = 0;
                calcUp =1;
            }
        }
}
$('#mobileButton').on('click touch', function(){
    mobileShowPhone();
});
$('#phone').on('click touch', function(){
    mobileShowPhone();
});
function changePhonePosition(){
    //if(document.body.clientWidth>1100){
    //    document.querySelector("#dotNav").style.marginLeft = '-'+ window.scrollX + "px";
    //}else if(document.body.clientWidth>700){
    //    document.querySelector("#phone").style.marginLeft = "-300px";
    //}else{
    //    document.querySelector("#phone").style.marginLeft = "-256px";
    //}
}
document.addEventListener("scroll", function(event) {
    if(document.body.clientWidth<1000 && document.body.clientWidth>700){
        mobileShowPhoneForTablet();
    }
});

$(window).resize(function() {
    changePhonePosition();
    calcDown=0;
    calcUp=0;
    if(document.body.clientWidth<1000 && document.body.clientWidth>700) {
        mobileShowPhoneForTablet();
    }
});
changePhonePosition();
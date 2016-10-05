//$( document ).ready(function() {

    var leftMeuOpen = 0;
    function leftMenuPosition(){
        if(window.innerWidth<1400){
            if(leftMeuOpen ==0){
                $("#leftMenu").css('display','inline');
                leftMeuOpen = 1;
            }else{
                $("#leftMenu").css('display','none');
                leftMeuOpen = 0;
            }
        }
    }
    //document.querySelector("#menu").addEventListener("click", leftMenuPosition());
    $("#menu").click(function(){
        leftMenuPosition();
    });

    function resizePageElseFunctions(){
        $('.parallaxPage').css('height',window.innerHeight+'px');
        $('.pageElseFunctions').css('height',(window.innerHeight*0.89)+'px');
        $('.parallaxPage').css('width',window.innerWidth+'px');
        $('.pageElseFunctions, .elsePageSlideItem').css('width',window.innerWidth+'px');
    }

    window.addEventListener("resize", function() {
        if(window.innerWidth>1439){
            $("#leftMenu").css('display','none');
            leftMeuOpen = 0;
        };
        resizePageElseFunctions();
        if(window.innerWidth>320){
            $('.allBody').css('width',window.innerWidth+'px');
        }else{
            $('.allBody').css('width','320px');
        }
        if(window.innerWidth>700 && window.innerWidth<1000){
            $('.parallaxPages .homePage').css('height',(window.innerHeight+200)+'px');
        }
        if(window.innerWidth<700){
            $('.phone').css('margin-left','-262px');
        }
        if (window.scrollY > 5) {
            if(window.innerWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo_onscroll.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
            }
        }else{
            if(window.innerWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
            }
        }
    });
    resizePageElseFunctions();
    if(window.innerWidth>320){
        $('.allBody').css('width',window.innerWidth+'px');
    }else{
        $('.allBody').css('width','320px');
    }

    window.addEventListener("scroll", function() {
        resizePageElseFunctions();
        if (window.scrollY > 5) {
            document.getElementById('toolbar').style.backgroundColor = "#ffffff";
            document.getElementById('leftMenu').style.backgroundColor = "#ffffff";
            if(window.innerWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo_onscroll.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
            }
        }else{
            document.getElementById('toolbar').style.backgroundColor = "#e5f3fc";
            document.getElementById('leftMenu').style.backgroundColor = "#e5f3fc";
            if(window.innerWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
            }
        }
    });
$('.page4Item').click(function(){
    $('.page4Item').css('background-color','rgba(255, 255, 255, 0)');
    $('.page4Item').css('box-shadow','rgba(198, 198, 198, 0) 5px 5px 5px');
    if($(this).find('.page4Itemtext').css('display') == 'none'){
        $('.page4Itemtext').slideUp();
        $(this).find('.page4Itemtext').slideDown();
        $(this).css('background-color','white');
        $(this).css('box-shadow','5px 5px 5px #c6c6c6');
    }else{
        $('.page4Itemtext').slideUp();
        $(this).css('background-color','rgba(255, 255, 255, 0)');
        $(this).css('box-shadow','rgba(198, 198, 198, 0) 5px 5px 5px');
    }
});
$('.page4Item').hover(function(){
    $(this).css('background-color','white');
    $(this).css('box-shadow','5px 5px 5px #c6c6c6');
},function(){
    if($(this).find('.page4Itemtext').css('display') =='none'){
        $(this).css('background-color','rgba(255, 255, 255, 0)');
        $(this).css('box-shadow','rgba(198, 198, 198, 0) 5px 5px 5px');
    }
});
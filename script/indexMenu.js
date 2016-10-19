 var leftMeuOpen = 0;
    function leftMenuPosition(){
        if(document.body.clientWidth<1400){
            if(leftMeuOpen ==0){
                $("#leftMenu").css('display','inline');
                leftMeuOpen = 1;
            }else{
                $("#leftMenu").css('display','none');
                leftMeuOpen = 0;
            }
        }
    }
    $("#menu").click(function(){
        leftMenuPosition();
    });

    window.addEventListener("resize", function() {
        if(document.body.clientWidth>1439){
            $("#leftMenu").css('display','none');
            leftMeuOpen = 0;
        };
        if(document.body.clientWidth>700 && document.body.clientWidth<1000){
            $('.parallaxPages .homePage').css('height',(window.innerHeight+200)+'px');
        }
        if(document.body.clientWidth<700){
            $('#phone').css('margin-left','-200px');
        }
        if (window.scrollY > 5) {
            if(document.body.clientWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo_onscroll.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
            }
        }else{
            if(document.body.clientWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
            }
        }
    });
    window.addEventListener("scroll", function() {
        if (window.scrollY > 5 || $('#phone').length == 0) {
            document.getElementById('toolbar').style.backgroundColor = "#ffffff";
            document.getElementById('leftMenu').style.backgroundColor = "#ffffff";
            if(document.body.clientWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo_onscroll.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
            }
        }else{
            document.getElementById('toolbar').style.backgroundColor = "#e5f3fc";
            document.getElementById('leftMenu').style.backgroundColor = "#e5f3fc";
            if(document.body.clientWidth>700){
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
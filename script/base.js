window.onload = function(){
    if(document.querySelector("#dotNav") != null){
        var pageHeight = 0;
        var pagesArray = document.querySelectorAll(".parallaxPage");
        function setSizesParalaxPages(){
            for (var i = 0; i < pagesArray.length; i++) {
                pageHeight = window.innerHeight;
                if(window.innerWidth<3000 && window.innerWidth>999){
                    pagesArray[i].style.width =''+window.innerWidth+"px";
                } else if(window.innerWidth<1000){
                    pagesArray[i].style.width ='100%';
                    if(window.innerHeight > 600){
                    }else{
                        pageHeight = 600;
                    }
                } else{
                    pagesArray[i].style.width =3000+'px';
                }
                pagesArray[i].style.minHeight=''+pageHeight+"px";
            }
        }
        setSizesParalaxPages();
        function setDotNav(number){
            var items = document.querySelectorAll("#dotNav li");
            for (var i = 0; i < items.length; i++) {
                items[i].className = "";
                if(i==number){
                    items[i].className = "current";
                }
            }
        }
        function pageScrolling(){
            if(document.getElementById('panelFillterWithDog') != null){
                if(window.innerWidth > 600 && window.innerWidth < 1000){
                    if(window.innerWidth > 800){
                        document.getElementById('panelFillterWithDog').style.marginTop = '25%';
                    }else{
                        document.getElementById('panelFillterWithDog').style.marginTop = '35%';
                    }
                }else{
                     if(window.innerWidth > 450){
                        document.getElementById('panelFillterWithDog').style.marginTop = '42%';
                     }else{
                        document.getElementById('panelFillterWithDog').style.marginTop = '40%';
                     }
                }
            }

            if(window.scrollY > pageHeight*9/10 - (pageHeight/15)){
                //if(window.innerWidth<1440 && window.innerWidth>1100){
                //    document.querySelector("#dotNav").style.marginTop = "230px";
                //    document.querySelector("#dotNav").style.position = "fixed";
                //}else
                if(window.innerWidth<3000 && window.innerWidth>1400){
                    document.querySelector("#dotNav").style.marginTop = "18.3%";
                    document.querySelector("#dotNav").style.position = "fixed";
                }else if(window.innerWidth<1400 && window.innerWidth>700){
                    document.querySelector("#dotNav").style.marginTop = "20%";
                    document.querySelector("#dotNav").style.position = "fixed";
                }else{
                    document.querySelector("#dotNav").style.marginTop = "25%";
                    document.querySelector("#dotNav").style.position = "fixed";
                }
                if(window.scrollY > pageHeight*4*9/10 + (pageHeight/5)){
                    document.querySelector("#phone").style.marginTop = (pageHeight*4 + (pageHeight/5.73)) + "px";
                    document.querySelector("#phone").style.position = "absolute";
                    document.querySelector("#telematic").style.display = "inline-block";
                    document.querySelector("#dotNav").style.marginTop = (pageHeight*4 + (pageHeight/3.15))+ "px";
                    document.querySelector("#dotNav").style.position = "absolute";

                }else {
                    document.querySelector("#telematic").style.display = "none";
                    if(window.innerWidth<1440){
                        if(window.innerWidth>1000){
                            document.querySelector("#phone").style.marginTop = "172px";
                        }else{
                            document.querySelector("#phone").style.marginTop = "20%";
                        }
                        document.querySelector("#phone").style.position = "fixed";
                    }else{
                        document.querySelector("#phone").style.marginTop = "9%";
                        document.querySelector("#phone").style.position = "fixed";
                    }
                }
            }else{
                if(window.innerWidth<1440 && window.innerWidth>1000){
                    document.querySelector("#dotNav").style.marginTop = "1021px";
                    document.querySelector("#dotNav").style.position = "absolute";
                }else{
                    document.querySelector("#dotNav").style.marginTop = (pageHeight + 0.5 * pageHeight)+"px";
                    document.querySelector("#dotNav").style.position = "absolute";
                }
            }
            document.querySelector("#phoneDisplay").style.backgroundImage = "url('images/mobile_app_1promo.png')";
            if(window.scrollY > pageHeight - (pageHeight/3) && window.scrollY < pageHeight*2 - (pageHeight/3)){
                setDotNav(0);
                document.querySelector("#phoneDisplay").style.backgroundImage = "url('images/mobile_app_2.png')";
            }else{
                if(window.scrollY > pageHeight*2 - (pageHeight/3) && window.scrollY < pageHeight*3 - (pageHeight/3)){
                    setDotNav(1);
                    document.querySelector("#phoneDisplay").style.backgroundImage = "url('images/mobile_app_3.png')";
                }else{
                    if(window.scrollY > pageHeight*3 - (pageHeight/3) && window.scrollY < pageHeight*4 - (pageHeight/3)){
                        setDotNav(2);
                        document.querySelector("#phoneDisplay").style.backgroundImage = "url('images/mobile_app_4.png')";
                    }else{
                        if(window.scrollY > pageHeight*4 - (pageHeight/3) && window.scrollY < pageHeight*5 - (pageHeight/3)){
                            setDotNav(3);
                            document.querySelector("#phoneDisplay").style.backgroundImage = "url('images/mobile_app_2.png')";
                        }
                    }
                }
            }
        };
        pageScrolling();
        function setViewParams(){
            if(window.innerWidth <1000){
                if(window.innerWidth > 500){
                    if(window.innerWidth > 900){
                        $('.panelTiltle span, .page1Tiltle span, .page2Tiltle span, .page3Tiltle span, .page4Tiltle span').css('font-size', (window.innerWidth/24 -10)+'px');
                        $('.page1Body span, .page2Body span, .page3Body span, .page4Body span').css('font-size', (window.innerWidth/34 -10)+'px');
                    }else if(window.innerWidth > 700){
                        $('.panelTiltle span, .page1Tiltle span, .page2Tiltle span, .page3Tiltle span, .page4Tiltle span').css('font-size', (window.innerWidth/24-5)+'px');
                        $('.page1Body span, .page2Body span, .page3Body span, .page4Body span').css('font-size', (window.innerWidth/34-5)+'px'); 
                    }else{
                        $('.panelTiltle span, .page1Tiltle span, .page2Tiltle span, .page3Tiltle span, .page4Tiltle span').css('font-size', (window.innerWidth/24)+'px');
                        $('.page1Body span, .page2Body span, .page3Body span, .page4Body span').css('font-size', (window.innerWidth/34)+'px'); 
                    }
                }else{
                    $('.panelTiltle span, .page1Tiltle span, .page2Tiltle span, .page3Tiltle span, .page4Tiltle span').css('font-size', '19px');
                    $('.page1Body span, .page2Body span, .page3Body span, .page4Body span').css('font-size', '16px');
                }

                if(window.innerWidth<700){
                    $('.dotstyle ').css('margin-left', '96%');
                }
            }else {
                $('.filterButton, .filterButtonEF').css('margin-left', '10px');
                $('.page1Body span, .page2Body span, .page3Body span, .page4Body span').css('font-size', '20px');
                $('.panelTiltle span, .page1Tiltle span, .page2Tiltle span, .page3Tiltle span, .page4Tiltle span').css('font-size', '54px');
                $('.panelTiltle span').css('font-size', '32px');
                $('.page4Tiltle span').css('font-size', '36px');
                $('.apps').css('margin-left', '0px');
            }
        }
        setViewParams();
        document.addEventListener("scroll", function(event) {
            setViewParams();
            setSizesParalaxPages();
            pageScrolling();
        });
        $('.selectInputBody').width($('.selectPanel').width());
        $('.selectInputBodyEF').width($('.selectPanelEF').width());

        window.onresize = function(event) {
            $('.selectInputBody').width($('.selectPanel').width());
            $('.selectInputBodyEF').width($('.selectPanelEF').width());
            if(document.querySelector('.elsePageSlideBody')){
                if(window.innerWidth>320){
                    document.body.style.width=window.innerWidth+'px';
                    document.body.style.maxWidth=window.innerWidth+'px';
                    document.querySelector('.elsePageSlideBody').style.width=(window.innerWidth*5)+'px';
                }else{
                    document.body.style.width='320px';
                    document.body.style.maxWidth='320px';
                }
            }

            if(window.innerWidth>1440){
                $('.automobile, .automobileEF, .pilot, .pilotEF, .sentence, .sentenceEF').css('display', 'inline-block');
            }else{
                $('.automobile, .automobileEF, .pilot, .pilotEF, .sentence, .sentenceEF').css('display', 'none');

                if($('#selectInputHead').children().length >8){
                    $('.sentence').css('display', 'inline-block');
                }else if($('#selectInputHead').children().length >5 && $('#selectInputHead').children().length <9){
                    $('.pilot').css('display', 'inline-block');
                }else if($('#selectInputHead').children().length <6){
                    $('.automobile').css('display', 'inline-block');
                }

                if($('#selectInputHeadEF').children().length >8){
                    $('.sentenceEF').css('display', 'inline-block');
                }else if($('#selectInputHeadEF').children().length >5 && $('#selectInputHeadEF').children().length <9){
                    $('.pilotEF').css('display', 'inline-block');
                }else if($('#selectInputHeadEF').children().length <6){
                    $('.automobileEF').css('display', 'inline-block');
                }
            }
            setViewParams();
            setSizesParalaxPages();
            pageScrolling();
        };
        //document.getElementById('searchInput').onkeyup = function(e){
        //    var inputText= document.getElementById('searchInput').value.toUpperCase();
        //    for(var i=0;i<document.querySelectorAll('.selectItemdiv').length;i++){
        //        var selectItem=document.querySelectorAll('.selectItemdiv')[i].childNodes[0].textContent.toUpperCase();
        //        if(selectItem.indexOf(inputText) ==0
        //            || (selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)] >0
        //            && selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)]==" ")){
        //            document.querySelectorAll('.selectItemdiv')[i].style.display='inline-block';
        //        }else{
        //            document.querySelectorAll('.selectItemdiv')[i].style.display='none';
        //        }
        //        if($('.selectItemdiv:not([style*="display: none"])').length <1){
        //            if($('#selectInputBody p').length  == 0){
        //                $('#selectInputBody').append('<p style="margin-left: 20px; display:inline-block;" >Нет результатов</p>');
        //            };
        //            $('#selectInputBody p').css('display', 'inline-block');
        //        }else{
        //            $('#selectInputBody p').css('display', 'none');
        //        }
        //    }
        //};
        //document.getElementById('searchInputEF').onkeyup = function(e){
        //    var inputText= document.getElementById('searchInputEF').value.toUpperCase();
        //    for(var i=0;i<document.querySelectorAll('.selectItemdivEF').length;i++){
        //        var selectItem=document.querySelectorAll('.selectItemdivEF')[i].childNodes[0].textContent.toUpperCase();
        //        if(selectItem.indexOf(inputText) ==0
        //            || (selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)] >0
        //            && selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)]==" ")){
        //            document.querySelectorAll('.selectItemdivEF')[i].style.display='inline-block';
        //        }else{
        //            document.querySelectorAll('.selectItemdivEF')[i].style.display='none';
        //        }
        //        if($('.selectItemdivEF:not([style*="display: none"])').length <1){
        //            if($('#selectInputBodyEF p').length  == 0){
        //                $('#selectInputBodyEF').append('<p style="margin-left: 20px; display:inline-block;">Нет результатов</p>');
        //            };
        //            $('#selectInputBodyEF p').css('display', 'inline-block');
        //        }else{
        //            $('#selectInputBodEFy p').css('display', 'none');
        //        }
        //    }
        //};
    }
};

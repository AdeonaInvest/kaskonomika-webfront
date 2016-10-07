var titleSearchPanel ='36px';
var titleParallaxPanel ='52px';
var titleParallaxLastPanel ='36px';
var textParallaxPanel ='20px';
var textParallaxLastPanel ='20px';
function changeFontSizesForLoading(){
    if(window.innerHeight<document.body.clientWidth){
        //if(window.innerHeight>document.body.clientWidth*2/3){
            if(window.innerHeight>799){
                titleSearchPanel        = window.innerHeight/22+'px';
                titleParallaxPanel      = window.innerHeight/15+'px';
                titleParallaxLastPanel  = window.innerHeight/22+'px';
                textParallaxPanel       = window.innerHeight/30+'px';
                textParallaxLastPanel   = window.innerHeight/30+'px';

            }else if(window.innerHeight>699){
                console.log('asd');
                titleSearchPanel        = window.innerHeight/19+'px';
                titleParallaxPanel      = window.innerHeight/19+'px';
                titleParallaxLastPanel  = window.innerHeight/19+'px';
                textParallaxPanel       = window.innerHeight/30+'px';
                textParallaxLastPanel   = window.innerHeight/46+'px';


            }else if(window.innerHeight>599){
                titleSearchPanel        = window.innerHeight/30+'px';
                titleParallaxPanel      = window.innerHeight/30+'px';
                titleParallaxLastPanel  = window.innerHeight/30+'px';
                textParallaxPanel       = window.innerHeight/40+'px';
                textParallaxLastPanel   = window.innerHeight/60+'px';
            }else{
                titleSearchPanel        = '20px';
                titleParallaxPanel      = '25px';
                titleParallaxLastPanel  = '20px';
                textParallaxPanel       = '8px';
                textParallaxLastPanel   = '8px';
            }
        //}

    }else{
        if(window.innerHeight>799){
            titleSearchPanel        = window.innerHeight/27+'px';
            titleParallaxPanel      = window.innerHeight/22+'px';
            titleParallaxLastPanel  = window.innerHeight/27+'px';
            textParallaxPanel       = window.innerHeight/35+'px';
            textParallaxLastPanel   = window.innerHeight/40+'px';

        }else if(window.innerHeight>699){
            titleSearchPanel        = window.innerHeight/29+'px';
            titleParallaxPanel      = window.innerHeight/29+'px';
            titleParallaxLastPanel  = window.innerHeight/29+'px';
            textParallaxPanel       = window.innerHeight/32+'px';
            textParallaxLastPanel   = window.innerHeight/37+'px';


        }else if(window.innerHeight>599){
            titleSearchPanel        = window.innerHeight/30+'px';
            titleParallaxPanel      = window.innerHeight/30+'px';
            titleParallaxLastPanel  = window.innerHeight/30+'px';
            textParallaxPanel       = window.innerHeight/40+'px';
            textParallaxLastPanel   = window.innerHeight/60+'px';
        }else{
            titleSearchPanel        = '15px';
            titleParallaxPanel      = '15px';
            titleParallaxLastPanel  = '15px';
            textParallaxPanel       = '10px';
            textParallaxLastPanel   = '10px';
        }
    }


    $('.parallaxPages .parallaxPage .searchPanel .panelTitle span').css('font-size', titleSearchPanel);
    $('.parallaxPages .parallaxPage .page1Panel .pageTitle span').css('font-size', titleParallaxPanel);
    $('.parallaxPages .parallaxPage .page2Panel .pageTitle span').css('font-size', titleParallaxPanel);
    $('.parallaxPages .parallaxPage .page3Panel .pageTitle span').css('font-size', titleParallaxPanel);
    $('.parallaxPages .parallaxPage .page4Panel .pageTitle span').css('font-size', titleParallaxLastPanel);
    $('.panel .pageBody span').css('font-size', textParallaxPanel);
    $('.parallaxPages .parallaxPage .itemToCenter span').css('font-size', textParallaxLastPanel);
}
changeFontSizesForLoading();
$(window).resize(function() {
    changeFontSizesForLoading();
});
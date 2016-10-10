//var titleSearchPanel ='36px';
//var titleParallaxPanel ='52px';
//var titleParallaxLastPanel ='36px';
//var textParallaxPanel ='20px';
//var textParallaxLastPanel ='20px';
//function changeFontSizesForLoading(){
//    if(document.body.clientHeight<document.body.clientWidth){
//        //if(document.body.clientHeight>document.body.clientWidth*2/3){
//            if(document.body.clientHeight>799){
//                titleSearchPanel        = document.body.clientHeight/22+'px';
//                titleParallaxPanel      = document.body.clientHeight/15+'px';
//                titleParallaxLastPanel  = document.body.clientHeight/22+'px';
//                textParallaxPanel       = document.body.clientHeight/30+'px';
//                textParallaxLastPanel   = document.body.clientHeight/30+'px';
//
//            }else if(document.body.clientHeight>699){
//                console.log('asd');
//                titleSearchPanel        = document.body.clientHeight/19+'px';
//                titleParallaxPanel      = document.body.clientHeight/19+'px';
//                titleParallaxLastPanel  = document.body.clientHeight/19+'px';
//                textParallaxPanel       = document.body.clientHeight/30+'px';
//                textParallaxLastPanel   = document.body.clientHeight/46+'px';
//
//
//            }else if(document.body.clientHeight>599){
//                titleSearchPanel        = document.body.clientHeight/30+'px';
//                titleParallaxPanel      = document.body.clientHeight/30+'px';
//                titleParallaxLastPanel  = document.body.clientHeight/30+'px';
//                textParallaxPanel       = document.body.clientHeight/40+'px';
//                textParallaxLastPanel   = document.body.clientHeight/60+'px';
//            }else{
//                titleSearchPanel        = '20px';
//                titleParallaxPanel      = '25px';
//                titleParallaxLastPanel  = '20px';
//                textParallaxPanel       = '8px';
//                textParallaxLastPanel   = '8px';
//            }
//        //}
//
//    }else{
//        if(document.body.clientHeight>799){
//            titleSearchPanel        = document.body.clientHeight/27+'px';
//            titleParallaxPanel      = document.body.clientHeight/22+'px';
//            titleParallaxLastPanel  = document.body.clientHeight/27+'px';
//            textParallaxPanel       = document.body.clientHeight/35+'px';
//            textParallaxLastPanel   = document.body.clientHeight/40+'px';
//
//        }else if(document.body.clientHeight>699){
//            titleSearchPanel        = document.body.clientHeight/29+'px';
//            titleParallaxPanel      = document.body.clientHeight/29+'px';
//            titleParallaxLastPanel  = document.body.clientHeight/29+'px';
//            textParallaxPanel       = document.body.clientHeight/32+'px';
//            textParallaxLastPanel   = document.body.clientHeight/37+'px';
//
//
//        }else if(document.body.clientHeight>599){
//            titleSearchPanel        = document.body.clientHeight/30+'px';
//            titleParallaxPanel      = document.body.clientHeight/30+'px';
//            titleParallaxLastPanel  = document.body.clientHeight/30+'px';
//            textParallaxPanel       = document.body.clientHeight/40+'px';
//            textParallaxLastPanel   = document.body.clientHeight/60+'px';
//        }else{
//            titleSearchPanel        = '15px';
//            titleParallaxPanel      = '15px';
//            titleParallaxLastPanel  = '15px';
//            textParallaxPanel       = '10px';
//            textParallaxLastPanel   = '10px';
//        }
//    }
//
//
//    $('.parallaxPages .parallaxPage .searchPanel .panelTitle span').css('font-size', titleSearchPanel);
//    $('.parallaxPages .parallaxPage .page1Panel .pageTitle span').css('font-size', titleParallaxPanel);
//    $('.parallaxPages .parallaxPage .page2Panel .pageTitle span').css('font-size', titleParallaxPanel);
//    $('.parallaxPages .parallaxPage .page3Panel .pageTitle span').css('font-size', titleParallaxPanel);
//    $('.parallaxPages .parallaxPage .page4Panel .pageTitle span').css('font-size', titleParallaxLastPanel);
//    $('.panel .pageBody span').css('font-size', textParallaxPanel);
//    $('.parallaxPages .parallaxPage .itemToCenter span').css('font-size', textParallaxLastPanel);
//}
//changeFontSizesForLoading();
//$(window).resize(function() {
//    changeFontSizesForLoading();
//});
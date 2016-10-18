$( document ).ready(function() {

    window.addEventListener("scroll", function() {
        if (window.scrollY > 5) {
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

    document.querySelector('.faqBody').style.minHeight = window.innerHeight+'px';
    var urlSection = 'http://sitetest.kaskonomika.ru/faq/section/list';
    var urlNotice = 'http://sitetest.kaskonomika.ru/faq/notice/list';
    var dateJson={}
    function getJsonDate(dateUrl){
        $.ajax({
            type: "GET",
            url: dateUrl,
            dataType : "json",
            crossDomain: true,
            global: false,
            async:false,
            data : {},
            success: function (data, textStatus) {
                dateJson=data;
            }
        });
    }
    getJsonDate(urlSection);dataOfSections = dateJson;
    getJsonDate(urlNotice);dataOfNotices = dateJson;

    var htmlGroupString = '';
    var htmlGroupHeadString = '';
    var questions = {};
    var htmlNotItemHead='';
    var htmlNotItemBody='';
    var htmlNotString = '';


    htmlNotItemHead  += '<div class="faqNotesItemHead "><span>МЕНЮ </span> </div>';
    for(var i=0; i<dataOfSections.length; i++){
        htmlNotItemHead  += '<div class="faqNotesItemBody linkToGroup"><span>'+dataOfSections[i].title+'  </span> </div>';
            htmlGroupHeadString += '<div class="faqGroupsHead">'+
                '<span id="'+dataOfSections[i].title+'" class="faqGroupsTitle">'+dataOfSections[i].title+' </span>'+
                '<span class="faqGroupsContext">'+dataOfSections[i].description+' </span>'+
                '<span class="faqGroupsTitleButtonText textAboutButton">Способы оплаты </span>'+
                '<span class="faqGroupsTitleButton sectionsButton"></span>'+
            '</div>';
        var htmlGroupBodyString = '';
        questions = dataOfSections[i].questions;
        for(var j=0;j<questions.length; j++){
            htmlGroupBodyString +='<div class="faqGroupItem">'+
                '<div class="faqGroupItemHead">'+
                    '<span class="faqGroupItemTitle">'+questions[j].title+'</span>'+
                    '<span class="faqGroupItemTitleButton sectionButton"></span>'+
                '</div>'+
                '<div class="faqGroupItemBody">'+
                    '<span class="body">'+questions[j].description+'</span>'+
                '</div>'+
            '</div>';
        }
        htmlGroupString += '<div class="faqGroups">'+ htmlGroupHeadString + htmlGroupBodyString + '</div>';
        htmlGroupHeadString = ''; htmlGroupBodyString = '';
    }
    htmlNotString +='<div id="faqMenu" class="faqNotesItem">' + htmlNotItemHead + '</div>';

    for(var k=0;k<dataOfNotices.length;k++){
        htmlNotItemHead  += '<div class="faqNotesItemHead"><span>'+dataOfNotices[k].title+'  </span> </div>';
        htmlNotItemBody +='<div class="faqNotesItemBody"><span>'+dataOfNotices[k].description+'</span> </div>';
        htmlNotString +='<div class="faqNotesItem">' + htmlNotItemHead + htmlNotItemBody + '</div>';
        htmlNotItemHead = ''; htmlNotItemBody = '';
    }
    htmlNotString = '<div class="faqNotes">' + htmlNotString + '</div>';
    $('.faqBody').html(htmlNotString + htmlGroupString);
    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform") ||
            obj.css("-ms-transform") ||
            obj.css("-o-transform") ||
            obj.css("transform");
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
            var angle = 0;
        }
        return (angle < 0) ? angle + 360 : angle;
    }
    $('.faqGroupItem').click(function () {
        if (getRotationDegrees($(this).find('.sectionButton')) == 0) {
            $(this).find('.faqGroupItemBody').slideDown();
            $(this).find('.sectionButton').css('transform', 'rotate(180deg)');
            $('.textAboutButton').html('Свернуть все');
            $('.sectionButton').parent().parent().parent().find('.sectionsButton').css('transform', 'rotate(180deg)');
        } else {
            $(this).find('.faqGroupItemBody').slideUp();
            $(this).find('.sectionButton').css('transform', 'rotate(0deg)');
            var faqGroupItemBody = $(this).find('.faqGroupItemBody');
            var c = 0;
            for (var q=0;q<faqGroupItemBody.length; q++){
                if(faqGroupItemBody[q].style.display == 'block'){
                    c++;
                }
            }
            if(c<2){
                $('.textAboutButton').html('Раскрыть все');
                $('.sectionButton').parent().parent().parent().find('.sectionsButton').css('transform', 'rotate(0deg)');
            }
        }
    });
    $('.textAboutButton').html('Раскрыть все');
    $('.sectionsButton').click(function(){
        if(getRotationDegrees($(this)) == 0){
            $('.textAboutButton').html('Свернуть все');
            $(this).parent().find('.sectionsButton').css('transform', 'rotate(180deg)');
            $(this).parent().parent().find('.sectionButton').css('transform', 'rotate(180deg)');
            $(this).parent().parent().find('.faqGroupItemBody').slideDown();
        }else{
            $('.textAboutButton').html('Раскрыть все');
            $(this).parent().find('.sectionsButton').css('transform', 'rotate(0deg)');
            $(this).parent().parent().find('.sectionButton').css('transform', 'rotate(0deg)');
            $(this).parent().parent().find('.faqGroupItemBody').slideUp();
        }
    });
    $('.textAboutButton').click(function(){
        if(getRotationDegrees($(this).parent().find('.sectionsButton')) == 0){
            $('.textAboutButton').html('Свернуть все');
            $(this).parent().find('.sectionsButton').css('transform', 'rotate(180deg)');
            $(this).parent().parent().find('.sectionButton').css('transform', 'rotate(180deg)');
            $(this).parent().parent().find('.faqGroupItemBody').slideDown();
        }else{
            $('.textAboutButton').html('Раскрыть все');
            $(this).parent().find('.sectionsButton').css('transform', 'rotate(0deg)');
            $(this).parent().parent().find('.sectionButton').css('transform', 'rotate(0deg)');
            $(this).parent().parent().find('.faqGroupItemBody').slideUp();
        }
    });
    $('.faqBody').css('min-height', ($('.faqNotes').css('height')+100)+'px');

    function doSearch(str){
        $('.faqGroups').css('display', 'inline-block');
        $('.faqGroupItem').css('display', 'inline-block');
        var groupNullResultCount = 0;
        var k=1;
        for(var i =0; i<$('.faqGroups').length;i++){
            var headTitle = document.querySelectorAll('.faqGroups')[i].children[0].children[0].innerText;
            if(headTitle.split(str).length >1 ){
                for(k=1;k<headTitle.split(str).length; k++){
                    headTitle.replace(str, '<span class="findWord">' + str + '</span>')
                }
                document.querySelectorAll('.faqGroups')[i].children[0].children[0].innerText = headTitle;
            }else{
                groupNullResultCount = 0;
                for(var j=1;j<document.querySelectorAll('.faqGroups')[i].children.length; j++){
                    var groupTitle = document.querySelectorAll('.faqGroups')[i].children[j].children[0].children[0].innerText;
                    var groupText = document.querySelectorAll('.faqGroups')[i].children[j].children[1].children[0].innerText;
                    if(groupTitle.split(str).length >1 || groupText.split(str).length >1){
                        for(k=1;k<groupTitle.split(str).length; k++){
                            groupTitle.replace(str, '<span class="findWord">' + str + '</span>')
                        }
                        for(k=1;k<groupText.split(str).length; k++){
                            groupText.replace(str, '<span class="findWord">' + str + '</span>')
                        }
                        document.querySelectorAll('.faqGroups')[i].children[j].children[0].children[0].innerText = groupTitle;
                        document.querySelectorAll('.faqGroups')[i].children[j].children[1].children[0].innerText = groupText;
                    }else{
                        groupNullResultCount++;
                        document.querySelectorAll('.faqGroups')[i].children[j].style.display="none";
                    }
                }
                if(groupNullResultCount == document.querySelectorAll('.faqGroups')[i].children.length - 1){
                    if(headTitle.split(str).length <=1 ){
                        document.querySelectorAll('.faqGroups')[i].style.display="none";
                    }
                }
            }
        }
    }
    $('.faqHeaderButtonItem').click(function(){
        doSearch($('.faqHeaderSearch input').val());
    });

    function resposibaleDisplay(){
        if(document.body.clientWidth<1440 && document.body.clientWidth>699){
            $('.faqHeaderSearch input').css('width', (document.body.clientWidth - 282) +'px');
            $('.faqHeaderDogIcon').css('margin-left', '-'+($('.faqHeaderSearch input').width()+138) +'px');
            $('.faqGroups').css('width', (document.body.clientWidth - 356) +'px');
            $('.faqGroupItem').css('width', (document.body.clientWidth - 442) +'px');
        }else if(document.body.clientWidth<700){
            $('.faqHeaderSearch input').css('width', '79%');
            //$('.faqHeaderDogIcon').css('margin-left', '0px');
            $('.faqGroups').css('width', '100%');
            $('.faqGroupItem').css('width', '80%');
        }else{
             $('.faqHeaderSearch input').css('width', (document.body.clientWidth - 825) +'px');
             $('.faqHeaderDogIcon').css('margin-left', '-'+($('.faqHeaderSearch input').width()+161) +'px');

             $('.faqGroups').css('width', (document.body.clientWidth - 540) +'px');
             $('.faqGroupItem').css('width', '86%');
             
        }
        $('.textAboutButton').css('margin-left', ($('.faqGroupItem').width() - 100)+'px');
    }
    resposibaleDisplay();
    $(window).resize(function(){
        resposibaleDisplay();
    });

    $(window).scroll(function(){
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        if(scrollTop > 300 && document.body.clientWidth>699){
            document.getElementById('faqMenu').style.position='fixed';
            document.getElementById('faqMenu').style.marginTop='-200px';
        }else{
            document.getElementById('faqMenu').style.position='relative';
            document.getElementById('faqMenu').style.marginTop='17px';
        }
    });

    $('.linkToGroup').click(function(){
        doSearch('');
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var element =  document.getElementById($(this).text().trim());
        $('html, body').animate({scrollTop:element.getBoundingClientRect().top  +  scrollTop - clientTop -75}, 800);
    });

});
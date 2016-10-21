$( document ).ready(function() {
    document.getElementById('toolbar').style.backgroundColor = "#ffffff";
    document.getElementById('leftMenu').style.backgroundColor = "#ffffff";
    if(document.body.clientWidth>700){
        document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo_onscroll.svg')";
    }else{
        document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
    }
    window.addEventListener("scroll", function() {

            if(document.body.clientWidth>700){
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo_onscroll.svg')";
            }else{
                document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
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
    var dateJson={};
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
    htmlNotItemHead  += '<div class="faqNotesItemHead "><span>Содержание </span> </div>';
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
    var htmlDontFound ='<div id="dontFoundLine" class="dontFoundLine"><div class="dontFoundBlock"><span>По вашему запросу ничего не найдено</span></div></div> ';

    htmlNotString = htmlDontFound + '<div class="faqNotes">' + htmlNotString + '</div>';
    $('.faqBody').html(htmlNotString + htmlGroupString);

    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform") ||
            obj.css("-ms-transform") ||
            obj.css("-o-transform") ||
            obj.css("transform");
        var angle = 0;
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
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
        $('#dontFoundLine').css('display', 'none');
        var lastSearchSpanOpen = '<span class="findWord">';
        var lastSearchSpanClose = '</span>';
        var nullResultElementWidth = $('.faqGroupItem').width();
        var strUpperCase = str.toUpperCase();
        var strFSleUpperCase = '';
        if(str.length>0){
            strFSleUpperCase = str[0].toUpperCase() + str.substring(1, str.length);
        }
        var groupNullResultCount = 0;
        var k=1;
        var itemsCount = 0;
        var headTitle, headTitleUpperCase, groupTitle, groupTitleUpperCase, groupText, groupTextUpperCase;

        $('.faqGroups').css('display', 'inline-block');
        $('.faqGroupItem').css('display', 'inline-block');

        for(var i =0; i<$('.faqGroups').length;i++){
            headTitle = document.querySelectorAll('.faqGroups')[i].children[0].children[0].innerText;
            headTitleUpperCase = headTitle.toUpperCase();
            itemsCount = itemsCount + headTitleUpperCase.split(strUpperCase).length - 1;

                groupNullResultCount = 0;
                for(var j=1;j<document.querySelectorAll('.faqGroups')[i].children.length; j++){
                     groupTitle = document.querySelectorAll('.faqGroups')[i].children[j].children[0].children[0].innerText;
                     groupTitleUpperCase = groupTitle.toUpperCase();
                     groupText = document.querySelectorAll('.faqGroups')[i].children[j].children[1].children[0].innerText;
                     groupTextUpperCase = groupText.toUpperCase();

                    itemsCount = itemsCount + groupTitleUpperCase.split(strUpperCase).length + groupTextUpperCase.split(strUpperCase).length - 2;

                    for(k=1;k<groupTitle.split(lastSearchSpanOpen).length; k++){
                        groupTitle = groupTitle.replace(lastSearchSpanOpen, '');
                        groupTitle = groupTitle.replace(lastSearchSpanClose, '');
                    }
                    for(k=1;k<groupText.split(lastSearchSpanOpen).length; k++){
                        groupText = groupText.replace(lastSearchSpanOpen, '');
                        groupText = groupText.replace(lastSearchSpanClose, '');
                    }
                    if(groupTitleUpperCase.split(strUpperCase).length >1 || groupTextUpperCase.split(strUpperCase).length >1){
                        for(k=1;k<groupTitleUpperCase.split(strUpperCase).length; k++){
                            groupTitle = groupTitle.replace(str, '<span class="findWord">' + str + '</span>');
                            groupTitle = groupTitle.replace(strFSleUpperCase, '<span class="findWord">' + strFSleUpperCase + '</span>');
                        }
                        for(k=1;k<groupTextUpperCase.split(strUpperCase).length; k++){
                            groupText = groupText.replace(str, '<span class="findWord">' + str + '</span>');
                            groupText = groupText.replace(strFSleUpperCase, '<span class="findWord">' + strFSleUpperCase + '</span>');
                        }
                        if(groupTextUpperCase.split(strUpperCase).length>1 && str.length>0){
                            document.querySelectorAll('.faqGroups')[i].children[j].children[1].style.display="block";
                        }else{
                            document.querySelectorAll('.faqGroups')[i].children[j].children[1].style.display="none";
                        }
                        document.querySelectorAll('.faqGroups')[i].children[j].children[0].children[0].innerHTML = groupTitle;
                        document.querySelectorAll('.faqGroups')[i].children[j].children[1].children[0].innerHTML = groupText;
                    }else{
                        groupNullResultCount++;
                        document.querySelectorAll('.faqGroups')[i].children[j].style.display = "none";
                    }
                }
                if(groupNullResultCount == document.querySelectorAll('.faqGroups')[i].children.length - 1){
                    if(headTitle.split(str).length <=1 ){
                        document.querySelectorAll('.faqGroups')[i].style.display="none";
                    }
                }
        }
        if(itemsCount == 0){
            $('#dontFoundLine').css('display', 'block');
            $('.dontFoundBlock').width(nullResultElementWidth);
            $('.faqGroups').css('display', 'block');
            $('.faqGroups .faqGroupItem').css('display', 'block');

        }
    }
    $('.faqHeaderButtonItem').click(function(){
        doSearch($('.faqHeaderSearch input').val());
    });

    $('.faqHeaderSearch').on('keydown', function(e) {
        if( e.which ==13){
            doSearch($('.faqHeaderSearch input').val());
        }
    });

    function resposibaleDisplay(){
        if(document.body.clientWidth<1440 && document.body.clientWidth>699){
            $('.faqHeaderSearch input').css('width', (document.body.clientWidth - 282) +'px');
            $('.faqHeaderDogIcon').css('margin-left', '-'+($('.faqHeaderSearch input').width()+138) +'px');
            $('.faqGroups').css('width', (document.body.clientWidth - 356) +'px');
            $('.faqGroupItem').css('width', (document.body.clientWidth - 442) +'px');
        }else if(document.body.clientWidth<700){
            $('.faqHeaderSearch input').css('width', '79%');
            $('.faqHeaderDogIcon').css('margin-left', '0px');
            $('.faqGroups').css('width', '100%');
            $('.faqGroupItem').css('width', '80%');
        }else{
             $('.faqHeaderSearch input').css('width', (document.body.clientWidth - 825) +'px');
             $('.faqHeaderDogIcon').css('margin-left', '-'+($('.faqHeaderSearch input').width()+170) +'px');

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
        console.log('a')
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var footerHeight = 0;

        if(scrollTop > 200 && document.body.clientWidth>699 && window.scrollY < document.body.clientHeight-window.innerHeight - 1000){
            document.getElementById('faqMenu').style.position='fixed';
            document.getElementById('faqMenu').style.marginTop='-200px';
        }else{
            if(document.body.clientWidth>1439){
                footerHeight = 100;
            }else{
                footerHeight = 200;
            }
            if(window.scrollY > document.body.clientHeight-window.innerHeight - footerHeight && document.body.clientWidth>699){
                document.getElementById('faqMenu').style.position='relative';
                document.getElementById('faqMenu').style.marginTop=(scrollTop - window.innerHeight*1/3)+'px';
            }else if(document.body.clientWidth>699 && scrollTop > 200){
                document.getElementById('faqMenu').style.position='fixed';
                document.getElementById('faqMenu').style.marginTop='-200px';
            }else{
                document.getElementById('faqMenu').style.position='relative';
                document.getElementById('faqMenu').style.marginTop='17px';
            }
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
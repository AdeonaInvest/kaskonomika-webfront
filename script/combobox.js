/**
 * Created by Taron on 29.09.2016.
 */


$('.filterButton, .filterButtonEF').click(function(){
    if($(this).attr('class') == 'filterButton getAction' || $(this).attr('class') == 'filterButtonEF getActionEF'){

        $('.popupWindow').css('display', 'inline-block');
        $('.displayBlock').css('display', 'inline-block');
        $('.popupWindowClose').css('display', 'inline-block');
        $('.popupInputtel').css('display', 'none');
        $('.popupInputEmail').css('display', 'inline-block');
    }
});

document.getElementById('searchInput').onkeyup = function(e){
    var inputText= document.getElementById('searchInput').value.toUpperCase();
    for(var i=0;i<document.querySelectorAll('.selectItemdiv').length;i++){
        var selectItem=document.querySelectorAll('.selectItemdiv')[i].childNodes[0].textContent.toUpperCase();
        if(selectItem.indexOf(inputText) ==0
            || (selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)] >0
            && selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)]==" ")){
            document.querySelectorAll('.selectItemdiv')[i].style.display='inline-block';
        }else{
            document.querySelectorAll('.selectItemdiv')[i].style.display='none';
        }
        if($('.selectItemdiv:not([style*="display: none"])').length <1){
            if($('#selectInputBody p').length  == 0){
                $('#selectInputBody').append('<p style="margin-left: 20px; display:inline-block;" >Нет результатов</p>');
            };
            $('#selectInputBody p').css('display', 'inline-block');
        }else{
            $('#selectInputBody p').css('display', 'none');
        }
    }
};
document.getElementById('searchInputEF').onkeyup = function(e){
    var inputText= document.getElementById('searchInputEF').value.toUpperCase();
    for(var i=0;i<document.querySelectorAll('.selectItemdivEF').length;i++){
        var selectItem=document.querySelectorAll('.selectItemdivEF')[i].childNodes[0].textContent.toUpperCase();
        if(selectItem.indexOf(inputText) ==0
            || (selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)] >0
            && selectItem[parseInt(selectItem.indexOf(inputText)) - parseInt(1)]==" ")){
            document.querySelectorAll('.selectItemdivEF')[i].style.display='inline-block';
        }else{
            document.querySelectorAll('.selectItemdivEF')[i].style.display='none';
        }
        if($('.selectItemdivEF:not([style*="display: none"])').length <1){
            if($('#selectInputBodyEF p').length  == 0){
                $('#selectInputBodyEF').append('<p style="margin-left: 20px; display:inline-block;">Нет результатов</p>');
            };
            $('#selectInputBodyEF p').css('display', 'inline-block');
        }else{
            $('#selectInputBodEFy p').css('display', 'none');
        }
    }
};

var slidekey = 0;
$('.selectItemdiv, .selectItemdivEF').click(function(){
    $('.selectInputHead, .selectInputHeadEF').append('<div class="selectedTab"><span class="selectedItem">'+$(this).id+'</span><span class="close">x</span></div>')
});
$(".selectInputBody, .selectInputBodyEF").hide();

function clickOpenListIcon(){
    if($(".selectInputBody, .selectInputBodyEF").css('display') !="block"){
        $('#selectPanel, #selectPanelEF').css('border-bottom-right-radius', '0px');
        $('#selectPanel, #selectPanelEF').css('border-bottom-left-radius', '0px');
    }else{
        $('#selectPanel, #selectPanelEF').css('border-bottom-right-radius', '5px');
        $('#selectPanel, #selectPanelEF').css('border-bottom-left-radius', '5px');
    }
    $(".selectInputBody, .selectInputBodyEF").slideToggle("medium");
    slidekey = 1;
}
$(".openListIcon, .openListIconEF").click(function(e){
    clickOpenListIcon();
});
$(".searchInput, .searchInputEF").click(function(e){
    $(".selectInputBody, .selectInputBodyEF").slideDown("medium");
});

function clickSelectInputHead(){
    if(slidekey !=1){
        $(".selectInputBody, .selectInputBodyEF").slideDown("medium");
        $('#selectPanel, #selectPanelEF').css('border-bottom-right-radius', '0px');
        $('#selectPanel, #selectPanelEF').css('border-bottom-left-radius', '0px');
    }
    slidekey = 0;
};

document.querySelectorAll(".selectInputHead, .selectInputHeadEF")[0].addEventListener("click", function(e){
    clickSelectInputHead();
});
document.querySelectorAll(".selectInputHead, .selectInputHeadEF")[1].addEventListener("click", function(e){
    clickSelectInputHead();
});

var filtersList ={
    maxWidth:null,
    width:0,
    inputWidth:null,
    words:[]
};

function setFilterListValue(){
    if(document.body.clientWidth <350){
        filtersList.maxWidth = 22;
        filtersList.inputWidth=10;
    }else if(document.body.clientWidth <1000){
        filtersList.maxWidth=((document.body.clientWidth * 0.7)/8) - 8;
        filtersList.inputWidth=14;
    }else if(document.body.clientWidth <1440){
        filtersList.maxWidth=36;
        filtersList.inputWidth=16;

    }else {
        filtersList.maxWidth=75;
        filtersList.inputWidth=36;

    };
}
setFilterListValue();
window.onresize = function(event) {
    setFilterListValue();
};
function filtrationEndResult(){
    filtersList.width = 6*3;
    for (var j=6; j>=0;j--){
        if(filtersList.width<filtersList.maxWidth - 2 && j>=0){
            if(filtersList.words[j].symbols <1){
                filtersList.words[j].symbols = filtersList.words[j].value.length;
                filtersList.width +=(filtersList.words[j].symbols + 3);
                switch (j){
                    case 0:
                        $('.selectedMark .selectedItem, .selectedMarkEF .selectedItem').text(filtersList.words[0].value);
                        break;
                    case 1:
                        $('.selectedYear .selectedItem, .selectedYearEF .selectedItem').text(filtersList.words[1].value);
                        break;
                    case 2:
                        $('.selectedModel .selectedItem, .selectedModelEF .selectedItem').text(filtersList.words[2].value);
                        break;
                    case 3:
                        $('.selectedModification .selectedItem, .selectedModificationEF .selectedItem').text(filtersList.words[3].value);
                        break;
                    case 4:
                        $('.selectedPilot .selectedItem, .selectedPilotEF .selectedItem').text(filtersList.words[4].value);
                        break;
                    case 5:
                        $('.selectedAge .selectedItem, .selectedAgeEF .selectedItem').text(filtersList.words[5].value);
                        break;
                    case 6:
                        $('.selectedExperiance .selectedItem, .selectedExperianceEF .selectedItem').text(filtersList.words[6].value);
                        break;
                }
            }

        }
    }
}
function filtrationExample(n){
    filtersList.width =n*3;
    for (var j=n; j> -1;j--){

        if(filtersList.inputWidth + filtersList.width + (filtersList.words[j].value.length)<filtersList.maxWidth && j> -1){
            filtersList.words[j].symbols = filtersList.words[j].value.length;
            filtersList.width +=(filtersList.words[j].symbols);
            switch (j){
                case 0:
                    document.querySelector('#selectedMark .selectedItem').innerText = filtersList.words[j].value;
                    document.querySelector('#selectedMarkEF .selectedItem').innerText = filtersList.words[j].value;
                    break;
                case 1:
                    document.querySelector('#selectedYear .selectedItem').innerText = filtersList.words[j].value;
                    document.querySelector('#selectedYearEF .selectedItem').innerText = filtersList.words[j].value;
                    break;
                case 2:
                    document.querySelector('#selectedModel .selectedItem').innerText = filtersList.words[j].value;
                    document.querySelector('#selectedModelEF .selectedItem').innerText = filtersList.words[j].value;
                    break;
                case 3:
                    document.querySelector('#selectedModification .selectedItem').innerText = filtersList.words[j].value;
                    document.querySelector('#selectedModificationEF .selectedItem').innerText = filtersList.words[j].value;
                    break;
                case 4:
                    document.querySelector('#selectedPilot .selectedItem').innerText = filtersList.words[j].value;
                    document.querySelector('#selectedPilotEF .selectedItem').innerText = filtersList.words[j].value;
                    break;
                case 5:
                    document.querySelector('#selectedAge .selectedItem').innerText = filtersList.words[j].value;
                    document.querySelector('#selectedAgeEF .selectedItem').innerText = filtersList.words[j].value;
                    break;
                case 6:
                    document.querySelector('#selectedExperiance .selectedItem').innerText = filtersList.words[j].value;
                    document.querySelector('#selectedExperianceEF .selectedItem').innerText = filtersList.words[j].value;
                    break;
            }
        }else{
            filtersList.words[j].symbols = 0;
            switch (j){
                case 0:
                    document.querySelector('#selectedMark .selectedItem').innerText = '';
                    document.querySelector('#selectedMarkEF .selectedItem').innerText = '';
                    break;
                case 1:
                    document.querySelector('#selectedYear .selectedItem').innerText = '';
                    document.querySelector('#selectedYearEF .selectedItem').innerText = '';
                    break;
                case 2:
                    document.querySelector('#selectedModel .selectedItem').innerText = '';
                    document.querySelector('#selectedModelEF .selectedItem').innerText = '';
                    break;
                case 3:
                    document.querySelector('#selectedModification .selectedItem').innerText = '';
                    document.querySelector('#selectedModificationEF .selectedItem').innerText = '';
                    break;
                case 4:
                    document.querySelector('#selectedPilot .selectedItem').innerText = '';
                    document.querySelector('#selectedPilotEF .selectedItem').innerText = '';
                    break;
                case 5:
                    document.querySelector('#selectedAge .selectedItem').innerText = '';
                    document.querySelector('#selectedAgeEF .selectedItem').innerText = '';
                    break;
                case 6:
                    document.querySelector('#selectedExperiance .selectedItem').innerText = '';
                    document.querySelector('#selectedExperianceEF .selectedItem').innerText = '';
                    break;
            }
        }
    }
}
var SearchString = "http://api.kaskonomika.ru/v1/dictionaries/marks";
function addFilter(value, type, id) {
    $('.searchInput, .searchInputEF').val('');
    filtersList.words[type] = {value:value, symbols:value.length, id:id};
    filtersList.width +=filtersList.words[type].symbols + 3;
    switch (type){
        case 0:
            $('.selectInputHead').append('<div id="selectedMark" class="selectedTab selectedMark"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            $('.selectInputHeadEF').append('<div id="selectedMarkEF" class="selectedTab selectedMark"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            break;
        case 1:
            $('.selectInputHead').append('<div id="selectedYear" class="selectedTab selectedYear"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            $('.selectInputHeadEF').append('<div id="selectedYearEF" class="selectedTab selectedYear"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            break;
        case 2:
            $('.selectInputHead').append('<div id="selectedModel" class="selectedTab selectedModel"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            $('.selectInputHeadEF').append('<div id="selectedModelEF" class="selectedTab selectedModel"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            break;
        case 3:
            $('.selectInputHead').append('<div id="selectedModification" class="selectedTab selectedModification"><span id="'+id+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            $('.selectInputHeadEF').append('<div id="selectedModificationEF" class="selectedTab selectedModification"><span id="'+id+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            break;
        case 4:
            $('.selectInputHead').append('<div id="selectedPilot" class="selectedTab selectedPilot"><span id="'+id+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            $('.selectInputHeadEF').append('<div id="selectedPilotEF" class="selectedTab selectedPilot"><span id="'+id+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            break;
        case 5:
            $('.selectInputHead').append('<div id="selectedAge" class="selectedTab selectedAge"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            $('.selectInputHeadEF').append('<div id="selectedAgeEF" class="selectedTab selectedAge"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            break;
        case 6:
            $('.selectInputHead').append('<div id="selectedExperiance" class="selectedTab selectedExperiance"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');
            $('.selectInputHeadEF').append('<div id="selectedExperianceEF" class="selectedTab selectedExperiance"><span id="'+value+'" class="selectedItem">'+value+'</span><span class="close">x</span></div>');

            $(".selectInputBody, .selectInputBodyEF").slideUp();
            $(".searchInput, .searchInputEF").css("display", "none");
            break;
    };
    filtrationExample(type);
}
function getPilotExYearData() {

    $(".searchInput, .searchInputEF").css("display", "inline-block");
    $(".openListIcon, .openListIconEF").css('display', 'inline-block');


    if (document.body.clientWidth < 1440) {
        $('.automobile, .automobileEF').css('display', 'none');
        $('.pilot, .pilotEF').css('display', 'inline-block');
        $('.sentence, .sentenceEF').css('display', 'none');
    }else{
        $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
    }

    $(".applicationStraight").removeClass("stepStraight"); $(".applicationStraight").removeClass("stepStraightEF");
    $(".applicationRound").removeClass("stepRound"); $(".applicationRoundEF").removeClass("stepRoundEF");
    $(".applicationStraight, .applicationStraightEF").addClass("straight"); $(".applicationStraight, .applicationStraightEF").addClass("straightEF");
    $(".applicationRound, .applicationRoundEF").addClass("round"); $(".applicationRound, .applicationRoundEF").addClass("roundEF");


    $('.automobile, .pilot').css('color', '#ffffff');
    $('.automobileEF, .pilotEF').css('color', '#50b2d9');
    $('.sentence, .requisites').css('color', '#50b2d9');
    $('.sentenceEF, .requisitesEF').css('color', '#cccccc');

    filtersList.inputWidth = 14;
    $('.searchInput, .searchInputEF').css('width','72px');
    $(".searchInput, .searchInputEF").attr("placeholder", "Стаж с");
    $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('<div class="selectInputBodydivRow selectInputBodydivRow1"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow2"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow3"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow4"></div>');
    var htmlString1 = "";
    var htmlString2 = "";
    var htmlString3 = "";
    var htmlString4 = "";
    var yearCount = filtersList.words[5].value - 16;
    if(document.body.clientWidth>=1440){
        for (var i = 2016 ; i > 2016 - (filtersList.words[5].value - 16); i--) {
            if(2016 -i < yearCount /4){
                htmlString1 += '<div id="'+i+'" class="'+i+' year selectItemdiv"><span>'+i+'</span></div> ';
            }else if(2016 -i < yearCount*2/4){
                htmlString2 += '<div id="'+i+'" class="'+i+' year selectItemdiv"><span>'+i+'</span></div> ';
            }else if(2016 -i < yearCount*3/4){
                htmlString3 += '<div id="'+i+'" class="'+i+' year selectItemdiv"><span>'+i+'</span></div> ';
            }else{
                htmlString4 += '<div id="'+i+'" class="'+i+' year selectItemdiv"><span>'+i+'</span></div> ';
            }
        }
        $('.selectInputBodydivRow1').html(htmlString1);
        $('.selectInputBodydivRow2').html(htmlString2);
        $('.selectInputBodydivRow3').html(htmlString3);
        $('.selectInputBodydivRow4').html(htmlString4);
    }else{
        for (var i = 2016 ; i > 2016 - (filtersList.words[5].value - 16); i--) {
            if(2016 -i < yearCount/2){
                htmlString1 += '<div id="'+i+'" class="'+i+' year selectItemdiv"><span>'+i+'</span></div> ';
            }else{
                htmlString2 += '<div id="'+i+'" class="'+i+' year selectItemdiv"><span>'+i+'</span></div> ';
            }
        }
        $('.selectInputBodydivRow1').html(htmlString1);
        $('.selectInputBodydivRow2').html(htmlString2);
        $('.selectInputBodydivRow3').css('display','none');
        $('.selectInputBodydivRow4').css('display','none');
    }

    $('.selectItemdiv, .selectItemdivEF').click(function(){
        addFilter($(this).context.id, 6, $(this).context.id);

        $("#selectedExperianceEF .close, #selectedExperiance .close").click(function(){
            $('.selectInputBody, .selectInputBodyEF').css('padding-bottom', '40px');
            $('.selectInputBody, .selectInputBodyEF').css('padding-top', '15px');

            getPilotExYearData();
            $('.selectedExperiance, .selectedExperianceEF').remove();
            filtersList.width =(filtersList.words[5].symbols + 3) + (filtersList.words[4].symbols + 3) + (filtersList.words[3].symbols + 3) + (filtersList.words[2].symbols + 3) + (filtersList.words[1].symbols + 3) + (filtersList.words[0].symbols + 3);
        });
        $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('');
        $('.selectInputBodyEF').css('padding-bottom', '0px');
        $('.selectInputBodyEF').css('padding-top', '0px');
        $(".selectInputBodyEF").css("display", "none");
        $('.selectInputBody').css('padding-bottom', '0px');
        $('.selectInputBody').css('padding-top', '0px');
        $(".selectInputBody").css("display", "none");
        $(".selectInputBody, .selectInputBodyEF").slideUp("medium");

        $(".searchInput, .searchInputEF").css("display", "none");
        $(".openListIcon, .openListIconEF").css('display', 'none');

        $(".applicationStraight").removeClass("straight"); $(".applicationStraightEF").removeClass("straightEF");
        $(".applicationRound").removeClass("round"); $(".applicationRoundEF").removeClass("roundEF");
        $(".applicationStraight").addClass("stepStraight"); $(".applicationStraightEF").addClass("stepStraightEF");
        $(".applicationRound").addClass("stepRound"); $(".applicationRoundEF").addClass("stepRoundEF");

        filtrationEndResult();
        $('#selectPanel, #selectPanelEF').css('border-bottom-right-radius', '5px');
        $('#selectPanel, #selectPanelEF').css('border-bottom-left-radius', '5px');
        $(".filterButton").addClass('getAction'); $(".filterButtonEF").addClass('getActionEF');


        if (document.body.clientWidth < 1440) {
            $('.automobile, .automobileEF').css('display', 'none');
            $('.pilot, .pilotEF').css('display', 'none');
            $('.sentence, .sentenceEF').css('display', 'inline-block');
        }else{
            $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
        }
        $('.automobile, .pilot, .sentence').css('color', '#ffffff');
        $('.automobileEF, .pilotEF, .sentenceEF').css('color', '#50b2d9');
        $('.requisites').css('color', '#50b2d9');
        $('.requisitesEF').css('color', '#cccccc');
    });
}
function getPilotAgeData() {

    $(".searchInput, .searchInputEF").css("display", "inline-block");
    $(".openListIcon, .openListIconEF").css('display', 'inline-block');

    if (document.body.clientWidth < 1440) {
        $('.automobile, .automobileEF').css('display', 'none');
        $('.pilot, .pilotEF').css('display', 'inline-block');
        $('.sentence, .sentenceEF').css('display', 'none');
    }else{
        $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
    }
    $('.automobile, .pilot').css('color', '#ffffff');
    $('.automobileEF, .pilotEF').css('color', '#50b2d9');
    $('.sentence, .requisites').css('color', '#50b2d9');
    $('.sentenceEF, .requisitesEF').css('color', '#cccccc');

    filtersList.inputWidth = 14;
    $('.searchInput, .searchInputEF').css('width','100px');

    $(".searchInput, .searchInputEF").attr("placeholder", "Возраст");

    $(".applicationStraight").removeClass("stepStraight"); $(".applicationStraight").removeClass("stepStraightEF");
    $(".applicationRound").removeClass("stepRound"); $(".applicationRoundEF").removeClass("stepRoundEF");
    $(".applicationStraight, .applicationStraightEF").addClass("straight"); $(".applicationStraight, .applicationStraightEF").addClass("straightEF");
    $(".applicationRound, .applicationRoundEF").addClass("round"); $(".applicationRound, .applicationRoundEF").addClass("roundEF");

    $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('<div class="selectInputBodydivRow selectInputBodydivRow1"></div> ' +
        '<div class="selectInputBodydivRow selectInputBodydivRow2"></div> ' +
        '<div class="selectInputBodydivRow selectInputBodydivRow3"></div> ' +
        '<div class="selectInputBodydivRow selectInputBodydivRow4"></div>');
    var htmlString1 = "";
    var htmlString2 = "";
    var htmlString3 = "";
    var htmlString4 = "";
    if(document.body.clientWidth>=1440) {
        for (var i = 18; i < 70; i++) {
            if(i <32){
                htmlString1 += '<div id="' + i + '" class="' + i + ' year selectItemdiv"><span>' + i + '</span></div> ';
            }else if(i <45){
                htmlString2 += '<div id="' + i + '" class="' + i + ' year selectItemdiv"><span>' + i + '</span></div> ';
            }else if(i <58){
                htmlString3 += '<div id="' + i + '" class="' + i + ' year selectItemdiv"><span>' + i + '</span></div> ';
            }else{
                htmlString4 += '<div id="' + i + '" class="' + i + ' year selectItemdiv"><span>' + i + '</span></div> ';
            }
        }
        $('.selectInputBodydivRow1').html(htmlString1);
        $('.selectInputBodydivRow2').html(htmlString2);
        $('.selectInputBodydivRow3').html(htmlString3);
        $('.selectInputBodydivRow4').html(htmlString4);
    }else{
        for (var i = 18; i < 70; i++) {
            if (i < (70 +18)/2 ) {
                htmlString1 += '<div id="' + i + '" class="' + i + ' year selectItemdiv"><span>' + i + '</span></div> ';
            }else{
                htmlString2 += '<div id="' + i + '" class="' + i + ' year selectItemdiv"><span>' + i + '</span></div> ';
            }
        }
        $('.selectInputBodydivRow1').html(htmlString1);
        $('.selectInputBodydivRow2').html(htmlString2);
        $('.selectInputBodydivRow3').css('display','none');
        $('.selectInputBodydivRow4').css('display','none');
    }

    $('.selectItemdiv, .selectItemdivEF').click(function(){
        addFilter($(this).context.id, 5, $(this).context.id);

        $("#selectedAge .close, #selectedAgeEF .close").click(function(){
            $('.selectInputBody, .selectInputBodyEF').css('padding-bottom', '40px');
            $('.selectInputBody, .selectInputBodyEF').css('padding-top', '15px');

            getPilotAgeData();
            $('.selectedExperiance, .selectedExperianceEF').remove();
            $('.selectedAge, .selectedAgeEF').remove();
            filtersList.width =(filtersList.words[4].symbols + 3) + (filtersList.words[3].symbols + 3) + (filtersList.words[2].symbols + 3) + (filtersList.words[1].symbols + 3) + (filtersList.words[0].symbols + 3);
        });

        getPilotExYearData();
    });
}
function getPilotsData() {

    $(".searchInput, .searchInputEF").css("display", "inline-block");
    $(".openListIcon, .openListIconEF").css('display', 'inline-block');

    if (document.body.clientWidth < 1440) {
        $('.automobile, .automobileEF').css('display', 'none');
        $('.pilot, .pilotEF').css('display', 'inline-block');
        $('.sentence, .sentenceEF').css('display', 'none');
    }else{
        $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
    }

    $('.automobile, .pilot').css('color', '#ffffff');
    $('.automobileEF, .pilotEF').css('color', '#50b2d9');
    $('.sentence, .requisites').css('color', '#50b2d9');
    $('.sentenceEF, .requisitesEF').css('color', '#cccccc');

    filtersList.inputWidth = 12;
    $('.searchInput, .searchInputEF').css('width','72px');

    $(".searchInput, .searchInputEF").attr("placeholder", "Водитель");

    $(".applicationStraight").removeClass("stepStraight"); $(".applicationStraight").removeClass("stepStraightEF");
    $(".applicationRound").removeClass("stepRound"); $(".applicationRoundEF").removeClass("stepRoundEF");
    $(".applicationStraight, .applicationStraightEF").addClass("straight"); $(".applicationStraight, .applicationStraightEF").addClass("straightEF");
    $(".applicationRound, .applicationRoundEF").addClass("round"); $(".applicationRound, .applicationRoundEF").addClass("roundEF");

    $(".driverStraight").removeClass("stepStraight"); $(".driverStraightEF").removeClass("stepStraightEF");
    $(".driverRound").removeClass("stepRound"); $(".driverRoundEF").removeClass("stepRoundEF");
    $(".driverStraight").removeClass("straight"); $(".driverStraightEF").removeClass("straightEF");
    $(".driverRound").removeClass("round"); $(".driverRoundEF").removeClass("roundEF");
    $(".driverStraight").addClass("stepStraight"); $(".driverStraightEF").addClass("stepStraightEF");
    $(".driverRound").addClass("stepRound"); $(".driverRoundEF").addClass("stepRoundEF");
    $(".selectStepStraight").addClass('selectStepRound'); $(".selectStepStraightEF").addClass('selectStepRoundEF');
    $(".driverStraight").addClass('selectStepStraight'); $(".driverStraightEF").addClass('selectStepStraightEF');

    var htmlString = "";
    $.ajax({
        url: "http://api.kaskonomika.ru/v1/dictionaries/drivers/options",
        dataType : "json",
        success: function (data, textStatus) {

            $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('<div class="selectInputBodydivRow5"></div> ');
            for (var i = 0; i < data.response.length; i++) {
                htmlString += '<div id="'+data.response[i].id+'" class="'+data.response[i].name+' mark selectItemdiv"><span>'+data.response[i].name+'</span></div> ';
            }

            $('.selectInputBodydivRow5').html(htmlString);
            $('.selectItemdiv, .selectItemdivEF').click(function(){
                var pilotStr = $(this).text();
                var pilotStrPart = pilotStr.substr(0,8)+'...';
                addFilter(pilotStrPart, 4, $(this).context.id);

                $("#selectedPilotEF .close, #selectedPilot .close").click(function(){
                    $('.selectInputBody, .selectInputBodyEF').css('padding-bottom', '40px');
                    $('.selectInputBody, .selectInputBodyEF').css('padding-top', '15px');

                    getPilotsData();
                    $('.selectedExperiance, .selectedExperianceEF').remove();
                    $('.selectedAge, .selectedAgeEF').remove();
                    $('.selectedPilot, .selectedPilotEF').remove();
                    filtersList.width =(filtersList.words[3].symbols + 3) + (filtersList.words[2].symbols + 3) + (filtersList.words[1].symbols + 3) + (filtersList.words[0].symbols + 3);

                });

                getPilotAgeData();
            });
        }
    });
}
function getModificationsData(url) {

    $(".searchInput, .searchInputEF").css("display", "inline-block");
    $(".openListIcon, .openListIconEF").css('display', 'inline-block');

    if (document.body.clientWidth < 1440) {
        $('.automobile, .automobileEF').css('display', 'inline-block');
        $('.pilot, .pilotEF').css('display', 'none');
        $('.sentence, .sentenceEF').css('display', 'none');
    }else{
        $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
    }
    $('.automobile').css('color', '#ffffff');
    $('.automobileEF').css('color', '#50b2d9');
    $('.pilot, .sentence, .requisites').css('color', '#50b2d9');
    $('.pilotEF, .sentenceEF, .requisitesEF').css('color', '#cccccc');

    filtersList.inputWidth = 14;
    $('.searchInput, .searchInputEF').css('width','100px');

    $(".applicationStraight").removeClass("stepStraight"); $(".applicationStraight").removeClass("stepStraightEF");
    $(".applicationRound").removeClass("stepRound"); $(".applicationRoundEF").removeClass("stepRoundEF");
    $(".applicationStraight, .applicationStraightEF").addClass("straight"); $(".applicationStraight, .applicationStraightEF").addClass("straightEF");
    $(".applicationRound, .applicationRoundEF").addClass("round"); $(".applicationRound, .applicationRoundEF").addClass("roundEF");

    $(".driverStraight").removeClass("stepStraight"); $(".driverStraightEF").removeClass("stepStraightEF");
    $(".driverRound").removeClass("stepRound"); $(".driverRoundEF").removeClass("stepRoundEF");
    $(".driverStraight").addClass("straight"); $(".driverStraightEF").addClass("straightEF");
    $(".driverRound").addClass("round"); $(".driverRoundEF").addClass("roundEF");
    $(".searchInput, .searchInputEF").attr("placeholder", "Модификацию");
    var htmlString = "";
    $.ajax({
        url: url,
        dataType : "json",
        success: function (data, textStatus) {
            $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('<div class="selectInputBodydivRow5"></div> ');
            for (var i = 0; i < data.response.length; i++) {
                htmlString += '<div id="'+data.response[i].id+'" class="'+data.response[i].modification+'/'+data.response[i].generation+' mark selectItemdiv"><span>'+data.response[i].modification+'('+data.response[i].generation+')</span></div> ';
            }
            $('.selectInputBodydivRow5').html(htmlString);
            $('.selectItemdiv, .selectItemdivEF').click(function(){
                var modStrInd = $(this).text().indexOf("(");
                var modStrIndPart=$(this).text().substr(0, modStrInd);
                if(modStrIndPart.length>11){
                    modStrIndPart = modStrIndPart.substr(0,9) + '...';
                }
                addFilter(modStrIndPart, 3, $(this).context.id);

                $("#selectedModificationEF .close, #selectedModification .close").click(function(){
                    $('.selectInputBody, .selectInputBodyEF').css('padding-bottom', '40px');
                    $('.selectInputBody, .selectInputBodyEF').css('padding-top', '15px');

                    getModificationsData(SearchString +'/'+ filtersList.words[0].value +'/'+ filtersList.words[1].value +'/'+ filtersList.words[2].value);
                    $('.selectedExperiance, .selectedExperianceEF').remove();
                    $('.selectedPilot, .selectedPilotEF').remove();
                    $('.selectedAge, .selectedAgeEF').remove();
                    $('.selectedModification, .selectedModificationEF').remove();
                    filtersList.width =(filtersList.words[2].symbols + 3) + (filtersList.words[1].symbols + 3) + (filtersList.words[0].symbols + 3);
                });

                getPilotsData();
            });
        }
    });
}
function getModelsData(url) {

    $(".searchInput, .searchInputEF").css("display", "inline-block");
    $(".openListIcon, .openListIconEF").css('display', 'inline-block');

    if (document.body.clientWidth < 1440) {
        $('.automobile, .automobileEF').css('display', 'inline-block');
        $('.pilot, .pilotEF').css('display', 'none');
        $('.sentence, .sentenceEF').css('display', 'none');
    }else{
        $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
    }
    $('.automobile').css('color', '#ffffff');
    $('.automobileEF').css('color', '#50b2d9');
    $('.pilot, .sentence, .requisites').css('color', '#50b2d9');
    $('.pilotEF, .sentenceEF, .requisitesEF').css('color', '#cccccc');
    filtersList.inputWidth = 12;
    $('.searchInput, .searchInputEF').css('width','100px');

    $(".applicationStraight").removeClass("stepStraight"); $(".applicationStraight").removeClass("stepStraightEF");
    $(".applicationRound").removeClass("stepRound"); $(".applicationRoundEF").removeClass("stepRoundEF");
    $(".applicationStraight, .applicationStraightEF").addClass("straight"); $(".applicationStraight, .applicationStraightEF").addClass("straightEF");
    $(".applicationRound, .applicationRoundEF").addClass("round"); $(".applicationRound, .applicationRoundEF").addClass("roundEF");

    $(".driverStraight").removeClass("stepStraight"); $(".driverStraightEF").removeClass("stepStraightEF");
    $(".driverRound").removeClass("stepRound"); $(".driverRoundEF").removeClass("stepRoundEF");
    $(".driverStraight, .driverStraightEF").addClass("straight"); $(".driverStraight, .driverStraightEF").addClass("straightEF");
    $(".driverRound, .driverRoundEF").addClass("round"); $(".driverRound, .driverRoundEF").addClass("roundEF");

    $(".searchInput, .searchInputEF").attr("placeholder", "Модель");

    var htmlString = "";
    $.ajax({
        url: url,
        dataType : "json",
        success: function (data, textStatus) {
            $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('<div class="selectInputBodydivRow5"></div> ');
            for (var i = 0; i < data.response.length; i++) {
                htmlString += '<div id="'+data.response[i].model+'" class="'+data.response[i].model+' mark selectItemdiv"><span>'+data.response[i].model+'</span></div> ';
            }
            $('.selectInputBodydivRow5').html(htmlString);
            $('.selectItemdiv, .selectItemdivEF').click(function(){
                addFilter($(this).context.id, 2, $(this).context.id);

                $("#selectedModelEF .close, #selectedModel .close").click(function(){
                    $('.selectInputBody, .selectInputBodyEF').css('padding-bottom', '40px');
                    $('.selectInputBody, .selectInputBodyEF').css('padding-top', '15px');

                    getModelsData(SearchString +'/'+ filtersList.words[0].value +'/'+ filtersList.words[1].value);
                    $('.selectedExperiance, .selectedExperianceEF').remove();
                    $('.selectedAge, .selectedAgeEF').remove();
                    $('.selectedPilot, .selectedPilotEF').remove();
                    $('.selectedModification, .selectedModificationEF').remove();
                    $('.selectedModel, .selectedModelEF').remove();
                    filtersList.width =(filtersList.words[1].symbols + 3) + (filtersList.words[0].symbols + 3);

                });

                getModificationsData(url+'/'+$(this).context.id);
            });
        }
    });
}
function getYearsData(url){

    $(".searchInput, .searchInputEF").css("display", "inline-block");
    $(".openListIcon, .openListIconEF").css('display', 'inline-block');

    if(document.body.clientWidth< 1440) {
        $('.automobile, .automobileEF').css('display', 'inline-block');
        $('.pilot, .pilotEF').css('display', 'none');
        $('.sentence, .sentenceEF').css('display', 'none');
    }else{
        $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
    }
    $('.automobile').css('color', '#ffffff');
    $('.automobileEF').css('color', '#50b2d9');
    $('.pilot, .sentence, .requisites').css('color', '#50b2d9');
    $('.pilotEF, .sentenceEF, .requisitesEF').css('color', '#cccccc');

    filtersList.inputWidth = 14;
    $('.searchInput, .searchInputEF').css('width','180px');

    $(".applicationStraight").removeClass("stepStraight"); $(".applicationStraight").removeClass("stepStraightEF");
    $(".applicationRound").removeClass("stepRound"); $(".applicationRoundEF").removeClass("stepRoundEF");
    $(".applicationStraight, .applicationStraightEF").addClass("straight"); $(".applicationStraight, .applicationStraightEF").addClass("straightEF");
    $(".applicationRound, .applicationRoundEF").addClass("round"); $(".applicationRound, .applicationRoundEF").addClass("roundEF");

    $(".driverStraight").removeClass("stepStraight"); $(".driverStraightEF").removeClass("stepStraightEF");
    $(".driverRound").removeClass("stepRound"); $(".driverRoundEF").removeClass("stepRoundEF");
    $(".driverStraight, .driverStraightEF").addClass("straight"); $(".driverStraight, .driverStraightEF").addClass("straightEF");
    $(".driverRound, .driverRoundEF").addClass("round"); $(".driverRound, .driverRoundEF").addClass("roundEF");



    $(".searchInput, .searchInputEF").attr("placeholder", "Год выпуска автомобиля");
    $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('<div class="selectInputBodydivRow selectInputBodydivRow1"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow2"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow3"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow4"></div>');
    var htmlString1 = "";
    var htmlString2 = "";
    var htmlString3 = "";
    var htmlString4 = "";
    $.ajax({
        url: url,
        dataType : "json",
        success: function (data, textStatus) {
            var responseLength = data.response.length;
            if(document.body.clientWidth>=1440){
                for (var i = 0; i<responseLength; i++) {
                    if(i <responseLength/4){
                        htmlString1 += '<div id="'+data.response[i]+'" class="'+data.response[i]+' year selectItemdiv"><span>'+data.response[i]+'</span></div> ';
                    }else if(i <responseLength*2/4){
                        htmlString2 += '<div id="'+data.response[i]+'" class="'+data.response[i]+' year selectItemdiv"><span>'+data.response[i]+'</span></div> ';
                    }else if(i <responseLength*3/4){
                        htmlString3 += '<div id="'+data.response[i]+'" class="'+data.response[i]+' year selectItemdiv"><span>'+data.response[i]+'</span></div> ';
                    }else{
                        htmlString4 += '<div id="'+data.response[i]+'" class="'+data.response[i]+' year selectItemdiv"><span>'+data.response[i]+'</span></div> ';
                    }
                }
                $('.selectInputBodydivRow1').html(htmlString1);
                $('.selectInputBodydivRow2').html(htmlString2);
                $('.selectInputBodydivRow3').html(htmlString3);
                $('.selectInputBodydivRow4').html(htmlString4);
            }else{
                for (var i = 0; i<responseLength; i++) {
                    if(i<responseLength /2){
                        htmlString1 += '<div id="'+data.response[i]+'" class="'+data.response[i]+' year selectItemdiv"><span>'+data.response[i]+'</span></div> ';
                    }else{
                        htmlString2 += '<div id="'+data.response[i]+'" class="'+data.response[i]+' year selectItemdiv"><span>'+data.response[i]+'</span></div> ';
                    }
                }
                $('.selectInputBodydivRow1').html(htmlString1);
                $('.selectInputBodydivRow2').html(htmlString2);
                $('.selectInputBodydivRow3').css('display','none');
                $('.selectInputBodydivRow4').css('display','none');
            }
            $('.selectItemdiv, .selectItemdivEF').click(function(){
                addFilter($(this).context.id, 1, $(this).context.id);

                $("#selectedYearEF .close, #selectedYear .close").click(function(){
                    $('.selectInputBody, .selectInputBodyEF').css('padding-bottom', '40px');
                    $('.selectInputBody, .selectInputBodyEF').css('padding-top', '15px');

                    getYearsData(SearchString +'/'+ filtersList.words[0].value);
                    $('.selectedExperiance, .selectedExperianceEF').remove();
                    $('.selectedAge, .selectedAgeEF').remove();
                    $('.selectedPilot, .selectedPilotEF').remove();
                    $('.selectedModification, .selectedModificationEF').remove();
                    $('.selectedModel, .selectedModelEF').remove();
                    $('.selectedYear, .selectedYearEF').remove();
                    filtersList.width =(filtersList.words[0].symbols + 3);

                });

                getModelsData(url+'/'+$(this).context.id);
            });
        }
    });
}
function getMarksData(url){

    $(".searchInput, .searchInputEF").css("display", "inline-block");
    $(".openListIcon, .openListIconEF").css('display', 'inline-block');

    if(document.body.clientWidth< 1440){
        $('.automobile, .automobileEF').css('display', 'inline-block');
        $('.pilot, .pilotEF').css('display', 'none');
        $('.sentence, .sentenceEF').css('display', 'none');
    }else{
        $('.automobile, .pilot, .sentence, .automobileEF, .pilotEF, .sentenceEF').css('display', 'inline-block');
    }
    $('.automobile').css('color', '#ffffff');
    $('.automobileEF').css('color', '#50b2d9');
    $('.pilot, .sentence, .requisites').css('color', '#50b2d9');
    $('.pilotEF, .sentenceEF, .requisitesEF').css('color', '#cccccc');

    filtersList.inputWidth = 24;
    $('.searchInput, .searchInputEF').css('width','180px');


    $(".applicationStraight").removeClass("stepStraight"); $(".applicationStraight").removeClass("stepStraightEF");
    $(".applicationRound").removeClass("stepRound"); $(".applicationRoundEF").removeClass("stepRoundEF");
    $(".applicationStraight, .applicationStraightEF").addClass("straight"); $(".applicationStraight, .applicationStraightEF").addClass("straightEF");
    $(".driveapplicationRoundrRound, .applicationRoundEF").addClass("round"); $(".applicationRound, .applicationRoundEF").addClass("roundEF");


    $(".driverStraight").removeClass("stepStraight"); $(".driverStraightEF").removeClass("stepStraightEF");
    $(".driverRound").removeClass("stepRound"); $(".driverRoundEF").removeClass("stepRoundEF");
    $(".driverStraight, .driverStraightEF").addClass("straight"); $(".driverStraight, .driverStraightEF").addClass("straightEF");
    $(".driverRound, .driverRoundEF").addClass("round"); $(".driverRound, .driverRoundEF").addClass("roundEF");
    $(".searchInput, .searchInputEF").attr("placeholder", "Введите марку автомобиля ");

    $('.selectInputBodyScrolling, .selectInputBodyScrollingEF').html('<div class="popularMarkBody"><div class="selectInputBodydivRow selectInputBodydivRow1"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow2"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow3"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow4"></div></div>'+
            // ------------------------------------------------------
        '<div class="allMarkBody"><div class="selectInputBodydivRow selectInputBodydivRow1"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow2"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow3"></div>' +
        '<div class="selectInputBodydivRow selectInputBodydivRow4"></div></div> '+
        ' <div class="buttonShowAll"><span> Показать все марки </span></div>');
    var htmlString1 = "";   var pHtmlString1 = "";
    var htmlString2 = "";   var pHtmlString2 = "";
    var htmlString3 = "";   var pHtmlString3 = "";
    var htmlString4 = "";   var pHtmlString4 = "";
    $.ajax({
        url: url,
        dataType : "json",
        success: function (data, textStatus) {
            var responseLength = data.response.length;
            var popularMarkResponseLength = 0;
            var popularMarksResponseJson = [];
            for(var i = 0; i<responseLength; i++){
                if(data.response[i].is_popular_mark == 1){
                    ++popularMarkResponseLength;
                    popularMarksResponseJson.push(data.response[i].mark);
                }
            }
            if(document.body.clientWidth>=1440){
                for (var i = 0; i<popularMarkResponseLength; i++) {
                    if(i <popularMarkResponseLength/4){
                        pHtmlString1 += '<div id="'+popularMarksResponseJson[i]+'" class="'+popularMarksResponseJson[i]+' mark selectItemdiv"><span>'+popularMarksResponseJson[i]+'</span></div> ';
                    }else if(i <popularMarkResponseLength*2/4){
                        pHtmlString2 += '<div id="'+popularMarksResponseJson[i]+'" class="'+popularMarksResponseJson[i]+' mark selectItemdiv"><span>'+popularMarksResponseJson[i]+'</span></div> ';
                    }else if(i <popularMarkResponseLength*3/4){
                        pHtmlString3 += '<div id="'+popularMarksResponseJson[i]+'" class="'+popularMarksResponseJson[i]+' mark selectItemdiv"><span>'+popularMarksResponseJson[i]+'</span></div> ';
                    }else{
                        pHtmlString4 += '<div id="'+popularMarksResponseJson[i]+'" class="'+popularMarksResponseJson[i]+' mark selectItemdiv"><span>'+popularMarksResponseJson[i]+'</span></div> ';
                    }
                }
                for (var i = 0; i<responseLength; i++) {
                    if(i <responseLength/4){
                        htmlString1 += '<div id="'+data.response[i].mark+'" class="'+data.response[i].mark+' mark selectItemdiv"><span>'+data.response[i].mark+'</span></div> ';

                    }else if(i <responseLength*2/4){
                        htmlString2 += '<div id="'+data.response[i].mark+'" class="'+data.response[i].mark+' mark selectItemdiv"><span>'+data.response[i].mark+'</span></div> ';

                    }else if(i <responseLength*3/4){
                        htmlString3 += '<div id="'+data.response[i].mark+'" class="'+data.response[i].mark+' mark selectItemdiv"><span>'+data.response[i].mark+'</span></div> ';

                    }else{
                        htmlString4 += '<div id="'+data.response[i].mark+'" class="'+data.response[i].mark+' mark selectItemdiv"><span>'+data.response[i].mark+'</span></div> ';

                    }
                }
                $('.allMarkBody .selectInputBodydivRow1').html(htmlString1);
                $('.allMarkBody .selectInputBodydivRow2').html(htmlString2);
                $('.allMarkBody .selectInputBodydivRow3').html(htmlString3);
                $('.allMarkBody .selectInputBodydivRow4').html(htmlString4);

                $('.popularMarkBody .selectInputBodydivRow1').html(pHtmlString1);
                $('.popularMarkBody .selectInputBodydivRow2').html(pHtmlString2);
                $('.popularMarkBody .selectInputBodydivRow3').html(pHtmlString3);
                $('.popularMarkBody .selectInputBodydivRow4').html(pHtmlString4);
            }else{
                for (var i = 0; i<popularMarkResponseLength; i++) {
                    if(i <popularMarkResponseLength/2){
                        pHtmlString1 += '<div id="'+popularMarksResponseJson[i]+'" class="'+popularMarksResponseJson[i]+' mark selectItemdiv"><span>'+popularMarksResponseJson[i]+'</span></div> ';
                    }else{
                        pHtmlString2 += '<div id="'+popularMarksResponseJson[i]+'" class="'+popularMarksResponseJson[i]+' mark selectItemdiv"><span>'+popularMarksResponseJson[i]+'</span></div> ';
                    }
                }
                for (var i = 0; i < data.response.length; i++) {
                    if(i<responseLength /2){
                        htmlString1 += '<div id="'+data.response[i].mark+'" class="'+data.response[i].mark+' mark selectItemdiv"><span>'+data.response[i].mark+'</span></div> ';
                    }else{
                        htmlString2 += '<div id="'+data.response[i].mark+'" class="'+data.response[i].mark+' mark selectItemdiv"><span>'+data.response[i].mark+'</span></div> ';
                    }
                }
                $('.popularMarkBody .selectInputBodydivRow1').html(pHtmlString1);
                $('.popularMarkBody .selectInputBodydivRow2').html(pHtmlString2);

                $('.allMarkBody .selectInputBodydivRow1').html(htmlString1);
                $('.allMarkBody .selectInputBodydivRow2').html(htmlString2);
                $('.selectInputBodydivRow3').css('display','none');
                $('.selectInputBodydivRow4').css('display','none');
            }
            $('.selectItemdiv, .selectItemdivEF').click(function(){
                addFilter($(this).context.id, 0, $(this).context.id);
                $("#selectedMarkEF .close, #selectedMark .close").click(function(){
                    $('.selectInputBody, .selectInputBodyEF').css('padding-bottom', '40px');
                    $('.selectInputBody, .selectInputBodyEF').css('padding-top', '15px');

                    getMarksData(SearchString);
                    $('.selectedExperiance, .selectedExperianceEF').remove();
                    $('.selectedAge, .selectedAgeEF').remove();
                    $('.selectedPilot, .selectedPilotEF').remove();
                    $('.selectedModification, .selectedModificationEF').remove();
                    $('.selectedModel, .selectedModelEF').remove();
                    $('.selectedYear, .selectedYearEF').remove();
                    $('.selectedMark, .selectedMarkEF').remove();
                    filtersList.width =0;

                });
                getYearsData(url+'/'+$(this).context.id);
            });
            $('.buttonShowAll').click(function(){
                $(this).css('display','none');
                $('.popularMarkBody').slideUp();
                $('.allMarkBody').slideDown();
            });
        }
    });
}
getMarksData(SearchString);
$('#selectPanel').on('keydown', function(e) {
    if( e.which ==8){
        if($('#searchInput').val() == ""){
            $('#selectInputHead div .close').last().click();
        }
    }
});
$('#selectPanelEF').on('keydown', function(e) {
    if( e.which ==8){
        if($('#searchInputEF').val() == ""){
            $('#selectInputHead div .close').last().click();
        }
    }
});



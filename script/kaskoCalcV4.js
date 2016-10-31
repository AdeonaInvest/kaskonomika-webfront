
function kaskoCalcDoor(key){
    if(key==1){
        if(window.innerWidth>1100){
            document.getElementById('toolbarKaskoCalc').classList.remove('hide');
            document.getElementById('toolbarKaskoCalc').classList.toggle('show');
        }else{
            document.getElementById('mobileKaskoCalc').classList.remove('hide');
            document.getElementById('mobileKaskoCalc').classList.toggle('show');
        }
    }else{
        if(window.innerWidth>1100) {
            document.getElementById('toolbarKaskoCalc').classList.remove('hide');
            document.getElementById('toolbarKaskoCalc').classList.toggle('show');
        }else{
            document.getElementById('mobileKaskoCalc').classList.remove('hide');
            document.getElementById('mobileKaskoCalc').classList.toggle('show');
        }
    }
}

document.getElementById('openKaskoCalc').addEventListener("click", function(){
    kaskoCalcDoor(1);
});
document.getElementById('calcClose').addEventListener("click", function(){
    kaskoCalcDoor(0);
});
document.getElementById('mobileCalcClose').addEventListener("click", function(){
    kaskoCalcDoor(0);
});



//window.onresize(function(){
//    if(window.innerWidth>700){
//        document.getElementById('toolbarKaskoCalc').classList.remove('hide');
//        document.getElementById('mobileKaskoCalc').classList.add('hide');
//    }else{
//        document.getElementById('toolbarKaskoCalc').classList.add('hide');
//        document.getElementById('mobileKaskoCalc').classList.remove('hide');
//    }
//});


var valueList ={
    autoMark:null,
    autoYear:null,
    autoModel:null,
    autoModification:null,
    driverCount:null,
    driverAge:null,
    driverExperience:null
};
var autoMarksList = [];
var popularAutoMarksList = [];
var autoYearsList = [];
var autoModelsList = [];
var autoModificationsList = [];
var driverCountsList = [];
var driverAgesList = [];
var driverExperiencesList = {};
var autoMarksDateURL = "http://api.kaskonomika.ru/v1/dictionaries/marks";
var autoYearDateURL = "";
var autoModelURL = "";
var autoModificationURL = "";
var driverCountURL = "";
var driverAgeURL = "";
var driverExperienceURL = "";


    function setAutoMark(autoMarkValue){
        valueList ={
            autoMark:autoMarkValue,
            autoYear:null,
            autoModel:null,
            autoModification:null,
            driverCount:null,
            driverAge:null,
            driverExperience:null
        };
        window.autoYearsList = [];
        autoModelsList = [];
        autoModificationsList = [];
        driverCountsList = [];
        driverAgesList = [];
        driverExperiencesList = [];
    }
    function setAutoYear(autoYearValue){
        if(valueList.autoMark != null){
            valueList ={
                autoMark:valueList.autoMark,
                autoYear:autoYearValue,
                autoModel:null,
                autoModification:null,
                driverCount:null,
                driverAge:null,
                driverExperience:null
            };
            autoModelsList = [];
            autoModificationsList = [];
            driverCountsList = [];
            driverAgesList = [];
            driverExperiencesList = [];
        }else{alert('ERROR')}
    }
    function setAutoModel(autoModelValue){
        if(valueList.autoMark != null && valueList.autoYear != null){
            valueList ={
                autoMark:valueList.autoMark,
                autoYear:valueList.autoYear,
                autoModel:autoModelValue,
                autoModification:null,
                driverCount:null,
                driverAge:null,
                driverExperience:null
            };
            autoModificationsList = [];
            driverCountsList = [];
            driverAgesList = [];
            driverExperiencesList = [];
        }else{alert('ERROR')}
    }
    function setAutoModification(autoModificationValue){
        if(valueList.autoMark != null && valueList.autoYear != null && valueList.autoModel != null){
            valueList ={
                autoMark:valueList.autoMark,
                autoYear:valueList.autoYear,
                autoModel:valueList.autoModel,
                autoModification:autoModificationValue,
                driverCount:null,
                driverAge:null,
                driverExperience:null
            };
            driverCountsList = [];
            driverAgesList = [];
            driverExperiencesList = [];
        }else{alert('ERROR')}
    }
    function setDriverCount(driverCountValue){
        if(valueList.autoMark != null && valueList.autoYear != null && valueList.autoModel != null && valueList.autoModification){
            valueList ={
                autoMark:valueList.autoMark,
                autoYear:valueList.autoYear,
                autoModel:valueList.autoModel,
                autoModification:valueList.autoModification,
                driverCount:driverCountValue,
                driverAge:null,
                driverExperience:null
            };
            driverAgesList = [];
            driverExperiencesList = [];
        }else{alert('ERROR')}
    }
    function setDriverAge(driverAgeValue){
        if(valueList.autoMark != null && valueList.autoYear != null && valueList.autoModel != null && valueList.autoModification && valueList.driverCount){
            valueList ={
                autoMark:valueList.autoMark,
                autoYear:valueList.autoYear,
                autoModel:valueList.autoModel,
                autoModification:valueList.autoModification,
                driverCount:valueList.driverCount,
                driverAge:driverAgeValue,
                driverExperience:null
            };
            driverExperiencesList = [];
        }else{alert('ERROR')}
    }
    function setdriverExperience(driverExperienceValue){
        if(valueList.autoMark != null && valueList.autoYear != null && valueList.autoModel != null && valueList.autoModification && valueList.driverCount && valueList.driverAge){
            valueList ={
                autoMark:valueList.autoMark,
                autoYear:valueList.autoYear,
                autoModel:valueList.autoModel,
                autoModification:valueList.autoModification,
                driverCount:valueList.driverCount,
                driverAge:valueList.driverAge,
                driverExperience:driverExperienceValue
            };
        }else{alert('ERROR')}
    }

function getAutoMarkList(url){
    $.ajax({
        dataType: "json",
        url: url,
        data: {},
        success: function (data, textStatus) {
            for(var i = 0; i<data.response.length; i++){
                if(data.response[i].is_popular_mark ==1){
                    window.popularAutoMarksList.push(data.response[i]);
                }
                window.autoMarksList.push(data.response[i]);
            }
        }
    });

}
getAutoMarkList(autoMarksDateURL);
function getAutoYearList(url){
    $.ajax({
        dataType: "json",
        url: url,
        data: {},
        success: function (data, textStatus) {
            for(var i = 0; i<data.response.length; i++){
                window.autoYearsList.push(data.response[i]);
            }
        }
    });
}
function getAutoModelList(url){
    $.ajax({
        dataType: "json",
        url: url,
        data: {},
        success: function (data, textStatus) {
            for(var i = 0; i<data.response.length; i++){
                window.autoModelsList.push(data.response[i]);
            }
        }
    });
}
function getAutoModificationList(url){
    $.ajax({
        dataType: "json",
        url: url,
        data: {},
        success: function (data, textStatus) {
            for(var i = 0; i<data.response.length; i++){
                window.autoModificationsList.push(data.response[i]);
            }
        }
    });
}
function getAutoModificationList(url){
    $.ajax({
        dataType: "json",
        url: url,
        data: {},
        success: function (data, textStatus) {
            for(var i = 0; i<data.response.length; i++){
                window.autoModificationsList.push(data.response[i]);
            }
        }
    });
}

document.getElementById('stepBack').addEventListener('click',function(){
    document.getElementById('mobileKaskoCalcSelectWindow').classList.remove('show');
});

//document.getElementById('mobileKaskoCalcMark').addEventListener('click',function(){
//    document.getElementById('mobileKaskoCalcSelectWindow').classList.add('show');
//});
//document.getElementById('mobileKaskoCalcYear').addEventListener('click',function(){
//    alert();
//});
//document.getElementById('mobileKaskoCalcModel').addEventListener('click',function(){
//    alert();
//});
//document.getElementById('mobileKaskoCalcModification').addEventListener('click',function(){
//    alert();
//});
//document.getElementById('mobileKaskoCalcDriversCount').addEventListener('click',function(){
//    alert();
//});
//document.getElementById('mobileKaskoCalcDriversAge').addEventListener('click',function(){
//    alert();
//});
//document.getElementById('mobileKaskoCalcDriversExperience').addEventListener('click',function(){
//    alert();
//});

$('#mobileKaskoCalcMark').click(function(){
    if(window.autoMarksList != null && window.autoMarksList.length>0){
        var windowListHtml = "";
        for(var i = 0; i<window.autoMarksList.length; i++){
            windowListHtml+= '<div id="'+ window.autoMarksList[i].mark +'" class="mobileWindowItem autoMark"><span>'+window.autoMarksList[i].mark+'</span></div>';
        }
        $('#mobileWindowList').html(windowListHtml);
        $('#mobileWindowTitle span').html($(this).find('.mobileCalcTitle').html());
        $('.mobileKaskoCalcSelectWindow').addClass('show');

        $('.autoMark').click(function(){
            setAutoMark($(this).attr('id'));
            getAutoYearList(autoMarksDateURL+'/'+valueList.autoMark);
            $('.mobileKaskoCalcMark .value').html(valueList.autoMark);
            $('.mobileKaskoCalcSelectWindow').removeClass('show');
        });
    }
});
$('#mobileKaskoCalcYear').click(function(){
    if(window.autoYearsList != null && window.autoYearsList.length>0){
        var windowListHtml = "";
        for(var i = 0; i<window.autoYearsList.length; i++){
            windowListHtml+= '<div id="'+ window.autoYearsList[i] +'" class="mobileWindowItem autoYear"><span>'+window.autoYearsList[i]+'</span></div>';
        }
        $('#mobileWindowList').html(windowListHtml);
        $('#mobileWindowTitle span').html($(this).find('.mobileCalcTitle').html());
        $('.mobileKaskoCalcSelectWindow').addClass('show');

        $('.autoYear').click(function(){
            setAutoYear($(this).attr('id'));
            getAutoModelList(autoMarksDateURL+'/'+valueList.autoMark+'/'+valueList.autoYear);
            $('.mobileKaskoCalcYear .value').html(valueList.autoYear);
            $('.mobileKaskoCalcSelectWindow').removeClass('show');
        });
    }
});
$('#mobileKaskoCalcModel').click(function(){
    if(window.autoModelsList != null && window.autoModelsList.length>0){
        var windowListHtml = "";
        for(var i = 0; i<window.autoModelsList.length; i++){
            windowListHtml+= '<div id="'+ window.autoModelsList[i] +'" class="mobileWindowItem autoYear"><span>'+window.autoModelsList[i]+'</span></div>';
        }
        $('#mobileWindowList').html(windowListHtml);
        $('#mobileWindowTitle span').html($(this).find('.mobileCalcTitle').html());
        $('.mobileKaskoCalcSelectWindow').addClass('show');

        $('.autoYear').click(function(){
            setAutoYear($(this).attr('id'));
            getAutoModelList(autoMarksDateURL+'/'+valueList.autoMark+'/'+valueList.autoYear+'/'+valueList.autoModel);
            $('.mobileKaskoCalcYear .value').html(valueList.autoModel);
            $('.mobileKaskoCalcSelectWindow').removeClass('show');
        });
    }
});



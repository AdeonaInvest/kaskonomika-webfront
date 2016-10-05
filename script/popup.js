


var clickresetPageForm = 0;
$('#popupButton').click(function(){
    clickresetPageForm = 0;
    if(validateEmail($('#email').val()) == true){
        if($('#tel').val()== "" && $('#email').val()== ""){
            $('.error').css('display','inline-block');
        }else{
            if(window.innerWidth>800){
                $('.popupWindow').css('margin-top', '10%');
            }else{
                $('.popupWindow').css('margin-top', '0px');
            }
            var login="";
            var password = Math.floor((Math.random() * 100000) + 1);
            var markModelId = $('.selectedModification .selectedItem, .selectedModificationEF .selectedItemEF').attr("id");
            var driver = $('.selectedPilot .selectedItem, .selectedPilotEF .selectedItemEF').attr("id");
            var year = $('.selectedYear .selectedItem, .selectedYearEF .selectedItemEF').attr("id");
            var exYear = $('.selectedExperiance .selectedItem, .selectedExperianceEF .selectedItemEF').attr("id");
            var birthday = '01.01.' +(2016 - $('.selectedAge .selectedItem, .selectedAgeEF .selectedItemEF').attr("id"));
            var registrationUrl = "http://api.kaskonomika.ru/v1/users/registration";
            var authnUrl = "http://api.kaskonomika.ru/v1/authorization";
            var blankUrl = "http://api.kaskonomika.ru/v1/calculations/internal/create";
            var mailUrl = "http://api.kaskonomika.ru/v1/communications/send";
            var registrationDate = {
                phone: $('#tel').val(),
                email: $('#email').val(),
                login: login,
                password: password
            };
            var authDate = {
                username: registrationDate.email,
                password: password
            };
            var blankDate ={
                token: null,
                mark_model_id:markModelId,
                year:year,
                experience_start_year: exYear,
                birth_date: birthday,
                franchises_type_id: 1,
                mileage: 0,
                drivers_option_id: driver,
                sum:0,
                franchise_money:0,
                franchise_percent:0
            };
            var mailDate ={
                token: null,
                template_id:1,
                type: 'email',
                user_id: 0,
                email: registrationDate.email
            };
            $.ajax({
                type: "POST",
                url: registrationUrl,
                dataType : "json",
                data : registrationDate,
                success: function (data, textStatus) {
                    if(data.result == true){
                        $.ajax({
                            type: "POST",
                            url: authnUrl,
                            dataType : "json",
                            data : authDate,
                            success: function (data, textStatus) {
                                if(data.result == true){
                                    blankDate.token = data.token;
                                    mailDate.token = data.token;
                                    mailDate.user_id = data.response.user_id;
                                    $.ajax({
                                        type: "POST",
                                        url: mailUrl,
                                        dataType : "json",
                                        data : mailDate,
                                        success: function (data, textStatus) {
                                        }
                                    });
                                    $.ajax({
                                        type: "POST",
                                        url: blankUrl,
                                        dataType : "json",
                                        data : blankDate,
                                        success: function (data, textStatus) {
                                            $('.popupWindow').css('display', 'none');
                                            $('.popupWindowThanks').css('display', 'inline-block');
                                            function func() {
                                                $('.displayBlock').css('display', 'none');
                                                $('.popupWindowThanks').css('display', 'none');
                                            }
                                            setTimeout(func, 10000);
                                        }
                                    });
                                }
                            }
                        });
                    }else{
                        $('.error').addClass('active');
                    }
                }
            });
        }
    }else{
        if(clickresetPageForm == 0){
            $('.selectedMark').find('.close').click();
        }
        clickresetPageForm = 1;
        $('.errorPanel').css('display', 'inline-block');
        $('#email').css('border','1px solid #e76263');
    }
});
$('#popupWindowClose').click(function(){
    $('.popupWindow').css('display', 'none');
    $('.displayBlock').css('display', 'none');
    $('.popupWindowClose').css('display', 'none');
    $('.popupInputtel').css('display', 'none');
    $('.popupInputEmail').css('display', 'none');
});
$('#popupWindowThanksClose').click(function(){
    if(clickresetPageForm == 0){
        $('.selectedMark').find('.close').click();
    }
    clickresetPageForm = 1;
    $('.popupWindowThanks').css('display', 'none');
    $('.displayBlock').css('display', 'none');
    $('.popupWindowClose').css('display', 'none');
    $('.popupInputtel').css('display', 'none');
    $('.popupInputEmail').css('display', 'none');
    $('.selectedMark').find('.close').click()

});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function detectmob() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}
$('#email').bind('keyup',function(){

    re2 = /[^-@.A-Za-z0-9]/;
    text2 = $(this).val();
    if ( !re2.test(text2) ) {

    } else {
        $('.errorPanel').css('display', 'inline-block');
        $('#email').css('border','1px solid #e76263');
        $('.errorPanel .error').html('Введите e-mail латинскими буквами в формате example@example.com');
    }
    $(this).val($(this).val().replace(/[^-@.A-Za-z0-9]/i, ""))
});
$('#email').bind('mousedown',function(){
    if(detectmob()){
        $('.popupWindow').css('margin-top', '-284px');
    }
});

$('#popupButton').click(function(){
    clickresetPageForm = 0;
    if(validateEmail($('#email').val()) == true){
        if($('#tel').val()== "" && $('#email').val()== ""){
            $('.error').css('display','inline-block');
        }else{
            if(window.innerWidth>800){
                $('.popupWindow').css('margin-top', '10%');
            }else{
                $('.popupWindow').css('margin-top', '0px');
            }
            var login="";
            var password = Math.floor((Math.random() * 100000) + 1);
            var markModelId = $('.selectedModification .selectedItem, .selectedModificationEF .selectedItemEF').attr("id");
            var driver = $('.selectedPilot .selectedItem, .selectedPilotEF .selectedItemEF').attr("id");
            var year = $('.selectedYear .selectedItem, .selectedYearEF .selectedItemEF').attr("id");
            var exYear = $('.selectedExperiance .selectedItem, .selectedExperianceEF .selectedItemEF').attr("id");
            var birthday = '01.01.' +(2016 - $('.selectedAge .selectedItem, .selectedAgeEF .selectedItemEF').attr("id"));
            var registrationUrl = "http://api.kaskonomika.ru/v1/users/registration";
            var authnUrl = "http://api.kaskonomika.ru/v1/authorization";
            var blankUrl = "http://api.kaskonomika.ru/v1/calculations/internal/create";
            var mailUrl = "http://api.kaskonomika.ru/v1/communications/send";
            var registrationDate = {
                phone: $('#tel').val(),
                email: $('#email').val(),
                login: login,
                password: password
            };
            var authDate = {
                username: registrationDate.email,
                password: password
            };
            var blankDate ={
                token: null,
                mark_model_id:markModelId,
                year:year,
                experience_start_year: exYear,
                birth_date: birthday,
                franchises_type_id: 1,
                mileage: 0,
                drivers_option_id: driver,
                sum:0,
                franchise_money:0,
                franchise_percent:0
            };
            var mailDate ={
                token: null,
                template_id:1,
                type: 'email',
                user_id: 0,
                email: registrationDate.email
            };
            $.ajax({
                type: "POST",
                url: registrationUrl,
                dataType : "json",
                data : registrationDate,
                success: function (data, textStatus) {
                    if(data.result == true){
                        $.ajax({
                            type: "POST",
                            url: authnUrl,
                            dataType : "json",
                            data : authDate,
                            success: function (data, textStatus) {
                                if(data.result == true){
                                    blankDate.token = data.token;
                                    mailDate.token = data.token;
                                    mailDate.user_id = data.response.user_id;
                                    $.ajax({
                                        type: "POST",
                                        url: mailUrl,
                                        dataType : "json",
                                        data : mailDate,
                                        success: function (data, textStatus) {
                                        }
                                    });
                                    $.ajax({
                                        type: "POST",
                                        url: blankUrl,
                                        dataType : "json",
                                        data : blankDate,
                                        success: function (data, textStatus) {
                                            $('.popupWindow').css('display', 'none');
                                            $('.popupWindowThanks').css('display', 'inline-block');
                                            function func() {
                                                $('.displayBlock').css('display', 'none');
                                                $('.popupWindowThanks').css('display', 'none');
                                            }
                                            setTimeout(func, 10000);
                                        }
                                    });
                                }
                            }
                        });
                    }else{
                        $('.error').addClass('active');
                    }
                }
            });
        }
    }else{
        if(clickresetPageForm == 0){
            $('.selectedMark').find('.close').click();
        }
        clickresetPageForm = 1;
        $('.errorPanel').css('display', 'inline-block');
        $('#email').css('border','1px solid #e76263');
    }
});
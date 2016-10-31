var leftMeuOpen = 0;
function leftMenuPosition(){
    document.getElementById('menu').classList.toggle('open');
    if(leftMeuOpen ==0){
        document.getElementById('leftMenu').style.display = 'inline-block';
        if(document.body.clientWidth<700){
            document.querySelector('.toolbarV4 .kaskonomikaIcon').classList.remove('mobileShow');
            document.querySelector('.toolbarV4 .kaskonomikaIcon').classList.add('mobileHide');
            document.querySelector('.toolbarV4 .calc').classList.remove('mobileShow');
            document.querySelector('.toolbarV4 .calc').classList.add('mobileHide');
            document.querySelector('.toolbarV4 .accountIcon').classList.remove('mobileShow');
            document.querySelector('.toolbarV4 .accountIcon').classList.add('mobileHide');

            document.querySelector('.toolbarV4 .accountTelephone').classList.remove('mobileHide');
            document.querySelector('.toolbarV4 .accountTelephone').classList.add('mobileShow');
            document.querySelector('.toolbarV4 .menuWorning').classList.remove('mobileHide');
            document.querySelector('.toolbarV4 .menuWorning').classList.add('mobileShow');
        }
        leftMeuOpen = 1;
        if(window.innerWidth > 699){
            document.querySelector('.displayBlocker').classList.remove('hide');
            document.querySelector('.displayBlocker').classList.add('show');
        }
    }else{
        document.getElementById('leftMenu').style.display = 'none';
        if(document.body.clientWidth<700){

            document.querySelector('.toolbarV4 .kaskonomikaIcon').classList.remove('mobileHide');
            document.querySelector('.toolbarV4 .kaskonomikaIcon').classList.add('mobileShow');
            document.querySelector('.toolbarV4 .calc').classList.remove('mobileHide');
            document.querySelector('.toolbarV4 .calc').classList.add('mobileShow');
            document.querySelector('.toolbarV4 .accountIcon').classList.remove('mobileHide');
            document.querySelector('.toolbarV4 .accountIcon').classList.add('mobileShow');

            document.querySelector('.toolbarV4 .accountTelephone').classList.remove('mobileShow');
            document.querySelector('.toolbarV4 .accountTelephone').classList.add('mobileHide');
            document.querySelector('.toolbarV4 .menuWorning').classList.remove('mobileShow');
            document.querySelector('.toolbarV4 .menuWorning').classList.add('mobileHide');
        }
        leftMeuOpen = 0;

        document.querySelector('.displayBlocker').classList.remove('show');
        document.querySelector('.displayBlocker').classList.add('hide');
    }
}
document.getElementById('menu').addEventListener("click", function(){
    leftMenuPosition();
});

document.getElementById('accountIcon').addEventListener("click", function(){
    document.getElementById('accountMenu').classList.toggle('show');
});
window.addEventListener("scroll", function() {
    if (window.scrollY > 5 || $('#phone').length == 0) {
        document.getElementById('toolbarV4').style.backgroundColor = "#ffffff";
        document.getElementById('leftMenu').style.backgroundColor = "#ffffff";
        if(document.body.clientWidth>700){
            document.getElementById('kaskonomikaIcon').classList.toggle('logo_onscroll');
            document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo_onscroll.svg')";
        }else{
            document.getElementById('kaskonomikaIcon').classList.toggle('logo_onscroll');
            document.getElementById('kaskonomikaIcon').classList.toggle('Kaskonomika_name_image');
            //document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
        }
    }else{
        document.getElementById('toolbarV4').style.backgroundColor = "#e5f3fc";
        document.getElementById('leftMenu').style.backgroundColor = "#e5f3fc";
        if(document.body.clientWidth>700){
            document.getElementById('kaskonomikaIcon').classList.toggle('logo_base');
            document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/logo.svg')";
        }else{
            document.getElementById('kaskonomikaIcon').classList.toggle('logo_base');
            document.getElementById('kaskonomikaIcon').classList.toggle('Kaskonomika_name_image');
            //document.getElementById('kaskonomikaIcon').style.backgroundImage = "url('images/Kaskonomika_name_image.png')";
        }
    }
});



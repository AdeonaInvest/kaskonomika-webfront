<?php
session_start();
if(isset($_REQUEST["open"])) {
	$_SESSION["open"] = true;
}
if(!isset($_SESSION["open"])) {
	die("Это сайт!");
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--google+-->
        <meta itemprop="name" content="КАСКОНОМИКА"/>
        <meta itemprop="description" content="КАСКОНОМИКА"/>
        <meta itemprop="image" content="images/icons/apple-touch-icon-180_180.png"/>
        <!--end google+-->

        <!--twitter-->
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="КАСКОНОМИКА"/>
        <meta name="twitter:title" content="КАСКОНОМИКА">
        <meta name="twitter:description" content="КАСКОНОМИКА"/>
        <meta name="twitter:creator" content="КАСКОНОМИКА"/>
        <meta name="twitter:image:src" content="images/icons/apple-touch-icon-180_180.png"/>
        <meta name="twitter:domain" content="http://kaskonomika.ru"/>
        <!--end twitter-->

        <!--facebook-->
        <meta property="og:title" content="КАСКОНОМИКА"/>
        <meta property="og:description" content="Экономьте до 40% на стоимости Каско с умной страховкой от Каскономики"/>
        <meta property="og:image" content="images/icons/apple-touch-icon-180_180.png"/>
        <meta property="og:url" content="http://kaskonomika.ru"/>
        <meta property="og:site_name" content="КАСКОНОМИКА"/>
        <meta property="og:see_also" content="http://kaskonomika.ru"/>
        <!--<meta property="fb:admins" content="Facebook_ID"/>-->
        <!--end facebook-->
        <link rel="icon" href="images/icons/mstile-70_70.png">

        <!-- / link base style / -->
        <link rel="stylesheet" type="text/css" href="style/toolbarV4.css" />
        <link rel="stylesheet" type="text/css" href="style/kaskoCalcV4.css" />
        <link rel="stylesheet" type="text/css" href="style/footer.css" />
        <!-- / link mobile style / -->
        <link rel="stylesheet" type="text/css" href="style/mobile/toolbarV4Mobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/kaskoCalcV4Mobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/footerMobile.css" />
        <!-- / link tablet style / -->
        <link rel="stylesheet" type="text/css" href="style/tablet/toolbarV4Tablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/kaskoCalcV4Tablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/footerTablet.css" />
        <!-- / link desktop style / -->
        <link rel="stylesheet" type="text/css" href="style/desktop/toolbarV4Desktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/kaskoCalcV4Desktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/footerDesktop.css" />

        <link rel="stylesheet" type="text/css" href="style/patterns.css" />

        <script src="library/jquery.min.js"></script>

        <title>КАСКОНОМИКА</title>
    </head>
    <body>
        <div class="allBody">
            <div class="loaderSlid">
                <div class="loaderSlidImg"></div>
            </div>
            <div class="header">
                <div id="toolbarKaskoCalc" class="toolbarKaskoCalc">
                    <div class="calcInfoBlock">
                        <span class="calcName">Рассчитать КАСКО </span>
                        <span class="calcInfo">В Москве и МО </span>
                    </div>
                    <div class="calcInputBlock">
                        <input aria-label="Введите марку автомобиля" class="calcInput">
                    </div>
                    <div class="calcSubmitBlock">
                        <div class="calcSubmitBotton">
                            <span class="calcSubmit">Рассчитать</span>
                        </div>
                    </div>
                    <div class="calcCloseBlock">
<!--                        <span id="calcClose" class="calcClose"></span>-->
                        <img id="calcClose" class="calcClose" src="images/closeX.png">
                    </div>
                </div>
                <ul id="toolbarV4" class="toolbarV4">
                    <div id="menu" class="menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <li id="kaskonomikaIcon" class="kaskonomikaIcon">
                        <a href="index.php"></a>
                    </li>
                    <li id="accountIcon" class="accountIcon">
                        <div id="accountMenu" class="accountMenu">
                            <div class="accountMenuAngle"></div>

                            <div class="accountMenuBody">
                                <div class="accountMenuItem">
                                    <span id="dashboardIcon" class="accountMenuItemIcon">
                                        <img src="images/profileMenu/iconDashboard.png">
                                    </span>
                                    <span  id="firstAccountMenuItem" class="accountMenuItemName">
                                        Дашборд
                                    </span>
                                </div>
                                <div class="accountMenuItem">
                                    <span id="routeIcon" class="accountMenuItemIcon">
                                        <img src="images/profileMenu/iconMarshrut.png">
                                    </span>
                                    <span id="invoiceIcon" class="accountMenuItemName">
                                        Маршруты
                                    </span>
                                </div>
                                <div class="accountMenuItem">
                                    <span id="noticeIcon" class="accountMenuItemIcon">
                                        <img src="images/profileMenu/iconSchet.png">
                                    </span>
                                    <span class="accountMenuItemName">
                                        счет
                                    </span>
                                </div>
                                <div class="accountMenuItem">
                                    <span id="profileIcon" class="accountMenuItemIcon">
                                        <img src="images/profileMenu/iconGong.png">
                                    </span>
                                    <span class="accountMenuItemName">
                                        Уведомления
                                    </span>
                                </div>
                                <div id="accountProfileMenu" class="accountProfileMenu">
                                    <div class="accountMenuItem">
                                        <span class="accountMenuItemIcon">
                                            <img src="images/profileMenu/iconProfile.png">
                                        </span>
                                        <span class="accountMenuItemName">
                                            Профиль
                                        </span>
                                    </div>

                                    <div class="accountProfile">
                                        <div class="accountProfileBody">
                                            <span class="accountProfileItem">Общие данные </span>
                                            <span class="accountProfileItem">Мои карты </span>
                                            <span class="accountProfileItem">Страховые случаи</span>
                                            <span class="accountProfileItem">Настройки </span>
                                        </div>
                                    </div>
                                </div>
                                <div id="accountMenuLogOutItem" class="accountMenuItem">
                                    <span id="accountMenuLogOutItemIcon" class="accountMenuItemIcon">
                                        <img src="images/profileMenu/iconLogout.png">
                                    </span>
                                    <span class="accountMenuItemName">
                                        Выйти из профиля
                                    </span>
                                </div>
                            </div>
                        </div>

                    </li>
                    <li class="menuWorning"></li>
                    <li class="accountTelephone">+7 499 550-00-09</li>

                    <li class="menuItem1 bar"><a href="#page2">наш сервис</a></li>
                    <li class="menuItem2 bar"><a href="howItWork.php">Как это работает</a></li>
                    <li class="menuItem3 bar"><a href="faq.php">Вопросы и ответы</a></li>
                    <li class="menuItem4 bar"><a href="#">скачать приложение</a></li>



                    <li id="openKaskoCalc" class="calc"><img src="images/faq/calc_icon.png"> <a href="#">рассчитать каско</a></li>

                </ul>
            </div>
            <div id="leftMenu" class="leftMenu">
                <ul id="fromToolbar" class="fromToolbar">
                    <li class="menuItem1 bar"><a href="#page2">наш сервис</a></li></br>
                    <li class="menuItem2 bar"><a href="howItWork.php">Как это работает</a></li></br>
                    <li class="menuItem3 bar"><a href="faq.php">Вопросы и ответы</a></li></br>
                    <li class="menuItem4 bar"><a href="#">скачать приложение</a></li></br>
                </ul>
                <ul id="baseMenu" class="baseMenu">
                    <li class=" bar"><a href="#page2">О нас</a></li></br>
                    <li class=" bar"><a href="#page2">Партнеры</a></li></br>
                    <li class=" bar"><a href="#page2">Новости</a></li></br>
                    <li class=" bar"><a href="#page2">Реквизиты </a></li></br>
                    <li class=" bar"><a href="#page2">Политика конфиденциальности </a></li></br>
                    <li class=" bar"><a href="#page2">Пресс-центр</a></li></br>
                </ul>
            </div>
            <div class="displayBlocker" id="displayBlocker"></div>
            <div id="mobileKaskoCalc" class="mobileKaskoCalc">
                <div class="mobileKaskoCalcHeader">
                    <div class="calcInfoBlock">
                        <span class="calcName">Рассчитать КАСКО </span>
                        <span class="calcInfo">В Москве и МО </span>
                    </div>
                    <img id="mobileCalcClose" class="calcClose" src="images/closeX.png">
                </div>
                <div class="mobileKaskoCalcBody">
                    <div class="automobileKaskoCalcGroup">

                    </div>
                    <div class="autoKaskoCalcGroup firstMobileCalcGroup">
                        <div class="driverKaskoCalcGroupsTitle firstMobileCalcGroup">
                            <span>Автомобиль </span>
                        </div>
                        <div id="mobileKaskoCalcMark" class="mobileKaskoCalcMark selectDoor">
                            <span class="mobileKaskoCalcMarkTitle mobileCalcTitle">Марка автомобиля  </span>
                            <span class="value">не указан</span>
                            <img src="images/faq/box_open_icon.png" class="openSelectPage">
                        </div>
                        <div id="mobileKaskoCalcYear" class="mobileKaskoCalcYear selectDoor">
                            <span class="mobileKaskoCalcYearTitle mobileCalcTitle">Год выпуска автомобиля  </span>
                            <span class="value">не указан </span>
                            <img src="images/faq/box_open_icon.png" class="openSelectPage">
                        </div>
                        <div id="mobileKaskoCalcModel" class="mobileKaskoCalcModel selectDoor">
                            <span class="mobileKaskoCalcModelTitle mobileCalcTitle">Модель автомобиля </span>
                            <span class="value">не указан</span>
                            <img src="images/faq/box_open_icon.png" class="openSelectPage">
                        </div>
                        <div id="mobileKaskoCalcModification" class="mobileKaskoCalcModification selectDoor">
                            <span class="mobileKaskoCalcModificationTitle mobileCalcTitle">Модификация автомобиля </span>
                            <span class="value">не указан</span>
                            <img src="images/faq/box_open_icon.png" class="openSelectPage">
                        </div>
                    </div>
                    <div class="driverKaskoCalcGroup ">
                        <div class="driverKaskoCalcGroupsTitle">
                            <span>Водители </span>
                        </div>
                        <div id="mobileKaskoCalcDriversCount" class="mobileKaskoCalcDriversCount selectDoor">
                            <span class="mobileKaskoCalcDriversCountTitle mobileCalcTitle">Количество водителей </span>
                            <span class="value">не указан</span>
                            <img src="images/faq/box_open_icon.png" class="openSelectPage">
                        </div>
                        <div id="mobileKaskoCalcDriversAge" class="mobileKaskoCalcDriversAge selectDoor">
                            <span class="mobileKaskoCalcDriversAgeTitle mobileCalcTitle">Возраст </span>
                            <span class="value">не указан</span>
                            <img src="images/faq/box_open_icon.png" class="openSelectPage">
                        </div>
                        <div id="mobileKaskoCalcDriversExperience" class="mobileKaskoCalcDriversExperience selectDoor">
                            <span class="mobileKaskoCalcDriversExperienceTitle mobileCalcTitle">Стаж </span>
                            <span class="value">не указан</span>
                            <img src="images/faq/box_open_icon.png" class="openSelectPage">
                        </div>
                    </div>
                    <div class="SubmitKaskoCalcGroup">
                        <div class="mobileKaskoCalcSubmit">
                            <span>Рассчитать</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="mobileKaskoCalcSelectWindow" class="mobileKaskoCalcSelectWindow">
                <div class="mobileWindowheader">
                    <div id="stepBack" class="stepBack">
                        <img src="images/mobile_phone_button.png">
                        <span>назад</span>
                    </div>
                    <div id="mobileWindowTitle" class="mobileWindowTitle">
                        <span>Год выпуска автомобиля</span>
                    </div>
                </div>
                <div id="mobileWindowList" class="mobileWindowList">
                    <div class="mobileWindowItem">
                        <span>2016</span>
                    </div>
                    <div class="mobileWindowItem">
                        <span>2014</span>
                    </div>
                    <div class="mobileWindowItem">
                        <span>2013</span>
                    </div>
                    <div class="mobileWindowItem">
                        <span>2012</span>
                    </div>
                    <div class="mobileWindowItem">
                        <span>2011</span>
                    </div>
                </div>
                <div class="mobileWindowFooter">
                    <div id="mobileWindowFooterName" class="mobileWindowFooterName">
                       <span>Поиск </span>
                    </div>
                    <input type="text">
                </div>
            </div>

            <div class="footer">
                <div class="leftSide">
                    <div class="company">
                        <div class="titleCompany">
                            <span></span>
                        </div>
                        <div class="bodyCompany">
                        </div>
                        <div class="mobileContacts">
                            <div align="center" class="mobileContactTelephone">
                                <span>+7 499 550-00-09</span>
                            </div>
                            <div align="center" class="mobileContactTime">
                                <span>10:00 - 20:00 (MCK)</span>
                            </div>
                            <div align="center" class="mobileContactEmail">
                                <span><a class="mobileMailToLink" href="mailto:info@kaskonomika.ru">info@kaskonomika.ru</a></span>
                            </div>
                        </div>
                        <div class="socialCompany">
                            <a target="_blank" href="https://www.facebook.com/Kaskonomika/?fref=ts"><div class="socialIcon fb"></div></a>
                            <a target="_blank" href="https://vk.com/kaskonomika"><div class="socialIcon vk" ></div></a>
                            <a target="_blank" href="https://twitter.com/kaskonomika"><div class="socialIcon tw" ></div></a>
                            <a target="_blank" href="https://www.instagram.com/kaskonomika/"><div class="socialIcon inst" ></div></a>
                        </div>
                    </div>
                    <div class="contacts">
                        <div align="center" class="contactTelephone">
                            <span>+7 499 550-00-09</span>
                        </div>
                        <div align="center" class="contactTime">
                            <span>10:00 - 20:00 (MCK)</span>
                        </div>
                        <div align="center" class="contactEmail">
                            <span><a class="mailToLink" href="mailto:info@kaskonomika.ru">info@kaskonomika.ru</a></span>
                        </div>
                        <div align="center" class="contactFooter">
                            <span>© ООО "Каскономика", 2016</span>
                        </div>
                    </div>
                </div>
                <div class="rightSide">
                    <div class="apps">
                        <div class="AppleApp"></div>
                        <div class="androidApp"></div>
                        <div id="creativePeople" class="creativePeople">
                            <p>Сделано в <span>CreativePeople</span></p>
                        </div>
                    </div>
                </div>
                <div align="center" class="mobileContactFooter">
                    <span>© ООО "Каскономика", 2016</span>
                </div>
                <div class="tabletLine1">
                    <div class="company">
                        <div class="titleCompany">
                            <span></span>
                        </div>
                        <div class="bodyCompany">
                        </div>
                        <div class="mobileContacts">
                            <div align="center" class="mobileContactTelephone">
                                <span>+7 499 550-00-09</span>
                            </div>
                            <div align="center" class="mobileContactTime">
                                <span>10:00 - 20:00 (MCK)</span>
                            </div>
                            <div align="center" class="mobileContactEmail">
                                <span><a class="mobileMailToLink" href="mailto:info@kaskonomika.ru">info@kaskonomika.ru</a></span>
                            </div>
                        </div>
                    </div>
                    <div class="socialCompany">
                        <a target="_blank" href="https://www.facebook.com/Kaskonomika/?fref=ts"><div class="socialIcon fb"></div></a>
                        <a target="_blank" href="https://vk.com/kaskonomika"><div class="socialIcon vk" ></div></a>
                        <a target="_blank" href="https://twitter.com/kaskonomika"><div class="socialIcon tw" ></div></a>
                        <a target="_blank" href="https://www.instagram.com/kaskonomika/"><div class="socialIcon inst" ></div></a>
                    </div>
                    <div class="apps">
                        <div class="AppleApp"></div>
                        <div class="androidApp"></div>
                    </div>
                </div>
                <div class="tabletLine2">
                    <div class="contacts">
                        <div align="center" class="contactTelephone">
                            <span>+7 499 550-00-09</span>
                        </div>
                        <div align="center" class="contactTime">
                            <span>10:00 - 20:00 (MCK)</span>
                        </div>
                        <div align="center" class="contactEmail">
                            <span><a class="mailToLink" href="mailto:info@kaskonomika.ru">info@kaskonomika.ru</a></span>
                        </div>
                    </div>
                </div>
                <div class="tabletLine3">
                    <div align="center" class="contactFooter">
                        <span>&copy; ООО "Каскономика", 2016</span>
                    </div>
                    <div id="creativePeople1" class="creativePeople">
                        <p>Сделано в <span>CreativePeople</span></p>
                    </div>
                </div>
            </div>
        </div>
        <script src="script/toolbarV4.js"></script>
        <script src="script/kaskoCalcV4.js"></script>
    </body>
</html>
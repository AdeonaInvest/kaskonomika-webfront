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
        <link rel="stylesheet" type="text/css" href="style/baseVersion3.css" />
        <link rel="stylesheet" type="text/css" href="style/toolbar.css" />
        <link rel="stylesheet" type="text/css" href="style/paralaxPages.css" />
        <link rel="stylesheet" type="text/css" href="style/searchPanel.css" />
        <link rel="stylesheet" type="text/css" href="style/pageElseFunctions.css" />
        <link rel="stylesheet" type="text/css" href="style/footer.css" />
        <link rel="stylesheet" type="text/css" href="style/phone.css" />
        <link rel="stylesheet" type="text/css" href="style/dotNav.css" />
        <link rel="stylesheet" type="text/css" href="style/popup.css" />

        <!-- / link mobile style / -->
        <link rel="stylesheet" type="text/css" href="style/mobile/baseMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/toolbarMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/paralaxPagesMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/searchPanelMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/pageElseFunctionsMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/footerMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/phoneMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/dotNavMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/popupMobile.css" />

        <!-- / link tablet style / -->
        <link rel="stylesheet" type="text/css" href="style/tablet/baseTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/toolbarTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/paralaxPagesTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/searchPanelTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/pageElseFunctionsTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/footerTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/phoneTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/dotNavTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/popupTablet.css" />

        <!-- / link desktop style / -->
        <link rel="stylesheet" type="text/css" href="style/desktop/baseDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/toolbarDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/paralaxPagesDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/searchPanelDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/pageElseFunctionsDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/footerDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/phoneDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/dotNavDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/popupDesktop.css" />

        <link rel="stylesheet" type="text/css" href="style/desktop/baseDesktop.css" />

        <link rel="stylesheet" type="text/css" href="library/OwlCarousel2/dist/assets/owl.carousel.min.css" />
        <link rel="stylesheet" type="text/css" href="library/OwlCarousel2/dist/assets/owl.theme.default.min.css" />
        <style>
            .owl-carousel .owl-item img{
                width: 50%;
            }
            .owl-stage-outer, .owl-stage, .owl-item, .owl-carousel {
                height: 100%;
            }
            @media only screen and (max-width: 700px) {
                .owl-carousel .owl-item img, .elseFunctionsText img {
                    display: none;
                }
            }
        </style>

        <script src="library/jquery.min.js"></script>
        <script src="library/jquery.touchSwipe.js"></script>
        <script src="library/OwlCarousel2/dist/owl.carousel.min.js"></script>
        <title>КАСКОНОМИКА</title>
    </head>
    <body>
        <div class="allBody">
            <div class="loaderSlid">
                <div class="loaderSlidImg"></div>
            </div>
            <div class="header">
                <ul id="toolbar" class="toolbar">
                    <li id="menu" class="menu"><div class="menuIconLine"></div><div class="menuIconLine"></div><div class="menuIconLine"></div></li>
                    <li id="kaskonomikaIcon" class="kaskonomikaIcon"> <a href="index.php"></a></li>
                    <li class="accountIcon"></li>
                    <li class="menuWorning"></li>
                    <li class="accountTelephone">+7 499 550-00-09</li>
                    <li class="menuItem1 bar"><a href="#page2">наш сервис</a></li>
                    <li class="menuItem2 bar"><a href="howItWork.php">Как это работает</a></li>
                    <li class="menuItem3 bar"><a href="faq.php">Вопросы и ответы</a></li>
                    <li class="menuItem4 bar"><a href="#">скачать приложение</a></li>
                </ul>
            </div>
            <div class="displayBlock">
                <div class="popupWindow">
                    <div id="popupWindowClose" class="popupWindowClose">x</div>
                    <div align="center" class="popupWindowTitle">
                        <span>Введите </span>
                    </div>
                    <div class="popupContacts">
                        <div align="center"  class="popupEmail activeTab"><span>Эл почта </span></div>
                        <div align="center"  class="popupPhone"><span>Телефон </span></div>
                    </div>
                    <div align="center" class="popupInfo">
                        <span>Оставьте пожалуйста удобный для вас контакт, мы свяжемся с вами, когда появятся предложения по страхованию.</span>
                    </div>
                    <div class="errorPanel">
                        <p class="error">Укажите пожалуйста электронную почту
                            в формате example@example.com</p>
                    </div>
                    <div>
                        <div class="popupInputs">
                            <div class="popupInputEmail active">
                                <span>Эл почта</span>
                                <input id="email" type="email" />
                            </div>
                            <div class="popupInputtel">
                                <span>Телефон</span>
                                <input id="tel" type="tel" />
                            </div>
                        </div>
                        <div id="popupButton" class="popupButton"><span>отправить </span></div>
                    </div>
                </div>
                <div class="popupWindowThanks">
                    <div id="popupWindowThanksClose" class="popupWindowClose">x</div>
                    <span>Благодарим за оставленную заявку. Мы получили ваши данные и свяжемся сразу, как только появятся предложения по страхованию.</span>
                </div>
            </div>
            <div id="phone" class="phone">
                <div id="phoneBody" class="phoneBody">
                    <div id="phoneDisplay" class="phoneDisplay"></div>
                </div><div id="mobileButton" class="mobileButton"></div>
                <div id="telematic" class="telematic"></div>
            </div>
            <div id="dotNav" class="dotstyle dotstyle1 dotstyle-stroke">
                <ul>
                    <li class="current"><a href="#page1">page1</a></li>
                    <li><a href="#page2">page2</a></li>
                    <li><a href="#page3">page3</a></li>
                    <li><a href="#page4">page4</a></li>
                </ul>
            </div>
            <ul id="leftMenu" class="leftMenu">
                <li class="menuItem1 bar"><a href="#page2">наш сервис</a></li></br>
                <li class="menuItem2 bar"><a href="howItWork.php">Как это работает</a></li>
                <li class="menuItem3 bar"><a href="faq.php">Вопросы и ответы</a></li></br>
                <li class="menuItem4 bar"><a href="#">скачать приложение</a></li></br>
            </ul>
            <div class="parallaxPages">
                <div id="homePage" class="parallaxPage homePage">
                    <div class="homeBackground">
                        <div class="searchPanel">
                            <div align="center" class="panelTitle">
                        <span>Экономьте до 40% на стоимости Каско
                        с умной страховкой от Каскономики</span>
                            </div>
                            <div class="panelFilters">
                                <div class="line1">
                                    <!--
                                    <select class="container12">
                                        <option class="container12Opt">МОСКВА И ОБЛАСТЬ</option>
                                        <option class="container12Opt">САНКТ-ПЕТЕРБУРГ</option>
                                    </select>
                                    -->
                                    <div class="container12"><span>Для Москвы и МО</span></div>
                                    <div class="container1"><span>Для Москвы и Московской области</span></div>
                                    <!--
                                    <div class="container">
                                        <div class="containerCheckbox1">
                                            <input type="checkbox" id="rounded" />
                                            <label for="rounded"></label>
                                        </div>
                                        <div class="containerCheckbox2">
                                            <input type="checkbox" id="squared" />
                                            <label for="squared"></label>
                                        </div>
                                    </div>
                                    <div class="container2"><span>САНКТ-ПЕТЕРБУРГ</span></div>
                                    -->
                                    <div class="container3">
                                        <div class="container3lin1">
                                            <span class="automobile">Автомобиль </span>
                                            <span class="pilot">Водители </span>
                                            <span class="sentence">Предложения </span>
                                            <span class="requisites">Реквизиты </span>
                                        </div>
                                        <div class="container3lin2">
                                            <span class="automobileRound stepRound"></span>
                                            <span class="straight driverStraight"></span>
                                            <span class="round driverRound"></span>
                                            <span class="straight applicationStraight"></span>
                                            <span class="round applicationRound"></span>
                                            <span class="straight"></span>
                                            <span class="round"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="line2">
                                    <div id="selectPanel" class="selectPanel">
                                        <div id="selectInputHead" class="selectInputHead">
                                            <input id="searchInput" name="searchInput" class="searchInput" />
                                            <div class="openListIcon">
                                                <img class="openListIconImg" src="images/ic_navigate_next_48px-128.png">
                                            </div>
                                        </div>
                                        <div id="selectInputBody" class="selectInputBody">
                                            <div class="selectInputBodyScrolling">
                                                <div id="selectInputBodydivRow1" class="selectInputBodydivRow"></div>
                                                <div id="selectInputBodydivRow2" class="selectInputBodydivRow"></div>
                                                <div id="selectInputBodydivRow3" class="selectInputBodydivRow"></div>
                                                <div id="selectInputBodydivRow4" class="selectInputBodydivRow"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="filterButton" class="filterButton"><span>Отправить заявку</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="partners">
                        <!--<div class="partnersTitle">-->
                            <!--<span>Подбирайте тариф среди множества предложений:</span>-->
                        <!--</div>-->
                        <!--<div class="partnersBody">-->
                            <!--<div class="partnerIcon partner1">-->
                                <!--<img src="images/Alfa.svg" alt="Alfa">-->
                            <!--</div>-->
                            <!--<div class="partnerIcon partner2">-->
                                <!--<img src="images/ERGO.svg" alt="ERGO">-->
                            <!--</div>-->
                            <!--<div class="partnerIcon partner3">-->
                                <!--<img src="images/VCK.svg" alt="VCK">-->
                            <!--</div>-->
                            <!--<div class="partnerIcon partner4">-->
                                <!--<img src="images/Tinkoff.png" alt="Tinkoff">-->
                            <!--</div>-->
                            <!--<div class="partnerIcon partner5">-->
                                <!--<img src="images/Ingostragh_icon.png" alt="Ingostragh">-->
                            <!--</div>-->
                            <!--<div class="partnerIcon partner6">-->
                                <!--<img src="images/Intoch.png" alt="Intoch">-->
                            <!--</div>-->
                            <!--<div class="partnerIcon partner7">-->
                                <!--<img src="images/Liberty.png" alt="Liberty">-->
                            <!--</div>-->
                            <!--<div class="partnerIcon partner8">-->
                                <!--<img src="images/Uralsib.svg" alt="Uralsib">-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
                <div id="page1" class="parallaxPage">
                    <div class="page1Panel panel">
                        <div align="center" class="pageTitle ">
                            <span>Вы аккуратный водитель? Получайте за это скидки и бонусы</span>
                        </div>
                        <div align="center" class="pageBody">
                    <span>Система оценки вождения учитывает, насколько плавно вы совершаете маневры, разгоняетесь и
                            тормозите, и следит за соблюдением скоростного режима. Теперь аккуратные и внимательные
                            водители не только не платят за чужие ошибки, но и получают дополнительные скидки и бонусы.
                    </span>
                        </div>
                    </div>
                </div>
                <div id="page2" class="parallaxPage">
                    <div class="page2Panel panel">
                        <div align="center" class="pageTitle">
                            <span>Вы мало водите? Сэкономьте на Каско</span>
                        </div>
                        <div align="center" class="pageBody">
                    <span>Трекер, установленный в автомобиль, считает ваши километры, а вы платите за Каско исходя из своего пробега.</br>
                        Снизить стоимость Каско с первого дня страхования помогает опция "Ограничение пробега":
                        укажите планируемый годовой пробег и получите скидку. Не переживайте, если придется его
                        превысить - вы всегда сможете расширить свою страховку.
                    </span>
                        </div>
                    </div>
                </div>
                <div id="page3" class="parallaxPage">
                    <div class="page3Panel panel">
                        <div align="center" class="pageTitle">
                            <span>Наступил страховой случай?</span>
                        </div>
                        <div align="center" class="pageBody">
                    <span>Отправляйте заявления и документы на урегулирование убытка прямо с места ДТП.</br>
                        Ваш трекер оборудован датчиком удара, который в момент ДТП формирует отчет об аварии,
                        воссоздавая картину происшествия. Поэтому в большинстве случаев для получения направления
                        на сервис справки из компетентных органов не требуются. Ускорить и упростить процедуру
                        подачи заявления помогает наше мобильное приложение - через него вы можете заявить о
                        страховом случае и отправить все необходимые документы и фотографии.</span>
                        </div>
                    </div>
                </div>
                <div id="page4" class="parallaxPage">
                    <div class="page4Panel panel">
                        <div align="center" class="pageTitle">
                            <span>Дополнительные возможности всегда под рукой</span>
                        </div>
                        <div class="pageBody">
                            <div class="page4Item">
                                <div class="itemToCenter">
                                    <span class="page4ItemNumber">1.</span>
                                    <div class="page4ItemBlock">
                                        <span class="page4ItemClicked">Аналитика ваших поездок</span>
                                <span class="page4Itemtext">Вы можете просматривать статистику по периодам или отдельным поездкам,
                                    анализировать отрезки с низкими оценками качества вождения и получать рекомендации
                                    по их улучшению. </span>
                                    </div>
                                </div>
                            </div>
                            <div class="page4Item">
                                <div class="itemToCenter">
                                    <span class="page4ItemNumber">2.</span>
                                    <div class="page4ItemBlock">
                                        <span class="page4ItemClicked">Мониторинг технического состояния вашего автомобиля</span>
                                <span class="page4Itemtext">Трекинговое устройство считывает и передает вам сообщения об ошибках
                                    в работе вашего
                                    автомобиля.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="page4Item">
                                <div class="itemToCenter">
                                    <span class="page4ItemNumber">3.</span>
                                    <div class="page4ItemBlock">
                                        <span class="page4ItemClicked">Сигналы об авариях</span>
                                <span class="page4Itemtext">Трекер, установленный в вашей машине, и мобильное приложение на
                                    вашем смартфоне
                                    позволяют вам получать оперативные сигналы о ДТП с вашим автомобилем (включая
                                    случаи, когда он припаркован).</span>
                                    </div>
                                </div>
                            </div>
                            <div class="page4Item">
                                <div class="itemToCenter">
                                    <span class="page4ItemNumber">4.</span>
                                    <div class="page4ItemBlock">
                                        <span class="page4ItemClicked">Отслеживание припаркованного автомобиля</span>
                                <span class="page4Itemtext">Режим &quot;Парковка&quot; в мобильном приложении Каскономика
                                    позволяет отслеживать место
                                    нахождения вашей машины, легко находить машину на стоянке, а также получать
                                    экстренные сигналы о ее эвакуации.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="pageElseFunctions" class="pageElseFunctions">
                <!--<div class="elsePageSlideBody">-->
                <div id='slideBars' class="elsePageBars">
                    <div class="slideBarDiv">
                        <span id='slideBar0' class="elsePageBarNumber">1</span>
                                <span id="elsePageBarTitle1" class="elsePageBarTitle">
                                    рассчитайте и выберите тариф
                                </span>
                    </div>
                    <span class="elsePageBarLine"></span>
                    <div  class="slideBarDiv">
                        <span id='slideBar1' class="elsePageBarNumber">2</span>
                                <span id="elsePageBarTitle2" class="elsePageBarTitle">
                                    заключите договор и оплатите онлайн
                                </span>
                    </div>
                    <span class="elsePageBarLine"></span>
                    <div  class="slideBarDiv">
                        <span id='slideBar2' class="elsePageBarNumber">3</span>
                                <span id="elsePageBarTitle3" class="elsePageBarTitle">
                                    установите трекер "каскономики"
                                </span>
                    </div>
                    <span class="elsePageBarLine"></span>
                    <div  class="slideBarDiv">
                        <span id='slideBar3' class="elsePageBarNumber">4</span>
                                <span id="elsePageBarTitle4" class="elsePageBarTitle">
                                    пользуйтесь сервисом и экономьте на каско
                                </span>
                    </div>
                </div>
                <div class=" owl-carousel">
                    <!--<div class="elsePageSlideItem elsePageFirstSlide">-->
                    <div class="elsePageSlideItem elsePageFirstSlide item">
                        <div class="elseFunctionsText">
                            <span>После ввода первичных данных мы предоставим вам предварительный расчет стоимости
                                страховки. Сравнивайте, конфигурируйте наполнение и условия и выбирайте наиболее
                                подходящий вам вариант.</span>
                            <img class="slideLine" src="images/slide/line_white.svg">
                        </div>
                        <div class="slideImage"></div>
                    </div>
                    <!--<div class="elsePageSlideItem elsePageSecondSlide">-->
                    <div class="elsePageSlideItem elsePageSecondSlide item">
                        <div class="elseFunctionsText">
                    <span>Введите полные данные об автомобиле и водителях для расчета итоговой стоимости и
                        формирования электронного полиса. Оплатить страховку можно банковской картой.</span>
                            <img class="slideLine" src="images/slide/line_white.svg">
                        </div>

                        <div class="slideImage"></div>
                    </div>
                    <!--<div class="elsePageSlideItem elsePageThirdSlide">-->
                    <div class="elsePageSlideItem elsePageThirdSlide item">
                        <div class="elseFunctionsText">
                            <span>После оформления электронного полиса мы свяжемся с вами, чтобы договориться об осмотре
                                автомобиля и установке трекера. Мы подъедем в удобное для вас место и время, а сама
                                процедура займет не более получаса.</span>
                            <img class="slideLine" src="images/slide/line_white.svg">
                        </div>
                        <div class="slideImage"></div>
                    </div>
                    <!--<div class="elsePageSlideItem elsePageFourthSlide">-->
                    <div class="elsePageSlideItem elsePageFourthSlide item">
                        <div class="elseFunctionsText">
                            <span>Используйте максимум возможностей нашего приложения! Анализируйте поездки и
                                совершенствуйте свою манеру вождения, следите за техническим состоянием вашего автомобиля,
                                накапливайте бонусные баллы и получайте скидки на Каско.</span>
                            <img class="slideLine" src="images/slide/line_white.svg">
                        </div>
                        <div class="slideImage"></div>
                    </div>
                </div>
            </div>
            <div class="panelDog">
                <div id="panelFillterWithDog" class="panel panelFillterWithDog">
                    <div id="panelFiltersEF" class="panelFiltersEF">
                        <div class="line1EF">
                            <!-- <select class="container12EF">
                                <option class="container12OptEF">МОСКВА И ОБЛАСТЬ</option>
                                <option class="container12OptEF">САНКТ-ПЕТЕРБУРГ</option>
                            </select> -->
                            <div class="container12EF"><span>Для Москвы и МО</span></div>
                            <div class="container1EF"><span>Для Москвы и Московской области</span></div>
                            <div class="container3EF">
                                <div class="container3lin1EF">
                                    <span class="automobileEF">Автомобиль </span>
                                    <span class="pilotEF">Водители </span>
                                    <span class="sentenceEF">Предложения </span>
                                    <span class="requisitesEF">Реквизиты </span>
                                </div>
                                <div class="container3lin2EF">
                                    <span class="automobileRoundEF stepRoundEF"></span>
                                    <span id="driverStraightEF" class="straightEF driverStraightEF"></span>
                                    <span id="driverroundEF" class="roundEF driverRoundEF"></span>
                                    <span id="applicationStraightEF" class="straightEF applicationStraightEF"></span>
                                    <span id="applicationRoundEF" class="roundEF applicationRoundEF"></span>
                                    <span class="straightEF"></span>
                                    <span class="roundEF"></span>
                                </div>
                            </div>
                        </div>
                        <div class="line2EF">
                            <div id="selectPanelEF" class="selectPanelEF">
                                <div id="selectInputHeadEF" class="selectInputHeadEF">
                                    <input id="searchInputEF" name="searchInputEF" class="searchInputEF" />
                                    <div class="openListIconEF"> <img class="openListIconImg" src="images/ic_navigate_next_48px-128.png"> </div>
                                </div>
                                <div id="selectInputBodyEF" class="selectInputBodyEF">
                                    <div class="selectInputBodyScrollingEF">
                                        <div id="selectInputBodydivRow1EF" class="selectInputBodydivRowEF"></div>
                                        <div id="selectInputBodydivRow2EF" class="selectInputBodydivRowEF"></div>
                                        <div id="selectInputBodydivRow3EF" class="selectInputBodydivRowEF"></div>
                                        <div id="selectInputBodydivRow4EF" class="selectInputBodydivRowEF"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="filterButtonEF" class="filterButtonEF"><span>Отправить заявку</span></div>
                        </div>
                    </div>
                    <div id="filterDogIcon" class="filterDogIcon"></div>
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

            <script src="script/base.js" ></script>
            <script src="script/indexMenu.js" ></script>
            <script src="script/navDots.js" ></script>
            <script src="script/phone.js" ></script>
            <script src="script/slider.js" ></script>
            <script src="script/combobox.js" ></script>
            <script src="script/popup.js" ></script>
            <script src="script/fontSizes.js" ></script>
        </div>
        <!-- BEGIN JIVOSITE CODE {literal} -->
        <script type='text/javascript'>
            (function(){ var widget_id = 'uNy7ZVrmFw';var d=document;var w=window;function l(){
                var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>
        <!-- {/literal} END JIVOSITE CODE -->
    </body>
</html>
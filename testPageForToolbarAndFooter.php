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
        <link rel="stylesheet" type="text/css" href="style/toolbar.css" />
        <link rel="stylesheet" type="text/css" href="style/footer.css" />

        <!-- / link mobile style / -->
        <link rel="stylesheet" type="text/css" href="style/mobile/toolbarMobile.css" />
        <link rel="stylesheet" type="text/css" href="style/mobile/footerMobile.css" />

        <!-- / link tablet style / -->
        <link rel="stylesheet" type="text/css" href="style/tablet/toolbarTablet.css" />
        <link rel="stylesheet" type="text/css" href="style/tablet/footerTablet.css" />

        <!-- / link desktop style / -->
        <link rel="stylesheet" type="text/css" href="style/desktop/toolbarDesktop.css" />
        <link rel="stylesheet" type="text/css" href="style/desktop/footerDesktop.css" />

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
            <ul id="leftMenu" class="leftMenu">
                <li class="menuItem1 bar"><a href="#page2">наш сервис</a></li></br>
                <li class="menuItem2 bar"><a href="howItWork.php">Как это работает</a></li></br>
                <li class="menuItem3 bar"><a href="faq.php">Вопросы и ответы</a></li></br>
                <li class="menuItem4 bar"><a href="#">скачать приложение</a></li></br>
            </ul>

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
    </body>
</html>
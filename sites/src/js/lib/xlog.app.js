/**
 * Created by Ravy on 24.03.2017.
 * Вывод в консоль необходимой инфы для отладки. На проде этой информации видно не будет
 */
var xlog = function(text, data) {
    if (window.location.host == 'partners.kaskonomika.local:9360') {
        /*var list = '';
        for (var i=0; i < arguments.length; i++) {
            list = list + arguments[i] + ' ';
        }*/
        console.warn(text || '', data || '');
    }
};


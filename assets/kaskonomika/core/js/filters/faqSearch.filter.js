/**
 * Created by Ravy on 23.06.2017.
 * Фильтр, который возвращает массив вопросов-ответок, которые содержат результаты поска в строке поска вверху страницы
 */
(function() {
    'use strict';

    angular
        .module('kaskonomika')
        .filter('faqSearchFilter', function () {
            return function (items, search) {
                if (search) {
                    var tmp = [],
                        tag = 'mke';
                    search = search.toLowerCase();
                    for(var i in items){
                        var item = items[i],
                            title = item.title.toLowerCase(),
                            description = item.description.toLowerCase(),
                            firstPart,lastPart,startIndex,lastindex,wordPart;
                        if((title.indexOf(search)+1) || (description.indexOf(search)+1)){
                            if (title.indexOf(search) + 1) {
                                startIndex = title.indexOf(search);
                                lastindex = startIndex + search.length;
                                firstPart = item.title.substring(0,startIndex);
                                wordPart = item.title.substring(startIndex,lastindex);
                                lastPart = item.title.substring(lastindex,item.title.length+1);
                                item.title = firstPart + '<'+tag+'>' + wordPart + '</'+tag+'>' + lastPart;
                            }
                            if (description.indexOf(search) + 1) {
                                startIndex = description.indexOf(search);
                                lastindex = startIndex + search.length;
                                firstPart = item.description.substring(0,startIndex);
                                wordPart = item.description.substring(startIndex,lastindex);
                                lastPart = item.description.substring(lastindex,item.description.length+1);
                                item.description = firstPart + '<'+tag+'>' + wordPart + '</'+tag+'>' + lastPart;
                            }
                            tmp.push(item);
                        }
                    }
                    return tmp;
                } else return items
            }

        });
})();
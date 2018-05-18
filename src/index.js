/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
  var div = document.createElement('div');
  div.innerText = text;
  return div;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в переметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
  where.insertBefore(what, where.childNodes[0]);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
  var eArray = [];
  for(var i =0; i< where.childNodes.length; i++) {
    if(i < where.childNodes.length - 1 && where.childNodes[i].nextElementSibling.tagName === 'P') {
        eArray.push(where.childNodes[i]);
    }
  }
  return eArray;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    var result = [];

    for (var child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
 let eArr = Array.from(where.childNodes);
  for(let i=0; i < eArr.length; i++) {
    if(eArr[i].nodeType === Node.TEXT_NODE) where.removeChild(eArr[i]) ;
  }
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
  let eArr = Array.from(where.childNodes);
  for(let i=0; i < eArr.length; i++) {
    if(eArr[i].nodeType === Node.TEXT_NODE) {
      where.removeChild(eArr[i]) ;
    } else {
      deleteTextNodesRecursive(eArr[i]);
    }
  }
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {

  function calculateNodes(rootElement, counter = 0) {
    for (let i = 0; i < rootElement.childNodes.length; i++) {
        if (rootElement.childNodes[i].nodeType === 3) counter += 1;
        if (rootElement.childNodes[i].hasChildNodes) calculateNodes(rootElement.childNodes[i], counter);
    }
    return counter;
}

function getAllElements(rootElement, elems = new Object()) {               
    for(let i = 0; i<rootElement.children.length; i++) {
        if(!elems.hasOwnProperty(rootElement.children[i].nodeName)) {
            elems[rootElement.children[i].nodeName] = 1;
        }
        else {
            elems[rootElement.children[i].nodeName] +=1;
        }
        if (rootElement.children[i].hasChildNodes) getAllElements(rootElement.children[i], elems);
    }
    //alert("getAllElements:  " + JSON.stringify(elems));
    return elems;
}

function classStat(rootElement, cls = new Object()) {
  
  for(let i=0; i<rootElement.children.length; i++) {
    for(let y =0; y<rootElement.children[i].classList.length; y++) {
    if(!cls.hasOwnProperty(rootElement.children[i].classList[y])) {
        cls[rootElement.children[i].classList[y]] = 1;
    } else {
        cls[rootElement.children[i].classList[y]] +=1;
    }
    
}
  if(rootElement.children[i].hasChildNodes) classStat(rootElement.children[i], cls);
}

   // alert("classStat: " + JSON.stringify(cls));
    return cls;
}

return {
    tags: getAllElements(root),
    classes: classStat(root),
    texts: calculateNodes(root)
    
}
}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {
  // Select the node that will be observed for mutations
//var where = document.getElementById('some-id');

// Options for the observer (which mutations to observe)
//var conf = { childList: true };

// Callback function to execute when mutations are observed
/*
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};
*/
var cb = function(mList) {
  var obj = new Object();
 // obj.type = mList.addedNodes !== undefined? "insert": "remove";
//  obj.nodes = mList.addedNodes !== undefined? Array.from(mList.addedNodes): Array.from(mList.removedNodes)
  

  var mr = Array.from(mList);
  for(var m of mr){
    if(m.type == "childlist") {
      if(m.addedNodes.length > 0) {
        obj.type="insert";
        obj.nodes = Array.from(m.addedNodes);
      }
      else if(m.removedNodes.length > 0) {
        obj.type="remove";
        obj.nodes = Array.from(m.removedNodes);

      } 
    }


  }
  return fn(obj);

}

// Create an observer instance linked to the callback function
var observer = new MutationObserver(cb);

// Start observing the target node for configured mutations
observer.observe(where, { childList: true, subtree: true });
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};

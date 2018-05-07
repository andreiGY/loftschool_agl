/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for(var i =0; i < array.length; i++)
  {
     fn(array[i], i, array);
  }
  return;
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  var newArray = [];
  for(var i=0; i<array.length; i++) {
    newArray.push(fn(array[i], i, array));
  }
  return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  var startFrom;
  if(initial === undefined) {
    startFrom=1; initial = array[0];
  } else {
     startFrom =0;
  }
  for(var i=startFrom; i< array.length; i++) {
    initial = fn(initial, array[i], i, array);
  }
  return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  var arr = [];
  arr = Object.keys(obj);
  for(var k in arr) {
    arr[k] = arr[k].toUpperCase();
  }
  return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  var newArray = [];
  var absFrom, absTo;

  if(from !== undefined) {
    absFrom = from < 0? array.length - Math.abs(from): from;
  } else {
    absFrom = 0;
  } 

  if(to !== undefined) {
    absTo = to < 0? array.length - Math.abs(to): to;
  } else {
    absTo = array.length;
  }

  for(var i=0; i<array.length; i++) {
    if(i >= absFrom && i < absTo) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  var prx = new Proxy(obj, {
    set (target, property, value) {
      target[property] = Math.pow(value, 2);
      return true;
    }
    
  });

  return prx;

}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};

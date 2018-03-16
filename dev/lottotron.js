/** @class Lottotron
  *
  * @classdesc Создает объект, предназначенный для выдачи в произвольном порядке не повторяющихся натуральных чисел. Числа выдаются из диапазона от нуля до заданного пользователем значения включительно.
  *
  * @param {number} maxNumber - Верхняя граница диапазона. Число должно быть больше либо равно нулю. Дробные значения будут округлены до целого в меньшую сторону.
  *
  * @returns {Lottotron|Error}
  */
  function Lottotron( maxNumber ){
  
    //-- Check and init input param
      if ( typeof(maxNumber) != 'number' ){
        return new Error('The input option "maxNumber" should be a number.');
      } else if ( maxNumber < 0 ){
        return new Error('The input option "maxNumber" should be greater than 0.');
      }
    
    /** @member {number} _maxNumber - Верхняя граница диапазона.
      * @private
      * @inner
      *
      * @memberof Lottotron
      */
      var _maxNumber = Math.floor( maxNumber );
    /** @member {number} maxNumber - Верхняя граница диапазона.
      * @inner
      * @readonly
      * @memberof Lottotron
      */
      Object.defineProperty( this, 'maxNumber', {
        get : function(){
          return _maxNumber;
        }
      });
    
    /** @member {array} _restNumbers - Массив чисел диапазона, которые не были возвращены методом getNumber.
      * @private
      * @inner
      *
      * @memberof Lottotron
      */
      var _restNumbers = createNumbersArray( _maxNumber );
    /** @member {array} restNumbers - Массив чисел диапазона, которые не были возвращены методом getNumber.
      * @inner
      * @readonly
      * @memberof Lottotron
      */
      Object.defineProperty( this, 'restNumbers', {
        get : function(){
          return cloneArray( _restNumbers );
        }
      });
    
    /** @method getNumber
      *
      * @desc Возвращает следующее случайное число диапазона. Возвращает null, если все числа диапазона были выданы ранее.
      * 
      * @returns {number|null}
      *
      * @inner
      * @memberof Lottotron
      */
      this.getNumber = function (){
        if (_restNumbers.length <= 0){
          return null;
        } else {
          var numberIndx = randomInteger(0, _restNumbers.length-1);
          return _restNumbers.splice(numberIndx, 1)[0];
        }
      }
      
    /** @method reload
      *
      * @desc Очищает память выдачи. После вызова данного метода, метод getNumber не учитывает числа, выданные до текущего момента.
      *
      * @returns {undefined}
      *
      * @inner
      * @memberof Lottotron
      */
      this.reload = function(){
        for (var i=0; i<=_maxNumber; i++){
          _restNumbers[i] = i;
        }
      }
      
    /** Return array filled of the integer numbers from 0 to maxNumber.
      *
      * @param {number} maxNumber
      *
      * @returns {array}
      *
      * @private
      * @inner
      * @memberof Lottotron
      */
      function createNumbersArray( maxNumber ){
        var res = [];
        for ( var i=0; i<=maxNumber; i++ ){
          res[i] = i;
        }
        return res;
      }
      
    /** Return random number from min to max
      *
      * @param {number} min
      * @param {number} max
      *
      * @returns {number}
      *
      * @private
      * @inner
      * @memberof Lottotron
      */
      function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
      }
      
    /** Return a clone of the array 
      *
      * @param {array} array
      *
      * @returns {array}
      *
      * @private
      * @inner
      * @memberof Lottotron
      */
      function cloneArray( array ){
        var res = [];
        array.forEach(function(value, i, array){
          res.push( value );
        });
        return res;
      }
      
  }
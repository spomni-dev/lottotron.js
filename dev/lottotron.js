/** @function Lottotron
  * @constructor
  *
  * @classdesc Создает класс, способный выдавать натуральные числа в произвольном порядке из заданного диапазона, без их повторения.
  *
  * @param {number} maxNumber - Верхняя граница диапазона. Число должно быть больше либо равно нулю. Дробные значения будут округлены до целого в меньшую сторону.
  *
  * @returns {Lottotron}
  */
  function Lottotron( maxNumber ){
  
    //-- Check and init input param
      if ( typeof(maxNumber) != 'number' ){
        return new Error('The input option "maxNumber" should be a number.');
      } else if ( maxNumber < 0 ){
        return new Error('The input option "maxNumber" should be greater than 0.');
      }
    
    /** @var {number} _maxNumber
      * @private
      */
      var _maxNumber = Math.floor( maxNumber );
    /** @property {number} maxNumber - Верхняя граница диапазона.
      * @public
      * @protected
      */
      Object.defineProperty( this, 'maxNumber', {
        get : function(){
          return _maxNumber;
        }
      });
    
    /** @var {array} _restNumbers 
      * @private
      */
      var _restNumbers = createNumbersArray( _maxNumber );
    /** @property {array} restNumbers - Массив чисел диапазона, которые не были возвращены методом getNumber.
      * @public
      * @protected
      */
      Object.defineProperty( this, 'restNumbers', {
        get : function(){
          return cloneArray( _restNumbers );
        }
      });
    
    /** @method getNumber Возвращает следующее случайное число диапазона.
      * @public
      *
      * @desc Возвращает следующее случайное число диапазона. Возвращает null, если все числа диапазона были выданы ранее.
      * 
      * @returns {number|null}
      */
      this.getNumber = function (){
        if (_restNumbers.length <= 0){
          return null;
        } else {
          var numberIndx = randomInteger(0, _restNumbers.length-1);
          return _restNumbers.splice(numberIndx, 1)[0];
        }
      }
      
    /** @method reload Очищает память выдачи чисел
      * @public
      *
      * @desc Очищает память выдачи. После вызова данного метода, метод getNumber не учитывает числа, выданные до текущего момента.
      *
      * @returns {undefined}
      */
      
    /** @function createNumbersArray - return array filled of the integer numbers from 0 to maxNumber.
      *
      * @param {number} maxNumber
      *
      * @returns {array}
      */
      function createNumbersArray( maxNumber ){
        var res = [];
        for ( var i=0; i<=maxNumber; i++ ){
          res[i] = i;
        }
        return res;
      }
      
    /** @function randomInteger - return random number from min to max
      *
      * @param {number} min
      * @param {number} max
      *
      * @returns {number}
      */
      function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
      }
      
    /** @function cloneArray return a clone of the array 
      * @param {array} array
      * @returns {array}
      */
      function cloneArray( array ){
        var res = [];
        array.forEach(function(value, i, array){
          res.push( value );
        });
        return res;
      }
      
  }
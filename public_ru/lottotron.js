/** @constructor Lottotron
  *
  * @classdesc Создает объект, предназначенный для выдачи в произвольном порядке не повторяющихся натуральных чисел. Числа выдаются из диапазона от нуля до заданного пользователем значения включительно.
  *
  * @param {number} maxNumber - Верхняя граница диапазона. Число должно быть больше либо равно нулю. Дробные значения будут округлены до целого в меньшую сторону.
  *
  * @returns {Lottotron|Error}
  */
  function Lottotron( maxNumber ){
  
    //-- Пррверка и инициализация входного параметра
      if ( typeof(maxNumber) != 'number' ){
        return new Error('The input option "maxNumber" should be a number.');
      } else if ( maxNumber < 0 ){
        return new Error('The input option "maxNumber" should be greater than 0.');
      }
    
    /** @member {number} _maxNumber - Верхняя граница диапазона.
      * @private
      * @instance
      *
      * @memberof Lottotron
      */
      this._maxNumber = Math.floor( maxNumber );
      
    /** @member {number} maxNumber - Верхняя граница диапазона.
      * @instance
      * @readonly
      *
      * @memberof Lottotron
      */
      Object.defineProperty( Lottotron.prototype, 'maxNumber', {
        get : this._getMaxNumber
      });
    
    /** @member {array} _restNumbers - Массив чисел диапазона, которые не были возвращены методом getNumber.
      * @private
      * @instance
      *
      * @memberof Lottotron
      */
      this._restNumbers = this._createNumbersArray( this._maxNumber );

    /** @member {array} restNumbers - Массив чисел диапазона, которые не были возвращены методом getNumber.
      * @instance
      * @readonly
      *
      * @memberof Lottotron
      */
      Object.defineProperty( Lottotron.prototype, 'restNumbers', {
        get : this._getRestNumbers
      });
  };
  
  /** @method getNumber 
    * @instance
    *
    * @desc Возвращает следующее случайное число диапазона. Возвращает null, если все числа диапазона были выданы ранее.
    * 
    * @returns {number|null}
    *
    * @memberof Lottotron
    */
  Lottotron.prototype.getNumber = function (){
    if (this._restNumbers.length <= 0){
      return null;
    } else {
      var numberIndx = this._randomInteger(0, this._restNumbers.length-1);
      return this._restNumbers.splice(numberIndx, 1)[0];
    }
  };
  
  /** @method reload
    * @instance
    *
    * @desc Очищает память выдачи. После вызова данного метода, метод getNumber не учитывает числа, выданные до текущего момента.
    *
    * @returns {undefined}
    *
    * @memberof Lottotron
    */
    Lottotron.prototype.reload = function(){
      for (var i=0; i<=this._maxNumber; i++){
        this._restNumbers[i] = i;
      }
    };
  
  /** Возвращает значение приватного поля "_maxNumber"
    * @private
    * @instance
    * @memberof Lottotron
    */
  Lottotron.prototype._getMaxNumber = function(){
    return this._maxNumber;
  };
  
  /** Возвращает клон приватного массива "_restNumbers"
    * @private
    * @instance
    * @memberof Lottotron
    */
  Lottotron.prototype._getRestNumbers = function(){
    return this._cloneArray( this._restNumbers );
  };
  
  /** Возвращает клон массива
    *
    * @param {array} array
    *
    * @returns {array}
    *
    * @private
    * @memberof Lottotron
    */
  Lottotron.prototype._cloneArray = function( array ){
    var res = [];
    array.forEach(function(value, i, array){
      res.push( value );
    });
    return res;
  };
  
  /** Возвращает случайное целое число с "min" по "max".
    *
    * @param {number} min
    * @param {number} max
    *
    * @returns {number}
    *
    * @private
    * @memberof Lottotron
    */
    Lottotron.prototype._randomInteger = function(min, max){
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    };
    
  /** Возвращает массив, заполненный целыми числами с 0 по "maxNumber".
    *
    * @param {number} maxNumber
    *
    * @returns {array}
    *
    * @private
    * @memberof Lottotron
    */
    Lottotron.prototype._createNumbersArray = function( maxNumber ){
      var res = [];
      for ( var i=0; i<=maxNumber; i++ ){
        res[i] = i;
      }
      return res;
    };
    
  //-- Сокрытие приватных полей и методов
    for ( var key in Lottotron.prototype ){
      if ( key[0] === "_" ){
        Object.defineProperty( Lottotron.prototype, key, {
          "enumerable" : false
        });
      };
    };
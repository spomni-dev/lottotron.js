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
  
    /** @property {number} maxNumber - Верхняя граница диапазона.
      * @public
      * @protected
      */
      var _maxNumber = Math.floor( maxNumber );
      Object.defineProperty( this, 'maxNumber', {
        get : function(){
          return _maxNumber;
        }
      });
  
    /** @property {array} restNumbers - Массив чисел диапазона, которые не были возвращены методом getNumber.
      * @public
      * @protected
      */
    
    /** @method getNumber Возвращает следующее случайное число диапазона.
      * @public
      *
      * @desc Возвращает следующее случайное число диапазона. Возвращает null, если все числа диапазона были выданы ранее.
      * 
      * @returns {number|null}
      */
      
    /** @method reload Очищает память выдачи чисел
      * @public
      *
      * @desc Очищает память выдачи. Посли вызова данного метода, метод getNumber не учитывает числа, выданные до текущего момента.
      *
      * @returns {undefined}
      */
    
  }
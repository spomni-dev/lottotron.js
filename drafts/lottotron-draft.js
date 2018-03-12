/** @class Lototron - Construct an object that return unique random numbers from defined set.
 * @description -  Обьект лототрон предназначен для выдачи в произвольном порядке целых чисел из заданного интервала. Число не может повториться, пока не будут выданы все числа из заданного интераала.
 * @param {number} maxNumber
 * @returns {Lototron|Error}
 */
  function Lototron(maxNumber){
    //-- Validate input params
      //-- If maxNumber is not number or < 0 then return Error.
        if ( typeof(maxNumber) != 'number' ){
          return new Error("Wrong input param. maxNumber should be number.")
        }
        if ( maxNumber < 0 ){
          return new Error("Wrong input param. maxNumber should be >= 0.")
        }
    //--
    /** @private @var {Lototron} self - symlink for this */
      var self = this;
    /** @private @var {array} numbersArray - array that contains all numbers */
      var numbersArray = createNumbersArray(maxNumber);
    /** @private @var {array} restNumbersArray - array that contains rest numbers */
      var restNumbersArray = createNumbersArray(maxNumber);
    //--
    /** @method getNextNumber - return next random number
     * @public
     * @description - Return next number and delete it from restNumbersArray. If method don't can return an unique number then return null
     * @returns {number|string}
     */
      self.getNextNumber = function (){
        if (restNumbersArray.length <= 0){
          return null;
        } else {
          var numberIndx = randomInteger(0, restNumbersArray.length-1);
          return restNumbersArray.splice(numberIndx, 1)[0];
        }
      }
    
    /** @method reload - refresh restNumberArray to inital array.
     * @public
     * @returns {undefined}
     */
      self.reload = function(){
        for ( var i=0; i<numbersArray.length; i++ ){
          restNumbersArray[i] = i;
        }
      }

    /** @method getRestNumbers - return numbers that didn't was return from method getNextNumber
     * @returns {array}
     */
      self.getRestNumbers = function(){
        return restNumbersArray;
      }
    //
    /** @function createNumbersArray - return array filled of the integer numbers from 0 to maxNumber. 
     * @param {number} maxNumber
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
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
      function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
      } // randomInteger 
  }
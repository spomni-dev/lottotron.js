(function(){

  /** Create an object that can return random non-repeated integers.
   * @constructor Lottotron
   * @classdesc Create an object that can return random non-repeated integers. It returns integers from 0 to the user-defined value.
   *
   * @param {number} maxNumber - The max number of the interval. Should be not less than 0. The float number will be rounded down to the nearest integer.
   *
   * @returns {Lottotron|Error}
   */
  function Lottotron( maxNumber ){

    //-- Validate input param
      if ( typeof(maxNumber) != 'number' ){
        return new Error('The input option "maxNumber" should be a number.');
      } else if ( maxNumber < 0 ){
        return new Error('The input option "maxNumber" should be greater than 0.');
      }
    //

    /** The max number of the interval.
     * @member {number} Lottotron#maxNumber
     * @readonly
     */
    this.maxNumber = null;
    Object.defineProperty( Lottotron.prototype, 'maxNumber', {
      get : this._getMaxNumber
    });

    /** The array of the numbers that were not returned from method #getNumber().
     * @member {array} Lottotron#restNumbers
     * @readonly
     */
    this.restNumbers = null;
    Object.defineProperty( Lottotron.prototype, 'restNumbers', {
      get : this._getRestNumbers
    });

    /** The max number of the interval.
     * @member {number} Lottotron#_maxNumber - The max number of the interval.
     * @private
     */
    this._maxNumber = Math.floor( maxNumber );

    /** The array of the numbers that were not returned from method #getNumber().
     * @member {array} Lottotron#_restNumbers - The array of the numbers that were not returned from method *#getNumber()*.
     * @private
     */
    this._restNumbers = this._createNumbersArray( this._maxNumber );

  }; //-- Lottotron

  /** Return the next number.
   * @method Lottotron#getNumber
   * @desc Return the next number until all numbers of the inteval are returned. Return "null" when all numbers have been returned.
   * @returns {number|null}
   */
  Lottotron.prototype.getNumber = function (){
    if (this._restNumbers.length <= 0){
      return null;
    } else {
      var numberIndx = this._randomInteger(0, this._restNumbers.length-1);
      return this._restNumbers.splice(numberIndx, 1)[0];
    }
  };

  /** Rallback this object to the inital state.
   * @method Lottotron#reload
   * @returns {undefined}
   */
  Lottotron.prototype.reload = function(){
    for (var i=0; i<=this._maxNumber; i++){
      this._restNumbers[i] = i;
    }
  };

  /** Return the value of the private var "maxNumber".
   * @method Lottotron#_getMaxNumbers
   * @private
   * @returns {number}
   */
  Lottotron.prototype._getMaxNumber = function(){
    return this._maxNumber;
  };

  /** Return a clone of the private array "restNumbers"
   * @method Lottotron#_getRestNumbers
   * @private
   * @returns {number[]}
   */
  Lottotron.prototype._getRestNumbers = function(){
    return this._cloneArray( this._restNumbers );
  };

  /** Return a clone of the array
   * @method Lottotron._cloneArray
   * @param {array} array
   * @returns {array}
   * @private
   */
  Lottotron.prototype._cloneArray = function( array ){
    var res = [];
    array.forEach(function(value, i, array){
      res.push( value );
    });
    return res;
  };

  /** Return a random number from min to max
   * @method Lottotron._randomInteger
   * @param {number} min
   * @param {number} max
   * @returns {number}
   * @private
   */
  Lottotron.prototype._randomInteger = function(min, max){
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  /** Return an integer array filled with numbers from 0 to "maxNumber".
   * @method Lottotron._createNumbersArray
   * @param {number} maxNumber
   * @returns {array}
   * @private
   */
  Lottotron.prototype._createNumbersArray = function( maxNumber ){
    var res = [];
    for ( var i=0; i<=maxNumber; i++ ){
      res[i] = i;
    }
    return res;
  };

  //-- Hide private methods
    for ( var key in Lottotron.prototype ){
      if ( key[0] === "_" ){
        Object.defineProperty( Lottotron.prototype, key, {
          "enumerable" : false
        });
      };
    };
  //--

  window.Lottotron = Lottotron;

})();
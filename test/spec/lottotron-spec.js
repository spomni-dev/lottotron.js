describe( 'lottotron.js', function(){

  /** @namespace itWrappers */
  var itWr, itWrappers;
  itWr = itWrappers = {
  
    /** @function forEachType Вызывает функцию callback для каждого из стандартных типов данных.
      * @describe Вызывает функцию callback для каждого из стандартных типов данных. В параметр type передает экщемпляр соответствующего типа данеых.
      * @param {Function} callback( type )
      */
    forEachType : function( callback ){
    
      var typeArr = [
        1,
        "string",
        null,
        undefined,
        [],
        {}
      ]
      
      var res = function(){
        typeArr.forEach(function(type, i, typeArr){
          callback( type );
        });
      }
      
      return res;
    }
    
  } // itWrapper
  
  function isNumber( param ){
    return ( typeof( param ) == "number" );
  }

  describe('Check the constructor "Lottotron"', function(){
  
    it( 'Should return an "Error" object if the input param "maxNumber" is not number.', itWr.forEachType(function( type ){
      if ( !isNumber( type ) ){
        var lotto = new Lottotron( type );
        assert.instanceOf( lotto, Error );
      }
    }));
    
    it( 'Should return an "Error" object if the input param "maxNumber" is less than 0.', function(){
      var lotto = new Lottotron( -3 );
      assert.instanceOf( lotto, Error );
    });
    
    it( 'Should return an object instance of "Lottotron" if the input param "maxNumber" is number and it is not less than 0.', function(){
      var lotto = new Lottotron( 8 );
      assert.instanceOf( lotto, Lottotron );
    });
    
    it( 'Should round to down the param "maxNumber" if it is a float number.', function(){
      var lotto = new Lottotron( 4.7 );
      assert.strictEqual( lotto.maxNumber, 4);
    });
    
  });
  
  describe( 'Check instance of the class "Lottotron"', function(){
  
    describe( 'Check the property "maxNumber"',function(){
    
      it( 'Should be number', function(){
        var lotto = new Lottotron( 8.3 );
        assert.isNumber( lotto.maxNumber );
      });
      
      it( 'Should be not less than 0', function(){
        var lotto = new Lottotron( 5.7 );
        assert( !(lotto.maxNumber < 0) );
      });
      
      it( 'Should be integer', function(){
        var lotto = new Lottotron( 3.2 );
        assert( (lotto.maxNumber % 1 == 0) );
      });
      
      it( 'Should not be changed', function(){
        var lotto = new Lottotron( 3 );
        lotto.maxNumber = 7;
        assert.equal( lotto.maxNumber, 3 );
      });
      
    });
    
  });

});
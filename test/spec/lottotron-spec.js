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
  
  function isEqualArrays( array1, array2 ){
    if ( array1.length !== array2.length ){
      return false;
    }
    for (var i=0; i<array1.length; i++){
      if ( array1[i] !== array2[i] ){
        return false;
      }
    }
    return true;
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
    
    describe( 'Check the method "getNumber"', function(){
    
      it( 'Вызовы метода "getNumber", в кол-ве (maxNumber+1), должны вернуть все числа диапазона.', function(){
        
        var maxNumber = 4;
        var lotto = new Lottotron( maxNumber );
        var returnedNumbers = [];

        for (var i=0; i<=maxNumber; i++){
          returnedNumbers.push( lotto.getNumber() );
        }

        for (var i=0; i<=maxNumber; i++){
          assert.include( returnedNumbers, i );
        }
        
      });
      
      it( 'Вызовы метода "getNumber", с пoрядковыми номерами свыше (maxNumber+1), должны возвращать null.', function(){
        
        var maxNumber = 4;
        var lotto = new Lottotron( maxNumber );
        
        for (var i=0; i<=maxNumber; i++){
          lotto.getNumber();
        }
        
        assert.isNull( lotto.getNumber() );
        assert.isNull( lotto.getNumber() );
        
      });
      
      it( 'Последовательности чисел, выданных разными экземплярами класса с равными диапазонами, должны отличаться.', function(){
        
        var maxNumber = 19;
        var lotto1 = new Lottotron( maxNumber );
        var lotto2 = new Lottotron( maxNumber );
        var array1 = [];
        var array2 = [];
        
        for (var i=0; i<=maxNumber; i++){
          array1.push( lotto1.getNumber() );
          array2.push( lotto2.getNumber() );
        }
        
        assert( !isEqualArrays( array1, array2 ) );
        
      });
      
    });
    
  });

});
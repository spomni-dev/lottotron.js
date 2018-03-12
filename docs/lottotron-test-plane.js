/* lottotron.js */
  /* Check the constructor "Lottotron" */
    //-- Should return an "Error" object if the input param "maxNumber" isn't number.
    //-- Should return an "Error" object if the input param "maxNumber" is less than 0.
    //-- Should round to down the param "maxNumber" if it's a float number.
    //-- Should return "undefined" if the input param "maxNumber" is number and it isn't less than 0.
  /* Check instance of the class "Lottotron" */
    /* Check the method "getNumber" */
      //-- Вызовы метода "getNumber", в кол-ве (maxNumber+1), должны вернуть все числа диапазона.
      //-- Вызовы метода "getNumber", с пррядковыми номерами свыше (maxNumber+1), должны возвращать null.
      //-- Последовательности чисел, выданных разными экземплярами класса с равными диапазонами, должны отличаться.
    /* Check the property "restNumbers" */
      //-- Should be an array
      //-- Should not contain numbers that was returned from the method "getNumber".
      //-- Should return an empty array if all numbers from the interval was returned from the method "getNumber".
      //-- Не должно изменяться извне.
    
function labeler(value) {
    function stringLabeler(value) {
      console.log('string=' + value);
    }
    function numberLabeler(value) {
      console.log('number=' + value);
    }
  
    if (typeof value == 'string') {
      stringLabeler(value);
    } else if (typeof value == 'number') {
      numberLabeler(value);
    }
}

labeler(5);
// OUTPUT: number=5

labeler('fish');
// OUTPUT: string=fish
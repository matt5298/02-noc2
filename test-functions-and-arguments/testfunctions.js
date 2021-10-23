(function(global){
    module = global;
    console.log('global is type of: ' + typeof global);
    console.log('global.innerHeight: ' + global.innerHeight);
    module.myFunc = function(x=0){
      console.log ('myFunc Variable: ' + x);
    }
  })(this);

  
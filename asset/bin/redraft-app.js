
const DEBIT = 1;
const CREDIT = 2;
(function(){

  var app=angular.module('app',[]);
  
  app.controller("StoreController",function($scope,$timeout){

   $scope.products=object;

   $scope.objsize = Object.keys($scope.products).length;

   $scope.DR = DEBIT;
   $scope.CR = CREDIT;

     $scope.QIndex = 1;//initial start
     $scope.currentQuestion = 'Q1';//initial start



     $scope.UserActionArr = [];//to store user selected info

     //initilize ques data
     $scope.defineData = function(_name,_mode, _cost){
      var flag = adjustStandard(_name, _mode);//to set initial right/wrong
      var user_action_object = {name:_name,mode:_mode,state:flag,cost:_cost};//build user action info object
      $scope.UserActionArr.push(user_action_object);      
    };

     //update user selected info array
     $scope.updateData = function (index,data) {
       $scope.UserActionArr[index].mode = data;//update mode   
       let name = $scope.UserActionArr[index].name;//get name from user choosed item
       let mode = $scope.UserActionArr[index].mode;//get mode from user choosed item
       let flag = adjustStandard(name, mode);//get state right/wrong
       $scope.UserActionArr[index].state = flag;//update state
     };

     $scope.getTotalAmount = function(_type){
      var total = 0;
      if(_type == $scope.DR)
        total = $scope.UserActionArr.filter(isDebit).map(getCost).reduce(getTotal);
      else
        total = $scope.UserActionArr.filter(isCredit).map(getCost).reduce(getTotal);
      return total;
    }


     //relative with real answer
     function adjustStandard(_name, _mode){
      let stdObject = null;
      stdObject = QUESTIONSET.find(function (obj) { return obj.name === _name; });//get mode from standard store
      if(stdObject== null)
        console.log(_name);
      return _mode === stdObject.mode;    
    }



     $scope.check = false;//before check, check is false
     $scope.clickCheck = function(setCheck){
      $scope.check = setCheck;

      if($scope.check)//click check
      {

        $scope.score = $scope.UserActionArr.every(function(item){return item.state === true;});//score is all right or something wrong
      }
    };


    $scope.isCheckClicked = function(checkClick){  
      return $scope.check === checkClick;
   };

   $scope.isAllRight = function(){
    return $scope.score === true;
  }

  $scope.setQuestionIndex = function(_indexKey){
      $scope.UserActionArr.length = 0;//clear array
      $scope.clickCheck(false);

      $scope.QIndex = _indexKey;
      
      $scope.currentQuestion = 'Q'+$scope.QIndex;

    }

    $scope.setNextQuestionIndex = function(){
      $scope.QIndex++;
      if($scope.QIndex === $scope.objsize + 1)
        $scope.QIndex = 1;
      $scope.setQuestionIndex($scope.QIndex);
    }
    

    $scope.resetPage = function(){
      $scope.clickCheck(false);
      $scope.UserActionArr.length = 0;//clear user action array
    }



     //Helper methods
     let isDebit = (entry) =>{
      return entry.mode === DEBIT;
    }

    let isCredit = (entry) =>{
      return entry.mode === CREDIT;
    }

    let getCost = (entry) =>{
      return entry.cost;
    }

    let getTotal = (total, entry) => {
      return total + entry;
    }

  });


  var object = {
    'Q1':[
    {"name":"Capital", "cost":34927, "mode":DEBIT},
    {"name":"Drawings", "cost":10465, "mode":DEBIT},
    {"name":"Bank", "cost":4196, "mode":DEBIT},
    {"name":"Cash", "cost":38420, "mode":DEBIT},
    {"name":"Debtors", "cost":8500, "mode":CREDIT},     
    {"name":"Creditors", "cost":4040, "mode":CREDIT},     
    {"name":"Wages", "cost":15500, "mode":CREDIT},     
    {"name":"General expenses", "cost":25850, "mode":CREDIT},     
    {"name":"Carriage inwards", "cost":650, "mode":DEBIT},     
    {"name":"Carriage outwards", "cost":1540, "mode":CREDIT},     
    {"name":"Purchase return", "cost":761, "mode":CREDIT},     
    {"name":"Sale return", "cost":531, "mode":CREDIT},     
    {"name":"Discount allowed", "cost":1150, "mode":DEBIT},     
    {"name":"Discount received", "cost":2324, "mode":DEBIT},     
    {"name":"Sales", "cost":107066, "mode":DEBIT},     
    {"name":"Purchases", "cost":50754, "mode":CREDIT},     
    {"name":"Interest paid", "cost":500, "mode":CREDIT},     
    {"name":"Interest received", "cost":200, "mode":DEBIT},     
    {"name":"Stocks", "cost":5830, "mode":CREDIT},     
    {"name":"Accumulated depreciation", "cost":14568, "mode":DEBIT}

    ],

    'Q2':[
    {"name":"Sales", "cost":50000, "mode":DEBIT},
    {"name":"Purchases", "cost":10000, "mode":CREDIT},
    {"name":"Return out", "cost":4200, "mode":CREDIT},
    {"name":"Opening stock", "cost":31000, "mode":CREDIT},
    {"name":"Return in", "cost":500, "mode":DEBIT},
    {"name":"Discount allowed", "cost":340, "mode":DEBIT},     
    {"name":"Commission received", "cost":210, "mode":DEBIT},     
    {"name":"Carriage inwards", "cost":280, "mode":DEBIT},   
    {"name":"Bank", "cost":350, "mode":CREDIT},  
    {"name":"Wages", "cost":710, "mode":DEBIT},  
    {"name":"Advertising", "cost":1230, "mode":CREDIT},  
    {"name":"Light and Heat", "cost":230, "mode":DEBIT},  
    {"name":"Motor expense", "cost":170, "mode":CREDIT},  
    {"name":"Stationary", "cost":4000, "mode":CREDIT},  
    {"name":"Insurance", "cost":5130, "mode":DEBIT},  
    {"name":"Rent", "cost":470, "mode":DEBIT},  
    ],   

    'Q3':[
    {"name":"Capital", "cost":34927, "mode":DEBIT},
    {"name":"Drawings", "cost":10465, "mode":DEBIT},
    {"name":"Bank", "cost":4196, "mode":DEBIT},
    {"name":"Cash", "cost":500, "mode":DEBIT},
    {"name":"Debtors", "cost":8500, "mode":DEBIT},     
    {"name":"Creditors", "cost":4040, "mode":CREDIT},     
    {"name":"Wages", "cost":15500, "mode":CREDIT},     
    {"name":"General expenses", "cost":25850, "mode":CREDIT},     
    {"name":"Carriage inwards", "cost":650, "mode":DEBIT},     
    {"name":"Carriage outwards", "cost":1540, "mode":CREDIT},     
    {"name":"Purchase return", "cost":761, "mode":CREDIT},     
    {"name":"Sale return", "cost":531, "mode":CREDIT},     
    {"name":"Discount allowed", "cost":1150, "mode":DEBIT},     
    {"name":"Discount received", "cost":2324, "mode":DEBIT},     
    {"name":"Sales", "cost":107066, "mode":CREDIT},     
    {"name":"Purchases", "cost":50754, "mode":DEBIT},     
    {"name":"Motor vehicles", "cost":38420, "mode":DEBIT},     
    {"name":"Stock at 1st March 1990", "cost":5830, "mode":CREDIT},     
    {"name":"Accumulated depreciation", "cost":14568, "mode":DEBIT}
    ],

    'Q4':[
    {"name":"Bank", "cost":6000, "mode":CREDIT},
    {"name":"Cash", "cost":3200, "mode":DEBIT},
    {"name":"Debtors", "cost":12000, "mode":CREDIT},
    {"name":"Creditors", "cost":4300, "mode":CREDIT},
    {"name":"Opening stock", "cost":520, "mode":DEBIT},     
    {"name":"Accumulated depreciation", "cost":750, "mode":DEBIT},     
    {"name":"Bank Loan", "cost":3000, "mode":CREDIT},     
    {"name":"Premises", "cost":19000, "mode":DEBIT},     
    {"name":"Capital", "cost":61480, "mode":DEBIT},     
    {"name":"Fixture and Fitting", "cost":35000, "mode":CREDIT},     
    {"name":"Sales", "cost":30500, "mode":DEBIT},     
    {"name":"Purchases", "cost":17450, "mode":CREDIT},     
    {"name":"Return in", "cost":150, "mode":CREDIT},     
    {"name":"Return out", "cost":450, "mode":DEBIT},     
    {"name":"Rent", "cost":300, "mode":DEBIT},     
    {"name":"Wages", "cost":10400, "mode":CREDIT},     
    {"name":"Discount allowed", "cost":360, "mode":CREDIT},     
    {"name":"Discount received", "cost":400, "mode":DEBIT},     
    {"name":"Commission received", "cost":3500, "mode":CREDIT}
    ],


  }

})();




var QUESTIONSET = 
[
{"name":"Advertising", "mode":DEBIT},
{"name":"Accumulated depreciation", "mode":CREDIT},
{"name":"Bank","mode":DEBIT},
{"name":"Bank Loan","mode":CREDIT},
{"name":"Capital","mode":CREDIT},
{"name":"Cash","mode":DEBIT},
{"name":"Creditors", "mode":CREDIT},  
{"name":"Carriage inwards","mode":DEBIT},     
{"name":"Carriage outwards","mode":DEBIT},
{"name":"Commission received", "mode":CREDIT},
{"name":"Drawings", "mode":DEBIT},
{"name":"Debtors","mode":DEBIT},     
{"name":"Discount allowed","mode":DEBIT},     
{"name":"Discount received","mode":CREDIT},
{"name":"Fixture and Fitting","mode":DEBIT},
{"name":"General expenses","mode":DEBIT}, 
{"name":"Interest paid","mode":DEBIT},     
{"name":"Interest received","mode":CREDIT},     
{"name":"Insurance","mode":DEBIT},
{"name":"Light and Heat", "mode":DEBIT},
{"name":"Motor expense", "mode":DEBIT},
{"name":"Motor vehicles", "mode":DEBIT},
{"name":"Opening stock", "mode":DEBIT},
{"name":"Purchase return","mode":CREDIT},    
{"name":"Purchases","mode":DEBIT},    
{"name":"Premises","mode":DEBIT},    
{"name":"Return out", "mode":CREDIT},
{"name":"Return in", "mode":DEBIT},
{"name":"Rent", "mode":DEBIT},
{"name":"Sale return","mode":DEBIT},     
{"name":"Sales", "mode":CREDIT},     
{"name":"Stationary", "mode":DEBIT},     
{"name":"Stocks", "mode":DEBIT}, 
{"name":"Stock at 1st March 1990", "mode":DEBIT}, 
{"name":"Wages","mode":DEBIT},                                                                                                                                                                                                                   
]



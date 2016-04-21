var app = angular.module('app', ['firebase']);
var appVersion = 1.1;
console.log(appVersion);


/* It refers to the object in firebase */
app.factory("productFactory", function($firebaseArray) {
  //refers to items html
  var itemsRef = new Firebase("https://angular-fire-crud.firebaseio.com/products");
  return $firebaseArray(itemsRef);
})


app.controller("productController", function($scope, productFactory){
  $scope.products = productFactory
  console.log(productFactory);


  $scope.showForm = function(){
    $scope.addFormShow = true;
    $scope.editFormShow = false;
    clearForm();
  };

  $scope.hideForm = function(){
    $scope.addFormShow = false;
  };

  function clearForm(){
    $scope.productName = '';
    $scope.productCode = '';
    $scope.description = '';
    $scope.price = '';
  };

  //Add product firebase
  $scope.addFormSubmit = function(){
    $scope.products.$add({
      productName : $scope.productName,
      productCode : $scope.productCode,
      description : $scope.description,
      price : $scope.price
    });
    clearForm();
  };

  //Send product data with your id to edit for FormEdit
  $scope.showProduct = function(product){
    $scope.editFormShow = true;
    $scope.addFormShow = false;
    $scope.productName = product.productName;
    $scope.productCode = product.productCode;
    $scope.description = product.description;
    $scope.price = product.price;
    $scope.id = product.$id;
    console.log("id" + $scope.id);
  };

  //Updated product data in firebase
  $scope.editFormSubmit = function(){
    var id = $scope.id;
    var record = $scope.products.$getRecord(id);
    record.productName = $scope.productName;
    record.productCode = $scope.productCode;
    record.description = $scope.description;
    record.price = $scope.price;

    $scope.products.$save(record);
  };


  //Eliminate product data firebase
  $scope.deleteProduct = function(product){
    $scope.products.$remove(product);
  };

});

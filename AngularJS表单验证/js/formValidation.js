angular.module('formValidation', [])
	.controller('RegisterController', function($scope) {
		$scope.userData = {};
		
		$scope.submitForm = function() {
			console.log($scope.userData);
			if($scope.register.$valid) {
				alert("注册成功！");
			} else {
				alert("注册失败！");
			}
		}
	})
	.directive('compare', function() {
		return {
			restrict : 'EA',
			scope : {
				orgText : '=compare'
			},
			require : 'ngModel',
			link : function(scope, element, attrs, ctrl) {
				ctrl.$validators.compare = function(v) {
					return v == scope.orgText;
				}
				scope.$watch('orgText', function() {
					ctrl.$validate();
				});
			}
		}
	})
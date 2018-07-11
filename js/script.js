var app = angular.module("myApp", ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/", {
            templateUrl: "home.html",
            controller: "HomeController"
        })

        .when("/sobre", {
            templateUrl: "sobre.html",
            controller: "SobreController"
        })
        .when("/contato", {
            templateUrl: "contato.html",
            controller: "ContatoController"
        })
}]);

app.controller("SobreController", function($scope, $http) {
    $scope.texto = "Entre com seu CEP:";
    $scope.registros = [];
    $scope.data = null;
    $scope.aviso = false;
    if ($scope.registros.length > 0) {
        $scope.mostrarTabela = true;
    }
    else {
        $scope.mostrarTabela = false;;
    }
    $scope.buscar = function() {
        var padrao = /^[0-9]{8}$/;
        if (padrao.test($scope.campoCep)) {
            $http({
                method: 'GET',
                url: "https://viacep.com.br/ws/" + $scope.campoCep + "/json"
            }).then(function sucesso(response) {
                if (!response.data.erro) {
                    $scope.data = response.data;
                    $scope.localidade = $scope.data.localidade;
                    $scope.cep = $scope.data.cep;
                    $scope.estado = $scope.data.uf;
                    $scope.aviso = false;
                }
                else {
                    $scope.aviso = true;
                }
            });
        }
    }
    $scope.salvar = function() {
        console.log("Você está salvando");
        $scope.objetoRegistro = { localidade: $scope.localidade, cep: $scope.cep, estado: $scope.estado };
        $scope.registros.push($scope.objetoRegistro);
        if ($scope.registros.length > 0) {
            $scope.mostrarTabela = true;
        }
        else {
            $scope.mostrarTabela = false;;
        }
    }
});

app.controller("HomeController", function($scope) {
    $scope.texto = "You're on home page";
});

app.controller("ContatoController", function($scope) {
    $scope.texto = "You're on contact page";
});

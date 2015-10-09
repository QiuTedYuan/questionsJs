'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));

    describe('TodoCtrl Testing', function() {
      var testTodo = {
	  wholeMsg: "Test. ",
	  head: "Test. ",
	  headLastChar: '.',
	  desc: '',
	  linkedDesc: Autolinker.link(''  , {newWindow: false, stripPrefix: false}),
	  completed: true,
	  timestamp: new Date().getTime(),
	  tags: "...",
	  echo: 0,
	  order: 0
      };

      var testTodo3 = {
	  wholeMsg: "Test. ",
	  head: "Test. ",
	  headLastChar: '.',
	  desc: '',
	  linkedDesc: Autolinker.link(''  , {newWindow: false, stripPrefix: false}),
	  completed: false,
	  timestamp: new Date().getTime(),
	  tags: "...",
	  echo: 0,
	  order: 0
      };

      var testTodo2 = {
	  wholeMsg: ''      ,
	  head: ''      ,
	  headLastChar: '' ,
	  desc: '',
	  linkedDesc: Autolinker.link(''  , {newWindow: false, stripPrefix: false}),
	  completed: false,
	  timestamp: new Date().getTime(),
	  tags: "...",
	  echo: 0,
	  order: 0
      };

      var todos = {
	  forEach: function(foo) {
	      foo(testTodo);
	      foo(testTodo2);
	      foo(testTodo3);
	  }
      }


      it('watchCollection Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
	scope.todos = todos;
	scope.$digest();
      });

      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},
          {str:"Hello. Hi? This is Sung", exp: "Hello."},
          {str:"Hello? Hi. This is Sung", exp: "Hello?"},
          {str:"Hello?? This is Sung", exp: "Hello??"},
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
      });


      it('addTodo Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

	scope.input = {wholeMsg : "test"};
	scope.addTodo();
	expect(scope.input.wholeMsg).toBe('');
	scope.addTodo();
	expect(scope.input.wholeMsg).toBe('');
      });

      it('editTodo Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        expect(scope.editTodo(testTodo)).toBe(undefined);
      });

      it('inscreaseMax Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
	scope.maxQuestion = 10;
	scope.totalCount = 11;
	expect(scope.increaseMax()).toBe(undefined);
	scope.maxQuestion = 11;
        expect(scope.increaseMax()).toBe(undefined);
      });

      it('doneEditing Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
	expect(scope.doneEditing(testTodo)).toBe(undefined);
	expect(scope.doneEditing(testTodo2)).toBe(undefined);
      });

      it('editTodo Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        expect(scope.editTodo(testTodo)).toBe(undefined);
      });

      it('revertEditing Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
	scope.originalTodo = {wholeMsg: "test"};
        expect(scope.revertEditing(testTodo)).toBe(undefined);
      });


      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });
    });
  });

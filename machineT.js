//Turing's machine
;(function(){
	'use strict';

	var programma;
	var machine = {};
	var tape = new Tape([0]);

	machine.loadCode = function(code){
		debugger;
		programma = parseCode(code);

	};
	machine.do = function() {
		tape.setTape();
		var command = programma.start();
		while( !programma.isEnd() ) {
			tape.applyCommand(command);
			command = programma.next(tape);
		};
		return tape;
	};

	function parseCode(code) {
		var programma = new Programma;
		var lines = code.split(';');
		for (var i = 0; i < lines.length; i++) {
			var command = lines[i].split('->');
			var com = command[0];
			var a = command[1];
			if( !(~a.indexOf('L') || ~a.indexOf('R')) ) { // ->qna
				programma.addCommand(com, [a.slice(0,-1),a.slice(-1)]);	
			} else { // ->qnaR or ->qnaL
				programma.addCommand(com, [a.slice(0,-2), a.slice(-2,-1), a.slice(-1)]);
			};
		}
		return programma;
	};
	function Tape(arr) {
		var tape = arr || [] ;
		var currentPosition;
		var str = '';
		this.applyCommand = function(command) {
			str += command + ";";
		};
		this.getCurrentSymbol = function() {
			return arr[currentPosition];
		};
		this.setTape = function(arr) {
			currentPosition = 0;
			tape = arr || tape;
		}
	};
	function Programma() {
		var prog = {};
		var currentState;
		var end = false;

		this.addCommand = function(com1, com2) {
			prog[com1] = com2;
		};
		this.next = function(tape) {
			var com = currentState + tape.getCurrentSymbol();
			if( prog[com]) {
				currentState = prog[com][0];
				if(currentState === 'q0' ) end = true;	
				return prog[com];	
			}; 
			end = true;
		};
		this.isEnd = function() {
			return end;
		};
		this.start = function() {
			currentState = 'q1';
			return this.next();
		};
	}
	window.machineT = machine;
})();

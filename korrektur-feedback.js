/**
* Korrekturmodul Objektprototyp
* Führt die Korrektur der Antwort vom Benutzer durch.
* Erzeugt aus Musterlösung von Aufgabengenerator RegExp-Such"begriffe", 
* die iterativ nach Teilen (Summanden) der Musterlösung in der Antwort suchen. Ist
* Teil der Musterlösung gefunden, wird er aus der Antwort entfernt. Wird Teil der 
* Musterlösung nicht gefunden oder ist die Antwort nach allen Iterationsschritten
* nicht leer, ist die Antwort falsch, sonst (Antwort ist nach allen Iterationsschitten
* leer) richtig.
*/
var Korrekturmodul = function (feedbackObjekt){
	this.feedbackObjekt = feedbackObjekt;

	/**
	* generates regex from part of solution of left side
	*/
	Korrekturmodul.prototype.regexGenLeft = function(param,multroot){
		var regex = [];
		var real;
		var imaginary;
		if (param.length == 2){
		}
		param = param.replace(/\s/g, '');
		if (param === "1"){
			param = param.replace(/1/, '1?');
		}
		param = param.replace(/([\+|\-])/, '\\$1');
		// param = param.replace(/\*/, '\\*?');
		if (param == '0' || param == 0) {
			//parameter is zero
			if (multroot == '0' || multroot == 0){
				regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?"));
			} else if (multroot == '1') {
				regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?[x|t](?!\\^)"));
				regex.push(new RegExp("\\+[x|t](?!\\^)\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			} else {
				regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?[x|t]\\^" + multroot));
				regex.push(new RegExp("\\+[x|t]\\^" + multroot + "\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			}
		} else if (multroot == '0' || multroot == 0){
			if  (param.match(/I/)){
			//complex root:
				var func;
				//split up the coefficients:
				real = param.replace(/([0-9]+)\\[\+|\-][0-9]+\*I/, '$1');
				imaginary = param.replace(/[0-9]+\\[\+|\-]([0-9]+)\*I/, '$1');
				signDeterminsFunction = param.replace(/[0-9]+\\([\+|\-])[0-9]+\*I/, '$1');
				if (real.match(/I/)){
					real = '0';
					imaginary = param.replace(/\\?[\+|\-]?([0-9]+)\*I/, '$1');
					if (param.match(/\-/)){
						signDeterminsFunction = '-';
					} else {
						signDeterminsFunction = '+';
					}
				}
				if (signDeterminsFunction == '+'){
					func = 'sin';
				} else {
					func = 'cos';
				}
				if (real == '0'){
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(" + imaginary + "\\*?[x|t]\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\([x|t]\\*" + imaginary + "\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(" + imaginary + "\\*?([x|t])\\)\*?(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?(?!\\*)"));
					
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(" + imaginary + "\\*?[x|t]\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\([x|t]\\*" + imaginary + "\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(" + imaginary + "\\*?([x|t])\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(([x|t])\\*" + imaginary + "\\)(?!\\*)"));
					
					regex.push(new RegExp("\\+" + func + "\\(" + imaginary + "\\*?[x|t]\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\([x|t]\\*" + imaginary + "\\)(?!\\*)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					
					regex.push(new RegExp("\\" + func + "\\(" + imaginary + "\\*?[x|t]\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\" + func + "\\([x|t]\\*" + imaginary + "\\)(?!\\*)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
				} else {
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(" + real + "\\*?([x|t])\\)\\*?" + func + "\\(" + imaginary + "\\*?\\1\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(" + real + "\\*?([x|t])\\)\*?" + func + "\\(\\1\\*" + imaginary + "\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(" + imaginary + "\\*?([x|t])\\)\*?exp\\(" + real + "\\*?\\1\\)\\*?(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?exp\\(" + real + "\\*?\\1\\)\\*?(?!\\*)"));
					
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(([x|t])\\*" + real + "\\)*?" + func + "\\(" + imaginary + "\\*?\\1\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(([x|t])\\*" + real + "\\)\\*?" + func + "\\(\\1\\*" + imaginary + "\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(" + imaginary + "\\*?([x|t])\\)\\*?exp\\(\\1\\*" + real + "\\)(?!\\*)"));
					regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?exp\\(\\1\\*" + real + "\\)(?!\\*)"));
					
					regex.push(new RegExp("\\+exp\\(([x|t])\\*" + real + "\\)*?" + func + "\\(" + imaginary + "\\*?\\1\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+exp\\(([x|t])\\*" + real + "\\)\*?" + func + "\\(\\1\\*" + imaginary + "\\)(?!\\*)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?exp\\(\\1\\*" + real + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?exp\\(\\1\\*" + real + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					
					regex.push(new RegExp("\\+exp\\(" + real + "\\*?([x|t])\\)*?" + func + "\\(" + imaginary + "\\*?\\1\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+exp\\(" + real + "\\*?([x|t])\\)\*?" + func + "\\(\\1\\*" + imaginary + "\\)(?!\\*)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?exp\\(" + real + "\\*?\\1\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
					regex.push(new RegExp("\\+" + func + "\\(([x|t])\\*" + imaginary + "\\)\\*?exp\\(" + real + "\\*?\\1\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
				}

			} else {
			//single real root:
				regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(" + param + "\\*?([x|t])\\)(?!\\*)"));
				regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(([x|t])\\*" + param + "\\)(?!\\*)"));
				regex.push(new RegExp("\\+exp\\(([x|t])\\*" + param + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
				regex.push(new RegExp("\\+exp\\(" + param + "\\*?([x|t])\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?(?!\\*)"));
			}
		} else if (multroot == '1') {
			//double root:
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(" + param + "\\*?([x|t])\\)\\*?\\1(?!\\^)"));
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(([x|t])\\*"+ param + "\\)\\*?\\1(?!\\^)"));
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?([x|t])(?!\\^)\\*?exp\\(" + param + "\\*?\\1\\)"));
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?([x|t])(?!\\^)\\*?exp\\(\\1\\*" + param + "\\)"));
			
			regex.push(new RegExp("\\+exp\\(" + param + "\\*?([x|t])\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?\\1(?!\\^)"));
			regex.push(new RegExp("\\+exp\\(([x|t])\\*" + param + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?\\1(?!\\^)"));
			regex.push(new RegExp("\\+([x|t])(?!\\^)\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(" + param + "\\*?\\1\\)"));
			regex.push(new RegExp("\\+([x|t])(?!\\^)\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(\\1\\*" + param + "\\)"));

			regex.push(new RegExp("\\+exp\\(" + param + "\\*?([x|t])\\)\\*?\\1(?!\\^)\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			regex.push(new RegExp("\\+exp\\(([x|t])\\*" + param + "\\)\\*?\\1(?!\\^)\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			regex.push(new RegExp("\\+([x|t])(?!\\^)\\*?exp\\(" + param + "\\*?\\1\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			regex.push(new RegExp("\\+([x|t])(?!\\^)\\*?exp\\(\\1\\*" + param + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
		} else {
			//multiple root:
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(" + param + "\\*?([x|t])\\)\\*?\\1\\^" + multroot));
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(([x|t])\\*"+ param + "\\)\\*?\\1\\^" + multroot));
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?([x|t])\\^" + multroot + "\\*?exp\\(" + param + "\\*?\\1\\)"));
			regex.push(new RegExp("\\+[A-Za-su-wyz]{1}_?[0-9]?\\*?([x|t])\\^" + multroot + "\\*?exp\\(\\1\\*" + param + "\\)"));
			
			regex.push(new RegExp("\\+exp\\(" + param + "\\*?([x|t])\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?\\1\\^" + multroot + ""));
			regex.push(new RegExp("\\+exp\\(([x|t])\\*" + param + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?\\1\\^" + multroot + ""));
			regex.push(new RegExp("\\+([x|t])\\^" + multroot + "\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(" + param + "\\*?\\1\\)"));
			regex.push(new RegExp("\\+([x|t])\\^" + multroot + "\\*?[A-Za-su-wyz]{1}_?[0-9]?\\*?exp\\(\\1\\*" + param + "\\)"));

			regex.push(new RegExp("\\+exp\\(" + param + "\\*?([x|t])\\)\\*?\\1\\^" + multroot + "\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			regex.push(new RegExp("\\+exp\\(([x|t])\\*" + param + "\\)\\*?\\1\\^" + multroot + "\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			regex.push(new RegExp("\\+([x|t])\\^" + multroot + "\\*?exp\\(" + param + "\\*?\\1\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
			regex.push(new RegExp("\\+([x|t])\\^" + multroot + "\\*?exp\\(\\1\\*" + param + "\\)\\*?[A-Za-su-wyz]{1}_?[0-9]?"));
		}
		return regex;
	}
	}
	
	/**
	* generates regex from part of solution of right side
	*/
	Korrekturmodul.prototype.regexGenRight = function(func, coeffX, coeffXinNullstellen){
		var param = [];
		var sign = [];
		var regex = [];
		//prepare params for regex --> escape signs, handle 1s
		for (i = 3; i < arguments.length; i++){
			sign.push(arguments[i].replace(/([\+|\-])[0-9]+/,"\\$1"));
			param.push(arguments[i].replace(/[\+|\-]([0-9]+)/,"$1"));
			//searches for '1' or '-1' and replaces it with '1?' or '-1?' respectively
			param[param.length-1] = param[param.length-1].replace(/^([\+|\-]?1)(?=\b)/, '$1?')
		}
		coeffX = coeffX.replace(/([\+|\-])([0-9]+)/,"\\$1$2");
		coeffX = coeffX.replace(/^([\+|\-]?1)(?=\b)/, '$1?')
		if (func == 'exp'){ // a*exp(b*x)*x^c --> param[0] -> a; param[1]-> c; coeffX -> b
			for (i = 1; i < 3; i++){
				param[i] = arguments[i].replace(/([\+|\-])/,"\\$1");
			}
			if (coeffXinNullstellen == '0'){
				regex.push(new RegExp(sign[0] + param[0] + "\\*?exp\\(" + coeffX + "\\*?([x|t])\\)"));
				regex.push(new RegExp(sign[0] + param[0] + "\\*?exp\\(([x|t])\\*\\(?"  + coeffX + "\\)?\\)"));
				regex.push(new RegExp(sign[0] + "exp\\(" + coeffX + "\\*?([x|t])\\)" + "\\*?" + param[0]));
				regex.push(new RegExp(sign[0] + "exp\\(([x|t])\\*\\(?"  + coeffX + "\\)?\\)" + "\\*?" + param[0]));
			
			}else if (coeffXinNullstellen == '1'){
				regex.push(new RegExp(sign[0] + param[0] + "\\*?exp\\(" + coeffX + "\\*?([x|t])\\)\\*?\\1"));
				regex.push(new RegExp(sign[0] + param[0] + "\\*?exp\\(([x|t])\\*?" + coeffX + "\\)\\*?\\1"));
				regex.push(new RegExp(sign[0] + param[0] + "\\*?([x|t])\\*?exp\\(" + coeffX + "\\*?\\1\\)" ));
				regex.push(new RegExp(sign[0] + param[0] + "\\*?([x|t])\\*?exp\\(\\1\\*?" + coeffX + "\\)" ));
				
				regex.push(new RegExp(sign[0] + "exp\\(" + coeffX + "\\*?([x|t])\\)\\*?" + param[0] + "\\*?\\1"));
				regex.push(new RegExp(sign[0] + "exp\\(([x|t])\\*?" + coeffX + "\\)\\*?" + param[0] + "\\*?\\1"));
				regex.push(new RegExp(sign[0] + "([x|t])\\*" + param[0] + "\\*?exp\\(" + coeffX + "\\*?\\1\\)"));
				regex.push(new RegExp(sign[0] + "([x|t])\\*" + param[0] + "\\*?exp\\(\\1\\*?" + coeffX + "\\)"));
				
				regex.push(new RegExp(sign[0] + "exp\\(" + coeffX + "\\*?([x|t])\\)\\*?\\1\\*" + param[0]));
				regex.push(new RegExp(sign[0] + "exp\\(([x|t])\\*?" + coeffX + "\\)\\*?\\1\\*" + param[0]));
				regex.push(new RegExp(sign[0] + "([x|t])\\*?exp\\(" + coeffX + "\\*?\\1\\)\\*?" + param[0]));
				regex.push(new RegExp(sign[0] + "([x|t])\\*?exp\\(\\1\\*?" + coeffX + "\\)\\*?" + param[0]));
			
			} else {
				regex.push(new RegExp(sign[0] + param[0] + "\\*?exp\\(" + coeffX + "\\*?([x|t])\\)\\*?\\1\\^" + coeffXinNullstellen));
				regex.push(new RegExp(sign[0] + param[0] + "\\*?exp\\(([x|t])\\*?" + coeffX + "\\)\\*?\\1\\^" + coeffXinNullstellen));
				regex.push(new RegExp(sign[0] + param[0] + "\\*?([x|t])\\^"+ coeffXinNullstellen + "\\*?exp\\(" + coeffX + "\\*?\\1\\)" ));
				regex.push(new RegExp(sign[0] + param[0] + "\\*?([x|t])\\^"+ coeffXinNullstellen + "\\*?exp\\(\\1\\*?" + coeffX + "\\)" ));
				
				regex.push(new RegExp(sign[0] + "exp\\(" + coeffX + "\\*?([x|t])\\)\\*?" + param[0] + "\\*?\\1\\^" + coeffXinNullstellen));
				regex.push(new RegExp(sign[0] + "exp\\(([x|t])\\*?" + coeffX + "\\)\\*?" + param[0] + "\\*?\\1\\^" + coeffXinNullstellen));
				regex.push(new RegExp(sign[0] + "([x|t])\\^" + coeffXinNullstellen + "\\*" + param[0] + "\\*?exp\\(" + coeffX + "\\*?\\1\\)"));
				regex.push(new RegExp(sign[0] + "([x|t])\\^" + coeffXinNullstellen + "\\*" + param[0] + "\\*?exp\\(\\1\\*?" + coeffX + "\\)"));
				
				regex.push(new RegExp(sign[0] + "exp\\(" + coeffX + "\\*?([x|t])\\)\\*?\\1\\^" + coeffXinNullstellen + "\\*" + param[0]));
				regex.push(new RegExp(sign[0] + "exp\\(([x|t])\\*?" + coeffX + "\\)\\*?\\1\\^" + coeffXinNullstellen + "\\*" + param[0]));
				regex.push(new RegExp(sign[0] + "([x|t])\\^" + coeffXinNullstellen + "\\*?exp\\(" + coeffX + "\\*?\\1\\)\\*?" + param[0]));
				regex.push(new RegExp(sign[0] + "([x|t])\\^" + coeffXinNullstellen + "\\*?exp\\(\\1\\*?" + coeffX + "\\)\\*?" + param[0]));
			}
		
		} else { //func = sin | a*sin(c*x) + b*cos(c*x) --> param[0] -> a; param[1] -> b; coeffX -> c
			if (coeffXinNullstellen == '0'){
				if (func == 'sin'){
					//sin
					regex.push(RegExp(sign[0] + param[0] + "\\*?sin\\(" + coeffX + "\\*?([x|t])\\)"));
					regex.push(RegExp(sign[0] + param[0] + "\\*?sin\\(([x|t])\\*" + coeffX + "\\)"));
					regex.push(RegExp(sign[0] + "sin\\(" + coeffX + "\\*?([x|t])\\)\\*?" + param[0]));
					regex.push(RegExp(sign[0] + "sin\\(([x|t])\\*" + coeffX + "\\)\\*?" + param[0]));
				} else {
					//cos
					regex.push(RegExp(sign[0] + param[0] + "\\*?cos\\(" + coeffX + "\\*?([x|t])\\)"));
					regex.push(RegExp(sign[0] + param[0] + "\\*?cos\\(([x|t])\\*" + coeffX + "\\)"));
					regex.push(RegExp(sign[0] + "cos\\(" + coeffX + "\\*?([x|t])\\)\\*?" + param[0]));
					regex.push(RegExp(sign[0] + "cos\\(([x|t])\\*" + coeffX + "\\)\\*?" + param[0]));
				}
			} else { 
				if (func == 'sin'){
					//sin
					regex.push(RegExp(sign[0] + param[0] + "\\*?sin\\(" + coeffX + "\\*?([x|t])\\)\\*?\\1"));
					regex.push(RegExp(sign[0] + param[0] + "\\*?sin\\(([x|t])\\*" + coeffX + "\\)\\*?\\1"));
					regex.push(RegExp(sign[0] + "sin\\(" + coeffX + "\\*?([x|t])\\)\\*?" + param[0] + "\\*?\\1"));
					regex.push(RegExp(sign[0] + "sin\\(([x|t])\\*" + coeffX + "\\)\\*?" + param[0] + "\\*?\\1"));
				} else {
					//cos
					regex.push(RegExp(sign[0] + param[0] + "\\*?cos\\(" + coeffX + "\\*?([x|t])\\)\\*?\\1"));
					regex.push(RegExp(sign[0] + param[0] + "\\*?cos\\(([x|t])\\*" + coeffX + "\\)\\*?\\1"));
					regex.push(RegExp(sign[0] + "cos\\(" + coeffX + "\\*?([x|t])\\)\\*?" + param[0] + "\\*?\\1"));
					regex.push(RegExp(sign[0] + "cos\\(([x|t])\\*" + coeffX + "\\)\\*?" + param[0] + "\\*?\\1"));
				}			
			}
		}
		if (regex.length >= 5){
		}
		return regex;
	} 

	/**
	* generates regex array from solutionArray of left side using function regexGenLeft()
	*/
	Korrekturmodul.prototype.convertLeftSolution = function(solutionArray){ //solutionArray [[param, multroot],[param, multroot],...]
		var regexSolution = [];
		var buffer;
		for (i = 0; i < solutionArray.length; i++){
			buffer = this.regexGenLeft(solutionArray[i][0], solutionArray[i][1]);
			regexSolution.push(buffer);
		}
		return regexSolution;
	}

	/**
	* generates regex array form solutionArray of right side using function regexGenRight()
	*/
	Korrekturmodul.prototype.convertRightSolution = function(solutionArray){ //solutionArray [[param1, param2, param3, func],[param1, param2, param3, func],...] 
		var regexSolution = [];
		var buffer;
		for (n = 0; n < solutionArray.length; n++){
			if (solutionArray[n][0] == 'sin'){
				buffer = this.regexGenRight('cos' , solutionArray[n][1], solutionArray[n][2], solutionArray[n][4]);
				if (buffer != ''){
					regexSolution.push(buffer);
				}
			}
			buffer = this.regexGenRight(solutionArray[n][0], solutionArray[n][1], solutionArray[n][2], solutionArray[n][3]);
			regexSolution.push(buffer);
		}
		return regexSolution;
	}

	/**
	* converts input so that regex work correctly
	*/
	Korrekturmodul.prototype.convertInput = function(inputString){
		var input = inputString.replace(/\s*/g,'');
		if(!input.match(/^[\-|\+]/)){
			input = "+" + input;
		}
		return input;
	}

	/**
	* takes user input and checks if it's a correct solution by eliminating correct terms
	* if term from solution is not found or input string not empty after checking: user input incorrect
	*/
	Korrekturmodul.prototype.checkInput = function(inputString, solutionLeftArray, solutionRightArray){
		var input = this.convertInput(inputString);
		var solutionLeft = this.convertLeftSolution(solutionLeftArray);
		var solutionRight = this.convertRightSolution(solutionRightArray);
		var found = false;
		var errorPosition = [];
		var error = [];
		var solutionTotalArray = [];
		for (i = 0; i < solutionLeftArray.length; i++){
			solutionTotalArray.push(solutionLeftArray[i]);
		}
		for (i = 0; i < solutionRightArray.length; i++){
			solutionTotalArray.push(solutionRightArray[i]);
		}
		
		for (i = 0; i < solutionLeft.length; i++){ //check left solution
			for (j = 0; j < solutionLeft[i].length; j++){
				if (input.search(solutionLeft[i][j]) != -1){
					found = true;
					input = input.replace(solutionLeft[i][j],'');
				} 
			}
			//every solutionLeft[i] checks one part of solution; if found == false, part not found --> input incorrect
			if (found === false){
				errorPosition.push(['links', solutionLeftArray[i]]);
			} else {
				found = false;
			}
		}
		if (solutionRightArray != null){
			var solutionRight = this.convertRightSolution(solutionRightArray);
			for (i = 0; i < solutionRight.length; i++){ //check right solution
				for (j = 0; j < solutionRight[i].length; j++){
					if (input.search(solutionRight[i][j]) != -1){
						found = true;
						input = input.replace(solutionRight[i][j],'');
					}
				}
				if (found === false){
					errorPosition.push(['rechts', solutionRightArray[0]]);
				} else {
					found = false;
				}
			}
		}
		if (errorPosition.length > 0){
				error.push(this.feedbackObjekt.findError(input, errorPosition[0], solutionTotalArray));
				return error;
		} else if (input == ""){
			return true;
		} else {
			return this.feedbackObjekt.findError(input);
		}	
	}
	
/**
 * Feedbackmodul Objektprototyp:
 * Ordnet Fehler in der Eingabestring einer Kategorie zu. Dazu wird der Eingabestring nach Summanden aufgeteilt und iterativ auf das Fehlen oder nicht übereinstimmen von Bestandteilen getestet. 
 * Fehler wird nach dem fehlenden bzw. als falsch identifizierten Betandteil kategorisiert.
 */
var Feedbackmodul = function (){

	Feedbackmodul.prototype.findError = function(userInput, expectedInputPart, expectedInputTotal){
	//side referres to "linke" and "rechte Seite" of the lin. ODE
		var regex =[];
		var side;
		var expIn = [];
		var errorFound = true;
		var index;
		/*
		* errorFound --> Falls mehrere Fehler gemacht wurden, wird nach Fehlern in mehreren Arrayeinträgen
		* gesucht, daher der Ansatz: man geht davon aus, dass der nächste zu prüfende Fehler der richtige ist und
		* versucht es zu widerlegen. Gelingt es nicht, ist es der Fehler.
		*/
		if (userInput != ""){
			userIn = userInput.replace(/([\-|+])(?=[[[A-Za-su-wyz]{1}_?[0-9]?\\*?|[0-9]+\*?exp|[0-9]+\*?sin|[0-9]+\*?cos]])/g, "|$1"); // (?![[0-9]*\*?[I|i|J|j]?\*?x\*?[I|i|J|j]?|[0-9]+\)])/g,'|$1');
			userIn = userIn.split('|');
			if (userIn[0] == ''){
				userIn.splice(0,1);
			}
		} else {
			if (expectedInputPart[0] == 'links'){
				return "Eine oder mehrere Basislösungen fehlen.";
			} else {
				return "Partikuläre Lösung fehlt oder ist unvollständig.";
			}
		}
		//unbalanced Brackets
		for (i = 0; i < userIn.length; i++){
			open = userIn[i].match(/\(/g);
			close = userIn[i].match(/\)/g);
			if (open == null){
				open = [];
			}
			if (close == null){
				close = [];
			}
			if (open.length < close.length){
					return "Klammern im Ungleichgewicht, es fehlt eine öffnende Klammer bzw. eine schließende Klammer ist zuviel.";
			}
			if (open.length > close.length){
				return "Klammern im Ungleichgewicht, es fehlt eine schließende Klammer bzw. eine öffnende Klammer ist zuviel.";
			}
		}
		
		if (expectedInputPart == undefined){
			return "Die Eingabe enthält Teile, die nicht in der Lösung vorkommen: " + userIn;
		}
		

		
		side = expectedInputPart[0]
		for (i = 0; i < expectedInputPart[1].length; i++){
			expIn.push(expectedInputPart[1][i]);
		}
		//handle complex numbers
		if (side == 'links'){
			expIn[0] = expIn[0].replace(/\s/g, '');
			if (expIn[0].match(/\*I/)){
				var func;
				//split up the coefficients:
				real = expIn[0].replace(/([0-9]+)[\+|\-][0-9]+\*I/, '$1');
				imaginary = expIn[0].replace(/[0-9]+[\+|\-]([0-9]+)\*I/, '$1');
				expIn[0] = [real,imaginary];
			}
		}
		
		//check for function
		regex = [];
		if (side == 'links'){
				regex.push(new RegExp("exp\\(.*\\)"));
		} else {
			//rechte Seite
			if (expIn[0].match('exp')){
				regex.push(new RegExp("exp\\(.*\\)"));
			} else {
				regex.push(new RegExp("sin\\(.*\\)"));
				regex.push(new RegExp("cos\\(.*\\)"));
			}
		}
		//check for errors
		for (i = 0; i < userIn.length; i++){
		for (j = 0; j < regex.length; j++){
			if (userIn[i].search(regex[j]) != -1){
				// userIn[i] = userIn[i].replace(regex[j], '');
				errorFound = false;
			}
		}
		}
		if (errorFound == true){
			return "Es fehlt die Funktion: "+ userInput;
		} else {
			errorFound = true;
		}
		
		//check if complex root is handled correctly
		if (expIn[0]instanceof Array){
			regex = [];
			regex.push(new RegExp("sin\\(.*\\)"));
			regex.push(new RegExp("cos\\(.*\\)"));
			//check for errors
			for (i = 0; i < userIn.length; i++){
			for (j = 0; j < regex.length; j++){
				if (userIn[i].search(regex[j]) != -1){
					// userIn[i] = userIn[i].replace(regex[j], '');
					errorFound = false;
				}
			}
			}
			if (errorFound == true){
				return "Fehler bei der Berechnung oder der Darstellung der Nullstellen der charakteristischen Gleichung: "+ userInput;
			} else {
				errorFound = true;
			}
		}
		
		//Rechenfehler:
		if (side == 'links'){
			var regex = [];
			if (expIn[0] instanceof Array){//complex root
					regex.push(new RegExp(expIn[0][0] + "(?!\\*?exp)"));
					regex.push(new RegExp(expIn[0][1] + "(?!\\*?exp)"));
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(regex[0]) != -1 && userIn[i].search(regex[1]) != -1){
						userIn[i].replace(regex[0], '');
						userIn[i].replace(regex[1], '');
						errorFound = false;
					}
				}
			} else {//real root	
				regex.push(new RegExp(expIn[0] + "(?!\\*?exp)"));
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(regex[0]) != -1){
						userIn[i].replace(regex[0], '');
						errorFound = false;
					}
				}
			}
			if (errorFound == true){
				return "Rechenfehler bei Berechnung der Nullstellen der charakteristischen Gleichung: " + userInput;
			} else {
				errorFound = true;
			}
		//side = 'rechts':
		} else {
			if (expIn[0] == 'exp'){
				coeff = expIn[3].replace(/([\+|\-])/, '\\$1');
				coeffX = expIn[1].replace(/([\+|\-])/, '$1');
				for (i = 0; i < userIn.length; i++){
					//creates an array containing all coefficients
					coeffArray = userIn[i].match(/\-?[0-9]+/g);
					//checks if coeffArray contains required coefficient
					for (j = 0; j < coeffArray.length; j++){
						if (coeffArray[j] == coeffX){
							errorFound = false;
						}
					}
				}
				if (errorFound == true){
					return "Fehler im Ansatz zur Berechnung der partikulären Lösung: "+ userInput;
				} else {
					errorFound = true;
				}
				
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(new RegExp(coeff + "(?!\\*?x)")) != -1){
						errorFound = false;
					}
				}
				if (errorFound == true){
					return "Rechenfehler, bei der Berechnung der partikulären Lösung: "+ userInput;
				} else {
					errorFound = true;
				}
				
				//check if numbers are associated to right function
				coeffX = coeffX.replace(/\-/, '\\-');
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(new RegExp(coeffX + "(?=\\*?x)")) != -1 || userIn[i].search(new RegExp("(x\\*?)" + coeffX )) != -1){
						errorFound = false;
					}
				}
				if (errorFound == true){
					return "Fehler im Ansatz zur Berechnung der partikulären Lösung: "+ userInput;
				} else {
					errorFound = true;
				}
				
			} else if (expIn[0] == 'sin'){
				//sin cos... check if numbers in input
				coeffSin = expIn[3].replace(/([\+|\-])/, '\\$1');
				coeffCos = expIn[4].replace(/([\+|\-])/, '\\$1');
				coeffX = expIn[1].replace(/([\+|\-])/, '\\$1');
				
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(new RegExp (coeffX + "(?![sin|\\*sin|cos|\\*cos|\\+|\\-])")) != -1){
							errorFound = false;
					}
				}
				if (errorFound == true){
					return "Fehler im Ansatz zur Berechnung der partikulären Lösung: "+ userInput;
				} else {
					errorFound = true;
				}
				
				//check if numbers are associated to right function
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(new RegExp(coeffX + "(?=\\*?x)")) != -1 || userIn[i].search(new RegExp("(x\\*?)" + coeffX )) != -1){
						errorFound = false;
					}
				}
				if (errorFound == true){
					return "Fehler im Ansatz zur Berechnung der partikulären Lösung: "+ userInput;
				} else {
					errorFound = true;
				}
				
				
				
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(new RegExp(coeffSin + "(?!\\*?x)")) != -1 || userIn[i].search(new RegExp(coeffCos + "(?!\\*?x)")) != -1){
						errorFound = false;
					}
				}
				if (errorFound == true){
					return "Rechenfehler, bei der Berechnung der partikulären Lösung: "+ userInput;
				} else {
					errorFound = true;
				}
				//check if numbers are associated to right function
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(new RegExp(coeffSin + "(?=\\*?sin)")) != -1 || userIn[i].search(new RegExp(coeffCos + "(?=\\*?cos)")) != -1){
						errorFound = false;
					}
				}
				if (errorFound == true){
					return "Rechenfehler, bei der Berechnung der partikulären Lösung: "+ userInput;
				} else {
					errorFound = true;
				}
				
			} else {
				alert('Entschuldigung! Fehler in der Verarbeitung der rechten Seite: Funktion fehlt. Bitte neue Aufgabe laden.');
			}
		}
				
		//check if answer contains variable "x". Valid only for left side, for right side it would be "Ansatz falsch" above.
		if (side == 'links'){
			if (expIn[0] instanceof Array){
				for (i = 0; i < userIn.length; i++){
					if (userIn[i].search(/x(?!p).+x(?!p)/) != -1){
						errorFound = false;
					}
				}
				if (errorFound == true){
					return "In der Lösung fehlt die Variable: "+ userInput;
				} else {
					errorFound = true;
				}
			} else {
				if (expIn[1] != '0'){ //two 'x' have to be in input
					for (i = 0; i < userIn.length; i++){
						if (userIn[i].search(/x(?=\))|x(?=\*?[0-9])/) == -1){
							return "In der Lösung fehlt die Variable: "+ userInput;
						}
					}
				} else {
					for (i = 0; i < userIn.length; i++){ //one 'x' has to be in input
						if (userIn[i].search(/x(?!p)/) == -1){
							return "In der Lösung fehlt die Variable: "+ userInput;
						}
					}
				} 
			}
		}

		//check if answer contains "ax"
		if (side == 'links'){ //expectedInputPart: [a,b] --> a - coefficient; b --> expected x^b
			if (expIn[0] instanceof Array){
				var func;
				//split up the coefficients:
				real = expIn[0][0];
				imaginary = expIn[0][1];
				
				regex.push(new RegExp(real + "\\*?([x|t]).+" + imaginary + "\\*?\\1(?!\\*)"));
				regex.push(new RegExp(real + "\\*?([x|t]).+\\1\\*" + imaginary + "(?!\\*)"));
				regex.push(new RegExp(imaginary + "\\*?([x|t]).+" + real + "\\*?\\1(?!\\*)"));
				regex.push(new RegExp("([x|t])\\*" + imaginary + ".+" + real + "\\*?\\1(?!\\*)"));
				
				regex.push(new RegExp("([x|t])\*" + real + ".+" + imaginary + "\\*?\\1(?!\\*)"));
				regex.push(new RegExp("([x|t])\*" + real + ".+\\1\\*" + imaginary + "(?!\\*)"));
				regex.push(new RegExp(imaginary + "\\*?([x|t]).+\\1\*" + real + "(?!\\*)"));
				regex.push(new RegExp("([x|t])\\*" + imaginary + ".+\\1\*" + real + "(?!\\*)"));
			} else if (side == 'links'){
				regex.push(new RegExp(expIn[0] + "\\*?[x|t]"));
				regex.push(new RegExp("[x|t]\\*" + expIn[0]));
				//check for errors
				for (i = 0; i < userIn.length; i++){
				for (j = 0; j < regex.length; j++){
					if (userIn[i].search(regex[j]) != -1){
						userIn[i].replace(regex[j], '');
						errorFound = false;
					}
				}
				}
				if (errorFound == true){
					return "In der Lösung fehlt die Variable: " + userInput;
				} else {
					errorFound = true;
				}
			}
		}
		
		//check for coefficient left side
		if (side == 'links'){
			for (i = 0; i < userIn.length; i++){
				if (userIn[i].search(/\+[A-Za-su-wyz](?![A-Za-z])_?[0-9]?/) != -1){
					userIn[i] = userIn[i].replace(/[A-Za-su-wyz]{1}_?[0-9]?/, '');
					errorFound = false;
				}
			}
			if (errorFound == true){
				return "Linearkoeffizient einer Basislösung fehlt: "+ userInput;
			} else {
				errorFound = true;
			}
		}
		
		//check if multiple roots are handled correctly
		if (side == 'links'){
			//check if multiple roots handled correctly -> left side
			if (expIn[1].match('0') == null){//--> multiple root
				if (expIn[1].match('1') != null){//--> double root
					for (i = 0; i < userIn.length; i++){
						if (userIn[i].search(/\*?x(?=[*|+])/) != -1){
							userIn[i] = userIn[i].replace(/\*?x(?=[*|+])/, '');
							errorFound = false;
						}
					}				
				} else {//triple or more root
					regex = new RegExp("\\*?x\\^" + expIn[1] + "\\*?");
					for (i = 0; i < userIn.length; i++){
						if (userIn[i].search(regex) != -1){
							userIn[i] = userIn[i].replace(regex, '');
						}
					}
				}
				if (errorFound == true){
					return "Mehrfache Nullstellen nicht (richtig) behandelt: "+ userInput;
				} else {
					errorFound = true;
				}
			}
		} else {
			//check if multiple roots handled correctly -> right side
			if (expIn[2].match('0') == null){//--> multiple root
				if (expIn[2].match('1') != null){//--> double root
					for (i = 0; i < userIn.length; i++){
						if (userIn[i].search(/\*?x(?![A-Za-z)])\*?/) != -1){
							userIn[i] = userIn[i].replace(/\*?x(?![A-Za-z)])\*?/, '');
							errorFound = false;
						}
					}				
				} else {//triple or more root
					regex = new RegExp("\\*?x\\^" + expIn[1] + "\\*?");
					for (i = 0; i < userIn.length; i++){
						if (userIn[i].search(regex) != -1){
							userIn[i] = userIn[i].replace(regex, '');
						}
					}
				}
				if (errorFound == true){
					return "Mehrfache Nullstellen nicht (richtig) behandelt: "+ userInput;
				} else {
					errorFound = true;
				}
			}
		}
		console.log("UI: "+userIn);
		return "Der Fehler konnte nicht identifiziert werden. Evtl. sind mehrere Fehler in der Antwort: " + userInput;
	}
		
}

/**
* indicates that new excercise is being loaded
*/
function loading(){
	document.getElementById('Aufgabe').innerHTML = "Aufgabe:<br> Neue Aufgabe wird geladen...";
}

/**
* handles diplaying of feedback
*/
function getFeedback(feedback){
	document.getElementById('feedback').innerHTML = "Feedback: " + feedback;
}

/**
* loads new ode by reloading page
*/
function neueAufgabe(){
	location.reload();
}

/**
* fetches user input from website
*/
function getInput(elem){
	input = document.getElementById(elem).value;
	return input;
}

/**
* initiates check and returns wether input true or false
*/
function run(responseJSON, km){
	input = getInput('eingabe');
	leftSolution = responseJSON.loesungLinks;
	rightSolution = responseJSON.loesungRechts;
	if (input == ""){
		alert("Sie haben nichts eingegeben. Bitte geben Sie die Lösung ein, bevor Sie 'abschicken' drücken. Danke!");
	} else {
		checkInput = km.checkInput(input, leftSolution, rightSolution);
		getFeedback(checkInput);
	}
}

/**
* Aufgabengenerator Objektprototyp
* Hält die vom Aufgabengenerator-Server generierten response vor
*/
var Aufgabengenerator = function(){
	this.leftSolutionArray; //solution to left side of ode. format [['+','exp','4','0'],[...],[...]]
	this.rightSolutionArray; //solution to right side of ode. [funktion, coeffX, coeffXinNullstellen, restliche, Koeffizienten]
	this.response; //JSON Object { "aufgabe": "-String", "tip": "-String-", "anzahlNullstellen": "-integer-", 
				  //"loesungLinks": "-array of array of Strings *[["9","0"],[...],[...]...]* -", "loesungRechts": "-array of Strings *["sin","7",...]*-"}
	
	/**
	 * Setter for response 
	 */
	Aufgabengenerator.prototype.setResponse = function(response){
		this.response = response;
	}
	
	/**
	 * Getter for response 
	 */
	Aufgabengenerator.prototype.getResponse = function(){
		return this.response;
	}

	
	/**
	* Setter for solutionLeftArray
	*/
	Aufgabengenerator.prototype.setSolutionLeft = function(solutionLeft){
		this.solutionLeftArray = solutionLeft;
	}
	
	/**
	* Getter for solutionLeftArray
	*/
	Aufgabengenerator.prototype.getSolutionLeft = function(){
		return this.solutionLeftArray;
	}
	
	/**
	* Setter for solutionRightArray
	*/
	Aufgabengenerator.prototype.setSolutionRight = function(solutionRight){
		this.solutionRightArray = solutionRight;
	}
	
	/**
	* Getter for solutionRightArray
	*/
	Aufgabengenerator.prototype.getSolutionRight = function(){
		return this.solutionRightArray;
	}
}


/**
*handles displaying ode on website
*/
function pageLoad(){
	ag = new Aufgabengenerator();
		$("#Aufgabe").html("Aufgabe:<br>Neue Aufgabe wird geladen...");
		$.getJSON("http://localhost/cgi-bin/Aufgabengenerator.py?callback=?", function(){
			
		})
		.done(function(response){
			ag.setResponse(response);
			$("#Aufgabe").html("Aufgabe:<br>"+response.aufgabe);
			var tip = response.tip;
			if (tip.indexOf() != -1){
				if (tip.length == 1){
					$( "<div/>", {
						text: "Gegebene Nullstelle:" + tip,
					})
						.appendTo("#Aufgabe")
				} else {
					$("#Aufgabe").append("<span>Gegebene Nullstellen:" + tip[0] + ", " + tip[1] + "</span>" );					
				}
			}
		});
}
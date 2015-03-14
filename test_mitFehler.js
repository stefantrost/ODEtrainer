test("Test Korrekturmodul und Feedbackmodul, Fehler: Basislösung fehlt.", function() {
	
	function BasisloesungFehlt(input, solutionLeft, solutionRight, km, ag){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Eine oder mehrere Basislösungen fehlen.", "Überprüft, dass wenn Basislösung fehlt es erkannt wird.");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	solutionLeft = [['6','0'],['15','0']];
	solutionRight = [['exp', '6', '1', '-4']];
	input = "c2*exp(15x) -4exp(6x)*x";
	BasisloesungFehlt(input, solutionLeft, solutionRight, km, ag);
	
	solutionLeft = [['12','0'],['10','2'],['10','1'],['10','0']];
	solutionRight = [['exp', '10', '3', '+4']];
	input = "c1*exp(12x) + c3*exp(10x)*x + c4*exp(10x) + 4exp(10x)*x^3";
	BasisloesungFehlt(input, solutionLeft, solutionRight, km, ag);
	
	solutionLeft = [['11','1'],['11','0'],['4','1'],['4','0']];
	solutionRight = [['sin', '11', '2', '+14', '+2']];
	input = "c1*exp(11x)*x + c2*exp(11x) + c3*exp(4x)*x + 14sin(11x)*x + 2cos(11x)*x";
	BasisloesungFehlt(input, solutionLeft, solutionRight, km, ag);
	
});

test("Test Korrekturmodul und Feedbackmodul, Fehler: partikuläre Lösung fehlt.", function() {
	
	function PartikulaerlsgFehlt(input, solutionLeft, solutionRight, km, ag){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Partikuläre Lösung fehlt oder ist unvollständig.", "Partikuläre Lösung fehlt oder ist unvollständig.");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	solutionLeft = [['17*I','0'],['- 17*I','0'],['9','1'],['9','0']];
	solutionRight = [['sin', '17', '1', '-20', '-6']];
	input = "c1*sin(17x) + c2*cos(17x) + c3*exp(9x)*x + c4*exp(9x) - 20sin(17x)*x";
	PartikulaerlsgFehlt(input, solutionLeft, solutionRight, km, ag);
	
});

test("Test Korrekturmodul und Feedbackmodul, Fehler: öffnende Klammer fehlt, schließende Klammer zuviel.", function() {
	function OeffnendeKlammerFehlt(input, solutionLeft, solutionRight, km, ag){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Klammern im Ungleichgewicht, es fehlt eine öffnende Klammer bzw. eine schließende Klammer ist zuviel.", "Klammern im Ungleichgewicht, es fehlt eine öffnende Klammer bzw. eine schließende Klammer ist zuviel.");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	solutionLeft = [['8 + 18*I','0'],['8 - 18*I','0']];
	solutionRight = [['sin', '16', '0', '+14', '-13']];
	input = "c1*exp(8x)sin(18x) + c2*exp8x)cos(18x) +14sin(16x) - 13cos(16x)";
	OeffnendeKlammerFehlt(input, solutionLeft, solutionRight, km, ag);
	
	input = "c1*exp(8x)sin(18x) + c2*exp(8x)cos(18x) +14sin(16x) - 13cos(16x))";
	OeffnendeKlammerFehlt(input, solutionLeft, solutionRight, km, ag);
		

});

test("Test Korrekturmodul und Feedbackmodul, Fehler: öffnende Klammer zuviel, schließende Klammer fehlt.", function() {
	function SchliessendeKlammerFehlt(input, solutionLeft, solutionRight, km, ag){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Klammern im Ungleichgewicht, es fehlt eine schließende Klammer bzw. eine öffnende Klammer ist zuviel.", "Klammern im Ungleichgewicht, es fehlt eine schließende Klammer bzw. eine öffnende Klammer ist zuviel.");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	solutionLeft = [['11','0'],['12','0'],['4','0']];
	solutionRight = [['exp', '11', '1', '+10']];
	input = "c1*exp(11x) + c2*exp((12x) + c3*exp(4x) + 10exp(11x)*x";
	SchliessendeKlammerFehlt(input, solutionLeft, solutionRight, km, ag);
	
	input = "c1*exp(11x) + c2*exp((12x) + c3*exp(4x + 10exp(11x)*x";
	SchliessendeKlammerFehlt(input, solutionLeft, solutionRight, km, ag);
	
});

test("Test Korrekturmodul und Feedbackmodul, Fehler bei Berechnung der Nullstellen.", function() {
	function NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Rechenfehler bei Berechnung der Nullstellen der charakteristischen Gleichung: " + fehler, "Rechenfehler bei Berechnung der Nullstellen der charakteristischen Gleichung: ");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	/*
	* einfache Nullstellen
	*/
	solutionLeft = [['5','0'],['14','0'],['3','0']];
	solutionRight = [['sin', '.9', '0', '+11', '-5']];
	//eine Nullstelle falsch
	input = "c1*exp(6x) + c2*exp(14x) + c3*exp(3x) + 11sin(-9x) - 5cos(-9x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(6x)");
	//zwei Nullstellen falsch
	input = "c1*exp(6x) + c2*exp(4x) + c3*exp(3x) + 11sin(-9x) - 5cos(-9x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(6x)+c2*exp(4x)");
	
	/*
	* doppelte Nullstellen
	*/
	solutionLeft = [['3','1'],['3','0'],['17','1'],['17','0']];
	solutionRight = [['exp', '17', '2', '-15']];
	//eine einer doppelten Nullstelle
	input = "c1*exp(3x)*x + c2*exp(3x) + c3*exp(16x)*x + c4*exp(17x) - 15exp(17x)*x^2";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c3*exp(16x)*x");
	//beide einer doppelten Nullstelle
	input = "c1*exp(3x)*x + c2*exp(3x) + c3*exp(16x)*x + c4*exp(16x) - 15exp(17x)*x^2";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c3*exp(16x)*x+c4*exp(16x)");
	//beide beider doppelten Nullstelle
	input = "c1*exp(4x)*x + c2*exp(4x) + c3*exp(16x)*x + c4*exp(16x) - 15exp(17x)*x^2";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(4x)*x+c2*exp(4x)+c3*exp(16x)*x+c4*exp(16x)");
	
	/*
	* dreifache Nullstellen
	*/
	solutionLeft = [['9','0'],['6','2'],['6','1'],['6','0']];
	solutionRight = [['sin', '-14', '0', '-4', '+13']];
	//eine der dreifachen
	input = "c1*exp(9x) + c2*exp(6x)*x^2 + c3*exp(6x)*x + c4*exp(3x) - 4sin(-14x) + 13cos(-14x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c4*exp(3x)");
	//zwei der dreifachen
	input = "c1*exp(9x) + c2*exp(3x)*x^2 + c3*exp(3x)*x + c4*exp(6x) - 4sin(-14x) + 13cos(-14x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c2*exp(3x)*x^2+c3*exp(3x)*x");
	//drei der dreifachen
	input = "c1*exp(9x) + c2*exp(2x)*x^2 + c3*exp(2x)*x + c4*exp(2x) - 4sin(-14x) + 13cos(-14x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c2*exp(2x)*x^2+c3*exp(2x)*x+c4*exp(2x)");
	
	/*
	* vierfache Nullstellen
	*/
	solutionLeft = [['8','3'],['8','2'],['8','1'],['8','0']];
	solutionRight = [['exp', '-20', '0', '-15']];
	//eine Nullstelle
	input = "c1*exp(6x)*x^3 + c2*exp(8x)*x^2 + c3*exp(8x)*x + c4*exp(8x) - 15exp(-20x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(6x)*x^3");
	//zwei Nullstellen
	input = "c1*exp(3x)*x^3 + c2*exp(3x)*x^2 + c3*exp(8x)*x + c4*exp(8x) - 15exp(-20x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(3x)*x^3+c2*exp(3x)*x^2");
	//drei Nullstellen
	input = "c1*exp(8x)*x^3 + c2*exp(4x)*x^2 + c3*exp(4x)*x + c4*exp(4x) - 15exp(-20x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c2*exp(4x)*x^2+c3*exp(4x)*x+c4*exp(4x)");
	// vier Nullstellen
	input = "c1*exp(9x)*x^3 + c2*exp(9x)*x^2 + c3*exp(9x)*x + c4*exp(9x) - 15exp(-20x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(9x)*x^3+c2*exp(9x)*x^2+c3*exp(9x)*x+c4*exp(9x)");
	
	/*
	* komplexe Nullstelle
	*/
	solutionLeft = [['14 + 13*I','0'],['14 - 13*I','0'],['11','0']];
	solutionRight = [['sin', '-7', '0', '-4', '+17']];
	//Realteil falsch
	input = "c1*exp(4x)sin(13x) + c2*exp(4x)cos(13x) + c3*exp(11x) - 4sin(-7x) + 17cos(-7x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(4x)sin(13x)+c2*exp(4x)cos(13x)");
	//Imagin�rteil falsch
	input = "c1*exp(14x)sin(14x) + c2*exp(14x)cos(14x) + c3*exp(11x) - 4sin(-7x) + 17cos(-7x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(14x)sin(14x)+c2*exp(14x)cos(14x)");
	//beide falsch
	input = "c1*exp(13x)sin(14x) + c2*exp(13x)cos(14x) + c3*exp(11x) - 4sin(-7x) + 17cos(-7x)";
	NullstellenFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(13x)sin(14x)+c2*exp(13x)cos(14x)");
});

test("Test Korrekturmodul und Feedbackmodul, Fehler beim Ansatz zur Berechnung der partikulären Lösung.", function() {
	function AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Fehler im Ansatz zur Berechnung der partikulären Lösung: " + fehler, "Fehler im Ansatz zur Berechnung der partikulären Lösung");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	/*
	* Funktion der rechten Seite: exp
	* Zahl falsch
	*/
	//Koeffizient von x nicht in Nullstellen
	solutionLeft = [['7','1'],['7','0']];
	solutionRight = [['exp', '-2', '0', '-4']];
	input = "c1*exp(7x)*x + c2*exp(7x) -4exp(12x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "-4exp(12x)");
	
	//Koeffizient von x einmal in Nullstellen
	solutionLeft = [['11','0'],['12','0'],['4','0']];
	solutionRight = [['exp', '11', '1', '+10']];
	input = "c1*exp(11x) + c2*exp(12x) + c3*exp(4x) + 10exp(4x)*x";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+10exp(4x)*x");
	
	//Koeffizient von x zweimal in Nullstellen
	solutionLeft = [['12','1'],['12','0']];
	solutionRight = [['exp', '12', '2', '+7']];
	input = "c1*exp(12x)*x + c2*exp(12x) + 7exp(2x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+7exp(2x)");
	
	//Koeffizient von x dreimal in Nullstellen
	solutionLeft = [['8','2'],['8','1'],['8','0']];
	solutionRight = [['exp', '8', '3', '+15']];
	input = "c1*exp(8x)*x^2 + c2*exp(8x)*x + c3*exp(8x) + 15exp(2x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+15exp(2x)");
	
	//Koeffizient von x viermal in Nullstellen
	solutionLeft = [['9','3'],['9','2'],['9','1'],['9','0']];
	solutionRight = [['exp', '9', '4', '+15']];
	input = "c1*exp(9x)*x^3 + c2*exp(9x)*x^2 + c3*exp(9x)*x + c4*exp(9x) + 15exp(19x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+15exp(19x)");
	
	/*
	* Funktion der rechten Seite: sin/cos
	* Zahl falsch
	*/
	//Koeffizient von x nicht in Nullstellen
	solutionLeft = [['8','0'],['10','0'],['3','0'],['19','0']];
	solutionRight = [['sin', '-6', '0', '+16', '-6']];
	input = "c1*exp(8x) + c2*exp(10x) + c3*exp(3x) + c4*exp(19x) + 16sin(-4x) - 6cos(-4x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+16sin(-4x)-6cos(-4x)");
	
	//Koeffizient von x  in Nullstellen
	solutionLeft = [['11*I','0'],['-11*I','0'],['7','0']];
	solutionRight = [['sin', '11', '1', '+19', '+6']];
	input = "c1*sin(11x) + c2*cos(11x) + c3*exp(7x) + 19sin(10x) + 6cos(10x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+19sin(10x)+6cos(10x)");	
	
	/*
	* 'x' fehlt
	*/
	
	
	//Funktion: exp
	solutionLeft = [['7','1'],['7','0']];
	solutionRight = [['exp', '-2', '0', '-4']];
	input = "c1*exp(7x)*x + c2*exp(7x) -4exp(-2)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "-4exp(-2)");
	
	//Funktion: exp, Koeffizient von x in Nullstelle
	solutionLeft = [['5','0'],['13','0'],['16','0'],['20','0']];
	solutionRight = [['exp', '16', '1', '+11']];
	input = "c1*exp(5x) + c2*exp(13x) + c3*exp(16x) + c4*exp(20x) + 11exp(16)*x";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+11exp(16)*x");
	
	//Funktion: sin/cos
	solutionLeft = [['10','1'],['10','0'],['16','1'],['16','0']];
	solutionRight = [['sin', '-14', '0', '+9', '-17']];
	//fehlt bei sin
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9sin(-14) - 17cos(-14x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+9sin(-14)");
	
	//fehlt bei cos
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9sin(-14x) - 17cos(-14)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "-17cos(-14)");
	
	//fehlt bei beiden
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9sin(-14) - 17cos(-14)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+9sin(-14)-17cos(-14)");
	
	//Funktion: sin/cos, Koeffizient von x in Nullstelle
	solutionLeft = [['10','1'],['10','0'],['16','1'],['16','0']];
	solutionRight = [['sin', '16', '2', '+9', '-17']];
	//fehlt bei sin
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9sin(16)*x - 17cos(16x)*x";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+9sin(16)*x");
	
	//fehlt bei cos
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) +9sin(16x)*x - 17cos(16)*x";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "-17cos(16)*x");
	
	//fehlt bei beiden
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9sin(16)*x - 17cos(16)*x";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+9sin(16)*x-17cos(16)*x");
});

test("Test Korrekturmodul und Feedbackmodul, Fehler bei der Berechung der partikulären Lösung.", function() {
	function BerechnungPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Rechenfehler, bei der Berechnung der partikulären Lösung: " + fehler, "Rechenfehler, bei der Berechnung der partikulären Lösung");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	/*
	* Funktion der rechten Seite exp
	*/
	solutionLeft = [['5','0'],['4','1'],['4','0']];
	solutionRight = [['exp', '13', '0', '+4']];
	input = "c1*exp(5x) + c2*exp(4x)*x + c3*exp(4x) + 3exp(13x)";
	BerechnungPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+3exp(13x)");
	
	/*
	* Funktion der rechten Seite: sin/cos
	*/
	solutionLeft = [['11','2'],['11','1'],['11','0']];
	solutionRight = [['sin', '15', '0', '-15', '-11']];
	// ein Koeffizient falsch
	input = "c1*exp(11x)*x^2 + c2*exp(11x)*x + c3*exp(11x) - 15sin(15x) - 5cos(15x)";
	BerechnungPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "-5cos(15x)");
	// zwei Koeffizienten falsch
	input = "c1*exp(11x)*x^2 + c2*exp(11x)*x + c3*exp(11x) - 11sin(15x) - 15cos(15x)";
	BerechnungPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "-11sin(15x)-15cos(15x)");	
});

test("Test Korrekturmodul und Feedbackmodul, Fehler: Variable fehlt.", function() {
	function AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "In der Lösung fehlt die Variable: " + fehler, "In der Lösung fehlt die Variable.");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	/*
	* Linke Seite
	*/
	// einfache reelle Nullstelle
	solutionLeft = [['12','0'],['10','0'],['16','0'],['7','0']];
	solutionRight = [['sin', '16', '1', '-5', '+14']];
	input = "c1*exp(12x) + c2*exp(10) + c3*exp(16x) + c4*exp(7x) - 5sin(16x)*x + 14cos(16x)*x";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+c2*exp(10)");
	
	// mehrfache reelle Nullstelle
	solutionLeft = [['13','0'],['15','2'],['15','1'],['15','0']];
	solutionRight = [['exp', '-3', '0', '-12']];
	input = "c1*exp(13x) + c2*exp(15)*x^2 + c3*exp(15x)*x + c4*exp(15x) - 12exp(-3x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+c2*exp(15)*x^2");
	
	//komplexe Nullstelle:
	solutionLeft = [['4 + 16*I','0'],['4 - 16*I','0'],['20','0']];
	solutionRight = [['exp', '-4', '0', '+11']];
	//komplexe Nullstelle (Variable fehlt bei exp)
	input = "c1*exp(4x)sin(16x) + c2*exp(4)cos(16x) + c3*exp(20x) + 11exp(-4x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+c2*exp(4)cos(16x)");
	//komplexe Nullstelle (Variable fehlt bei sin)
	input = "c1*exp(4x)sin(16) + c2*exp(4x)cos(16x) + c3*exp(20x) + 11exp(-4x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+c1*exp(4x)sin(16)");
	
	//komplexe Nullstelle (Variable fehlt bei exp und cos)
	input = "c1*exp(4x)sin(16x) + c2*exp(4)cos(16) + c3*exp(20x) + 11exp(-4x)";
	AnsatzPartikLsgFalsch(input, solutionLeft, solutionRight, km, ag, "+c2*exp(4)cos(16)");
	
});

test("Test Korrekturmodul und Feedbackmodul, Fehler: Funktion fehlt.", function() {
	function FunktionFehlt(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Es fehlt die Funktion: " + fehler, "Es fehlt die Funktion.");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	/*
	* Linke Seite
	*/
	// einfache reelle Nullstelle
	solutionLeft = [['12','0'],['10','0'],['16','0'],['7','0']];
	solutionRight = [['sin', '16', '1', '-5', '+14']];
	input = "c1*exp(12x) + c2*(10x) + c3*exp(16x) + c4*exp(7x) - 5sin(16x)*x + 14cos(16x)*x";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+c2*(10x)");
	
	// mehrfache reelle Nullstelle
	solutionLeft = [['13','0'],['15','2'],['15','1'],['15','0']];
	solutionRight = [['exp', '-3', '0', '-12']];
	input = "c1*exp(13x) + c2(15x)*x^2 + c3*exp(15x)*x + c4*exp(15x) - 12exp(-3x)";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+c2(15x)*x^2");
	
	//komplexe Nullstelle:
	solutionLeft = [['4 + 16*I','0'],['4 - 16*I','0'],['20','0']];
	solutionRight = [['exp', '-4', '0', '+11']];
	//komplexe Nullstelle (Funktion exp fehlt)
	input = "c1*exp(4x)sin(16x) + c2(4x)cos(16x) + c3*exp(20x) + 11exp(-4x)";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+c2(4x)cos(16x)");
	
	/*
	* Rechte Seite
	*/
	//Funktion: exp
	solutionLeft = [['7','1'],['7','0']];
	solutionRight = [['exp', '-2', '0', '-4']];
	input = "c1*exp(7x)*x + c2*exp(7x) -4(-2x)";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "-4(-2x)");
	
	//Funktion: exp, Koeffizient von x in Nullstelle
	solutionLeft = [['5','0'],['13','0'],['16','0'],['20','0']];
	solutionRight = [['exp', '16', '1', '+11']];
	input = "c1*exp(5x) + c2*exp(13x) + c3*exp(16x) + c4*exp(20x) + 11(16x)*x";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+11(16x)*x");
	
	//Funktion: sin/cos
	solutionLeft = [['10','1'],['10','0'],['16','1'],['16','0']];
	solutionRight = [['sin', '-14', '0', '+9', '-17']];
	//fehlt bei sin
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9(-14x) - 17cos(-14x)";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+9(-14x)");
	
	//fehlt bei cos
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9sin(-14x) - 17(-14x)";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "-17(-14x)");
	
	//fehlt bei beiden
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9(-14x) - 17(-14x)";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+9(-14x)-17(-14x)");
	
	//Funktion: sin/cos, Koeffizient von x in Nullstelle
	solutionLeft = [['10','1'],['10','0'],['16','1'],['16','0']];
	solutionRight = [['sin', '16', '2', '+9', '-17']];
	//fehlt bei sin
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9(16x)*x - 17cos(16x)*x";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+9(16x)*x");
	
	//fehlt bei cos
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) +9sin(16x)*x - 17(16x)*x";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "-17(16x)*x");
	
	//fehlt bei beiden
	input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9(16x)*x - 17(16x)*x";
	FunktionFehlt(input, solutionLeft, solutionRight, km, ag, "+9(16x)*x-17(16x)*x");
});


test("Fehler bei der Berechnung oder der Darstellung der Nullstellen der charakteristischen Gleichung", function(){
	function komplexeNSnichtRichtigBehandelt(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Fehler bei der Berechnung oder der Darstellung der Nullstellen der charakteristischen Gleichung: " + fehler, "Fehler bei der Berechnung oder der Darstellung der Nullstellen der charakteristischen Gleichung. ");
	}
	
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	solutionLeft = [['4 + 16*I','0'],['4 - 16*I','0'],['20','0']];
	solutionRight = [['exp', '-4', '0', '+11']];
	
	//komplexe Nullstelle (Funktion sin fehlt)
	input = "c1*exp(4x)(16x) + c2*exp(4x)cos(16x) + c3*exp(20x) + 11exp(-4x)";
	komplexeNSnichtRichtigBehandelt(input, solutionLeft, solutionRight, km, ag, "+c1*exp(4x)(16x)");
	
	//komplexe Nullstelle (Funktion cos fehlt)
	input = "c1*exp(4x)sin(16x) + c2*exp(4x)(16x) + c3*exp(20x) + 11exp(-4x)";
	komplexeNSnichtRichtigBehandelt(input, solutionLeft, solutionRight, km, ag, "+c2*exp(4x)(16x)");
	
});


test("Test Korrekturmodul und Feedbackmodul, Fehler: Linearkoeffizient einer/mehrerer Basislösung(en) fehlt.", function() {
	function LinKoeffizientBLFehlt(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Linearkoeffizient einer Basislösung fehlt: " + fehler, "Linearkoeffizient einer Basislösung fehlt. ");
	}
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	solutionLeft = [['11*I','0'],['-11*I','0'],['7','0']];
	solutionRight = [['sin', '11', '1', '+19', '+6']];
	//ein Koeffizient fehlt
	input = "c1*sin(11x) + c2*cos(11x) + exp(7x) + 19sin(11x)*x + 6cos(11x)*x";
	LinKoeffizientBLFehlt(input, solutionLeft, solutionRight, km, ag, "+exp(7x)");
	//zwei Koeffizienten fehlen
	input = "sin(11x) + cos(11x) + c3*exp(7x) + 19sin(11x)*x + 6cos(11x)*x";
	LinKoeffizientBLFehlt(input, solutionLeft, solutionRight, km, ag, "+sin(11x)+cos(11x)");
	//alle Koeffizienten fehlen
	input = "sin(11x) + cos(11x) + exp(7x) + 19sin(11x)*x + 6cos(11x)*x";
	LinKoeffizientBLFehlt(input, solutionLeft, solutionRight, km, ag, "+sin(11x)+cos(11x)+exp(7x)");
});

test("Test Korrekturmodul und Feedbackmodul, Fehler: mehrfache Nullstellen nicht richtig behandelt.", function() {
	function MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, fehler){
		ag.setSolutionLeft();
		ag.setSolutionRight();
		check = km.checkInput(input, solutionLeft, solutionRight);
		equal(check, "Mehrfache Nullstellen nicht (richtig) behandelt: " + fehler, "Mehrfache Nullstellen nicht (richtig) behandelt.");
	}
	
	ag = new Aufgabengenerator();
	km = new Korrekturmodul(new Feedbackmodul);
	
	/*
	* Linke Seite
	*/
	// 2-fache reelle Nullstelle
	solutionLeft = [['10','0'],['17','1'],['17','0']];
	solutionRight = [['exp', '17', '2', '+18']];
	input = "c1*exp(10x) + c2*exp(17x) + c3*exp(17x) + 18exp(17x)*x^2";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+c3*exp(17x)");
	
	// 3-fache reelle Nullstelle (quadrat fehlt)
	solutionLeft = [['5','2'],['5','1'],['5','0']];
	solutionRight = [['exp', '7', '0', '-16']];
	input = "c1*exp(5x)*x + c2*exp(5x)*x + c3*exp(5x) - 16exp(7x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+c2*exp(5x)*x");
	
	// 3-fache reelle Nullstelle (gar nicht behandelt)
	input = "c1*exp(5x) + c2*exp(5x) + c3*exp(5x) - 16exp(7x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+c2*exp(5x)+c3*exp(5x)");
	
	// 4-fache reelleNullstelle (Exponenten fehlen)
	solutionLeft = [['8','3'],['8','2'],['8','1'],['8','0']];
	solutionRight = [['exp', '-20', '0', '-15']];
	input = "c1*exp(8x)*x + c2*exp(8x)*x + c3*exp(8x)*x + c4*exp(8x) - 15exp(-20x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+c2*exp(8x)*x+c3*exp(8x)*x");
	
	// 4-fache reelleNullstelle (gar nicht behandelt)
	input = "c1*exp(8x) + c2*exp(8x) + c3*exp(8x) + c4*exp(8x) - 15exp(-20x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+c2*exp(8x)+c3*exp(8x)+c4*exp(8x)");
	
	/*
	* Rechte Seite
	* Funktion: exp
	*/
	// Koeffizient von x in einfacher reeller Nullstelle
	solutionLeft = [['6','0'],['15','0']];
	solutionRight = [['exp', '6', '1', '-4']];
	input = "c1*exp(6x) + c2*exp(15x) -4exp(6x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "-4exp(6x)");
	
	// Koeffizient von x in zweifacher reeller Nullstelle
	solutionLeft = [['12','1'],['12','0']];
	solutionRight = [['exp', '12', '2', '+7']];
	//Exponent fehlt
	input = "c1*exp(12x)*x + c2*exp(12x) + 7exp(12x)*x";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+7exp(12x)*x");
	//nicht behandelt
	input = "c1*exp(12x)*x + c2*exp(12x) + 7exp(12x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+7exp(12x)");
	
	// Koeffizient von x in dreifacher reeller Nullstelle
	solutionLeft = [['12','0'],['10','2'],['10','1'],['10','0']];
	solutionRight = [['exp', '10', '3', '+4']];
	//Exponent fehlt
	input = "c1*exp(12x) + c2*exp(10x)*x^2 + c3*exp(10x)*x + c4*exp(10x) + 4exp(10x)*x";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+4exp(10x)*x");
	//falsche Exponent
	input = "c1*exp(12x) + c2*exp(10x)*x^2 + c3*exp(10x)*x + c4*exp(10x) + 4exp(10x)*x^2";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+4exp(10x)*x^2");
	//nicht behandelt
	input = "c1*exp(12x) + c2*exp(10x)*x^2 + c3*exp(10x)*x + c4*exp(10x) + 4exp(10x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+4exp(10x)");
	
	// Koeffizient von x in vierfacher reeller Nullstelle
	solutionLeft = [['9','3'],['9','2'],['9','1'],['9','0']];
	solutionRight = [['exp', '9', '4', '+15']];
	//Exponent fehlt
	input = "c1*exp(9x)*x^3 + c2*exp(9x)*x^2 + c3*exp(9x)*x + c4*exp(9x) + 15exp(9x)*x";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+15exp(9x)*x");
	
	//falsche Exponent
	input = "c1*exp(9x)*x^3 + c2*exp(9x)*x^2 + c3*exp(9x)*x + c4*exp(9x) + 15exp(9x)*x^2";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+15exp(9x)*x^2");
	
	//nicht behandelt
	input = "c1*exp(9x)*x^3 + c2*exp(9x)*x^2 + c3*exp(9x)*x + c4*exp(9x) + 15exp(9x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+15exp(9x)");
	
	/*
	* Rechte Seite
	* Funktion: sin/cos
	*/
	// Koeffizient von x in komplexer Nullstelle
	solutionLeft = [['5*I','0'],['- 5*I','0'],['20','0'],['12','0']];
	solutionRight = [['sin', '5', '1', '+13', '-11']];
	input = "c1*sin(5x) + c2*cos(5x) + c3*exp(20x) + c4*exp(12x) + 13sin(5x) - 11cos(5x)";
	MehrfacheNSnichtBehandelt(input, solutionLeft, solutionRight, km, ag, "+13sin(5x)-11cos(5x)");
	
	});
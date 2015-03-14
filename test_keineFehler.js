test("regex Korrekturmodul Lösung korrekt", function() {
		function testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag){
			ag.setSolutionLeft();
			ag.setSolutionRight();
			check = km.checkInput(input, solutionLeft, solutionRight);
			if (check == true){
				check = "true";
			}
			equal(check, "true", "Antwort ist korrekt");
		}
		
		ag = new Aufgabengenerator();
		km = new Korrekturmodul(new Feedbackmodul);
		
		/**
		* 1. 
		* Test 1.1: 
		* Linke Seite: n = 2, Nullstellen reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(12x) + c2*exp(5x) -9exp(-4x)";
		solutionLeft = [['12','0'],['5','0']];
		solutionRight = [['exp', '-4', '0', '-9']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 2. 
		* Test 1.2: 
		* Linke Seite: n = 2, Nullstellen reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(6x) + c2*exp(15x) -4exp(6x)*x";
		solutionLeft = [['6','0'],['15','0']];
		solutionRight = [['exp', '6', '1', '-4']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 3.
		* Test 2.1: 
		* Linke Seite: n = 2, Nullstellen reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(6x) + c2*exp(2x) -10sin(10x) + 15cos(10x)";
		solutionLeft = [['6','0'],['2','0']];
		solutionRight = [['sin', '10', '0', '-10', '+15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 4.
		* Test 2.2: 
		* Linke Seite: n = 2, Nullstellen reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(14x) + c2*exp(17x) -13sin(14x)*x - 17cos(14x)*x";
		solutionLeft = [['14','0'],['17','0']];
		solutionRight = [['sin', '14', '1', '-13', '-17']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 5.
		* Test 3.1: 
		* Linke Seite: n = 2, Nullstellen reell, doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(7x)*x + c2*exp(7x) -4exp(-2x)";
		solutionLeft = [['7','1'],['7','0']];
		solutionRight = [['exp', '-2', '0', '-4']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 6.
		* Test 3.2: 
		* Linke Seite: n = 2, Nullstellen reell, doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(12x)*x + c2*exp(12x) + 7exp(12x)*x^2";
		solutionLeft = [['12','1'],['12','0']];
		solutionRight = [['exp', '12', '2', '+7']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 7.
		* Test 4.1: 
		* Linke Seite: n = 2, Nullstellen reell, doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(8x)*x + c2*exp(8x) -14sin(x) - 4cos(x)";
		solutionLeft = [['8','1'],['8','0']];
		solutionRight = [['sin', '1', '0', '-14', '-4']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 8.
		* Test 4.2: 
		* Linke Seite: n = 2, Nullstellen reell, doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(9x)*x + c2*exp(9x) - 13sin(9x)*x - 15cos(9x)*x";
		solutionLeft = [['9','1'],['9','0']];
		solutionRight = [['sin', '9', '2', '-13', '-15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 9.
		* Test 5.1: 
		* Linke Seite: n = 2, Nullstellen komplex
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(17x)sin(4x) + c2*exp(17x)cos(4x) +3exp(13x)";
		solutionLeft = [['17 + 4*I','0'],['17 - 4*I','0']];
		solutionRight = [['exp', '13', '0', '+3']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 10.
		* Test 6.1: 
		* Linke Seite: n = 2, Nullstellen komplex
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(8x)sin(18x) + c2*exp(8x)cos(18x) +14sin(16x) - 13cos(16x)";
		solutionLeft = [['8 + 18*I','0'],['8 - 18*I','0']];
		solutionRight = [['sin', '16', '0', '+14', '-13']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 11.
		* Test 6.2: 
		* Linke Seite: n = 2, Nullstellen komplex
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja
		*/
		input = "c1*sin(13x) + c2*cos(13x) + 3sin(13x)*x - 18cos(13x)*x";
		solutionLeft = [['13*I','0'],['-13*I','0']];
		solutionRight = [['sin', '13', '1', '+3', '-18']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 12. 
		* Test 7.1: 
		* Linke Seite: n = 3, Nullstellen reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(18x) + c2*exp(5x) + c3*exp(13x)-6exp(17x)";
		solutionLeft = [['18','0'],['5','0'],['13','0']];
		solutionRight = [['exp', '17', '0', '-6']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 13. 
		* Test 7.2: 
		* Linke Seite: n = 3, Nullstellen reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(11x) + c2*exp(12x) + c3*exp(4x) + 10exp(11x)*x";
		solutionLeft = [['11','0'],['12','0'],['4','0']];
		solutionRight = [['exp', '11', '1', '+10']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 14.
		* Test 8.1: 
		* Linke Seite: n = 3, Nullstellen reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(5x) + c2*exp(14x) + c3*exp(3x) + 11sin(-9x) - 5cos(-9x)";
		solutionLeft = [['5','0'],['14','0'],['3','0']];
		solutionRight = [['sin', '.9', '0', '+11', '-5']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 15.
		* Test 8.2: 
		* Linke Seite: n = 3, Nullstellen reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(9x) + c2*exp(18x) + c3*exp(5x) +10sin(5x)*x + 15cos(5x)*x";
		solutionLeft = [['9','0'],['18','0'],['5','0']];
		solutionRight = [['sin', '5', '1', '+10', '+15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 16. 
		* Test 9.1: 
		* Linke Seite: n = 3, Nullstellen reell, einfach + doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(5x) + c2*exp(4x)*x + c3*exp(4x) + 4exp(13x)";
		solutionLeft = [['5','0'],['4','1'],['4','0']];
		solutionRight = [['exp', '13', '0', '+4']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 17. 
		* Test 9.2: 
		* Linke Seite: n = 3, Nullstellen reell, einfach + doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja (einfach)
		*/
		input = "c1*exp(13x) + c2*exp(15x)*x + c3*exp(15x) + 15exp(13x)*x";
		solutionLeft = [['13','0'],['15','1'],['15','0']];
		solutionRight = [['exp', '13', '1', '+15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 18. 
		* Test 9.3: 
		* Linke Seite: n = 3, Nullstellen reell, einfach + doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja (doppelt)
		*/
		input = "c1*exp(10x) + c2*exp(17x)*x + c3*exp(17x) + 18exp(17x)*x^2";
		solutionLeft = [['10','0'],['17','1'],['17','0']];
		solutionRight = [['exp', '17', '2', '+18']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 19.
		* Test 10.1: 
		* Linke Seite: n = 3, Nullstellen reell, einfach + doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(7x) + c2*exp(4x)*x + c3*exp(4x) - 13sin(6x) - 14cos(6x)";
		solutionLeft = [['7','0'],['4','1'],['4','0']];
		solutionRight = [['sin', '6', '0', '-13', '-14']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 20.
		* Test 10.2: 
		* Linke Seite: n = 3, Nullstellen reell, einfach + doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (einfach)
		*/
		input = "c1*exp(6x) + c2*exp(9x)*x + c3*exp(9x) - 6sin(6x)*x + 9cos(6x)*x";
		solutionLeft = [['6','0'],['9','1'],['9','0']];
		solutionRight = [['sin', '6', '1', '-6', '+9']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
						
		/**
		* 20.
		* Test 10.3: 
		* Linke Seite: n = 3, Nullstellen reell, einfach + doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (doppelt)
		*/
		input = "c1*exp(15x) + c2*exp(9x)*x + c3*exp(9x) +10sin(9x)*x + 18cos(9x)*x";
		solutionLeft = [['15','0'],['9','1'],['9','0']];
		solutionRight = [['sin', '9', '2', '+10', '+18']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 21. 
		* Test 11.1: 
		* Linke Seite: n = 3, Nullstellen reell, dreifach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(5x)*x^2 + c2*exp(5x)*x + c3*exp(5x) - 16exp(7x)";
		solutionLeft = [['5','2'],['5','1'],['5','0']];
		solutionRight = [['exp', '7', '0', '-16']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 22. 
		* Test 11.2: 
		* Linke Seite: n = 3, Nullstellen reell, dreifach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(8x)*x^2 + c2*exp(8x)*x + c3*exp(8x) + 15exp(8x)*x^3";
		solutionLeft = [['8','2'],['8','1'],['8','0']];
		solutionRight = [['exp', '8', '3', '+15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 23.
		* Test 12.1: 
		* Linke Seite: n = 3, Nullstellen reell, dreifach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(11x)*x^2 + c2*exp(11x)*x + c3*exp(11x) - 15sin(15x) - 11cos(15x)";
		solutionLeft = [['11','2'],['11','1'],['11','0']];
		solutionRight = [['sin', '15', '0', '-15', '-11']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 24.
		* Test 12.2: 
		* Linke Seite: n = 3, Nullstellen reell, dreifach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (einfach)
		*/
		input = "c1*exp(16x)*x^2 + c2*exp(16x)*x + c3*exp(16x) + 7sin(16x)*x + 13cos(16x)*x";
		solutionLeft = [['16','2'],['16','1'],['16','0']];
		solutionRight = [['sin', '16', '3', '+7', '+13']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 26. 
		* Test 13.1: 
		* Linke Seite: n = 3, Nullstellen komplex + einfach reell
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(4x)sin(16x) + c2*exp(4x)cos(16x) + c3*exp(20x) + 11exp(-4x)";
		solutionLeft = [['4 + 16*I','0'],['4 - 16*I','0'],['20','0']];
		solutionRight = [['exp', '-4', '0', '+11']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 27.
		* Test 14.1: 
		* Linke Seite: n = 3, Nullstellen komplex + einfach reell
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(14x)sin(13x) + c2*exp(14x)cos(13x) + c3*exp(11x) - 4sin(-7x) + 17cos(-7x)";
		solutionLeft = [['14 + 13*I','0'],['14 - 13*I','0'],['11','0']];
		solutionRight = [['sin', '-7', '0', '-4', '+17']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 28	.
		* Test 14.2: 
		* Linke Seite: n = 3, Nullstellen komplex + einfach reell
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja, komplex
		*/
		input = "c1*sin(11x) + c2*cos(11x) + c3*exp(7x) + 19sin(11x)*x + 6cos(11x)*x";
		solutionLeft = [['11*I','0'],['-11*I','0'],['7','0']];
		solutionRight = [['sin', '11', '1', '+19', '+6']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 29. 
		* Test 15.1: 
		* Linke Seite: n = 4, Nullstellen reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(7x) + c2*exp(17x) + c3*exp(5x) + c4*exp(3x)+ 4exp(20x)";
		solutionLeft = [['7','0'],['17','0'],['5','0'],['3','0']];
		solutionRight = [['exp', '20', '0', '+4']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 30. 
		* Test 15.2: 
		* Linke Seite: n = 4, Nullstellen reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(5x) + c2*exp(13x) + c3*exp(16x) + c4*exp(20x) + 11exp(16x)*x";
		solutionLeft = [['5','0'],['13','0'],['16','0'],['20','0']];
		solutionRight = [['exp', '16', '1', '+11']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 31.
		* Test 16.1: 
		* Linke Seite: n = 4, Nullstellen reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(8x) + c2*exp(10x) + c3*exp(3x) + c4*exp(19x) + 16sin(-6x) - 6cos(-6x)";
		solutionLeft = [['8','0'],['10','0'],['3','0'],['19','0']];
		solutionRight = [['sin', '-6', '0', '+16', '-6']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 32.
		* Test 16.2: 
		* Linke Seite: n = 4, Nullstellen reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (einfach)
		*/
		input = "c1*exp(12x) + c2*exp(10x) + c3*exp(16x) + c4*exp(7x) - 5sin(16x)*x + 14cos(16x)*x";
		solutionLeft = [['12','0'],['10','0'],['16','0'],['7','0']];
		solutionRight = [['sin', '16', '1', '-5', '+14']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
						
		/**
		* 33. 
		* Test 17.1: 
		* Linke Seite: n = 4, Nullstellen reell, 2 x einfach + doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(18x) + c2*exp(4x) + c3*exp(13x)*x + c4*exp(13x) + 7exp(-9x)";
		solutionLeft = [['18','0'],['4','0'],['13','0'],['13','1']];
		solutionRight = [['exp', '-9', '0', '+7']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 34. 
		* Test 17.2: 
		* Linke Seite: n = 4, Nullstellen reell, 2 x einfach + doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja (doppelt)
		*/
		input = "c1*exp(13x) + c2*exp(12x) + c3*exp(14x)*x + c4*exp(14x) + 19exp(14x)*x^2";
		solutionLeft = [['13','0'],['12','0'],['14','1'],['14','0']];
		solutionRight = [['exp', '14', '2', '+19']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 35.
		* Test 18.1: 
		* Linke Seite: n = 4, Nullstellen reell, 2 x einfach + doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(11x) + c2*exp(16x) + c3*exp(4x)*x + c4*exp(4x) + 7sin(-17x) + 14cos(-17x)";
		solutionLeft = [['11','0'],['16','0'],['4','1'],['4','0']];
		solutionRight = [['sin', '-17', '0', '+7', '+14']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 36.
		* Test 18.2: 
		* Linke Seite: n = 4, Nullstellen reell, 2 x einfach + doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (einfach)
		*/
		input = "c1*exp(15x) + c2*exp(17x) + c3*exp(3x)*x + c4*exp(3x) + 4sin(3x)*x + 12cos(3x)*x";
		solutionLeft = [['15','0'],['17','0'],['3','1'],['3','0']];
		solutionRight = [['sin', '3', '2', '+4', '+12']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
								
		/**
		* 37. 
		* Test 19.1: 
		* Linke Seite: n = 4, Nullstellen reell, einfach + dreifach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(13x) + c2*exp(15x)*x^2 + c3*exp(15x)*x + c4*exp(15x) - 12exp(-3x)";
		solutionLeft = [['13','0'],['15','2'],['15','1'],['15','0']];
		solutionRight = [['exp', '-3', '0', '-12']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 38. 
		* Test 19.2: 
		* Linke Seite: n = 4, Nullstellen reell, einfach + dreifach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja (dreifach)
		*/
		input = "c1*exp(12x) + c2*exp(10x)*x^2 + c3*exp(10x)*x + c4*exp(10x) + 4exp(10x)*x^3";
		solutionLeft = [['12','0'],['10','2'],['10','1'],['10','0']];
		solutionRight = [['exp', '10', '3', '+4']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 39.
		* Test 20.1: 
		* Linke Seite: n = 4, Nullstellen reell, einfach + dreifach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(9x) + c2*exp(6x)*x^2 + c3*exp(6x)*x + c4*exp(6x) - 4sin(-14x) + 13cos(-14x)";
		solutionLeft = [['9','0'],['6','2'],['6','1'],['6','0']];
		solutionRight = [['sin', '-14', '0', '-4', '+13']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 40.
		* Test 20.2: 
		* Linke Seite: n = 4, Nullstellen reell, einfach + dreifach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (einfach)
		*/
		input = "c1*exp(19x) + c2*exp(2x)*x^2 + c3*exp(2x)*x + c4*exp(2x) - 9sin(2x)*x + 3cos(2x)*x";
		solutionLeft = [['19','0'],['2','2'],['2','1'],['2','0']];
		solutionRight = [['sin', '2', '3', '-9', '+3']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
										
		/**
		* 41. 
		* Test 21.1: 
		* Linke Seite: n = 4, Nullstellen reell, vierfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(8x)*x^3 + c2*exp(8x)*x^2 + c3*exp(8x)*x + c4*exp(8x) - 15exp(-20x)";
		solutionLeft = [['8','3'],['8','2'],['8','1'],['8','0']];
		solutionRight = [['exp', '-20', '0', '-15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 42. 
		* Test 21.2: 
		* Linke Seite: n = 4, Nullstellen reell, vierfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja (dreifach)
		*/
		input = "c1*exp(9x)*x^3 + c2*exp(9x)*x^2 + c3*exp(9x)*x + c4*exp(9x) + 15exp(9x)*x^4";
		solutionLeft = [['9','3'],['9','2'],['9','1'],['9','0']];
		solutionRight = [['exp', '9', '4', '+15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 43.
		* Test 22.1: 
		* Linke Seite: n = 4, Nullstellen reell, vierfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(11x)*x^3 + c2*exp(11x)*x^2 + c3*exp(11x)*x + c4*exp(11x) - 10sin(-9x) + 6cos(-9x)";
		solutionLeft = [['11','3'],['11','2'],['11','1'],['11','0']];
		solutionRight = [['sin', '-9', '0', '-10', '+6']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 44.
		* Test 22.2: 
		* Linke Seite: n = 4, Nullstellen reell, vierfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (einfach)
		*/
		input = "c1*exp(16x)*x^3 + c2*exp(16x)*x^2 + c3*exp(16x)*x + c4*exp(16x) + 14sin(16x)*x - 12cos(16x)*x";
		solutionLeft = [['16','3'],['16','2'],['16','1'],['16','0']];
		solutionRight = [['sin', '16', '4', '+14', '-12']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
												
		/**
		* 45. 
		* Test 23.1: 
		* Linke Seite: n = 4, Nullstellen reell, 2x doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(16x)*x + c2*exp(16x) + c3*exp(20x)*x + c4*exp(20x) + 9exp(-12x)";
		solutionLeft = [['16','1'],['16','0'],['20','1'],['20','0']];
		solutionRight = [['exp', '-12', '0', '+9']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 46. 
		* Test 23.2: 
		* Linke Seite: n = 4, Nullstellen reell, 2x doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja 
		*/
		input = "c1*exp(3x)*x + c2*exp(3x) + c3*exp(17x)*x + c4*exp(17x) - 15exp(17x)*x^2";
		solutionLeft = [['3','1'],['3','0'],['17','1'],['17','0']];
		solutionRight = [['exp', '17', '2', '-15']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 47.
		* Test 24.1: 
		* Linke Seite: n = 4, Nullstellen reell, 2x doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(10x)*x + c2*exp(10x) + c3*exp(16x)*x + c4*exp(16x) + 9sin(-14x) - 17cos(-14x)";
		solutionLeft = [['10','1'],['10','0'],['16','1'],['16','0']];
		solutionRight = [['sin', '-14', '0', '+9', '-17']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 48.
		* Test 24.2: 
		* Linke Seite: n = 4, Nullstellen reell, 2x doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja 
		*/
		input = "c1*exp(11x)*x + c2*exp(11x) + c3*exp(4x)*x + c4*exp(4x) + 14sin(11x)*x + 2cos(11x)*x";
		solutionLeft = [['11','1'],['11','0'],['4','1'],['4','0']];
		solutionRight = [['sin', '11', '2', '+14', '+2']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);	
				
		/**
		* 49. 
		* Test 25.1: 
		* Linke Seite: n = 4, Nullstellen komplex +2 x reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(10x)sin(12x) + c2*exp(10x)cos(12x) + c3*exp(4x) + c4*exp(14x) - 7exp(13x)";
		solutionLeft = [['10 + 12*I','0'],['10 - 12*I','0'],['4','0'],['14','0']];
		solutionRight = [['exp', '13', '0', '-7']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 50. 
		* Test 25.2: 
		* Linke Seite: n = 4, Nullstellen komplex +2 x reell, einfach
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(17x)sin(10x) + c2*exp(17x)cos(10x) + c3*exp(2x) + c4*exp(11x) + 16exp(11x)*x";
		solutionLeft = [['17 + 10*I','0'],['17 - 10*I','0'],['2','0'],['11','0']];
		solutionRight = [['exp', '11', '1', '+16']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 51.
		* Test 26.1: 
		* Linke Seite: n = 4, Nullstellen komplex +2 x reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(8x)sin(6x) + c2*exp(8x)cos(6x) + c3*exp(17x) + c4*exp(9x) + 10sin(19x) + 13cos(19x)";
		solutionLeft = [['8 + 6*I','0'],['8 - 6*I','0'],['17','0'],['9','0']];
		solutionRight = [['sin', '19', '0', '+10', '+13']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 52.
		* Test 26.2: 
		* Linke Seite: n = 4, Nullstellen komplex +2 x reell, einfach
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (komplex)
		*/
		input = "c1*sin(5x) + c2*cos(5x) + c3*exp(20x) + c4*exp(12x) + 13sin(5x)*x - 11cos(5x)*x";
		solutionLeft = [['5*I','0'],['- 5*I','0'],['20','0'],['12','0']];
		solutionRight = [['sin', '5', '1', '+13', '-11']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
						
		/**
		* 53. 
		* Test 27.1: 
		* Linke Seite: n = 4, Nullstellen komplex + reell, doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(7x)sin(16x) + c2*exp(7x)cos(16x) + c3*exp(2x)*x + c4*exp(2x) + 13exp(-3x)";
		solutionLeft = [['7 + 16*I','0'],['7 - 16*I','0'],['2','1'],['2','0']];
		solutionRight = [['exp', '-3', '0', '+13']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
			
		/**
		* 54. 
		* Test 27.2: 
		* Linke Seite: n = 4, Nullstellen komplex + reell, doppelt
		* Rechte Seite: Funktion: exp, coeffX in Nullstellen: ja
		*/
		input = "c1*exp(15x)sin(12x) + c2*exp(15x)cos(12x) + c3*exp(4x)*x + c4*exp(4x) - 19exp(4x)*x^2";
		solutionLeft = [['15 + 12*I','0'],['15 - 12*I','0'],['4','1'],['4','0']];
		solutionRight = [['exp', '4', '2', '-19']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
		
		/**
		* 55.
		* Test 28.1: 
		* Linke Seite: n = 4, Nullstellen komplex + reell, doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: nein
		*/
		input = "c1*exp(14x)sin(12x) + c2*exp(14x)cos(12x) + c3*exp(7x)*x + c4*exp(7x) + 5sin(-8x) - 11cos(-8x)";
		solutionLeft = [['14 + 12*I','0'],['14 - 12*I','0'],['7','1'],['7','0']];
		solutionRight = [['sin', '-8', '0', '+5', '-11']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
				
		/**
		* 56.
		* Test 28.2: 
		* Linke Seite: n = 4, Nullstellen komplex +reell, doppelt
		* Rechte Seite: Funktion: sin, coeffX in Nullstellen: ja (komplex)
		*/
		input = "c1*sin(17x) + c2*cos(17x) + c3*exp(9x)*x + c4*exp(9x) - 20sin(17x)*x - 6cos(17x)*x";
		solutionLeft = [['17*I','0'],['- 17*I','0'],['9','1'],['9','0']];
		solutionRight = [['sin', '17', '1', '-20', '-6']];
		testKM_inputKorrekt(input, solutionLeft, solutionRight, km, ag);
							

	});
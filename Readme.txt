 ******************************************************************************
 *                                                                            *
 * �bungssystem: Lineare Differentialgleichungen mit konstanten Koeffizienten *
 *                                                                            *
 * von Stefan Trost                                                           *
 *                                                                            *
 ******************************************************************************


 Das �bungssystem besteht aus den folgenden Komponenten:

 - Aufgabengenerator.py  --> erzeugt die DGLen; l�uft auf Server; benutzt SymPy

 - AGTestClass.py        --> Testet Aufgabengenerator.py

 - aufgabengenerator.js  --> ist zust�ndig f�r die Darstellung der Antwort von 
 			     Aufgabengenerator.py im Browser

 - korrektur-feedback.js --> Korrekturmodul und Feedbackmodul: �berpr�ft 
			     Eingaben auf Korrektheit und erzeugt Feedback an 
			     Benutzer

 - test-keineFehler.js   --> Testet Korrekturmodul; Testf�lle beinhalten keinen 
			     Fehler

 - test-mitFehler.js     --> Testet Korrekturmodul und Feedbackmodul; 
			     Testf�lle beinhalten Fehler

 - uebungssystem.html    --> Benutzerschnittstelle des �bungssystems: stellt 
			     Aufgaben dar, erm�glicht Eingabe der Antworten 
			     und zeigt Feedback an.
 
 - test.html             --> Benutzerschnittstelle des Tests des �bungssystems

 - style.css             --> legt Aussehen von uebungssystem.html fest


 ==============================================================================

 Betrieb
 -------

 Zum Betrieb des �bungssystems wird ein Webserver ben�tigt, auf dem der 
 Aufgabengenerator laufen kann. Der Server muss einen Python Interpreter
 installiert haben und SymPy (ab Version 0.7.4.1).

 Die Aufgabengenerator.py Datei wird in den Ordner cgi-bin gelegt.

 Die erste Zeile in der Aufgabengenerator.py Datei muss nach dem Shebang (#!) 
 den Pfad zum Python Interpreter angeben. Wahrscheinlich muss der Pfad in der 
 Datei angepasst werden.
 
 In der Datei aufgabengenerator.js muss der URL zur
 Aufgabengenerator.py Datei auf dem Webserver in der Funktion *pageLoad()* in
 der Zeile die mit *$.getJSON* anf�ngt angepasst werden. Der URL muss aber 
 immer von *?callback=?* gefolgt sein.

 Die HTML, CSS und JS Dateien werden in den Ordner f�r Webdateien gelegt (z.B. 
 htdocs).

 Nun ist das �bungssystem einsatzbereit und kann �ber die uebungssystem.html
 Datei ge�ffnet werden. �ber test.html kann die Testauswertung aufgerufen 
 werden.


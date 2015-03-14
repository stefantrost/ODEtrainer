****************************************************************
*                                                              *
* Trainer for linear ODEs with constant coefficients* German   *
*                                                              *
* Part of my masters thesis at FernUniversitaet Hagen, Germany *
*                                                              *
* Translation in coming soon                                   *
****************************************************************


 ******************************************************************************
 *                                                                            *
 * Übungssystem: Lineare Differentialgleichungen mit konstanten Koeffizienten *
 *                                                                            *
 * Teil meiner Masterthesis an der FernUniversität in Hagen                   *
 *                                                                            *
 ******************************************************************************


 Das Übungssystem besteht aus den folgenden Komponenten:

 - Aufgabengenerator.py  --> erzeugt die DGLen; läuft auf Server; benutzt SymPy

 - AGTestClass.py        --> Testet Aufgabengenerator.py

 - aufgabengenerator.js  --> ist zuständig für die Darstellung der Antwort von 
 			     Aufgabengenerator.py im Browser

 - korrektur-feedback.js --> Korrekturmodul und Feedbackmodul: überprüft 
			     Eingaben auf Korrektheit und erzeugt Feedback an 
			     Benutzer

 - test-keineFehler.js   --> Testet Korrekturmodul; Testfälle beinhalten keinen 
			     Fehler

 - test-mitFehler.js     --> Testet Korrekturmodul und Feedbackmodul; 
			     Testfälle beinhalten Fehler

 - uebungssystem.html    --> Benutzerschnittstelle des Übungssystems: stellt 
			     Aufgaben dar, ermöglicht Eingabe der Antworten 
			     und zeigt Feedback an.
 
 - test.html             --> Benutzerschnittstelle des Tests des Übungssystems

 - style.css             --> legt Aussehen von uebungssystem.html fest


 ==============================================================================

 Betrieb
 -------

 Zum Betrieb des Übungssystems wird ein Webserver benötigt, auf dem der 
 Aufgabengenerator laufen kann. Der Server muss einen Python Interpreter
 installiert haben und SymPy (ab Version 0.7.4.1).

 Die Aufgabengenerator.py Datei wird in den Ordner cgi-bin gelegt.

 Die erste Zeile in der Aufgabengenerator.py Datei muss nach dem Shebang (#!) 
 den Pfad zum Python Interpreter angeben. Wahrscheinlich muss der Pfad in der 
 Datei angepasst werden.
 
 In der Datei aufgabengenerator.js muss der URL zur
 Aufgabengenerator.py Datei auf dem Webserver in der Funktion *pageLoad()* in
 der Zeile die mit *$.getJSON* anfängt angepasst werden. Der URL muss aber 
 immer von *?callback=?* gefolgt sein.

 Die HTML, CSS und JS Dateien werden in den Ordner für Webdateien gelegt (z.B. 
 htdocs).

 Nun ist das Übungssystem einsatzbereit und kann über die uebungssystem.html
 Datei geöffnet werden. Über test.html kann die Testauswertung aufgerufen 
 werden.


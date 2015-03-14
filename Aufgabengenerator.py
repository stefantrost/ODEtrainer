#!C:/Python27/python.exe

from sympy import I, simplify, Symbol, exp, sin, cos, expand, diff
from random import randrange, sample
import re
import cgi

'''
AUFGABENGENERATOR:
Programm, dass in CGI eines Webservers laeuft; erzeugt lineare Differentialgelichungen mit konstanten Koeffizienten der
Ordnung {2,3,4}, inkl. Loesung, etc.
Gibt erzeugte Aufgabe, Loesung, etc. in JSON Objekt in JavaScript-Funktionsaufruf zurueck (JSONP-conform), zum Aufruf aus
JavaScript-Client auch ueber Domain-Grenzen (Umgehung der Same-Origin-Policy).
'''

print "Content-Type: text/javascript"
print

'''
class Aufgabengenerator:
Koordiniert Erstellung der Aufgabe und bietet Aufgabe, Loesung, etc. ueber Methoden an.
'''
class Aufgabengenerator:

    def __init__(self):
        '''Konstruktor: Erstellt LinkeSeite- und RechteSeite-Objekte'''
        self.linke_seite = LinkeSeite()
        self.rechte_seite = RechteSeite(self.linke_seite.get_koeffizienten(), self.linke_seite.get_ordnung(), self.linke_seite.get_nullstellen())

    def get_aufgabe(self):
        '''Methode: Gibt die erstelle linke und rechte Seite der Aufgabe menschenlesbar aus.'''
        return self.linke_seite.get_linke_seite() + ' = ' + str(self.rechte_seite.get_rechte_seite())

    def get_loesung(self):
        '''Methode: Holt sich die Musterloesung der linken und rechten Seite, bringt sie in menschenlesbares Format. NUR FUER DIE PROGRAMMIERUNG!!!'''
        nullstellen = self.linke_seite.get_nullstellen()
        # nullstellen.sort()
        anzahl_nullstellen = self.linke_seite.get_anzahl_nullstellen()

        #checkt Vielfachheit der Nullstellen und
        if anzahl_nullstellen[0] ==  4:
            linke_seite_loesung = "c1 exp(" + str(nullstellen[0]) + "x) * x^3"

        elif anzahl_nullstellen[0] ==  3 and nullstellen[0] == nullstellen[1]:
            linke_seite_loesung = "c1 exp(" + str(nullstellen[0]) + "x) * x^2"

        elif anzahl_nullstellen[0] ==  2 and nullstellen[0] == nullstellen[1]:
            linke_seite_loesung = "c1 exp(" + str(nullstellen[0]) + "x) * x"

        else:
            linke_seite_loesung = "c1 exp(" + str(nullstellen[0]) + "x)"

        for i in range(1,len(nullstellen)):
            if anzahl_nullstellen[i] == 4 and i < 2:
                linke_seite_loesung += " + c" + str(i+1) + " exp(" + str(nullstellen[i]) + "x) * x^" + str(3-i)

            elif (anzahl_nullstellen[i] == 3 and nullstellen[i] == nullstellen[i-1] and nullstellen[i] != nullstellen[i-2]) or (anzahl_nullstellen[i] == 4 and i != 3):
                linke_seite_loesung += " + c" + str(i+1) + " exp(" + str(nullstellen[i]) + "x) * x" #wenn anzahl nullstellen == 3 und len(nullstellen) == 3 funktioniert nicht!!!!

            elif (anzahl_nullstellen[i] == 2 and nullstellen[i] != nullstellen[i-1]) or ():
                linke_seite_loesung += " + c" + str(i+1) + " exp(" + str(nullstellen[i]) + "x) * x"

            else:
                linke_seite_loesung += " + c" + str(i+1) + " exp(" + str(nullstellen[i]) + "x)"

        return "y = " + linke_seite_loesung + " " + str(self.rechte_seite.get_loesung())

    def get_tip(self):
        '''Methode: Gibt zum Loesen der Aufgabe erforderliche Anzahl an Nullstellen aus. Wenn Ordnung n == 4 dann 2 Nullstellen, wenn Ordnung n == 3 dann 1 Nullstelle'''
        if self.linke_seite.get_ordnung() == 4:
            return str(sample(self.linke_seite.get_nullstellen(),2))
        elif self.linke_seite.get_ordnung() == 3:
            return str(sample(self.linke_seite.get_nullstellen(),1))
        else:
            return "[]"

    def get_loesung_links(self):
        '''Methode: Gibt die Loesung der linken Seite (der homogenisierten DGL) zurueck'''
        nullstellen = self.linke_seite.get_nullstellen()
        # nullstellen.sort()
        anzahl_nullstellen = self.linke_seite.get_anzahl_nullstellen()

        #checkt Vielfachheit der Nullstellen und
        if anzahl_nullstellen[0] ==  4:
            linke_seite_loesung = "[[\'" + str(nullstellen[0]) + "\',\'3\']"

        elif anzahl_nullstellen[0] ==  3 and nullstellen[0] == nullstellen[1]:
            linke_seite_loesung = "[[\'" + str(nullstellen[0]) + "\',\'2\']"

        elif anzahl_nullstellen[0] ==  2 and nullstellen[0] == nullstellen[1]:
            linke_seite_loesung = "[[\'" + str(nullstellen[0]) + "\',\'1\']"

        else:
            linke_seite_loesung = "[[\'" + str(nullstellen[0]) + "\',\'0\']"

        for i in range(1,len(nullstellen)):
            if anzahl_nullstellen[i] == 4 and i < 2:
                linke_seite_loesung += ",[\'" + str(nullstellen[i]) + "\',\'" + str(3-i) + "\']"

            elif (anzahl_nullstellen[i] == 3 and nullstellen[i] == nullstellen[i-1] and nullstellen[i] != nullstellen[i-2]) or (anzahl_nullstellen[i] == 4 and i != 3):
                linke_seite_loesung += ",[\'" + str(nullstellen[i]) + "\',\'1\']" #wenn anzahl nullstellen == 3 und len(nullstellen) == 3 funktioniert nicht!!!!

            elif (anzahl_nullstellen[i] == 2 and nullstellen[i] != nullstellen[i-1]) or ():
                linke_seite_loesung += ",[\'" + str(nullstellen[i]) + "\',\'1\']"

            else:
                linke_seite_loesung += ",[\'" + str(nullstellen[i]) + "\',\'0\']"
                
        linke_seite_loesung += "]"
        return linke_seite_loesung# + " ;" + str(self.rechte_seite.get_loesung())

    def get_loesung_rechts(self):
        '''Methode: Gibt die Loesung der rechten Seite (partikulaere Loesung) zurueck'''
        funktion = self.rechte_seite.get_funktion()
        loesung_string = str(self.rechte_seite.get_loesung()).replace(' ','')
        #print loesung_string
        # Loesungswerte werden hier eingefuegt [funktion, coeffX, coeffXinNullstelle, restliche, Koeffizienten,...]:
        loesung_array = [funktion] # Loesungswerte werden hier eingefuegt
        #finde coeffX:
        find_x = re.compile('\-?[0-9]+(?=x\))')
        found_x = find_x.search(loesung_string)
        if (found_x == None):
            find_x = re.compile('\-(?=x\))')
            if find_x.search(loesung_string) == None:
                    loesung_array.append('1')
            else:
                    loesung_array.append('-1')
        else:
            loesung_array.append(found_x.group())
            
        #coeffXinNullstelle:
        coeff_x_in_nullstellen = self.rechte_seite.get_koeff_c_in_nullstellen()
        loesung_array.append(coeff_x_in_nullstellen)
        
        #finde restliche Koeffizienten:
        found = []
        if funktion == 'exp':
            if coeff_x_in_nullstellen == 4:
                finder = re.compile('[\-|\+]?[0-9]+(?=x4' + funktion + ')')
                found = finder.findall(loesung_string)
                if found == []:
                    finder = re.compile('[\-|\+](?=x4' + funktion + ')')
                    found = finder.findall(loesung_string)
                    #print found
                    if found[0] == '+':
                        found[0] = '+1'
                    elif found[0] == '-':
                        found[0] = '-1'
                
                loesung_array.append(found[0])
                    
            if coeff_x_in_nullstellen == 3:
                finder = re.compile('[\-|\+]?[0-9]+(?=x3' + funktion + ')')
                found = finder.findall(loesung_string)
                if found == []:
                    finder = re.compile('[\-|\+](?=x3' + funktion + ')')
                    found = finder.findall(loesung_string)
                    #print found
                    if found[0] == '+':
                        found[0] = '+1'
                    elif found[0] == '-':
                        found[0] = '-1'
                
                loesung_array.append(found[0])
                
            if coeff_x_in_nullstellen == 2:
                finder = re.compile('[\-|\+]?[0-9]+(?=x2' + funktion + ')')
                found = finder.findall(loesung_string)
                if found == []:
                    finder = re.compile('[\-|\+](?=x2' + funktion + ')')
                    found = finder.findall(loesung_string)
                    #print found
                    #print loesung_string
                    if found[0] == '+':
                        found[0] = '+1'
                    elif found[0] == '-':
                        found[0] = '-1'
                
                loesung_array.append(found[0])
                
            if coeff_x_in_nullstellen == 1:
                finder = re.compile('[\-|\+]?[0-9]+(?=x' + funktion + ')')
                found = finder.findall(loesung_string)
                if found == []:
                    finder = re.compile('[\-|\+](?=x' + funktion + ')')
                    found = finder.findall(loesung_string)
                    if found[0] == '+':
                        found[0] = '+1'
                    elif found[0] == '-':
                        found[0] = '-1'
                
                loesung_array.append(found[0])
                
            
            if coeff_x_in_nullstellen == 0:
                finder = re.compile('[\-|\+]?[0-9]+(?=' + funktion + ')')
                found = finder.findall(loesung_string)
                if found == []:    
                    finder = re.compile('[\-|\+](?=' + funktion + ')')
                    found = finder.findall(loesung_string)
                    #print found
                    #print loesung_string
                    if found[0] == '+':
                        found[0] = '+1'
                    elif found[0] == '-':
                        found[0] = '-1'
                
                loesung_array.append(found[0])
            
        elif funktion == 'sin':
            finder = re.compile('[\-|\+]?[0-9]+(?=' + funktion + ')')
            found = finder.findall(loesung_string)
            if found == []:    
                finder = re.compile('[\-|\+](?=' + funktion + ')')
                found = finder.findall(loesung_string)
                if found[0] == '+':
                    found[0] = '+1'
                elif found[0] == '-':
                    found[0] = '-1'
                    
            loesung_array.append(found[0])
            
            finder = re.compile('[\-|\+]?[0-9]+(?=cos)')
            found = finder.findall(loesung_string)
            if found == []:    
                finder = re.compile('[\-|\+](?=cos)')
                found = finder.findall(loesung_string)
                if found[0] == '+':
                    found[0] = '+1'
                elif found[0] == '-':
                    found[0] = '-1'
                    
            loesung_array.append(found[0])

        return_string = "[[\'" + str(loesung_array[0]) + "\'"
        for i in range(1,len(loesung_array)):
            return_string += ",\'" + str(loesung_array[i]) + "\'"
        return_string += "]]"
        return return_string

    def get_anzahl_nullstellen(self):
        '''Methode: Gibt die Anzahl der Nullstellen der char. Gleichung zurueck'''
        return str(len(self.linke_seite.get_nullstellen()))


class LinkeSeite:
    '''
    class LinkeSeite:
    erstellt die homogenisierte DGL.
    '''

    MAX_NULLSTELLE = 20

    def __init__(self):
        '''Konstruktor: Zur Erstellung der homogenisierten DGL wird die Loesung der DGL erstellt und daraus die DGL berechnet.
        Dazu wird zuerst die Ordnung bestimmt, dann entsprechend viele Nullstellen.
        Nullstellen koennen einfach oder mehrfach reell oder kunjugiert komplex sein. Nullstellen werden in 
        Linearfaktorzerlegung der charakteristischen Gleichung eingesetzt und damit die Koeffizienten der
        homogenisierten DGL berechnet.'''
        self.ordnung = randrange(2,5) #Ordnung der DGL bestimmen
        self.nullstellen = [] #Nullstellen der charakteristischen Gleichung bestimmen
        i = 0
        last_nullstelle = 'none'
        while i < self.ordnung:
            random_choice = randrange(4)
            if  random_choice == 0 and last_nullstelle == 'real': #WENN randrange(1), dann Testmodus ohne mehrfache Nullstellen
                self.nullstellen.append(self.nullstellen[-1])
            elif random_choice == 1 and self.ordnung - i >= 2:
                re = randrange(0, self.MAX_NULLSTELLE)
                im = randrange(0, self.MAX_NULLSTELLE)
                self.nullstellen.append(re + I*im)
                self.nullstellen.append(re - I*im)
                last_nullstelle = 'complex'
                i += 1
            else:
                self.nullstellen.append(randrange(0, self.MAX_NULLSTELLE))
                last_nullstelle = 'real'
            i += 1

        self.anz_nullstellen = [] #Vielfachheit der Nullstellen
        for i in range(len(self.nullstellen)):
            self.anz_nullstellen.append(self.nullstellen.count(self.nullstellen[i]))
        
        self.koeffizienten = self.set_koeffizienten()

    def set_koeffizienten(self):
        '''Methode: Berechnet Koeffizienten aus Linearfaktorzerlegung der char. Gleichung.'''
        #Nullstellen umwandeln (*(-1))
        nullstellen = []
        for i in range(len(self.nullstellen)):
            nullstellen.append(self.nullstellen[i]*(-1))

        #Koeffizienten berechnen:
        summe = 0
        koeffizienten = []
        #Koeffizienten der 2. hoechsten Ableitung
        for i in range(self.ordnung):
            summe += nullstellen[i]

        koeffizienten.append(summe)
        summe = 0

        # falls existiert
        if self.ordnung == 3:
            summe = nullstellen[0] * nullstellen[1] + nullstellen[0] * nullstellen[2] + nullstellen[1] * nullstellen[2]
            summe = simplify(summe)
            koeffizienten.append(summe)
            summe = 0

        # falls existiert
        if self.ordnung == 4:
            summe = nullstellen[0] * nullstellen[1] + nullstellen[0] * nullstellen[2] + nullstellen[0] * nullstellen[3] + nullstellen[1] * nullstellen[2] + nullstellen[1] * nullstellen[3] + nullstellen[2] * nullstellen[3]
            summe = simplify(summe)
            koeffizienten.append(summe)
            summe = 0

            summe += nullstellen[0]*nullstellen[1]*nullstellen[2] + nullstellen[0]*nullstellen[1]*nullstellen[3] + nullstellen[0]*nullstellen[2]*nullstellen[3] + nullstellen[1]*nullstellen[2]*nullstellen[3]
            summe = simplify(summe)

            koeffizienten.append(summe)

        #Koeffizienten der Funktion
        summe = nullstellen[0]
        for i in range(self.ordnung-1):
            summe *= nullstellen[i+1]
            summe = simplify(summe)

        koeffizienten.append(summe)

        return koeffizienten

    def get_koeffizienten(self):
        '''Methode: Gibt Koeffizienten zurueck'''
        return self.koeffizienten

    def get_nullstellen(self):
        '''Methode: Gibt Nullstellen zurueck'''
        return self.nullstellen

    def get_ordnung(self):
        '''Methode: Gibt Ordnung zurueck'''
        return self.ordnung

    def get_anzahl_nullstellen(self):
        '''Methode: Gibt Anzahl der Nullstellen zurueck'''
        return self.anz_nullstellen

    def get_linke_seite(self):
        '''Methode: Gibt homogenisierte DGL zurueck'''
        num_koeff = len(self.koeffizienten)
        ls_string = 'y(' + str(num_koeff) + ')'

        for i in range(num_koeff):
            if i == num_koeff-1:
                y = 'y'
            else:
                y = 'y(' + str(num_koeff - (i + 1)) + ')'
            if self.koeffizienten[i] > 0:
                ls_string += ' + ' + str(self.koeffizienten[i]) + y
            elif self.koeffizienten[i] < 0:
                ls_string += ' - ' + str((-1)*self.koeffizienten[i]) + y

        return ls_string


class RechteSeite:
    '''
    class: RechteSeite:
    Erzeugt die rechte Seite der DGL.
    '''

    def __init__(self, koeffizienten, ordnung, nullstellen):
        '''Konstruktor: Zur Erstellung der rechten Seite wird die Loesung der rechten Seite 
        bestimmt und daraus die rechte Seite berechnet. Dazu wird zuerst eine Funktion 
        (exp oder sin/cos) gewaehlt, dann werden die entsprechenden Koeffizienten der
        Loesung bestimmt. Die erzeugte Loesung wird n-Mal abgeleitet und in die linke Seite
        der Ordnung n eingesetzt und nach der rechten Seite aufgeloest.'''
        # maximaler Wert fuer Koeffizienten der rechten Seite
        MAX_KOEFFIZIENTEN = 20
        koeffLS = koeffizienten
        ordnung = ordnung
        #Koeffizienten der rechten Seite
        koeffizient_c = self.make_koeffizienten(1, MAX_KOEFFIZIENTEN)[0]
        self.koeffizienten_A = []

        # x als Variable festlegen (sympy)
        x = Symbol('x', real = True)

        #Auswahl der Funktionen fuer die rechte Seite
        self.function = sample(['exp', 'sin'],1)
        # Funktion aufstellen
        if self.function[0] == 'exp':
            #Anzahl Nullstellen, die = koeffizent_c
            self.koeff_c_in_nullstellen = nullstellen.count(koeffizient_c)
            if (self.koeff_c_in_nullstellen == 1):
                self.koeffizienten_A = self.make_koeffizienten(1, MAX_KOEFFIZIENTEN)
                self.f = self.koeffizienten_A[0] * exp(koeffizient_c * x) * x
            elif (self.koeff_c_in_nullstellen == 2):
                self.koeffizienten_A = self.make_koeffizienten(2, MAX_KOEFFIZIENTEN)            
                self.f = self.koeffizienten_A[0] * exp(koeffizient_c * x) * x**2
            elif (self.koeff_c_in_nullstellen == 3):
                self.koeffizienten_A = self.make_koeffizienten(3, MAX_KOEFFIZIENTEN)            
                self.f = self.koeffizienten_A[0] * exp(koeffizient_c * x) * x**3
            elif (self.koeff_c_in_nullstellen == 4):
                self.koeffizienten_A = self.make_koeffizienten(4, MAX_KOEFFIZIENTEN)            
                self.f = self.koeffizienten_A[0] * exp(koeffizient_c * x) * x**4                
            else:
                self.koeffizienten_A = self.make_koeffizienten(1, MAX_KOEFFIZIENTEN)
                self.f = self.koeffizienten_A[0] * exp(koeffizient_c * x)
        else:
            #Anzahl Nullstellen, die = koeffizent_c
            self.koeff_c_in_nullstellen = nullstellen.count(koeffizient_c*I)
            self.koeffizienten_A = self.make_koeffizienten(2, MAX_KOEFFIZIENTEN)
            if (self.koeff_c_in_nullstellen != 0):
                self.f = (self.koeffizienten_A[0] * sin(koeffizient_c * x) + self.koeffizienten_A[1] * cos(koeffizient_c * x)) * x
            else:
                self.f = (self.koeffizienten_A[0] * sin(koeffizient_c * x) + self.koeffizienten_A[1] * cos(koeffizient_c * x))
        
        #Benoetigte Anzahl an Ableitungen generieren
        df = [] #Liste der Ableitungen
        for i in range(ordnung):
            df.append(diff(self.f,x,i+1))

        #Ableitungen in linke Seite einsetzen
        #Reminder Aufbau koeffLS -> [koeff von zweithoechster Ableitung, .... , koeff von niedrigster Ableitung, koeff von Funktion]
        #Reminder Aufbau df -> [niedrigste Ableitung, ... , hoechste Ableitung]
        self.rechte_seite = df[-1]
        for i in range(ordnung-1):
            self.rechte_seite += koeffLS[i] * df[-(i+2)]	

        self.rechte_seite += koeffLS[-1] * self.f
        self.rechte_seite = expand(simplify(self.rechte_seite))


    def make_koeffizienten(self, number, MAX_KOEFFIZIENTEN):
        '''Methode: Erzeugt Koeffizenten. Gibt Array der Laenge number zurueck; 
        enthaelt Zufallszahlen von -MAX_KOEFFIZIENT bis MAX_KOEFFIZIENT ohne 0'''
        array = []
        for i in range(number):
            array.append(randrange(1,MAX_KOEFFIZIENTEN))
            if (randrange(2) == 0):
                array[i] *= -1

        return array

    def get_rechte_seite(self):
        '''Methode: Gibt rechte Seite ohne '*' Zeichen zurueck'''
        return str(self.rechte_seite).replace("*","")
    
    def get_rechte_seite_sympy(self):
        '''Methode: Gibt die rechte Seite in SymPy format zurueck'''
        return self.rechte_seite

    def get_loesung(self):
        '''Methode: Gibt die Loesung der rechten Seite zurueck'''
        regex = re.compile('^[\-]')
        if (regex.search(str(self.f))):
            return str(self.f).replace("*","")
        else:
            return '+' + str(self.f).replace("*","")
    
    def get_loesung_sympy(self):
        '''Methode: Gibt die Loesung der rechten Seite in SymPy Fromat zurueck'''
        return self.f

    def get_koeff_c_in_nullstellen(self):
        '''Methode: Gibt zurueck wie vielen Nullstellen der Koeffizient von x gleicht'''
        return self.koeff_c_in_nullstellen

    def get_funktion(self):
        '''Methode: Gibt die Funktion der rechten Seite zurueck (exp oder sin/cos)'''
        return self.function[0]
    
    

#MAIN
'''
returns a JSONP conform JS function, that returns a JSON object
containing the generated excercise, etc.
'''
ag = Aufgabengenerator()
arguments = cgi.FieldStorage() #gets the arguments in URL
callback = arguments['callback'].value 
print callback + "({"
print "\"aufgabe\":" + "\"" + ag.get_aufgabe() + "\","
print "\"loesung\":" + "\"" + ag.get_loesung() + "\","
print "\"tip\":" + ag.get_tip() + ","
print "\"anzahlNullstellen\":" + "\"" + ag.get_anzahl_nullstellen() + "\","
print "\"loesungLinks\":" + ag.get_loesung_links() + ","
print "\"loesungRechts\":" + ag.get_loesung_rechts()
print "});"

#MAIN END
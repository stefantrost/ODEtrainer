'''
Created on 06.03.2014

@author: Stefan
'''
import unittest
import re
from Aufgabengenerator import LinkeSeite, RechteSeite, Aufgabengenerator
from sympy import *

class Test(unittest.TestCase):


    def testLinkeSeite(self):
        for i in range(1000):
            linke_seite = LinkeSeite()
            ordnung = linke_seite.get_ordnung()
            if (ordnung == 2):
                regex = re.compile('y\(2\)([\+|\-][0-9]+y\(1\))?([\+|\-][0-9]+y)?')
                
            if (ordnung == 3):
                regex = re.compile('y\(3\)([\+|\-][0-9]+y\(2\))?([\+|\-][0-9]+y\(1\))?([\+|\-][0-9]+y)?')
            
            if (ordnung == 4):
                regex = re.compile('y\(4\)([\*|\-][0-9]+y\(3\))?([\+|\-][0-9]+y\(2\))?([\+|\-][0-9]+y\(1\))?([\+|\-][0-9]+y)?')
            
            linke_seite_string = linke_seite.get_linke_seite()
            print linke_seite_string
            check = re.search(regex, linke_seite_string)
            
            self.assertTrue(check, "LinkeSeite stimmt nicht: "+linke_seite_string)
            
    def testRechteSeite1_1(self):
        '''n = 2, reelle einfache Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-11,10], 2, [10, 1])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())

    def testRechteSeite1_2(self):
        '''n = 2, reelle einfache Nullstellen mit 0'''
        for i in range(100):
            rechte_seite = RechteSeite([-18,0], 2, [0, 18])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite2_1(self):
        '''n = 2, reelle doppelte Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-8,16], 2, [4, 4])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite2_2(self):
        '''n = 2, reelle doppelte Nullstellen mit 0'''
        for i in range(100):
            rechte_seite = RechteSeite([0,0], 2, [0, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite3_1(self):
        '''n = 2, komplexe Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-22, 221], 2, [11 + 10*I, 11 - 10*I])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite3_2(self):
        '''n = 2, komplexe Nullstellen mit 1*I'''
        for i in range(100):
            rechte_seite = RechteSeite([-36, 325], 2, [18 + I, 18 - I])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite3_3(self):
        '''n = 2, komplexe Nullstellen mit 0 +/- a*I'''
        for i in range(100):
            rechte_seite = RechteSeite([0, 81], 2, [ 9*I, -9*I])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)

            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite4_1(self):
        '''n = 3, reelle einfache Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-33, 272, -240], 3, [12, 1, 20])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
           
    def testRechteSeite4_2(self):
        '''n = 3, reelle einfache Nullstellen mit 0'''
        for i in range(100):
            rechte_seite = RechteSeite([-26, 165, 0], 3, [15, 11, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())            
            
    def testRechteSeite5_1(self):
        '''n = 3, reelle einfache + doppelte Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-46, 665, -2888], 3, [8, 19, 19])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
           
    def testRechteSeite5_2(self):
        '''n = 2, reelle einfache + doppelte Nullstellen mit 0 (doppelte)'''
        for i in range(100):
            rechte_seite = RechteSeite([-6, 0, 0], 3, [6, 0, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())

    def testRechteSeite5_3(self):
        '''n = 3, reelle einfache + doppelte Nullstellen mit 0 (einfache)'''
        for i in range(100):
            rechte_seite = RechteSeite([-18, 81, 0], 3, [0, 9, 9])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())

    def testRechteSeite6_1(self):
        '''n = 3, reelle dreifache Nullstelle'''
        for i in range(100):
            rechte_seite = RechteSeite([-12, 48, -64], 3, [4, 4, 4])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite6_2(self):
        '''n = 3, reelle dreifache Nullstelle mit 0'''
        for i in range(100):
            rechte_seite = RechteSeite([-12, 48, -64], 3, [0, 0, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite7_1(self):
        '''n = 3, reelle einfache + komplexe Nullstelle'''
        for i in range(100):
            rechte_seite = RechteSeite([-13, 192, 1870], 3, [11, 1 + 13*I, 1 - 13*I])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite7_2(self):
        '''n = 3, reelle einfache + komplexe Nullstelle mit 0 (einfache reelle)'''
        for i in range(100):
            rechte_seite = RechteSeite([-13, 192, 1870], 3, [0, 3 + 20*I, 3 - 20*I])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite7_3(self):
        '''n = 3, reelle einfache + komplexe Nullstelle mit 0 (komplexe: 0 +/- a*I)'''
        for i in range(100):
            rechte_seite = RechteSeite([-19, 121, -2299], 3, [19, 11*I,  -11*I])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite7_4(self):
        '''n = 3, reelle einfache + komplexe Nullstelle mit 1 (komplexe: a +/- I)'''
        for i in range(100):
            rechte_seite = RechteSeite([-32, 309, 788], 3, [4, 14 + I, 14 - I])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite8_1(self):
        '''n = 4, reelle einfache Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-41, 533, -2335, 2850], 4, [19, 2, 5, 15])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite8_2(self):
        '''n = 4, reelle einfache Nullstellen mit 0'''
        for i in range(100):
            rechte_seite = RechteSeite([-40, 492, -1728, 0], 4, [6, 16, 18, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')

            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite9_1(self):
        '''n = 4, reelle 2 einfache + doppelte Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-34, 417, -2156, 3872], 4, [4, 8, 11, 11])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())

    def testRechteSeite9_2(self):
        '''n = 4, reelle 2 einfache + doppelte Nullstellen mit 0 (doppelte)'''
        for i in range(100):
            rechte_seite = RechteSeite([-20, 75, 0, 0], 4, [5, 15, 0, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite9_3(self):
        '''n = 4, reelle 2 einfache + doppelte Nullstellen mit 0 (einfache)'''
        for i in range(100):
            rechte_seite = RechteSeite([-23, 155, 325, 0], 4, [13, 0, 5, 5])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite10_1(self):
        '''n = 4, reelle einfach + dreifache Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-13, 54, -92, 56], 4, [7, 2, 2, 2])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite10_2(self):
        '''n = 4, reelle einfach + dreifache Nullstellen mit 0 (dreifache)'''
        for i in range(100):
            rechte_seite = RechteSeite([-13, 54, -92, 56], 4, [15, 0, 0, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite10_3(self):
        '''n = 4, reelle einfach + dreifache Nullstellen mit 0 (einfach)'''
        for i in range(100):
            rechte_seite = RechteSeite([-54, 972, -5832, 0], 4, [0, 18, 18, 18])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite11_1(self):
        '''n = 4, reelle vierfache Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-56, 1176, -10976, 38416], 4, [14, 14, 14, 14])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite11_2(self):
        '''n = 4, reelle vierfache Nullstellen mit 0'''
        for i in range(100):
            rechte_seite = RechteSeite([0, 0, 0, 0], 4, [0, 0, 0 , 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())

    def testRechteSeite12_1(self):
        '''n = 4, reelle zwei mal doppelte Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([-58, 1249, -11832, 41616], 4, [12, 12, 17, 17])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())

    def testRechteSeite12_2(self):
        '''n = 4, reelle zwei mal doppelte Nullstellen mit 0'''
        for i in range(100):
            rechte_seite = RechteSeite([-18, 81, 0, 0], 4, [9, 9, 0, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite13_1(self):
        '''n = 4, komplexe und zwei einfache reelle Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([- 35,  451, - 3035,  7650], 4, [6 + 7*I, 6 - 7*I, 18, 5])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite13_2(self):
        '''n = 4, komplexe und zwei einfache reelle Nullstellen mit 0 (einfache reelle)'''
        for i in range(100):
            rechte_seite = RechteSeite([- 42,  922, - 9640, 0], 4, [11 + 19*I, 11 - 19*I, 20, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite13_3(self):
        '''n = 4, komplexe und zwei einfache reelle Nullstellen mit 0 (komplexe 0 +/- a*I)'''
        for i in range(100):
            rechte_seite = RechteSeite([- 20,  244, - 4500,  4275], 4, [15*I, - 15*I, 1, 19])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite13_4(self):
        '''n = 4, komplexe und zwei einfache reelle Nullstellen mit 1 (komplexe a +/- 1*I)'''
        for i in range(100):
            rechte_seite = RechteSeite([- 26,  213, - 554,  366], 4, [11 + I, 11 - I, 3, 1])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite14_1(self):
        '''n = 4, komplexe und reelle doppelte Nullstellen'''
        for i in range(100):
            rechte_seite = RechteSeite([- 54,  1078, - 9360,  29800], 4, [17 + 3*I, 17 - 3*I, 10, 10])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testRechteSeite14_2(self):
        '''n = 4, komplexe und reelle doppelte Nullstellen mit 0 (reelle doppelte)'''
        for i in range(100):
            rechte_seite = RechteSeite([- 38,  650, 0, 0], 4, [19 + 17*I, 19 - 17*I, 0, 0])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
 
    def testRechteSeite14_3(self):
        '''n = 4, komplexe und reelle doppelte Nullstellen mit 0 (komplexe: 0 +/- a*I)'''
        for i in range(100):
            rechte_seite = RechteSeite([- 6,  152, - 864,  1152], 4, [12*I, -12*I, 2, 4])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
 
    def testRechteSeite14_4(self):
        '''n = 4, komplexe und reelle doppelte Nullstellen mit 1 (komplexe: a +/- 1*I)'''
        for i in range(100):
            rechte_seite = RechteSeite([- 51,  955, - 7763,  23130], 4, [16 + I, 16 - I,  10, 9])
            rechte_seite_string = rechte_seite.get_rechte_seite().replace(" ", "")
            if (rechte_seite.get_funktion() == 'exp'):
                regex = re.compile('\-?[0-9]*exp\(\-?[0-9]*x\)')
            else:
                regex = re.compile('(\-?[0-9]*sin\((?P<coeff>[0-9]*)x\))?([\+|\-][0-9]*cos\(\-?(?P=coeff)x\))?')
            print rechte_seite_string
            if (rechte_seite_string == '0'):
                check = False
            else:
                check = re.search(regex, rechte_seite_string)
            
            self.assertTrue(check, "RechteSeite stimmt nicht: "+ rechte_seite_string + ", " + rechte_seite.get_funktion() + ", " + rechte_seite.get_loesung())
            
    def testAufgabengenerator(self):
        for i in range(1000):
            aufgabengenerator = Aufgabengenerator()
            
            #LinkeSeite
            nullstellen = aufgabengenerator.linke_seite.get_nullstellen()
            anzahl_nullstellen = aufgabengenerator.linke_seite.get_anzahl_nullstellen()
            loesung_links = aufgabengenerator.get_loesung_links()
            anz_ns = []
            check_links = False
                    
            #Nullstellen in richtiges Format
            nullst_zwischen = list(nullstellen)
            for i in range(len(nullstellen)):
                anz_ns.append(nullst_zwischen.count(nullst_zwischen[0])-1)
                nullst_zwischen.pop(0);

            loesung_links_array = loesung_links.split(';')
            loesung_links_array.pop(0)
            
            for i in range(len(loesung_links_array)):
                loesung_links_array[i] = loesung_links_array[i].split('|')
                
            for i in range (len(loesung_links_array)):
                if (loesung_links_array[i][0] == str(nullstellen[i]) and loesung_links_array[i][1] == str(anz_ns[i])):
                    check_links = True
            
            print "Nullstellen + Anzahl:"
            print nullstellen + anz_ns
            #print loesung_links_array
            
            self.assertTrue(check_links, "Aufgabengenerator-Klasse stimmt auf der linken Seite nicht: " + str(nullstellen) + str(anz_ns) + str(loesung_links) + str(loesung_links_array))

            #RechteSeite            
            loesung_rechts_soll = aufgabengenerator.rechte_seite.get_loesung_sympy()
            loesung_rechts_ist = aufgabengenerator.get_loesung_rechts().replace(';', '').split('|')
            check_rechts = False
            
            print "Loesung rechts: "
            #print loesung_rechts_soll
            print aufgabengenerator.get_loesung_rechts()

            if (loesung_rechts_ist[0] == 'exp'):
                if (loesung_rechts_ist[2] == 0):
                    loesung_rechts_string = str(loesung_rechts_ist[3]) + '*exp(' + str(loesung_rechts_ist[1]) + '*x)'
                elif (loesung_rechts_ist[2] == 1):
                    loesung_rechts_string = str(loesung_rechts_ist[3]) + '*x*exp(' + str(loesung_rechts_ist[1]) + '*x)'
                else:
                    loesung_rechts_string = str(loesung_rechts_ist[3]) + '*exp(' + str(loesung_rechts_ist[1]) + '*x)*x**' + str(loesung_rechts_ist[2])
            else:
                if loesung_rechts_ist[2] == '0':
                    loesung_rechts_string = str(loesung_rechts_ist[3]) + '*sin(' + str(loesung_rechts_ist[1]) + '*x)' + str(loesung_rechts_ist[4]) + '*cos(' + str(loesung_rechts_ist[1]) + '*x)'
                else:
                    loesung_rechts_string = '(' + str(loesung_rechts_ist[3]) + '*sin(' + str(loesung_rechts_ist[1]) + '*x)' + str(loesung_rechts_ist[4]) + '*cos(' + str(loesung_rechts_ist[1]) + '*x))*x'
                
            loesung_rechts_sympy = sympify(loesung_rechts_string)
            
            if (str(loesung_rechts_soll) == str(loesung_rechts_sympy)):
                check_rechts = True
                                    
            #print loesung_rechts_soll
            print loesung_rechts_sympy
            self.assertTrue(check_rechts, "Aufgabengenerator-Klasse stimmt auf der rechten Seite nicht: " + str(loesung_rechts_soll) + " | " + str(loesung_rechts_sympy))
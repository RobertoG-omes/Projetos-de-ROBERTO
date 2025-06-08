print("calculadora de temperatura")
Temperatura=(input("digite C,F ou K"))
Temperatura2=(input("digite C,F ou K"))
numero=float(input("digite um número "))
if Temperatura == "C" and Temperatura2 == "F":
    Resultado= numero*9/5+32
    print("celsius para fahrenheit é",Resultado)
elif Temperatura == "C" and Temperatura2 == "K":
    Resultado=numero+ 273,15
    print("celsius para kelvin é",Resultado)
elif Temperatura == "K" and Temperatura2 =="F":
    Resultado=(numero-273,15)*9/5
    print("kelvin para fahrenheit é",Resultado)
elif Temperatura == "K" and Temperatura2 =="C":
    Resultado=(numero-273,15)
    print("kelvin para celsius é",Resultado)
elif Temperatura == "F" and Temperatura2 == "C":
    Resultado= (numero-32)*5/9
    print("fahrenheit para celsius é",Resultado)
elif Temperatura == "F" and Temperatura2 =="K":
    Resultado= Resultado= ((numero-32)*5/9) + 273,15
    print("fahrenheit para kelvin é",Resultado)


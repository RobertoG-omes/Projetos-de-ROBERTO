primeiro=float(input("coloque o primeiro número"))
sinal=(input("sinal de operação"))
segundo=float(input("coloque segundo número"))
if sinal== '+':
 resultado=primeiro+segundo
elif sinal== '-':
 resultado=primeiro-segundo
elif sinal=='*':
 resultado=primeiro*segundo
elif sinal=='/':
 resultado=primeiro/segundo
elif sinal=='^':
 resultado=primeiro**segundo
else:resultado= ("resultado invalido")
print ("resultado=",resultado)

numero = float(input("Digite um número: "))
resultados = [numero * i for i in range(1, 11)]
print("Resultados da tabuada:")
for i, resultado in enumerate(resultados, start=1):
    print(f"{numero} x {i} = {resultado}")

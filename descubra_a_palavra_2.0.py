import random
from os import system, name

def limpa_tela():
    if name == 'nt':
        _ = system('cls')
    else:
        _ = system('clear')

def game():
    limpa_tela()
    print("Bem-vindo ao jogo!")
    print("Adivinhe a palavra abaixo:\n")

    palavras = ['soldado', 'recruta', 'cabo', 'sargento', 'subtenente', 'oficial','tenente', 'major', 'marechal', 'cadete','comissario']
    palavra = random.choice(palavras)
    letras_descobertas = ['_' for letra in palavra]
    chances = 6
    letras_erradas = []

    while chances > 0:
        print(" ".join(letras_descobertas))
        print("\nChances restantes:", chances)
        print("Letras erradas:", " ".join(letras_erradas))

        tentativa = input("\nDigite uma letra: ").lower()

        if not tentativa.isalpha() or len(tentativa) != 1:
            print("Por favor, digite apenas uma letra.")
            continue 

        if tentativa in letras_descobertas or tentativa in letras_erradas:
            print("Você já tentou essa letra. Tente outra.")
            continue

        if tentativa in palavra:
            for index, letra in enumerate(palavra):
                if letra == tentativa:
                    letras_descobertas[index] = letra
        else:
            chances -= 1
            letras_erradas.append(tentativa)

        if "_" not in letras_descobertas:
            print("\nVocê venceu! A palavra era:", palavra)
            break

    if "_" in letras_descobertas: 
        print("\nVocê perdeu! A palavra era:", palavra)

if __name__ == "__main__":
    game()

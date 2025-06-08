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

    palavras = ['caelid', 'tervore', 'nokrum', 'maculado', 'malenia', 'rhykard','ranni', 'liurnia', 'alexander', 'lingrave','patches']
    palavra = random.choice(palavras)
    letras_descobertas = ['_' for letra in palavra]
    chances = 6
    letras_erradas = []

    while chances > 0:
        print(" ".join(letras_descobertas))
        print("\nChances restantes:", chances)
        print("Letras erradas:", " ".join(letras_erradas))

        tentativa = input("\nDigite uma letra: ").lower()

        if tentativa in palavra:
            for index, letra in enumerate(palavra):
                if letra == tentativa:
                    letras_descobertas[index] = letra
        else:
            if tentativa not in letras_erradas:
                chances -= 1
                letras_erradas.append(tentativa)

        if "_" not in letras_descobertas:
            print("\nVocê venceu! A palavra era:", palavra)
            break

    if "_" in letras_descobertas:
        print("\nVocê perdeu! A palavra era:", palavra)

if __name__ == "__main__":
    game()


import random
from os import system, name

def limpa_tela():
    if name == 'nt':
        _ = system('cls')
    else:
        _ = system('clear')
desenhos_forca = [
    """
  +---+
  |   |
      |
      |
      |
=========""",
    """
  +---+
  |   |
  O   |
      |
      |
=========""",
    """
  +---+
  |   |
  O   |
  |   |
      |
=========""",
    """
  +---+
  |   |
  O   |
 /|   |
      |
=========""",
    """
  +---+
  |   |
  O   |
 /|\  |
      |
=========""",
    """
  +---+
  |   |
  O   |
 /|\  |
 /    |
=========""",
    """
  +---+
  |   |
  O   |
 /|\  |
 / \  |
========="""
]
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
        limpa_tela()
        print(desenhos_forca[6 - chances])
        print(" ".join(letras_descobertas))
        print("\nChances restantes:", chances)
        print("Letras erradas:", " ".join(letras_erradas))

        tentativa = input("\nDigite uma letra: ").lower()

        if len(tentativa) != 1 or not tentativa.isalpha():
            print("Por favor, digite apenas uma letra válida.")
            input("Pressione Enter para continuar...")
            continue
        
        if tentativa in letras_descobertas or tentativa in letras_erradas:
            print(f"Você já tentou a letra '{tentativa}'. Tente outra.")
            input("Pressione Enter para continuar...")
            continue
        
        if tentativa in palavra:
            for index, letra in enumerate(palavra):
                if letra == tentativa:
                    letras_descobertas[index] = letra
        else:
            if tentativa not in letras_erradas:
                chances -= 1
                letras_erradas.append(tentativa)

        if "_" not in letras_descobertas:
            limpa_tela()
            print("\nVocê venceu! A palavra era:", palavra.upper())
            break

    if "_" in letras_descobertas:
        print(desenhos_forca[6 - chances]) 
        print("\nVocê perdeu! A palavra era:", palavra.upper())
if __name__ == "__main__":
    game()
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


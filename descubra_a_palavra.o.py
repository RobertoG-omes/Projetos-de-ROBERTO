import random
from os import system, name

def limpa_tela():
    """Limpa a tela do console."""
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
    """Função principal do jogo da Forca."""
    limpa_tela()
    print("Bem-vindo ao jogo!")
    print("Adivinhe a palavra abaixo:\n")

    palavras = [
        "mickey", "minnie", "donald", "cinderela", "branca", "bela", "pocahontas", 
        "mulan", "simba", "nemo", "woody", "stitch", "elsa", "anna", "moana", "maui", 
        "merida", "rapunzel", "ariel", "aladdin", "jasmine", "fera", "dumbo", "bambi", 
        "peter", "sininho", "pateta", "pluto", "olaf", "gênio", "dory", "sulley", 
        "mike", "boo", "walle", "eve", "baymax", "hiro", "groot", "gamora", "rocket", 
        "thor", "hulk", "gaston", "malévola", "úrsula", "scar"
    ]
    palavra = random.choice(palavras).lower()
    letras_descobertas = ['_' for letra in palavra]
    chances = 6
    letras_erradas = []

    while chances > 0:
        limpa_tela()
        print(desenhos_forca[6 - chances])
        print("\n" + " ".join(letras_descobertas))
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
            chances -= 1
            letras_erradas.append(tentativa)

        if "_" not in letras_descobertas:
            limpa_tela()
            print(desenhos_forca[6 - chances])
            print("\nVocê venceu! A palavra era:", palavra.upper())
            break


    if "_" in letras_descobertas:
        limpa_tela()
        print(desenhos_forca[6 - chances])
        print("\nVocê perdeu! A palavra era:", palavra.upper())

if __name__ == "__main__":
    game()


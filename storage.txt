estoque = {}
sintomas = {"dor de cabeça": ["paracetamol", "ibuprofeno"],"febre": ["paracetamol"],"dor de garganta": ["pastilhas de garganta"],"dor muscular": ["ibuprofeno", "dipirona"]}

def adicionarRemedio(nomeRemedio, quantidade):
    if nomeRemedio in estoque:
        estoque[nomeRemedio] += quantidade
        print(f"{quantidade} unidades de {nomeRemedio} adicionadas. Total: {estoque[nomeRemedio]}")
    else:
        estoque[nomeRemedio] = quantidade
        print(f"{nomeRemedio} adicionado ao estoque com {quantidade} unidades.")

def removerRemedio(nomeRemedio, quantidade):
    if nomeRemedio in estoque:
        estoque[nomeRemedio] -= quantidade
        if estoque[nomeRemedio] <= 0:
            del estoque[nomeRemedio]
            print(f"{nomeRemedio} removido do estoque.")
        else:
            print(f"{quantidade} unidades de {nomeRemedio} removidas. Restam: {estoque[nomeRemedio]}")
    else:
        print("Remédio não encontrado.")

def recomendarRemedio(sintoma):
    if sintoma in sintomas:
        remeds = sintomas[sintoma]
        print(f"Remédios recomendados para {sintoma}: {', '.join(remeds)}")
    else:
        print("Sintoma não encontrado.")

def consultarEstoque():
    if estoque:
        print("Estoque atual:")
        for nome, quantidade in estoque.items():
            print(f"{nome}: {quantidade} unidades")
    else:
        print("O estoque está vazio.")

while True:
    print("\nEscolha uma opção:")
    print("1. Adicionar remédio")
    print("2. Remover remédio")
    print("3. Consultar estoque")
    print("4. Consultar remédios por sintoma")
    print("5. Sair")
    opcao = input("Digite o número da opção desejada: ")

    if opcao == '1':
        nome = input("Nome do remédio: ")
        quantidade = int(input("Quantidade a adicionar: "))
        adicionarRemedio(nome, quantidade)
    elif opcao == '2':
        nome = input("Nome do remédio: ")
        quantidade = int(input("Quantidade a remover: "))
        removerRemedio(nome, quantidade)
    elif opcao == '3':
        consultarEstoque()
    elif opcao == '4':
        sintoma = input("Digite o sintoma: ").lower()
        recomendarRemedio(sintoma)
    elif opcao == '5':
        print("Encerrando o programa. Até logo!")
    else:
        print("Opção inválida. Tente novamente.")


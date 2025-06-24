import json
import os

class ItemBiblioteca:
    def __init__(self, titulo, autor_ou_editora, id_item, disponivel=True):
        self.titulo = titulo
        self.autor_ou_editora = autor_ou_editora
        self.id_item = id_item
        self.disponivel = disponivel

    def exibir_info(self):
        status = "Disponível" if self.disponivel else "Emprestado"
        return f"Título: {self.titulo}, ID: {self.id_item}, Status: {status}"

    def emprestar(self):
        if self.disponivel:
            self.disponivel = False
            return f"'{self.titulo}' emprestado com sucesso."
        return f"'{self.titulo}' já está emprestado."

    def devolver(self):
        if not self.disponivel:
            self.disponivel = True
            return f"'{self.titulo}' devolvido com sucesso."
        return f"'{self.titulo}' já está disponível."

    def to_dict(self):
        return {
            "tipo": self.__class__.__name__,
            "titulo": self.titulo,
            "autor_ou_editora": self.autor_ou_editora,
            "id_item": self.id_item,
            "disponivel": self.disponivel
        }

class Livro(ItemBiblioteca):
    def __init__(self, titulo, autor, id_item, isbn, num_paginas):
        super().__init__(titulo, autor, id_item)
        self.isbn = isbn
        self.num_paginas = num_paginas

    def exibir_info(self):
        info_base = super().exibir_info()
        return f"{info_base}, Autor: {self.autor_ou_editora}, ISBN: {self.isbn}, Páginas: {self.num_paginas}"

    def to_dict(self):
        data = super().to_dict()
        data.update({
            "isbn": self.isbn,
            "num_paginas": self.num_paginas
        })
        return data

class MidiaVideo(ItemBiblioteca):
    def __init__(self, titulo, diretor, id_item, duracao_minutos, genero):
        super().__init__(titulo, diretor, id_item)
        self.duracao_minutos = duracao_minutos
        self.genero = genero

    def exibir_info(self):
        info_base = super().exibir_info()
        return f"{info_base}, Diretor: {self.autor_ou_editora}, Duração: {self.duracao_minutos} min, Gênero: {self.genero}"

    def reproduzir(self):
        return f"Reproduzindo '{self.titulo}'."

    def to_dict(self):
        data = super().to_dict()
        data.update({
            "duracao_minutos": self.duracao_minutos,
            "genero": self.genero
        })
        return data

class Revista(ItemBiblioteca):
    def __init__(self, titulo, editora, id_item, numero_edicao, periodicidade):
        super().__init__(titulo, editora, id_item)
        self.numero_edicao = numero_edicao
        self.periodicidade = periodicidade

    def exibir_info(self):
        info_base = super().exibir_info()
        return f"{info_base}, Editora: {self.autor_ou_editora}, Edição: {self.numero_edicao}, Periodicidade: {self.periodicidade}"

    def assinar(self):
        return f"Assinando a revista '{self.titulo}'."

    def to_dict(self):
        data = super().to_dict()
        data.update({
            "numero_edicao": self.numero_edicao,
            "periodicidade": self.periodicidade
        })
        return data

class Magazine(Revista):
    def __init__(self, titulo, editora, id_item, numero_edicao, periodicidade, tema):
        super().__init__(titulo, editora, id_item, numero_edicao, periodicidade)
        self.tema = tema

    def exibir_info(self):
         info_base = super().exibir_info()
         return f"{info_base}, Tema: {self.tema}"

    def to_dict(self):
        data = super().to_dict()
        data["tema"] = self.tema
        return data

class Manga(Revista):
    def __init__(self, titulo, autor, id_item, numero_edicao, periodicidade, volumen):
        super().__init__(titulo, autor, id_item, numero_edicao, periodicidade)
        self.volumen = volumen

    def exibir_info(self):
        info_base = super().exibir_info()
        return f"{info_base}, Volumen: {self.volumen}"

    def to_dict(self):
        data = super().to_dict()
        data["volumen"] = self.volumen
        return data

class HQ(Revista):
    def __init__(self, titulo, autor, id_item, numero_edicao, periodicidade, editora_hq):
        super().__init__(titulo, autor, id_item, numero_edicao, periodicidade)
        self.editora_hq = editora_hq

    def exibir_info(self):
        info_base = super().exibir_info()
        return f"{info_base}, Editora HQ: {self.editora_hq}"

    def to_dict(self):
        data = super().to_dict()
        data["editora_hq"] = self.editora_hq
        return data

class RevistaCientifica(Revista):
    def __init__(self, titulo, editora, id_item, numero_edicao, periodicidade, area_estudo):
        super().__init__(titulo, editora, id_item, numero_edicao, periodicidade)
        self.area_estudo = area_estudo

    def exibir_info(self):
         info_base = super().exibir_info()
         return f"{info_base}, Área de Estudo: {self.area_estudo}"

    def to_dict(self):
        data = super().to_dict()
        data["area_estudo"] = self.area_estudo
        return data

def salvar_estoque(itens, nome_arquivo="estoque_biblioteca.json"):
    try:
        dados_para_salvar = [item.to_dict() for item in itens]
        with open(nome_arquivo, 'w', encoding='utf-8') as f:
            json.dump(dados_para_salvar, f, indent=4, ensure_ascii=False)
        print(f"\nEstoque salvo com sucesso em '{nome_arquivo}'!")
    except IOError as e:
        print(f"Erro ao salvar o estoque: {e}")

def carregar_estoque(nome_arquivo="estoque_biblioteca.json"):
    itens_carregados = []
    if not os.path.exists(nome_arquivo):
        print(f"Arquivo '{nome_arquivo}' não encontrado. Iniciando com estoque vazio.")
        return itens_carregados

    try:
        with open(nome_arquivo, 'r', encoding='utf-8') as f:
            dados = json.load(f)
            for item_data in dados:
                tipo = item_data.get("tipo")
                item = None
                if tipo == "Livro":
                    item = Livro(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"],
                                 item_data["isbn"], item_data["num_paginas"])
                elif tipo == "MidiaVideo":
                    item = MidiaVideo(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"],
                                      item_data["duracao_minutos"], item_data["genero"])
                elif tipo == "Magazine":
                    item = Magazine(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"],
                                    item_data["numero_edicao"], item_data["periodicidade"], item_data["tema"])
                elif tipo == "Manga":
                    item = Manga(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"],
                                 item_data["numero_edicao"], item_data["periodicidade"], item_data["volumen"])
                elif tipo == "HQ":
                    item = HQ(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"],
                              item_data["numero_edicao"], item_data["periodicidade"], item_data["editora_hq"])
                elif tipo == "RevistaCientifica":
                    item = RevistaCientifica(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"],
                                             item_data["numero_edicao"], item_data["periodicidade"], item_data["area_estudo"])
                elif tipo == "Revista":
                    item = Revista(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"],
                                   item_data["numero_edicao"], item_data["periodicidade"])
                elif tipo == "ItemBiblioteca":
                    item = ItemBiblioteca(item_data["titulo"], item_data["autor_ou_editora"], item_data["id_item"])
                
                if item:
                    item.disponivel = item_data["disponivel"]
                    itens_carregados.append(item)
        print(f"\nEstoque carregado com sucesso de '{nome_arquivo}'!")
    except (json.JSONDecodeError, KeyError) as e:
        print(f"Erro ao carregar o estoque do arquivo '{nome_arquivo}'. Arquivo corrompido ou formato inválido: {e}")
        print("Iniciando com estoque vazio para evitar problemas.")
    except IOError as e:
        print(f"Erro de I/O ao carregar o estoque: {e}")
    return itens_carregados

def main():
    estoque = carregar_estoque()

    if not estoque:
        print("\n--- Adicionando itens ao estoque pela primeira vez ---")
        livro1 = Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "L001", "978-0618051767", 1200)
        livro2 = Livro("Python para Iniciantes", "John Doe", "L002", "978-1234567890", 350)
        magazine1 = Magazine("National Geographic", "National Geographic Society", "M001", 202406, "Mensal", "Ciência e Exploração")
        manga1 = Manga("Naruto", "Masashi Kishimoto", "MA001", 1, "Semanal", 1)
        hq1 = HQ("Batman: The Dark Knight Returns", "Frank Miller", "HQ001", 1, "Único", "DC Comics")
        revista_cientifica1 = RevistaCientifica("Nature", "Springer Nature", "RC001", 7912, "Semanal", "Ciências Naturais")
        dvd1 = MidiaVideo("Matrix", "Wachowskis", "M002", 136, "Ficção Científica")

        estoque.extend([livro1, livro2, magazine1, manga1, hq1, revista_cientifica1, dvd1])
        salvar_estoque(estoque)

    print("\n--- Itens Atuais no Estoque ---")
    for item in estoque:
        print(item.exibir_info())

    print("\n--- Testando operações ---")
    item_para_operacao = None
    for item in estoque:
        if item.id_item == "L001":
            item_para_operacao = item
            break
    
    if item_para_operacao:
        print(f"\nStatus antes da operação: {item_para_operacao.exibir_info()}")
        print(item_para_operacao.emprestar())
        print(f"Status depois do empréstimo: {item_para_operacao.exibir_info()}")
        print(item_para_operacao.emprestar())
        salvar_estoque(estoque)

        print(item_para_operacao.devolver())
        print(f"Status depois da devolução: {item_para_operacao.exibir_info()}")
        salvar_estoque(estoque)
    else:
        print("\nItem L001 não encontrado para teste de operação.")

    print("\n--- Testando métodos específicos ---")
    for item in estoque:
        if isinstance(item, Livro):
            print(item.abrir_na_pagina(50))
        elif isinstance(item, Revista):
            print(item.assinar())
        elif isinstance(item, MidiaVideo):
            print(item.reproduzir())

    print("\n--- Estado final do Estoque ---")
    for item in estoque:
        print(item.exibir_info())

if __name__ == "__main__":
    main()

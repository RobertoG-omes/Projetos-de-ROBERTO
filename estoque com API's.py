import json
import os
import requests

# ==============================================================================
# Classes da biblioteca
# ==============================================================================

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
      
def buscar_livro_google_books(isbn, id_item):

    url = f"https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}"
    
    print(f"Buscando informações para o ISBN {isbn} na Google Books API...")
    try:
        response = requests.get(url)
        response.raise_for_status() 
        data = response.json()
        
        if 'items' in data and len(data['items']) > 0:
            item_data = data['items'][0]['volumeInfo']
            
            titulo = item_data.get('title', 'Título não encontrado')
            autores = item_data.get('authors', ['Autor Desconhecido'])
            autor = ", ".join(autores)
            
            num_paginas = item_data.get('pageCount', 0)
            
            livro = Livro(titulo, autor, id_item, isbn, num_paginas)
            print("Livro encontrado e criado com sucesso!")
            return livro
        else:
            print(f"Livro com ISBN {isbn} não encontrado na Google Books API.")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar com a API do Google Books: {e}")
        return None
    except KeyError:
        print(f"Dados incompletos retornados pela API para o ISBN {isbn}.")
        return None

def buscar_livro_open_library(isbn, id_item):
    url_base = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json"

    print(f"Buscando informações para o ISBN {isbn} na Open Library API...")
    try:
        response = requests.get(url_base)
        response.raise_for_status()
        data = response.json()
        
        if f"ISBN:{isbn}" in data:
            item_data = data[f"ISBN:{isbn}"]
            
            if 'info_url' in item_data:
                details_url = item_data['info_url'].replace('https://openlibrary.org', 'https://openlibrary.org/api/books?bibkeys=')
                
                details_url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&jscmd=data&format=json"
                response_details = requests.get(details_url)
                response_details.raise_for_status()
                details_data = response_details.json()
                
                if f"ISBN:{isbn}" in details_data:
                    book_data = details_data[f"ISBN:{isbn}"]
                    
                    titulo = book_data.get('title', 'Título não encontrado')
                    autores = book_data.get('authors', [{'name': 'Autor Desconhecido'}])
                    autor = ", ".join([a.get('name', 'Autor Desconhecido') for a in autores])
                    
                    num_paginas = 0 
                    
                    livro = Livro(titulo, autor, id_item, isbn, num_paginas)
                    print("Livro encontrado e criado com sucesso!")
                    return livro
            else:
                 print(f"Dados detalhados para o ISBN {isbn} não encontrados na Open Library.")
                 return None
        else:
            print(f"Livro com ISBN {isbn} não encontrado na Open Library API.")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar com a API da Open Library: {e}")
        return None
    except KeyError as e:
        print(f"Dados incompletos retornados pela API da Open Library: {e}")
        return None

def buscar_midia_tmdb(titulo, id_item):
    api_key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGVhZGM0N2E4MDFkYWI4MTJmMzNmMDY2OTUyMzhiNyIsIm5iZiI6MTc1NDk1MTIyOS43NTMsInN1YiI6IjY4OWE2ZTNkN2U0MzUxNDEwZmI3MDU3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hGpU4I5Fe-C424P1exCOURJ7z5wEIlLAoJTZwkwxM8c"
    url_base = "https://api.themoviedb.org/3/search/movie"
    
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    params = {
        "query": titulo,
        "language": "pt-BR"
    }

    print(f"Buscando informações para o filme '{titulo}' na TMDB API...")
    try:
        response = requests.get(url_base, headers=headers, params=params)
        response.raise_for_status() 
        data = response.json()
        
        if 'results' in data and len(data['results']) > 0:
            movie_data = data['results'][0] # Pega o primeiro resultado
            
            titulo = movie_data.get('title', 'Título não encontrado')
            
            # Para pegar o diretor, é necessário uma segunda requisição
            movie_id = movie_data.get('id')
            credits_url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits"
            credits_response = requests.get(credits_url, headers=headers)
            credits_response.raise_for_status()
            credits_data = credits_response.json()
            
            diretor = "Diretor Desconhecido"
            for crew_member in credits_data.get('crew', []):
                if crew_member.get('job') == 'Director':
                    diretor = crew_member.get('name', diretor)
                    break
            
            # A TMDB API não retorna a duração na busca inicial, então usaremos 0 por enquanto
            duracao_minutos = 0
            
            # Obter os gêneros (retorna uma lista de IDs)
            genres = movie_data.get('genre_ids', [])
            genero = ", ".join([str(g) for g in genres])
            
            midia = MidiaVideo(titulo, diretor, id_item, duracao_minutos, genero)
            print("Filme encontrado e criado com sucesso!")
            return midia
        else:
            print(f"Filme '{titulo}' não encontrado na TMDB API.")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar com a API do TMDB: {e}")
        return None
    except KeyError:
        print(f"Dados incompletos retornados pela API do TMDB para o filme '{titulo}'.")
        return None


def salvar_estoque(itens, nome_arquivo="estoque_biblioteca.json"):
    try:
        diretorio = os.path.dirname(nome_arquivo)
        if diretorio and not os.path.exists(diretorio):
            os.makedirs(diretorio)
        
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
    caminho_do_arquivo = r"C:\Users\99157\OneDrive\Documentos\Nova Pasta\Documents\.venv\projetos maiores\estoque_biblioteca.json"

    estoque = carregar_estoque(caminho_do_arquivo)
    
    while True:
        print("\n--- Menu da Biblioteca ---")
        print("1. Adicionar Livro (via API)")
        print("2. Adicionar Filme (via TMDB API)")
        print("3. Sair e salvar")
        
        escolha = input("Digite sua escolha: ")
        
        if escolha == "1":
            isbn = input("Digite o ISBN do livro: ")
            id_item = input("Digite o ID único do item: ")
            
            livro = buscar_livro_google_books(isbn, id_item)
            
            if not livro:
                livro = buscar_livro_open_library(isbn, id_item)
            
            if livro:
                if not any(item.id_item == livro.id_item for item in estoque):
                    estoque.append(livro)
                    print(f"Livro '{livro.titulo}' adicionado ao estoque.")
                else:
                    print(f"Já existe um item com o ID {livro.id_item} no estoque.")

        elif escolha == "2":
            titulo_filme = input("Digite o título do filme: ")
            id_item = input("Digite o ID único do item: ")
            
            midia = buscar_midia_tmdb(titulo_filme, id_item)
            
            if midia:
                if not any(item.id_item == midia.id_item for item in estoque):
                    estoque.append(midia)
                    print(f"Filme '{midia.titulo}' adicionado ao estoque.")
                else:
                    print(f"Já existe um item com o ID {midia.id_item} no estoque.")

        elif escolha == "3":
            print("\nSaindo do programa.")
            break
        else:
            print("Escolha inválida. Por favor, tente novamente.")
    
    
    salvar_estoque(estoque, caminho_do_arquivo)
    
    print(f"\n--- Itens Atuais no Estoque ({caminho_do_arquivo}) ---")
    for item in estoque:
        print(item.exibir_info())

if __name__ == "__main__":
    main()
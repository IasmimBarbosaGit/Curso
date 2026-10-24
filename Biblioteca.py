# Requisitos do Problema:
# O sistema deve permitir cadastrar livros com informações: título, autor, ano de publicação e quantidade disponível.
# O sistema deve permitir cadastrar alunos, com nome, matrícula e série.
# O aluno deve conseguir emprestar um livro, e o sistema deve verificar se há exemplares disponíveis.
# O sistema deve registrar a data de empréstimo e calcular a data de devolução (10 dias após o empréstimo).
# Deve ser possível devolver um livro, atualizando a quantidade disponível.
# O sistema deve gerar uma lista de livros atrasados, ou seja, que não foram devolvidos até a data limite.
from datetime import datetime, timedelta 
import os
import platform
import time
 
livros = []
 
open("livros.txt", "a").close()
 
with open("livros.txt", "r", encoding="utf-8") as arquivo:
    for linha in arquivo:
 
        dados = linha.strip().split(";")
        if len(dados) == 5:
            livro = {
                    "Título": dados[0],
                    "Autor": dados[1],
                    "Ano": int(dados[2]),
                    "Editora": dados[3],
                    "ISBN": int(dados[4])
                }
            livros.append(livro)
 
def clear_terminal():
    if platform.system == "Windows":
        os.system("cls")
 
def cadastrar_livros():
    titulo = input("Digite o título do livro: ")
    autor = input("Digite o autor do livro: ")
    ano = input("Digite o ano do livro: ")
    editora = input("Digite a editora do livro: ")
    isbn = input("Digite a isbn do livro: ")
 
   # Criar dicionário do livro
    livro = {
        "Título": titulo,
        "Autor": autor,
        "Ano": ano,
        "Editora": editora,
        "ISBN": isbn
    }
    livros.append(livro)
    print(f'Livro {titulo} cadastrado com sucesso!')
 
def listar_livros():
    if not livros:
        print("Nenhum livro cadastrado!") 
    print("Lista de livros cadastrados:")
    for idx, livro in enumerate(livros, 1):
        print(f"Livro {idx}:")
        for chave, valor in livro.items():
            print(f"{chave}: {valor}")
 
def buscar_livros():
    titulo_busca = input("Digite o título do livro para buscar: ").lower()
    encontrados = [livro for livro in livros if titulo_busca in livro['Título'].lower()]
    if not encontrados:
        print("Nenhum livro encontrado!")
        return
    print("Livros encontrados:")
    for livro in encontrados:
        for chave, valor in livro.items():
            print(f"{chave}: {valor}")
        print("👌")
 
alunos = []
 
def cadastrar_alunos():
    nome = input("Digite o nome do aluno: ")
    matricula = input("Digite a matrícula do aluno: ")
    serie = input("Digite a série do aluno: ")
 
    #Criar dicionario aluno
    aluno = {
            "Série":serie,
            "Matrícula": matricula,
            "Nome": nome,
    }
    alunos.append(aluno)
    print(f"Aluno {nome} cadastrado com sucesso!")
def menu():
    while True:
        print("----------Sistema de Cadastro de Livros----------")
        print("1. Adicionar um livro")
        print("2. Listar um livro")
        print("3. Buscar um livro")
        print("4. Adionar um aluno")
        print("5. Sair")
        opcao = input("Escolha uma opcao: ")
 
        if opcao == "1":
            cadastrar_livros()
        elif opcao == "2":
            listar_livros()
        elif opcao == "3":
            buscar_livros()
        elif opcao == "4":
            cadastrar_alunos()
        elif opcao == "5":
            with open("livros.txt", "w", encoding="utf-8") as arquivo:
                for livro in livros:
                    linha = (
                    f"{livro["Título"]};"
                    f"{livro["Autor"]};"
                    f"{livro["Ano"]};"
                    f"{livro["Editora"]};"
                    f"{livro["ISBN"]}\n"
                    )
                    arquivo.write(linha)
            print("Saindo do sistema...")
            break
        else:
            print("Opcão inválida. Tente novamente!")
if __name__ == "__main__":
    menu()
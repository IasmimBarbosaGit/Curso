#Bem-vindo ao programa de verificação de idade!
import sys


def print_python_version():
    print(sys.version)

nome = input("Entre com o seu nome: ")
idade = int(input("Entre com a sua idade: "))

if idade < 18:
    print(f"{nome}, sua entrada não é permitida.")
else:
    print(f"{nome}, você pode entrar. Bem Vindo!")

"""PROGRAMA PARA CALCULAR O VALOR FINAL DE UMA COMPRA COM DESCONTO DE 10%"""

nome = input("Digite seu nome: ")
idade = int(input("Digite sua idade: "))
valor = float(input("Digite o valor da sua compra: "))
desconto = 0.1 * valor
valor_final = valor - desconto
print(f"Olá {nome}, com {idade} anos, o valor final da sua compra é de R${valor_final:.2f}.")

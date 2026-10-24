nome = input("Digite o nome do cliente: ")
valor = float(input("Digite o valor da compra: R$ "))
valor_desconto = 0

print("\nForma de pagamento:")
print("1 - PIX")
print("2 - Dinheiro")
print("3 - Cartão")

pagamento = int(input("\nEscolha uma opção: "))

# Define o desconto conforme a forma de pagamento
if pagamento == 1:
    desconto = 10
elif pagamento == 2:
    desconto = 8
elif pagamento == 3:
    desconto = 0
    parcela = int(input("Digite o número de parcelas (1 a 12): "))
    if parcela < 1 or parcela > 12:
        print("\nNúmero de parcelas inválido!")
    else:
        parcela_valor = valor / parcela
        
else:
    desconto = -1
# Verifica se a opção é válida
if desconto == -1:
    print("\nOpção de pagamento inválida!")
else:

# Desconto adicional para compras a partir de R$ 500
    if valor >= 500 and pagamento != 3:
        desconto = desconto + 5

# Calcula os valores
valor_desconto = valor * desconto / 100
valor_final = valor - valor_desconto

# Exibe o resultado
print("\n----- RESUMO DA COMPRA -----")
print(f"Cliente: {nome}")
print(f"Valor original: R$ {valor:.2f}")
print(f"Desconto: {desconto}%")
print(f"Você economizou: R$ {valor_desconto:.2f}")
print(f"Valor final: R$ {valor_final:.2f}")
print(f"\nO valor da parcela será: R$ {parcela_valor:.2f} em {parcela}x")
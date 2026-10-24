#desconto da loja

valor = float(input("Digite o valor da compra: R$ "))
if valor >= 100:        #o valor tem que ser maior ou igual a 100 para receber o desconto 
    desconto = valor * 0.10 
    valor_final = valor - desconto
    print(f"Você recebeu um desconto de R$ {desconto:.2f}. O valor final da compra é R$ {valor_final:.2f}.")
else:
    print("Você não recebeu desconto. O valor final da compra é R$ {:.2f}.".format(valor))
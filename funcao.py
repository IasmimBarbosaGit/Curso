# SISTEMA ACADÊMICO DE TERMINAL

nomes = []
medias = []


def ler_nota():
    nota = float(input("Digite a média do estudante: "))

    while nota < 0 or nota > 10:
        print("Valor inválido!")
        print("Digite uma média entre 0 e 10.")
        nota = float(input("Digite novamente: "))

    return nota


def classificar_media(media):
    if media >= 8:
        return "DESTAQUE"
    elif media >= 7:
        return "APROVADO"
    elif media >= 5:
        return "RECUPERAÇÃO"
    else:
        return "REPROVADO"


def cadastrar():
    print("\n--- CADASTRO DE ESTUDANTE ---")

    nome = input("Digite o nome do estudante: ")

    while nome == "":
        print("O nome não pode ficar vazio.")
        nome = input("Digite o nome do estudante: ")

    media = ler_nota()

    nomes.append(nome)
    medias.append(media)

    print("\nEstudante cadastrado com sucesso!")


def listar():
    print("\n--- LISTA DE ESTUDANTES ---")

    if len(nomes) == 0:
        print("Nenhum estudante cadastrado.")
        return

    for i in range(len(nomes)):
        situacao = classificar_media(medias[i])

        print(
            f"{i + 1} - {nomes[i]} | "
            f"Média: {medias[i]:.2f} | "
            f"Situação: {situacao}"
        )


def consultar():
    print("\n--- CONSULTAR ESTUDANTE ---")

    if len(nomes) == 0:
        print("Nenhum estudante cadastrado.")
        return

    nome_busca = input("Digite o nome do estudante: ")

    encontrado = False

    for i in range(len(nomes)):
        if nomes[i].lower() == nome_busca.lower():
            encontrado = True

            situacao = classificar_media(medias[i])

            print("\nEstudante encontrado!")
            print(f"Nome: {nomes[i]}")
            print(f"Média: {medias[i]:.2f}")
            print(f"Situação: {situacao}")

            break

    if not encontrado:
        print("Estudante não encontrado.")


def calcular_media_geral():
    soma = 0

    for media in medias:
        soma += media

    return soma / len(medias)


def contar_aprovados():
    aprovados = 0

    for media in medias:
        if media >= 7:
            aprovados += 1

    return aprovados


def relatorio():
    print("\n--- RELATÓRIO GERAL ---")

    if len(nomes) == 0:
        print("Nenhum estudante cadastrado.")
        return

    media_geral = calcular_media_geral()
    maior_media = max(medias)
    menor_media = min(medias)
    aprovados = contar_aprovados()

    percentual_aprovacao = (
        aprovados / len(nomes)
    ) * 100

    print(f"Quantidade de estudantes: {len(nomes)}")
    print(f"Média geral da turma: {media_geral:.2f}")
    print(f"Maior média: {maior_media:.2f}")
    print(f"Menor média: {menor_media:.2f}")
    print(f"Quantidade de aprovados: {aprovados}")
    print(
        f"Percentual de aprovação: "
        f"{percentual_aprovacao:.2f}%"
    )

    print("\n--- SITUAÇÃO DOS ESTUDANTES ---")

    for i in range(len(nomes)):
        situacao = classificar_media(medias[i])

        print(
            f"{nomes[i]} - "
            f"{medias[i]:.2f} - "
            f"{situacao}"
        )


def menu():
    opcao = -1

    while opcao != 0:

        print("\n==============================")
        print("     SISTEMA ACADÊMICO")
        print("==============================")
        print("1 - Cadastrar estudante")
        print("2 - Listar estudantes")
        print("3 - Consultar estudante")
        print("4 - Relatório geral")
        print("0 - Sair")
        print("==============================")

        opcao = int(input("Escolha uma opção: "))

        if opcao == 1:
            cadastrar()

        elif opcao == 2:
            listar()

        elif opcao == 3:
            consultar()

        elif opcao == 4:
            relatorio()

        elif opcao == 0:
            print("\nSistema encerrado.")
            print("Até a próxima!")

        else:
            print("\nOpção inválida.")


menu()
estudantes = []


def classificar(media):
    if media >= 9:
        return "DESTAQUE"
    if media >= 6:
        return "APROVADO"
    if media >= 4:
        return "RECUPERAÇÃO"
    return "REPROVADO"


def ler_media():
    while True:
        media = float(input("Média (0 a 10): "))

        if 0 <= media <= 10:
            return media

        print("Média inválida.")


def buscar_estudante(matricula):
    for estudante in estudantes:
        if estudante["matricula"] == matricula:
            return estudante
    return None


def cadastrar():
    print("\n--- CADASTRO ---")
    matricula = int(input("Matrícula: "))

    if buscar_estudante(matricula) is not None:
        print("Matrícula já cadastrada.")
        return

    nome = input("Nome: ").strip()

    while nome == "":
        print("Nome não pode ficar vazio.")
        nome = input("Nome: ").strip()

    media = ler_media()

    estudantes.append({
        "matricula": matricula,
        "nome": nome,
        "media": media
    })

    print("Cadastro realizado.")


def listar():
    print("\n--- ESTUDANTES ---")

    if not estudantes:
        print("Nenhum estudante cadastrado.")
        return

    for estudante in estudantes:
        situacao = classificar(estudante["media"])
        print(
            f'{estudante["matricula"]} | '
            f'{estudante["nome"]} | '
            f'{estudante["media"]:.2f} | '
            f'{situacao}'
        )


def consultar():
    matricula = int(input("Matrícula: "))
    estudante = buscar_estudante(matricula)

    if estudante is None:
        print("Estudante não encontrado.")
        return

    print("\n--- REGISTRO ---")
    print("Matrícula:", estudante["matricula"])
    print("Nome:", estudante["nome"])
    print(f'Média: {estudante["media"]:.2f}')
    print("Situação:", classificar(estudante["media"]))


def atualizar():
    matricula = int(input("Matrícula: "))
    estudante = buscar_estudante(matricula)

    if estudante is None:
        print("Estudante não encontrado.")
        return

    print("1 - Alterar nome")
    print("2 - Alterar média")
    opcao = input("Escolha: ")

    if opcao == "1":
        novo_nome = input("Novo nome: ").strip()
        if novo_nome:
            estudante["nome"] = novo_nome
            print("Nome atualizado.")
        else:
            print("Nome não alterado.")

    elif opcao == "2":
        estudante["media"] = ler_media()
        print("Média atualizada.")

    else:
        print("Opção inválida.")


def excluir():
    matricula = int(input("Matrícula: "))
    estudante = buscar_estudante(matricula)

    if estudante is None:
        print("Estudante não encontrado.")
        return

    print(f'Registro: {estudante["nome"]} - {estudante["media"]:.2f}')
    confirmacao = input("Confirmar exclusão? (sim/não): ").strip().lower()

    if confirmacao == "sim":
        estudantes.remove(estudante)
        print("Registro excluído.")
    else:
        print("Exclusão cancelada.")


def relatorio():
    if not estudantes:
        print("Nenhum estudante cadastrado.")
        return

    soma = 0
    maior = estudantes[0]
    menor = estudantes[0]

    contagem = {
        "DESTAQUE": 0,
        "APROVADO": 0,
        "RECUPERAÇÃO": 0,
        "REPROVADO": 0
    }

    for estudante in estudantes:
        media = estudante["media"]
        soma += media

        if media > maior["media"]:
            maior = estudante

        if media < menor["media"]:
            menor = estudante

        situacao = classificar(media)
        contagem[situacao] += 1

    media_geral = soma / len(estudantes)

    print("\n--- RELATÓRIO GERAL ---")
    print("Quantidade:", len(estudantes))
    print(f"Média geral: {media_geral:.2f}")
    print(f'Maior média: {maior["nome"]} - {maior["media"]:.2f}')
    print(f'Menor média: {menor["nome"]} - {menor["media"]:.2f}')

    for situacao, quantidade in contagem.items():
        percentual = quantidade / len(estudantes) * 100
        print(f"{situacao}: {quantidade} ({percentual:.1f}%)")


def menu():
    while True:
        print("\n==============================")
        print("     SISTEMA ACADÊMICO 2.0")
        print("==============================")
        print("1 - Cadastrar")
        print("2 - Listar")
        print("3 - Consultar")
        print("4 - Atualizar")
        print("5 - Excluir")
        print("6 - Relatório")
        print("0 - Sair")

        opcao = input("Opção: ")

        if opcao == "1":
            cadastrar()
        elif opcao == "2":
            listar()
        elif opcao == "3":
            consultar()
        elif opcao == "4":
            atualizar()
        elif opcao == "5":
            excluir()
        elif opcao == "6":
            relatorio()
        elif opcao == "0":
            print("Sistema encerrado.")
            break
        else:
            print("Opção inválida.")


menu()
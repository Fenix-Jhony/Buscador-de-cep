const limparFormulario = (endereco) => {
    document.querySelector('#endereco').value = ''
    document.querySelector('#bairro').value = ''
    document.querySelector('#cidade').value = ''
    document.querySelector('#estado').value = ''
}

const preencherFormulario = (endereco) => {
    document.querySelector('#endereco').value = endereco.logradouro
    document.querySelector('#bairro').value = endereco.bairro
    document.querySelector('#cidade').value = endereco.localidade
    document.querySelector('#estado').value = endereco.uf
}

const isNumber = (number) => /^[0-9]+$/.test(number)
const cepValido = (cep) => cep.length == 8 && isNumber(cep)

const pesquisarCep = async () => {

    limparFormulario()
    const cep = document.querySelector('#cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    if (cepValido(cep)) {
        const dados = await fetch(url)
        const endereco = await dados.json()
        if (endereco.hasOwnProperty('erro')) {
            document.querySelector('#endereco').value = 'CEP não encontrado !!'
            return
        }
        preencherFormulario(endereco)
    } else {
        document.querySelector('#endereco').value = 'CEP incorreto !!'
    }

}

document.querySelector('#cep')
    .addEventListener('focusout', pesquisarCep)




const {select, input, checkbox} = require("@inquirer/prompts");

let meta = {
    value: "Tomar 3L de água por dia",
    checked: false,
}
let metas = [meta]
const cadastrarMeta = async() =>{
    const meta = await input({message: "Digite a meta: "});
    if (meta.length==0){
        console.log("A meta não pode ficar vazia")
        return;
    }
    metas.push({value: meta, checked:false})
}

const listarMetas = async() => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, Espaço para marcar ou desmarcar e Enter para sair",
        choices: [...metas],
        instructions: false
    })

    if (respostas.length == 0){
        console.log("Nenhuma meta selecionada");
        return;
    }

    metas.forEach((m)=>{
        m.checked=false;
    });


    respostas.forEach((resposta) =>{
        const meta = metas.find((m)=>{
            return m.value == resposta
    })
    meta.checked = true;
    });
    console.log("Meta(s) concluída(s)")
}

const start = async() => {
    console.log("Começou")
    while(true){

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })


        switch(opcao){
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break;

                case "sair":
                    console.log("Saindo");
                    return;

                case "listar":
                    await listarMetas();
                    break;
        }
    }
}
start();


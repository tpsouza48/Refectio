let RBLR = (function (){

    const CONFIGS = {};

    function iniciar(configObj, callbackIniciado){    
        // Torna o objeto de configuração obrigatório.
        if(!configObj || typeof configObj != "object"){
            throw(
                new Error("Config principal inválida")
            );
        }

        // Verificação de token e origem.
        if((!configObj.token || typeof configObj.token != "string") || (!configObj.origem || typeof configObj.origem != "number")){
            throw(
                new Error("Token e origem faltantes ou inválidos!")
            );
        }

        // Verificação da URL da base e ficha.
        if(!configObj.urlBase || !configObj.urlFicha){
            throw(
                new Error("Token e origem faltantes ou inválidos!")
            );
        }

        // Atribui todos os valores do objeto nas CONFIGS.
        Object.keys(configObj).forEach(chave => {
            CONFIGS[chave] = configObj[chave];
        });

        // Carrega os módulos se algum for passado.
        let modulos = configObj.modulos;
        if(modulos && modulos.length > 0){
            modulos.forEach(modulo => {
                carregarModulo(modulo).then(retorno => {
                    if(retorno){
                        // Chama a função padrão do módulo.
                        RBLR.modulos[modulo.nome].iniciar({
                            configsHerdadas: CONFIGS,
                            ...modulo.configs
                        });
                    } else {
                        console.error(`Falha ao carregar módulo! \n\nURL do Módulo: ${modulo.url}`);
                    }
                });
            });
        }

        // Após a inicialização de tudo, chamamos o callback principal de sucesso.
        callbackIniciado();
    }

    function carregarModulo(modulo){
        return new Promise(function (callback) {
            // Módulo com informações faltantes
            if(!modulo.nome || !modulo.configs || !modulo.url){
                console.log("É obrigatório nome, url e config para todos os módulos!");
                callback(false);
            } else {
                var s;
                s = document.createElement("script");
                s.src = modulo.url;
                s.onload = () => {callback(true)};
                s.onerror = () => {callback(false)};
                document.head.appendChild(s);
            }
        });
    }

    return {
        iniciar: iniciar
    }
})();
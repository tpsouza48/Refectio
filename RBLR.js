let RBLR = (function (){

    const CONFIGS = {};

    function iniciar(configObj, callback){    
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

        // Atribui todos os valores do objeto nas CONFIGS.
        Object.keys(configObj).forEach(chave => {
            CONFIGS[chave] = configObj[chave];
        });

        callback();
    }

    return {
        iniciar: iniciar
    }
})();
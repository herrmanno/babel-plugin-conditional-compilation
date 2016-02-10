export default function({types: t }) {
    
    const IF = "#if";
    const ELIF = "#elif";
    const ELSE = "#else";
    const ENDIF = "#endif";
    const DEFINE = "#define";
    
    return {
        visitor: {
            StringLiteral(path, state) {
                let str = path.node.value;
                
                if(str.substring(0,DEFINE.length) === DEFINE) {
                    onDefine(path, state, str.substring(DEFINE.length+1));
                    path.remove();
                }
                else if(str.substring(0,IF.length) === IF) {
                    onIf(path, state, str.substring(IF.length+1));
                    path.remove();
                }
                else if(str.substring(0,ELIF.length) === ELIF) {
                    onElif(path, state, str.substring(ELIF.length+1));
                    path.remove();
                }
                else if(str.substring(0,ELSE.length) === ELSE) {
                    onElse(path, state, str.substring(ELSE.length+1));
                    path.remove();
                }
                else if(str.substring(0,ENDIF.length) === ENDIF) {
                    onEndif(path, state, str.substring(ENDIF.length+1));
                    path.remove();
                }
            },
            Statement: {
                exit(path, state) {
                    try {
                        if(state.remove) {
                            path.remove();
                        }
                    } catch(e) {}
                }
            }
        }
    };
    
    function onIf(path, state, code) {
        var cond = evaluate(state, code);
        if(!cond) {
            state.remove = true;
        }
        else {
            state.remove = false;
            state.satisfied = true;
        }
    }
    
    function onElif(path, state, code) {
        if(state.satisfied) {
            state.remove = true;
            return;
        }
        else {
            var cond = evaluate(state, code);
            if(!cond) {
                state.remove = true;
            }
            else {
                state.remove = false;
                state.satisfied = true;
            }
        }
    }
    
    function onElse(path, state, code) {
        if(state.satisfied) {
            state.remove = true;
        }
        else {
            state.remove = false;
        }
    }
    
    function onEndif(path, state, code) {
        state.remove = false;
        state.satisfied = false;
    }
    
    function onDefine(path, state, code) {
        let [name, value] = code.split(" ");
        
        if(Object.hasOwnProperty(state.opts, name)) {
            //------- #define directives DO NOT OVERWRITE plugin options
            return;
        }
        
        if(code.indexOf(" ") === -1) {
            //------- no value provided: use true as value
            value = true;
        }
        else {
            value = eval(value);
        }
        
        state.opts[name] = value;
    }
    
    function evaluate(state, code) {
        var paramNames = Object.keys(state.opts);
        var paramValues = paramNames.map(function(name) {return state.opts[name]});
        code = "return " + code;
        return Function.apply(void 0, paramNames.concat(code)).apply(void 0, paramValues);
    }
    
}
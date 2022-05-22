function createMsg(tag, type, message){
    let msg=document.createElement("span");
    switch(type){
        case "success":
            msg.textContent="Sucesso!";
            msg.classList.add("msg-success");
            tag.classList.add("msg-success");
            break;
        case "error":            
            if(message){
                msg.textContent=message;
            }else{
                msg.textContent="Um ou mais valores são inválidos!";
            }
            msg.classList.add("msg-error");
            tag.classList.add("msg-error");
            break;  
        default:
            throw new Error("Type e incorreto.");
            break;
    }
    tag.parentElement.append(msg);
}

function removeMsg(tag){
    let parenTag=tag.parentElement;
    let message=parenTag.querySelector("span[class*='msg-']");
    if(message){
        message.remove();
    }
    
}

var config={
    elements:{
        nome:{
            required:true
        },
        email:{
            required:true,
            email:true
        }
    }
}

var validateProperty={
    required:function(input){
        removeMsg(input);
        if(input.value.length>0){
            createMsg(input,"success", false);
            return true;
        }else{
            createMsg(input,"error", "Requerido!");
            return false;
        }
    },
    email:function(input){
        removeMsg(input);
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value)){
            createMsg(input,"success", false);
            return true;
        }else{
            createMsg(input,"error", "O email nao e valido!");
            return false;
        }
    }
}

function validator(input){
    for(property in config.elements[input.name]){
        let response=validateProperty[property](input);
        if(response!=config.elements[inputName][property]){
            return false;
            break;
        }
    }  
    return true;
}

function validateEvent(event){
    let input=event.target;
    validator(input)  
}

function submit(){
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"']");
        if(validator(input)===false){
            input.focus();
            return false;
            break;
        }
    }

}

document.addEventListener("DOMContentLoaded",function(){
    //create events validate all inputs
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"']");
        input.addEventListener("keyup", validateEvent);
        input.addEventListener("focusout", validateEvent);
    }


});

var buttonSubmit=document.querySelector("#submitContato");
buttonSubmit.addEventListener("click",submit);

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
            required:true,
            nome:true
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
    },
    nome:function(input){
        removeMsg(input);
        var regex=new RegExp("^[a-zA-Z]+$");
        if (regex.test(input.value)) {
            createMsg(input,"success", false);
            return true;
        } else {
            createMsg(input,"error", "O nome nao e valido!");
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

function disabledInputs(value){
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"']");
        input.disabled=value;
    }
}

function clearInputs(){
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"']");
        removeMsg(input);
        input.value="";
    }
}

function submit(event){
    event.preventDefault();
    /*//disable all inputs 
    event.target.disabled=true;
    disabledInputs(true);
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"']");
        if(validator(input)===false){
            disabledInputs(false);
            event.target.disabled=false;
            input.focus();
            return false;
            break;
        }
    }
    disabledInputs(false);
    event.target.disabled=false;
    clearInputs();*/


    let modal=document.querySelector(".modal");

    modal.classList.remove("modal-hide");
    modal.classList.add("modal-show");

    let titleModal=document.querySelector(".modal .header .title");
    titleModal.textContent="";

    let bodyModel=document.querySelector(".modal .body h3");
    bodyModel.textContent="Você será contactado em breve...!";
}

function modalClose(){
    let modal=document.querySelector(".modal");
    modal.classList.remove("modal-show");
    modal.classList.add("modal-hide");
}

function modalCloseModal(event){
    if (event.target.classList.contains("modal")) {
        let modalClass=event.target.classList;
        modalClass.remove("modal-show");
        modalClass.add("modal-hide");        
    }
}

function activeMenuAmburger(event){
    let tag=document.querySelector(".btn-menu-apps");
    let nav=document.querySelector(".header-nav nav");
    if(tag.classList.contains("btn-menu-apps-active")){
        tag.classList.remove("btn-menu-apps-active");
        nav.classList.remove("nav-active");
    }else{
        tag.classList.add("btn-menu-apps-active");
        nav.classList.add("nav-active");
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

var modalCloseBtn=document.querySelectorAll(".modal-close");
modalCloseBtn.forEach((element)=>{
    element.addEventListener("click", modalClose);
});

let modal=document.querySelector(".modal");
modal.addEventListener("click", modalCloseModal);

//menu amburger
let menuAmburger=document.querySelector(".btn-menu-apps");
menuAmburger.addEventListener("click", activeMenuAmburger);
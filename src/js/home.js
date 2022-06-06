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
        },
        mensagem:{
            required:true,
            min:25
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

    },
    min:function(input, valor){
        removeMsg(input);
        if (input.value.length>(valor-1)) {
            createMsg(input,"success", false);
            return true;
        } else {
            createMsg(input,"error", `O mínimo de caracteres é ${valor} !`);
            return false;
        }
    }
}

function validator(input){
    for(property in config.elements[input.name]){
        let valor=config.elements[inputName][property];
        let response=validateProperty[property](input, valor);
        if(response===false){
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
        let input=document.querySelector("input[name='"+inputName+"'], textarea[name='"+inputName+"']");
        input.disabled=value;
    }
}

function clearInputs(){
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"'], textarea[name='"+inputName+"']");
        removeMsg(input);
        input.value="";
    }
}

function submit(event){
    event.preventDefault();
    //disable all inputs 
    event.target.disabled=true;
    disabledInputs(true);
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"'], textarea[name='"+inputName+"']");
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
    clearInputs();
    modalShow("", "Você será contactado em breve...!");
}

function modalShow(titulo, message){
    let titleModal=document.querySelector(".modal .header .title");
    titleModal.textContent=titulo;
    let bodyModel=document.querySelector(".modal .body h3");
    bodyModel.textContent=message;
    let modal=document.querySelector(".modal");
    modal.classList.remove("modal-hide");
    modal.classList.add("modal-show");
    modal.style.display="flex";
}

function modalClose(){
    let modal=document.querySelector(".modal");
    modal.classList.remove("modal-show");
    modal.classList.add("modal-hide");
    setTimeout(()=>{
        modal.style.display="none";
    },400);
    console.log("aqui1");
}

function modalCloseModal(event){
    if (event.target.classList.contains("modal")) {
        modalClose();    
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


function createTagsGithub(url, titulo, descricao, repositorio){ 
   let projectGit=document.querySelector(".project-git");
   let projectCard=document.createElement("div");
   let div=document.createElement("div");
   let logoGithub=document.createElement("ion-icon");
   let aTitulo=document.createElement("a");
   let hTitulo=document.createElement("h4");
   let p=document.createElement("p");
   switch (repositorio.toLowerCase()) {
       case "gitlab":
        logoGithub.setAttribute("name", "logo-gitlab");
           break;   
       default:
        logoGithub.setAttribute("name", "logo-github");
           break;
   }
   projectCard.setAttribute("class", "project-card");
   p.textContent=descricao;
   hTitulo.textContent=titulo;
   aTitulo.href=url;
   aTitulo.target="_blank";
   aTitulo.append(hTitulo);
   div.append(logoGithub);
   projectCard.append(div, aTitulo, p);
   projectGit.appendChild(projectCard);
}

function APIRepository(){
    fetch("https://api.github.com/users/renzovel/repos")
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        res.forEach((item)=>{
            createTagsGithub(
                item.html_url, 
                item.name, 
                item.description, 
                'github'
                );
        });
    })
    .finally(()=>{
        let projectGit=document.querySelector(".project-git");
        projectGit.classList.remove("loading-active");
    })
    .catch((erro)=>{
        console.error(erro);
    });
}


document.addEventListener("DOMContentLoaded",function(){
    //create events validate all inputs
    for(inputName in config.elements){
        let input=document.querySelector("input[name='"+inputName+"'], textarea[name='"+inputName+"']");
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



document.addEventListener("DOMContentLoaded", APIRepository);
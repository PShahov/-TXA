function openMenu(){
    var m = document.getElementById("menu");

    if(m.classList.contains("active")){
        m.classList.remove("active");
    }else{
        m.classList.add("active");
    }
}

function faqClick(e){
    if(e.classList.contains("active"))
        e.classList.remove("active");
    else
        e.classList.add("active");
}


function sendEmail(){
    var text = document.getElementById("mailer-input").value;
    if(text.length == 0){
        return;
    }
    const request = new XMLHttpRequest();
    
    const url = "postmail.php?mail=" + text;

    request.open('GET', url);

    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    
    request.addEventListener("readystatechange", () => {
        
        if (request.readyState === 4 && request.status === 200) {
        
        // выводим в консоль то что ответил сервер
        console.log( request.responseText );
        }
    });
    
    // Выполняем запрос 
    request.send();
}
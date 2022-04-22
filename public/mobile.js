function openMenu(){
    var m = document.getElementById("menu");

    if(m.classList.contains("active")){
        m.classList.remove("active");
    }else{
        m.classList.add("active");
    }
}
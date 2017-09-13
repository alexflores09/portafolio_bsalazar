$(document).ready(()=>{
    $('ul.tabs').tabs();
    $('.carousel').carousel();
    $("#frmContact").on("submit",(e)=>{
        e.preventDefault();
        $.ajax({
            type: "POST",
            url : "sendEmail.php",
            data : $("#frmContact").serialize(),
            dataType : "JSON",
            success : (data)=>{
                if(data.valido === 1){
                    const $toastContent = $(`<span>${data.msj}</span>`);
                    Materialize.toast($toastContent, 3000);
                    setTimeout(()=>{
                        location.reload(false);
                    },3000);
                }
                else{
                    const $toastContent = $(`<span>${data.msj}</span>`);
                    Materialize.toast($toastContent, 3000);
                }
            }
        });
    });
    getLogos();
    getPortafolio();
});

function getLogos(){
    const cont = $(".responsive-recomendaciones");
    $.ajax({
        type: "GET",
        url : "data/logos.txt",
        dataType : "JSON",
        beforeSend: ()=>{
            cont.html("");
        },
        success: (data)=>{
            $.each(data.logos,(key,val)=>{
                //<div class="center"><img src="img/soporte.jpg"></div>

                let divImage = $("<div></div>").addClass("center");cont.append(divImage);
                let image = $("<img />").attr({
                    "src": val,
                    "alt": "Empresa laborada"
                }).css("width","100%");divImage.append(image);
            });
            $('.responsive-recomendaciones').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: false
                        }
                    }
                ]
            });
        }
    });
}

function getPortafolio(){
    const contApps = $("#apps");
    const contImpresion = $("#impresion");
    const contVectores = $("#vectores");
    const contWebsite = $("#websites");
    $.ajax({
        type: "GET",
        url : "data/portafolio.txt",
        dataType : "JSON",
        beforeSend: ()=>{
            contApps.html("");
            contImpresion.html("");
            contVectores.html("");
        },
        success: (data)=>{
            $.each(data.apps,(key,val)=>{
                let card = $(getCard(val.img,val.name,val.desc,val.link));
                contApps.append(card);
            });
            $.each(data.revistas,(key,val)=>{
                let card = $(getCard(val.img,val.name,val.desc,val.link));
                contImpresion.append(card);
            });
            $.each(data.vectores,(key,val)=>{
                let card = $(getCard(val.img,val.name,val.desc,val.link));
                contVectores.append(card);
            });
            $.each(data.website,(key,val)=>{
                let card = $(getCard(val.img,val.name,val.desc,val.link));
                contWebsite.append(card);
            });
            $('.materialboxed').materialbox();
        }
    });
}

function getCard(img,name,desc,link){

    let content = "";
    let style = `style="max-height: 100%;"`;
    if(name != ""){
        let description = "";
        if(desc != ""){
            description = `
                <br>
                ${desc}
            `;
        }
        content = `
            <div class="card-content">
                <p>${name} ${description}</p>
            </div>
        `;
        style = `style="max-height: 60%;"`;
    }
    let cntLink = "";
    if(link != ""){
        cntLink = `
            <div class="card-action truncate">
                <a href="${link}" target="_blank">${link}</a>    
            </div>
        `;
        style = `style="max-height: 60%;"`;
    }

    const template = `
        <div class="col l3 m4 s12">
            <div class="card medium">
                <div class="card-image" ${style}>
                    <img src="${img}" class="materialboxed" />
                </div>
                ${content}
                ${cntLink}
            </div>
        </div>
    `;

    return template;
}
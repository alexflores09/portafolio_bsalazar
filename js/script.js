$(document).ready(()=>{
    $('ul.tabs').tabs();
    $('.carousel').carousel();

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
                    slidesToScroll: 1
                }
            }
        ]
    });

    $("#frmContact").on("submit",(e)=>{
        e.preventDefault();
        alert("aqui tengo que hacer el ajax a contacto")
    });
});
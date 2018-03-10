$(document).ready(function(){
    $('#cryptotable td.change').each(function(){
        if($(this).text().charAt(0) == '-'){
            $(this).css('color', '#0f0');
        } else {
            $(this).css('color', '#f00');
        }
    });
});
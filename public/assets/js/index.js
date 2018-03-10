$(document).ready(function(){
    $('#cryptotable td.change').each(function(){
        if($(this).text().charAt(0) == '-'){
            $(this).css('color', '#F44336');
        } else {
            $(this).css('color', '#4CAF50');
        }
    });
});
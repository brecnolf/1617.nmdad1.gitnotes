var Mobility = {
    $content: $('.content'),
    $form: $('form'),

    toggleLoading: function(){
        // Toggle loading indicator
        this.$content.toggleClass('content--loading');
         
        // Toggle the submit button so we don't get double submissions
        // http://stackoverflow.com/questions/4702000/toggle-input-disabled-attribute-using-jquery
        this.$form.find('button').prop('disabled', function(i, v) { return !v; });
    },
};
 
$(document).ready(function(){
    Mobility.$form.on('submit', function(e){
        e.preventDefault();
        Mobility.toggleLoading(); // call the loading function
    });
});
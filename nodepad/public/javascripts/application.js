$(document).ready(function(){

$('.destroy').click(function(e) {
	$.ajax({
	  url: $(this).attr('data-ref'),
	  type: 'DELETE',
	  success: function(response) {  location.reload(); }
	});
      
});

});
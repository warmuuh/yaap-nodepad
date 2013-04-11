$.put = function(url, data, success) {
  data._method = 'PUT';
  $.post(url, data, success, 'json');
};


$.del = function(url, success) {
  var data = {_method:'DELETE'};
  $.post(url, data, success, 'json');
  	
};



$(document).ready(function(){



	$('.destroy').click(function(e) {
		$.ajax({
		  url: $(this).attr('data-ref'),
		  type: 'DELETE',
		  success: function(response) {  location.reload(); }
		});
	      
	});



	$('#document-list li a').click(function(e) {
	  var li = $(this);

	  $.get(this.href, function(data) {
	    $('#document-list .selected').removeClass('selected');
	    li.addClass('selected');
	    $('#editor').val(data.data);
	    $('#editor').focus();
	  });

	  e.preventDefault();
	});



	$('#save-button').click(function() {
	  var id = $('#document-list .selected').attr('data-id'),
	      params = { data: $('#editor').val() };
	   
	  $.put('/documents/' + id , params, function(data) {
			//saved: flash notice
	  });
	});

	$('#add-document').click(function() {
		var title = window.prompt("Title","New Document");
		var doc = {title: title};
		$.post('/documents/', doc, function(data){
			location.reload();
		}, 'json');
	});
	
	
	$('#remove-document').click(function() {
		 var id = $('#document-list .selected').attr('data-id');
		$.del('/documents/'+id, function(data){
			location.reload();
		}, 'json');
	});

});




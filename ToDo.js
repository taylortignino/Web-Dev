//Check Off Todo w/ click
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//Click trashcan to delete a Todo
$("ul").on("click", "span", function(event){
	event.stopPropagation();
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
});

//Create a new Todo
$("input[type='text']").on("keypress", function(event){
	if(event.which===13){
		var todoText=$(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

//Hide Input
$("#plus").click(function(){
	$("input[type='text']").fadeToggle();
})
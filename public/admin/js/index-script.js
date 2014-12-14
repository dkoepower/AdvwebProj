

var isActionAuthAccepted = false;
var arraysToLink = [
		'./admin/html/intro/introduction.html',
		'./admin/html/main/stageSelect.html',
		'./admin/html/editors/intro.html'	
	];
	
$(document).ready(function(event){
	
	setTimeout(function(){
	
		try {
		$mask.css('left', $div.offset().left).css('top', $div.offset().top);
		$mask.animate(
			{
				width:0,
				left:'+=800',
				opacity:0
			},
			{
				duration:3000,
				queue:false,
				complete: function(e){
					//alert('loading done');
					isActionAuthAccepted = true;
					$(this).remove();
				}
			}
		);
		} catch (err){
			
		} finally {
			
		}
	
	}, 200);
	
	$('body').on("selectstart", function(event){ return false; });
    $('body').on("dragstart", function(event){ return false; });
	
	var $div = $('.background-div');
	$mask = $('.background-mask-div');
	
	
	$('.basic-select-slot div').each(function(index, item, array){
		$(this).on('click', function(e){
			if(isActionAuthAccepted){
				console.log(index);
				location.assign(arraysToLink[index]);
			}
		});
	});
	
});

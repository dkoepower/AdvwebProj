

$(document).ready(function(e){
	$('.page-navigator').css('opacity', '0');
	
	$('#background-container .left-bottom').animate(
		{
			left:10
		},
		{
			duration:500,
			queue:false,
			complete:function(){
				$(this).animate(
						{
							left:0
						},
						{
							duration:200,
							queue:false,
							complete:function(){
								setTimeout(onloadedTask, 200);
							}
						}
					);
			}
		}
	);
	// setUserEvents();
	updateBatchLayout();
	isBatchUpdateOk = true;
});

//override
function onloadedTask(){
	setUserEvents();
	updateBatchLayout();
	$('.page-navigator').css('opacity', '0.8');
	$('.page-navigator').css('opacity', '');
	
	//setTimerCould();
}

$(window).resize(updateBatchLayout);

var isBatchUpdateOk = false;
var contentsArray = [
//		"url('data:image/jpeg;base64,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')",
//		"url('http://cfs15.tistory.com/image/3/tistory/2009/04/13/01/44/49e21a63b5ad5')",
//		"url('http://static.giantbomb.com/uploads/original/7/77428/1637677-bns1.jpg')"
		"url('../res/img/silhouette/howto.png')",
		"url('../res/img/silhouette/golf-silhouette.png')",
		"url('../res/img/silhouette/coolman.png')"
	];
var arraysToLink = [
		'./html/intro/introduction.html',
		'./html/main/stageSelect.html',
		'./html/editors/intro.html'	
	];
//override
function updateBatchLayout(){
		
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	console.log(windowWidth, windowHeight);
	var baseTargetWidth = 700;
	var baseTargetHeight = 664;
	var baseWidth = 1920;
	var baseHeight = 1200;
	var baseWRatio = baseTargetWidth/1920;
	var baseHRatio = baseTargetHeight/1200;
		
	var realWidth = windowWidth * baseWRatio;
	var realHeight = windowHeight * baseHRatio;
	
	var $pNav = $('.page-navigator');
	
	$pNav.css('width', realWidth);
	$pNav.css('height', realHeight);
	
	if(isBatchUpdateOk)
		$pNav.css('margin-left', (windowWidth - parseInt($pNav.css('width')))/2);
	
	$pNav.css('margin-top', (windowHeight - parseInt($pNav.css('height')))/2 - 100);
	
	if(isBatchUpdateOk)
		$('.basic-select-slot').each(function(index, item, arr){
			$(this).css('margin-left', 70*(index * index%2));
		});
	
	var $sMan = $('.left-bottom');
	var targetWidth = 427;
	var targetHeight = 640;
	baseWRatio = targetWidth/1920;
	baseHRatio = targetHeight/1200;//1080
	realWidth = windowWidth * baseWRatio;
	realHeight = windowHeight * baseHRatio;
	$sMan.css('width', realWidth).css('height', realHeight);
	
	
	var $screen = $('.screen-div');
	targetWidth = 1000;
	targetHeight = 600;
	baseWRatio = targetWidth/1920;
	baseHRatio = targetHeight/1200;
	realWidth = windowWidth * baseWRatio;
	realHeight = windowHeight * baseHRatio;
	$screen.css('width', realWidth).css('height', realHeight);
	
	//1485/954
}

function setUserEvents(){
	$('.page-navigator').off().on('click', function(e){
//		if(parseInt($(this).css('margin-left')) != 10){
		if(!$(this).is('.nav-clicked')){
			$(this).addClass('nav-clicked').css('margin-left', '10%');
//			console.log($(this).css('margin-left', '10%'));
			setTimeout(function(){
				$('.contents-wrapper ul').css('display', 'block')
					.animate({opacity:1.0},
					{
						duration:500,
						queue:false,
						complete: function(){
							//$(this).css('display', 'block');
							$('.screen-div').css('display', 'block');
						}
					});
			}, 500);
			isBatchUpdateOk = false;
		} else {
			$(this).removeClass('nav-clicked');
			isBatchUpdateOk = true;
			updateBatchLayout();
			$('.screen-div').css('display', 'none');
			$('.contents-wrapper ul').animate({opacity:0.0},
				{
					duration:500,
					queue:false,
					complete:function(){
						$(this).css('display', 'none');
					}
				});
		}
	});
	
	$('.basic-select-slot').each(function(index, item, arr){
		$(this).on('mouseenter', function(e){
			// setTimeout(function(){
				$('.screen-div').append(
					$('<div></div>').css('background-image', contentsArray[index])
					.css('width', '100%')
					.css('height', '100%')
					.css('background-position', 'center center')
					.css('background-repeat', 'no-repeat')
					.css('background-size', 'contain')
					.css('position', 'absolute')
					.css('left', 0)
					.css('top', 0)
				);
				
				$('.explain-content-container').css('display', 'block')
				.find('.explain-content').eq(index)
				.css('display', 'block')
				.parent()
				.appendTo($('.screen-div'))
				;
			// }, 500);
		})
		.on('mouseleave', function(){
			 
			 $('.explain-content-container').css('display', 'none')
			 .find('.explain-content')
			 .css('display', 'none')
			 .parent()
			 .appendTo($('body'))
			 ;
			 $('.screen-div').empty();
		});
	});
	
	$('.basic-select-slot div').each(function(index, item, array){
		$(this).on('click', function(e){
			location.assign(arraysToLink[index]);
		});
	});
}

function setTimerCould(){
	setTimeout(function(){
		setInterval(function(){
			$('.cloud-mover1').animate(
				{
					left:'+=80'
				},
				{
					duration:5000,
					queue:false,
					complete:function(e){
						var max = $(window).width() + 400;
						if($(this).offset().left > max){
							$(this).css('left', '-400');
						}
					}
				}
			);
			$('.cloud-mover2').animate(
				{
					left:'-=50'
				},
				{
					duration:5000,
					queue:false,
					complete:function(e){
						var max = $(window).width() + 400;
						if($(this).offset().left > max){
							$(this).css('left', '-400');
						}
					}
				}
			);
			$('.cloud-mover3').animate(
				{
					left:'+=200'
				},
				{
					duration:5000,
					queue:false,
					complete:function(e){
						var max = $(window).width() + 400;
						if($(this).offset().left > max){
							$(this).css('left', '-400');
						}
					}
				}
			);
		}, 5000);
	}, 100);
}

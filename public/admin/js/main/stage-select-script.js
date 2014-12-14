

var isVerticalSlide = false;
var isBatchUpdateOk = false;

var slotWidth = 310;

$(document).ready(function(e){
	updateBatchLayout();
//	isBatchUpdateOk = true;
});
$(window).resize(updateBatchLayout);
//override
function onloadedTask(){
	//setBackgroundURL('../../../res/img/golf06.png');
	if(localStorage){
		
		$.each($('.image-outer'), function(index, item, array){
			if(localStorage.getItem("openstatus"+index) == "OK"){
				$(this).removeClass('lock').addClass('unlock');
			}
		});
		
	}
	
	$('.left-bottom').on('click', function(e){
//		history.back();
		location.assign('../../design_test.html');
	});
	
	$('.stage-ul-wrapper').animate(
		{left:427}
		,{
			duration:1000,
			queue:false,
			complete:function(){
				// console.log($('.stage-slot').first().offset().left);
			}
		}
	)
	.on('mousewheel', function(e){
		var event = e.originalEvent;
			var deltaY = event.wheelDelta;
		//console.log(e);
		if(isVerticalSlide) {
			//console.log(deltaY);
			// console.log($('.ul-list').find('.stage-slot').last().offset().top+300-50-100);
			if(deltaY > 0) { //올라가
				if($('.ul-list').find('.stage-slot').last().offset().top+150 > 50)
					$('.ul-list').css('top', '-=50');
			} else {		//내려가
				if(parseInt($('.ul-list').css('top')) < 0){
					$('.ul-list').css('top', '+=50');	
				}
			}
		} else {
			//console.log($('.ul-list').offset().left);
			var left = $('.ul-list').offset().left; //init is 427
			if(deltaY < 0) { //왼쪽
				 // if(left > 427)
				 if($('.ul-list').find('.stage-slot').last().offset().left > 477)	//이 427은 좌측 인간 기준. 477은 여유분.. 50픽셀을 이동하므로 이에 대한 보정값.
					// $('.ul-list').css('left', '-=50');
					$('.ul-list').stop(true, true).animate({
							left : '-='+slotWidth//'-=310'
						},
						{
							duration:200,
							queue:false,
							complete:function(){
								if($(this).find('.stage-slot').last().offset().left < 427)
									// $(this).css('left', '+=310');
									$(this).animate(
										{
											left:'+='+slotWidth
										},
										{duration:500, queue:false}
									);
							}
						}
					);
			} else {		//오른쪽
				// if(parseInt($('.ul-list').css('top')) < 0){
					if(left < 427)
					// $('.ul-list').css('left', '+=50');
						$('.ul-list').stop(true, true).animate({
								left : '+='+slotWidth
							},
							{
								duration:200,
								queue:false,	
								complete:function(){
									if($(this).offset().left > 427)
										//$(this).css('left', '-=310');
										$(this).animate(
											{
												left:'-='+slotWidth
											},
											{duration:500, queue:false}
										);
								}
							}
						);	
				// }
			}
		}
	});
	// .scroll(function(event){
		// console.log(event);
	// });
	
	$('.stage-slot').on('click', function(e){
		
		var $me = $(this);
		if($(this).find('.image-outer').is('.lock')){
			setMessageBoxMessage("아직 슬롯을 열지 않으셨어요.", "이보세요..");
			showMessageBox(1000, 400);
			return false;
		}
		setMessageBoxMessage("출발합니다!", "갑니다!");
		showMessageBox(400, 100);
		$('.left-bottom').animate(
			{
				left:'-427'
			},
			{
				duration:400,
				queue:false,
				complete:function(){
					//do location moving.
					location.assign('./playStage.html'+'?nstype='+$me.attr('data-index'));
				}
			}
		);
	});
}

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
	baseHRatio = targetHeight/1200;
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
	
	var $stageSlot = $('.stage-slot');
	targetWidth = 300;
	targetHeight = 700;
	baseWRatio = targetWidth/1920;
	baseHRatio = targetHeight/1200;
	realWidth = windowWidth * baseWRatio;
	realHeight = windowHeight * baseHRatio;
	$stageSlot.css('width', realWidth).css('height', realHeight);
	//console.log(realWidth);
	slotWidth = realWidth+10;
	if(!isVerticalSlide) {
		$('.stage-slot').css('position', 'absolute')
		.each(function(index, item, arr){
			$(this).css('left',
				index*slotWidth
			);
		});
	}
	$('.stage-ul-wrapper .ul-list').css('left', '0');
	$('.stage-ul-wrapper').css('height', realHeight+5);
}
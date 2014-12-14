
var isPlaying = true;
var parameters;

$(document).ready(function(e){
	setTimeout(function(){
	
		$('#page_wrapper').css('display', 'block');
		$('#loading_wrapper').css('display', 'none');
	
	}, 200);
	
	parameters = location.search.substring(1);
	parameters = parameters.split('&');
	var temp = {};
	if(parameters[0].split('=').length == 1){
		parameters = temp;
	} else {
		for(var i in parameters){
			var k = parameters[i].split('=');
			console.log(k);
			temp[k[0]] = k[1];
		}
		parameters = temp;
	}
	// var height = screen.availHeight-100;
// 	
// 	
	// $('#background-container').css('height', height);
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
	$('body').on("selectstart", function(event){ return false; });
    $('body').on("dragstart", function(event){ return false; });
	$('.sound-stopper').on('click', function(e){
		if(isPlaying) {
			$(this).css('background-image', 'url("../res/img/sound-off.png"), url("../../../res/img/sound-off.png")')
			.css('background-position', 'center center')
			.css('background-repeat', 'no-repeat')
			;
			$('#zik').trigger("pause");
			isPlaying = false;
			localStorage.setItem("sound-play", "none");
		} else {
			$(this).css('background-image', 'url("../res/img/sound-on.png"), url("../../../res/img/sound-on.png")')
			.css('background-position', 'center center')
			.css('background-repeat', 'no-repeat')
			;
			$('#zik').trigger("play");
			isPlaying = true;
			localStorage.removeItem("sound-play");
		}
	});
	
	if(localStorage){
		//localStorage.clear();
		var flag = localStorage.getItem('sound-play');
		console.log(flag);
		if(flag){
			isPlaying = false;
			$('.sound-stopper').css('background-image', 'url("../res/img/sound-off.png"), url("../../../res/img/sound-off.png")')
			.css('background-position', 'center center')
			.css('background-repeat', 'no-repeat')
			;
		} else {  //재생가능
//			https://dev.naver.com/svn/advanced
			isPlaying = true;
		}
	}
	
//	isPlaying = true;
	if(isPlaying)
		$('#zik')[0].play();
	$('#zik')[0].addEventListener('ended', loopZic, false);
});

function onloadedTask(){
}
$(window).resize(updateBatchLayout);

function updateBatchLayout(){
}
function loopZic(){
	var zikmu = $('#zik')[0];
	zikmu.currentTime = 0;
	zikmu.play();
}


/***************************************************************************
*
* common api
*
***************************************************************************/

/**
 * message box api
 */

function setMessageBoxMessage(msg, title){
	var $msgContainerContents = $('#message_send_container .box-body .contents-msg');
	$msgContainerContents.html(msg);
	$msgContainerContents.parent().parent().find('.box-title').text(title);
}

function showMessageBox(duration, ms, callback){
	var gap = ms;
	if(!gap){
		gap = 400;
	}
	var $msgContainer = $('#message_send_container');
	
	$msgContainer.css('display', 'block');
	$msgContainer.fadeIn(gap, function(){
		var me = $(this);
		if(duration >= 0){
			setTimeout(function(es) {
//				me.fadeOut(gap, function(e){
//					me.css('display', 'none');
//					if(callback){
//						//try {
//							callback();
//						//} catch (e){
//						//	console.log(e);
//						//} finally {
//							
//						//}
//					}
//				});
				hideMessageBox(callback);
			}, duration);
		}
	});
}

function hideMessageBox(callback){
	var $msgContainer = $('#message_send_container');
	$msgContainer.css('display', 'none');
	if(callback){
		//try {
			callback();
		//} catch (e){
		//	console.log(e);
		//} finally {
			
		//}
	}
}

/**
*  instrunction-positioner api
*/

function setHelpMessage(msg){
	$('.instruction-positioner').text(msg);
}

/**
 * change main background iamge;
 * @param url
 */
function setBackgroundURL(url, size, sizable){
	$('body').css('background', 'url("'+url+'")')
//	.css('background-size', size)
//	.css('background-repeat', 'no-repeat')
	.css('background-position', '0 0')
	;
	
	if(sizable){
		$('body').css('background-size', size)
	}
}

/**
 * setImagePopup()
 * @param img
 * @param duration
 * @param ms
 * @param callback
 */
function showImagePopup(imgURL, duration, ms, callback){
	var gap = ms;
	if(!gap){
		gap = 400;
	}
	var $msgContainer = $('#image_send_container');
	var $img = $msgContainer.find('.img-contents').attr('src', imgURL);
	$msgContainer.css('display', 'block');
	$msgContainer.fadeIn(gap, function(){
		var me = $(this);
		if(duration >= 0){
			setTimeout(function(es) {
				me.fadeOut(gap, function(e){
					me.css('display', 'none');
					if(callback){
						//try {
							callback();
						//} catch (e){
						//	console.log(e);
						//} finally {
							
						//}
					}
				});
				$img.attr('src', '');
			}, duration);
		}
	});
}
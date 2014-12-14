/********************************************************************

 * POINT
 * 
 ********************************************************************/

function MPoint(x, y) {
	this.x = x;
	this.y = y;
}

MPoint.prototype.setPoint = function(mpoint){
	this.x = mpoint.x;
	this.y = mpoint.y;
}

MPoint.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
}

MPoint.prototype.setX = function(x){
	this.x = x;
}

MPoint.prototype.setY = function(y){
	this.y = y;
}

/********************************************************************

 * EFFECTCANVASCONTROLLER
 * 
 * 
 * 
 * 
 ********************************************************************/

function EffectCanvasController(canvas){
	this.canvas = canvas;
	this.stage = new createjs.Stage(canvas);
	this.isEffectOn = false;
	var eflag = this.isEffectOn;
	this.stage.on("tick", function(e){ //it is fired when it's update called.
		//console.log('hi');
//		console.log(eflag);
		if(!eflag){
			return false;
		}
	});
}

EffectCanvasController.prototype.update = function(){
	this.stage.update();
}


/*******************************************************************
 * 
 * CANVASINFO
 * 
 * 
 ******************************************************************/

function CanvasInfoContainer(canvas, canvasDebug, effectCanvas) {
	if(!canvas){
		throw "NO CANVAS";
		return false;
	}
	this.context = canvas.getContext('2d');
	this.stage = new createjs.Stage(canvas);
	this.stageDebug = canvasDebug;
	this.dragCont = new DragController($(canvas).offset().left, $(canvas).offset().top);
	this.effectCanvas = new EffectCanvasController(effectCanvas);
	this.isPause = false;
	this.isControllTime = false;
	this.isEventFired = false;
	this.isAttachMode = false;
	this.isBallFired = false;
	this.isGameOver = false;
	this.framerate = 60;
	var xspeed = 0.3;
	this.spritedata = new createjs.SpriteSheet({
		"framerate" : 12,
        "images": [loader.getResult("golfer")],
        "frames": { "regX": 46, "height": 90, "count": 39, "regY": 65, "width": 90 },
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": { "idle": [0, 8, "idle", xspeed],
        				"swfd": [9, 17, "swbk", xspeed],
        				"swbk": [18, 24, "stop", xspeed],
        				"stop": [24, 24, "lagh", xspeed*0.5],
        				"lagh": [25, 38, "lagh", xspeed]}   // jump후엔 run, run 후에 run(loop)
    });
//	console.log(this.spritedata);
	this.golfer = new createjs.Sprite(this.spritedata, "idle");
//	console.log(this.golfer);
//	this.golfer.setTransform(-200, h - 310, 0.8, 0.8);     // 초기 x값이 -200이므로 처음에 화면에서 안보이다가 나타남.
	this.golfer.x = 0;//;30//stgInterface.golfBall.GetPosition().x;
	this.golfer.y = 0;//190;//stgInterface.golfBall.GetPosition().y;
	this.golfer.framerate = 12;

//	this.golfer.on("mousedown", handleJumpStart);
    // grant.crossOrigin = "Anonymous";

    this.stage.addChild(this.golfer);

	
	console.log($(canvas).offset());
	this.stageEventOn();
}

CanvasInfoContainer.prototype.setCharacterPos = function(x, y){
	this.golfer.x = x-25;
	this.golfer.y = y+5;
}

CanvasInfoContainer.prototype.getContext = function(){
	return this.context;
}

/**
 * you could use MouseEvent's properties.
 * @type String
	- The event type. : 이벤트 종류.

	@bubbles Boolean
	- Indicates whether the event will bubble through the display list. : 자손 이벤트 전달

	@cancelable Boolean
	- Indicates whether the default behaviour of this event can be cancelled. : 기본 이벤트 동작

	@stageX Number
	- The normalized x position relative to the stage. : 정규화된 x 좌표
	
	@stageY Number
	- The normalized y position relative to the stage. : 정규화된 y 좌표
	
	@nativeEvent MouseEvent
	- The native DOM event related to this mouse event. : 원본 이벤트 객체
	
	@pointerID Number
	- The unique id for the pointer. : 포인터 아이디
	
	@primary Boolean
	- Indicates whether this is the primary pointer in a multitouch environment. : 뭐야.. 모바일전용
	
	@rawX Number
	- The raw x position relative to the stage. : 상대 x 위치
	
	@rawY Number
	- The raw y position relative to the stage. : 상대 y 위치
 */
CanvasInfoContainer.prototype.stageEventOn = function(){
	var stag = this.stage;
	var dcon = this.dragCont;
	var caninfo = this;
	function mouseDowned(e){
		if(caninfo.isPause || !caninfo.isControllTime) return;
		
		
		dcon.setBaseXY($(stag.canvas).offset().left, $(stag.canvas).offset().top)
		dcon.startDrag(e);
		if(stgInterface.isPointOnTheBall(dcon.startX, dcon.startY)){
			var shape = new createjs.Shape();
			//shape.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
			caninfo.effectCanvas.stage.addChild(shape);
			caninfo.isEventFired = true;
			window.count = 20;
		}
//		var fixDef = new box2d.b2FixtureDef();
//		fixDef.density = 1;
//		fixDef.friction = 0.5;
//		fixDef.restitution = 0.5;
//		var bodyDef = new box2d.b2BodyDef();
//		bodyDef.type = box2d.b2Body.b2_dynamicBody;
//		bodyDef.position.x = Math.random()*canvasWidth /SCALE;
//		bodyDef.position.y = 0 /SCALE;
//		fixDef.shape = new box2d.b2CircleShape(Math.random()*100 / SCALE);
//		world.CreateBody(bodyDef).CreateFixture(fixDef);
	}
	function mouseMoved(e){
		if(caninfo.isPause || !caninfo.isControllTime) return;
		dcon.updateDrag(e);
		/*console.log('start', dcon.startX, dcon.startY, dcon.baseX, dcon.baseY,
				'delta', dcon.getQuickDeltaX(), dcon.getQuickDeltaY(),
				'DELTA', dcon.getWholeDeltaX(), dcon.getWholeDeltaY(),
				'Rotation', dcon.getQuickRotation(), dcon.getWholeRotation());*/
		
		if(caninfo.isEventFired){
			var child=caninfo.effectCanvas.stage.getChildAt(0);
			caninfo.maxXScale = Math.min(Math.abs(dcon.getWholeDeltaX()), 100*Math.abs(Math.cos(dcon.getWholeRotation()*Math.PI/180)));
			(dcon.getWholeDeltaX() > 0)?(0):(caninfo.maxXScale*=-1);
			caninfo.maxYScale = Math.min(Math.abs(dcon.getWholeDeltaY()), 100*Math.abs(Math.sin(dcon.getWholeRotation()*Math.PI/180)));
			(dcon.getWholeDeltaY() > 0)?(0):(caninfo.maxYScale*=-1);
			
			if(child){
				child.graphics.clear()
				.beginStroke('rgba(0,0,0,0.5)')
				//.drawRect(dcon.startX, dcon.startY, dcon.getWholeDeltaX(), dcon.getWholeDeltaY());
				.moveTo(dcon.startX, dcon.startY)
				.lineTo(dcon.startX + caninfo.maxXScale, dcon.startY + caninfo.maxYScale);
			}
		}
		
		if(caninfo.isAttachMode){
			if(!window.b){
				window.b = new box2d.b2Vec2((e.offsetX) / SCALE, (e.offsetY)/SCALE);
				
			} else {
				window.b.Set((e.offsetX) / SCALE, (e.offsetY)/SCALE);
			}
			console.log((e.offsetX) / SCALE, (e.offsetY)/SCALE);
			stgInterface.golfBall.SetPosition(b);
		}
	}
	
	function mouseUpped(e){
		if(caninfo.isPause || !caninfo.isControllTime) return;
		dcon.endDrag(e);
		if(caninfo.isEventFired){
			var powerMulti = 5;
			caninfo.effectCanvas.stage.removeAllChildren();
			
			if(isNaN(caninfo.maxXScale)) caninfo.maxXScale = 0;
			if(isNaN(caninfo.maxYScale)) caninfo.maxYScale = 0;
			
			console.log(caninfo.maxXScale, caninfo.maxYScale);
			
//			caninfo.maxXScale = Math.max(Mcaninfo.maxXScale, 1);
//			caninfo.maxYScale = Math.max(caninfo.maxYScale, 1);
//			caninfo.isControllTime = false;  //계속 칠 수 있음.
			caninfo.isControllTime = false;
			caninfo.isBallFired = true;
			//stgInterface.golfBall.ApplyImpulse(new box2d.b2Vec2(caninfo.maxXScale / SCALE * powerMulti, caninfo.maxYScale / SCALE * powerMulti), stgInterface.golfBall.GetWorldCenter());
			console.log(stgInterface.golfBall.GetPosition());
			caninfo.isEventFired = false;
			
			caninfo.golfer.gotoAndPlay("swfd");
			
		}
//		var img = new Image();
//		img.src = "../../../res/img/oncanvas/candygirl.png";
////		setBackgroundURL('../../../res/img/oncanvas/candygirl.png');
//		$(img).on('load', function(es){
//			var bitmap = new createjs.Bitmap(this);
//			console.log(stag, e);
//			bitmap.x = e.pageX - $(stag.canvas).offset().left;//e.originalEvent.offsetX;//e.rawX;
//			bitmap.y = e.pageY - $(stag.canvas).offset().top;//e.originalEvent.offsetY;//e.rawY;
//			bitmap.regX = bitmap.regY = 50;
//			stag.addChild(bitmap);
//			stag.update();
//		});
	}
	
	this.stage.on('mousedown', mouseDowned);
	$(this.stageDebug).on('mousedown', mouseDowned);
	this.stage.on('mousemove', mouseMoved);
	$(this.stageDebug).on('mousemove', mouseMoved);
	this.stage.on('mouseup', mouseUpped);
	$(this.stageDebug).on('mouseup', mouseUpped);
	
	$(document).on('keydown', function(e){
		console.log(e.keyCode);
		switch(e.keyCode){
			case 32: //SPACE
				caninfo.isAttachMode = !caninfo.isAttachMode;
				break;
			case 65://A
				console.log(stgInterface.golfBall.GetPosition());
				break;
			case 66://B
				console.log(caninfo.isControllTime, window.initCount, window.count);
				break;
			case 68://D
				window.isDebugDrawOk = !window.isDebugDrawOk;
				caninfo.stageDebug.getContext('2d').clearRect(0,0,canvasWidth, canvasHeight);
				break;
			case 82://R
				$('.restart').trigger('click');
				break;
			case 76://L
				if(!localStorage.getItem('local')){
					localStorage.setItem('local', 'true');
					console.log('local on');
				} else {
					localStorage.removeItem('local');
					console.log('local off');
				}
				break;
			case 84://T
				window.initCount = 1;
				canInfo.isControllTime = false;
//				window.count = 20;
				break;
			case 80://P
				caninfo.isPause = !caninfo.isPause;
				break;
			default:
				break;
		}
	});
	
	createjs.Ticker.setFPS(this.framerate);
	createjs.Ticker.useRAF = true;
}

CanvasInfoContainer.prototype.applyImpluse = function(){
	var powerMulti = 5;
	this.effectCanvas.stage.removeAllChildren();
	
	if(isNaN(this.maxXScale)) this.maxXScale = 0;
	if(isNaN(this.maxYScale)) this.maxYScale = 0;
	stgInterface.golfBall.ApplyImpulse(new box2d.b2Vec2(this.maxXScale / SCALE * powerMulti, this.maxYScale / SCALE * powerMulti), stgInterface.golfBall.GetWorldCenter());
}

CanvasInfoContainer.prototype.setTickHandlerFunction = function(callback){
	createjs.Ticker.addEventListener("tick", callback);
	this.stage.on('tick', function(e){
		if(this.isPause) return;
//		console.log(e);
	});
}

/**
 * update 안하면 어느것도 그려지지 않는다.
 * 자신의 tick 메서드가 호출되지 않는다.
 */
CanvasInfoContainer.prototype.update = function(){
	this.stage.update();
	this.effectCanvas.update();
}
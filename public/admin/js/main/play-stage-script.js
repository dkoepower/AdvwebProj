/**
 * 
 */

$(document).ready(function(e){
	box2d = {
		   b2Vec2 : Box2D.Common.Math.b2Vec2,
		   b2BodyDef : Box2D.Dynamics.b2BodyDef,
		   b2Body : Box2D.Dynamics.b2Body,
		   b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
		   b2Fixture : Box2D.Dynamics.b2Fixture,
		   b2World : Box2D.Dynamics.b2World,
		   b2MassData : Box2D.Collision.Shapes.b2MassData,
		   b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
		   b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
		   b2DebugDraw : Box2D.Dynamics.b2DebugDraw
		};
	SCALE = 30;
	canvasWidth = 1000;
	canvasHeight = 644;
	onloadedTask();
	updateBatchLayout();
	
	$('.pause').on('click', function(e){
		if(canInfo.isPause == false)
			canInfo.isPause = true;
		else
			canInfo.isPause = false;
	});
	
	$('.restart').on('click', function(e){
		location.reload();
	});
	
	$('.menu-exit').on('click', function(e){
		location.assign('./stageSelect.html');
	});
});

//override 
function onloadedTask(){
	var duration = 2000;
	var gap = 400;
	setMessageBoxMessage("now Loading...", "Please wait");
	manifest = [
                { src: "../../../res/spr/set/real.png", id: "golfer" },
                { src: "../../../res/img/oncanvas/grass.png", id: "grass" },
                { src: "../../../res/img/oncanvas/golfball.png", id: "golfball" },
                { src: "../../../res/img/oncanvas/redflag.png", id: "flag" },
                { src: "../../../res/스프라이트/이펙트/expolsive.png", id: "expl" },
                { src: "../../../res/스프라이트/이펙트/animation_fire007loop.png", id: "portal" },
                { src: "../../../res/스프라이트/이펙트/heal_001.png", id: "heal" },
                { src: "../../../res/스프라이트/이펙트/L15_Burner_.png", id: "flyingFire" },
                { src: "../../../res/스프라이트/이펙트/L41_Aero.png", id: "spiral1" },
                { src: "../../../res/스프라이트/이펙트/L43_Mach_Five.png", id: "spiral2" },
                { src: "../../../res/스프라이트/이펙트/L48_Healing.png", id: "spiral3" },
                { src: "../../../res/스프라이트/이펙트/pa.png", id: "spiral4" },
                { src: "../../../res/스프라이트/이펙트/L44_Gale.png", id: "spiral5" },
                { src: "../../../res/img/oncanvas/stage4_rot.jpg", id: "bar" },
                { src: "../../../res/img/oncanvas/game stone.png", id: "gamestone" },
                { src: "../../../res/img/oncanvas/bubble.jpg", id: "bubblestone" },
                { src: "../../../res/img/oncanvas/stg1.png", id: "background1" },
                { src: "../../../res/img/oncanvas/stg2.png", id: "background2" },
                { src: "../../../res/img/oncanvas/stg3.png", id: "background3" },
                { src: "../../../res/img/oncanvas/stg4.jpg", id: "background4" },
                { src: "../../../res/img/oncanvas/stg5.jpg", id: "background5" },
                { src: "../../../res/img/oncanvas/stg6.jpg", id: "background6" },
                { src: "../../../res/img/oncanvas/stg7.jpg", id: "background7" },
                { src: "../../../res/img/oncanvas/propel.jpg", id: "propel" },
                { src: "../../../res/img/oncanvas/magma.png", id: "magma" },
                { src: "../../../res/스프라이트/이펙트/flame.png", id: "flame" },
                { src: "../../../res/img/oncanvas/stg6_propel.jpg", id: "propel6" },
                { src: "../../../res/img/oncanvas/stg6_bubble.jpg", id: "bubble6" },
                { src: "../../../res/img/oncanvas/stg6_soul.jpg", id: "soul6" },
                { src: "../../../res/img/oncanvas/stg6_11.jpg", id: "lever" },
                { src: "../../../res/img/oncanvas/stg6_3.jpg", id: "pole" },
                
//                { src: "parallaxHill2.png", id: "hill2" }
            ];
	 loader = new createjs.LoadQueue(false);
	 showMessageBox(-10, 1000, function(){
			parseURL();
			requestDataToServer();
			settingStage();
			initCanvas();
		});
     loader.addEventListener("complete", function(e){
//    	 hideMessageBox(function(){
//			parseURL();
//			requestDataToServer();
//			settingStage();
//			initCanvas();
//		});
    	 showMessageBox(1000, 1000, function(){
 			parseURL();
 			requestDataToServer();
 			settingStage();
 			initCanvas();
 		});
     });   // complete: fired when a queue completes loading all files
     loader.loadManifest(manifest);                          // add multiple files at a time using a list

	
//	setBackgroundURL('http://imgs.mi9.com/uploads/fine-art/993/woman-silhouette_1280x1024_14399.jpg', 'cover');
//	setBackgroundURL('http://www.imgbase.info/images/safe-wallpapers/anime/anime_girls/25370_anime_girls_silhouette.jpg');
//	setBackgroundURL('http://www.wallpaperzzz.com/wallpapers/hd/hires/palm-tree-silhouette.jpg', 'cover', true);
//	setBackgroundURL('http://img3.wikia.nocookie.net/__cb20130917042406/legendsofthemultiuniverse/images/1/1a/Army_to_hell_wallpaper_3p6o4.jpg', 'cover', true)
//	setBackgroundURL('http://img11.hdwallpaper.net/wallpapers/0ced1ae6-girl-silhouette-trees-forest.jpg');
}

function parseURL(){
	
}

function requestDataToServer(){
	
}

function settingStage(){
	
}

//override
function updateBatchLayout(){
	
}

var count = 20;
var initCount = 1, drawOne = 1;
var isDebugDrawOk = false;
function tickHandler(event){
//	canInfo.stage.update();
	if(!canInfo.isPause){
		
		try {
				canInfo.update();
				if(isDebugDrawOk)
					world.DrawDebugData();
				
				stgInterface.step();
				
				world.Step(1/60, 10, 10);
			
			if(canInfo.golfer.currentFrame == 38 && count > 0){
				console.log('38 frame');
				count--;
				if(count == 0)
//					canInfo.golfer.stop();
					canInfo.golfer.gotoAndStop(37);
			}
			if(canInfo.explosionSpr && canInfo.explosionSpr.currentFrame >= 24){
				canInfo.explosionSpr.stop();
				canInfo.effectCanvas.stage.removeChild(canInfo.explosionSpr);
//				canInfo.effectCanvas.stage.removeChildAt(1);
				//canInfo.explosionSpr = undefined;
				delete canInfo.explosionSpr;
				canInfo.explosionSpr = undefined;
			}
			
			if(stgInterface.golfBall){
				 if(stgInterface.golfBall.GetLinearVelocity().x == 0
						 && stgInterface.golfBall.GetLinearVelocity().y == 0){
	//				 console.log('zero', canInfo.isControllTime);
	//				 canInfo.setCharacterPos(stgInterface.golfBall.GetPosition().x * SCALE,
	//						 stgInterface.golfBall.GetPosition().y * SCALE);
					 if(!canInfo.isControllTime && initCount >= 0){ //initCount 가 양수면 기회가 생기게 된다.
						 if(initCount > 0){
							 canInfo.isControllTime = true;
						 }
//						 initCount = 0;
						 initCount--;
						 canInfo.setCharacterPos(stgInterface.golfBall.GetPosition().x * SCALE,
								 stgInterface.golfBall.GetPosition().y * SCALE);
						 console.log('hioooooooooo', stgInterface.golfBall.GetPosition().x * SCALE, stgInterface.golfBall.GetPosition().y * SCALE);
					 }
					 if(!stgInterface.isClear && count <= 0 && !canInfo.isGameOver && !canInfo.isControllTime && initCount <= 0){
						 console.log('faile');
						 canInfo.isGameOver = true;
						 window.showImagePopup('../../../res/img/oncanvas/fail.png', 2000, 400, function(){ });
					 }
				 }
			}
			
			if(canInfo.isBallFired){
				if(canInfo.golfer.currentFrame == 22){
					var tempX = stgInterface.golfBall.GetPosition().x * SCALE;
					var tempY = stgInterface.golfBall.GetPosition().y * SCALE;
					console.log('explore!',tempX ,tempY);
//					canInfo.explosionSpr = createSprite("expl", 25, 192, 192, tempX, tempY-96	, 1, 1);
					canInfo.explosionSpr = createSprite("expl", 25, 192, 192, tempX, tempY, 0.7, 0.7);
//					canInfo.effectCanvas.stage.addChild(canInfo.explosionSpr);
//					canInfo.stage.addChild(canInfo.explosionSpr);
					canInfo.applyImpluse();
					canInfo.isBallFired = false;
					
					canInfo.effectCanvas.stage.addChild(canInfo.explosionSpr);
				}
			}
			
			if(drawOne == 1 && stgInterface.initComplete){
				stgInterface.drawAll(canInfo.stage);
				drawOne = 0;
				console.log("모두 초기화");
			}
			
			stgInterface.drawBall(canInfo.stage);
		}
		catch(e){
			canInfo.isPause = true;
			console.log(e);
		}
	}
//	world.ClearForces();
}

function initCanvas(){
	localStorage.setItem('local', true);
	starteMilliSeconds = new Date().getTime();
	world = new box2d.b2World(new box2d.b2Vec2(0, 50), true);
	canInfo = new CanvasInfoContainer($('#playcanvas')[0],
								$('#playcanvas_debug')[0],
								$('#effect_canvas')[0]);
	canInfo.setTickHandlerFunction(tickHandler);
	
	//create ground
//	var fixDef = new box2d.b2FixtureDef();
//	fixDef.density = 1;
//	fixDef.friction = 0.5;
//	var bodyDef = new box2d.b2BodyDef();
//	bodyDef.type = box2d.b2Body.b2_staticBody;
//	bodyDef.position.x = canvasWidth/2 /SCALE;
//	bodyDef.position.y = canvasHeight /SCALE;
//	fixDef.shape = new box2d.b2PolygonShape();
//	fixDef.shape.SetAsBox(canvasWidth/2 /SCALE, 20 /SCALE);
//	world.CreateBody(bodyDef).CreateFixture(fixDef);
//	var s6, s1;
	var stageArray = [StageInterface, s2(), s3(), s4(), s5(), s6(), s7()];
	stgInterface = new stageArray[parseInt(parameters.nstype)];//StageInterface();
	
	if(localStorage.getItem('local')){
		try {
		{
			var indexs = location.search.substring(1).split('=')[1];
			var urlObject = {};
			j = 0;
//			urlObject.url = '/admin/js/main/StageInterface3.js';
			urlObject.url = 'http://advancedwebprogramming.azurewebsites.net/main/playstage.html'+location.search;
			urlObject.type = 'get';
			urlObject.async = false;
			urlObject.success = function(data) { 
				j = data;  j = eval('('+j+')');
	//			console.log(data);
	//			console.log(j);
				var tempObject = j();
				var ins = new tempObject();
	//			console.log(typeof ins, ins);
				console.log('done');
				stgInterface = ins;
				
	//			stgInterface.initStage();
	//			world.SetContactListener(stgInterface.collisionCallback);
			};
			$.ajax(urlObject);
		}
		} catch(excep){
			console.log(excep);
		}
	}
	console.log('hi guys');
	stgInterface.initStage();
//	stgInterface.checkClear();
	world.SetContactListener(stgInterface.collisionCallback);
	
	
	debugDraw = new box2d.b2DebugDraw();
	debugDraw.SetSprite(canInfo.stageDebug.getContext('2d'));
//	setBackgroundURL('');
	debugDraw.SetFillAlpha(0.9);
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);

	world.SetDebugDraw(debugDraw);
	
}

function createSprite(id, count, width, height, x, y, xscale, yscale){
	var xspeed = 0.3;
	var spritedata = new createjs.SpriteSheet({
		"framerate" : 12,
        "images": [loader.getResult(id)],
        "frames": { "regX": width/2, "height": height, "count": 25, "regY": height/2, "width": width },
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": { "idle": [0, count-1, "idle", xspeed]}   // jump후엔 run, run 후에 run(loop)
    });
	var data = new createjs.Sprite(spritedata, "idle");
	data.x = x;
	data.y = y;
	data.scaleX = xscale;
	data.scaleY = yscale;
	
	return data;
}



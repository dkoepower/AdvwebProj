/**
*
* This is the main interface that i should implemet all of these method.
* It is because all other main routine use this method format everywhere needed. 
*
**/

function simp() {

StageInterface.prototype = new StageInterface_();
//StageInterface.prototype.constructor = StageInterface;
	
function StageInterface(object) {
	
//	this.base = StageInterface_;
//	this.base();
	this.collisionCallback = new Box2D.Dynamics.b2ContactListener();
	this.me = this;
	this.collisionCallback.BeginContact = function(contact){
		var golfBall = undefined;
		var golfHole = undefined;
		var hole = undefined;
		if( contact.GetFixtureA().GetBody().GetUserData() == 'golfBall' ){
			golfBall = contact.GetFixtureA().GetBody();
		} else if(contact.GetFixtureB().GetBody().GetUserData() == 'golfBall'){
			golfBall = contact.GetFixtureB().GetBody();
		}
		
		if( contact.GetFixtureA().GetBody().GetUserData() == 'hole' ){
			golfHole = contact.GetFixtureA().GetBody();
		} else if(contact.GetFixtureB().GetBody().GetUserData() == 'hole'){
			golfHole = contact.GetFixtureB().GetBody();
		}
		
		if(golfBall && golfHole){
			console.log("collision");
			if(!me.isClear){
				this.golfBall.SetLinearVelocity(new box2d.b2Vec2(0,0));
				window.showImagePopup('../../../res/img/oncanvas/clear.png', 2000, 400, function(){
					setMessageBoxMessage("단계를 클리어하셨습니다. 다음 단계로 이동합니다.", "축하합니다.");
					showMessageBox(3000, 1000, function(){
						if(localStorage){
							localStorage.setItem("openstatus"+(parseInt(parameters.nstype)+1), "OK");
							//$('.menu-exit').trigger('click');
							location.assign('./playStage.html?nstype='+(parseInt(parameters.nstype)+1));
						}
					});					
				});
				me.isClear = true;
			}
		}
		
		var keys = ['hole0', 'hole1', 'hole2', 'hole3', 'hole4', 'hole5'];
		var keyindex = 0;
		for(var i = 0; i < keys.length; i++){
			if( contact.GetFixtureA().GetBody().GetUserData() == keys[i] ){
				hole = contact.GetFixtureA().GetBody();
				keyindex = i;
				break;
			} else if(contact.GetFixtureB().GetBody().GetUserData() == keys[i]){
				hole = contact.GetFixtureB().GetBody();
				keyindex = i;
				break;
			}
		}
		
		if(golfBall && hole){
			var pos = [[20, 20], [187.5, 20], [375, 20], [562.5, 20], [750, 20], [937.5 , 20]];
			if(!me.isMoveTime){
				me.arrayToMovePos.set(pos[keyindex][0], pos[keyindex][1]);
				me.isMoveTime = true;
				golfBall.SetLinearVelocity(new box2d.b2Vec2(0, 0/SCALE));
			}
		}
	}
	this.collisionCallback.EndContact = function(contact){
	}
	this.collisionCallback.PreSolve = function(contact, oldManifold){
	}
	this.collisionCallback.PostSolve = function(contact, impulse){
		var golfBall = undefined;
		var golfHole = undefined;
		if( contact.GetFixtureA().GetBody().GetUserData() == 'golfBall' ){
			golfBall = contact.GetFixtureA().GetBody();
		} else if(contact.GetFixtureB().GetBody().GetUserData() == 'golfBall'){
			golfBall = contact.GetFixtureB().GetBody();
		}
		
		if( contact.GetFixtureA().GetBody().GetUserData() == 'hole' ){
			golfHole = contact.GetFixtureA().GetBody();
		} else if(contact.GetFixtureB().GetBody().GetUserData() == 'hole'){
			golfHole = contact.GetFixtureB().GetBody();
		}
		
		if(golfBall && golfHole){
			console.log("collision");
		} else {
		}
	}
}

StageInterface.prototype.initStage = function(obj){
	var fixDef = new box2d.b2FixtureDef();
	fixDef.density = 1;
	fixDef.friction = 0.2;
	var bodyDef = new box2d.b2BodyDef();
	bodyDef.type = box2d.b2Body.b2_staticBody;
	
	//아래
	bodyDef.position.x = canvasWidth/2 /SCALE;
	bodyDef.position.y = canvasHeight /SCALE;
	fixDef.shape = new box2d.b2PolygonShape();
	fixDef.shape.SetAsBox(canvasWidth/2 /SCALE, 10 /SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	//왼쪽
	bodyDef.position.x = canvasWidth/2*0-2.5 /SCALE;
	bodyDef.position.y = canvasHeight/2 /SCALE;
	fixDef.shape.SetAsBox(5/2 /SCALE, canvasHeight/2 /SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	//오른쪽
	bodyDef.position.x = canvasWidth /SCALE;
	bodyDef.position.y = canvasHeight/2 /SCALE;
	fixDef.shape.SetAsBox(5/2 /SCALE, canvasHeight/2 /SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	//위쪽
	bodyDef.position.x = canvasWidth/2 /SCALE;
	bodyDef.position.y = -21 /SCALE;
	fixDef.shape.SetAsBox(canvasWidth/2 /SCALE, 20 /SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	/******************************************************
	 * 
	 *  CUSTOM DRAWING AREA BEGIN
	 * 
	 * 
	 ******************************************************/
	{
	var bodyDef = new box2d.b2BodyDef();
	var fixDef = new box2d.b2FixtureDef();
	bodyDef.position.Set(0, 0);
	bodyDef.type = box2d.b2Body.b2_staticBody;
	fixDef.density = 1.0;
	fixDef.friction = 0.4;
	fixDef.shape = new box2d.b2PolygonShape();
	var point = [
	             new box2d.b2Vec2((canvasWidth/4-40) / SCALE, (canvasHeight-10) / SCALE),
	             new box2d.b2Vec2((canvasWidth/4-40) / SCALE, 400 / SCALE),
	             new box2d.b2Vec2((canvasWidth/4) / SCALE, (400) / SCALE),
	             new box2d.b2Vec2((canvasWidth/4) / SCALE, (canvasHeight-10) / SCALE)
	           ];
	fixDef.shape.SetAsArray(point, point.length);
	this.leftBody = world.CreateBody(bodyDef);
	this.leftBody.CreateFixture(fixDef);
	
	point = [	new box2d.b2Vec2((canvasWidth/4) / SCALE, (420) / SCALE),
	         	new box2d.b2Vec2((canvasWidth/4) / SCALE, (400) / SCALE),
	         	new box2d.b2Vec2((canvasWidth) / SCALE, (400) / SCALE),
	         	new box2d.b2Vec2((canvasWidth) / SCALE, (420) / SCALE)
    		];
	fixDef.shape.SetAsArray(point, point.length);
	this.leftBody.CreateFixture(fixDef);
	//left one
	
	point = [
	             new box2d.b2Vec2((canvasWidth*9/16) / SCALE, (canvasHeight-10) / SCALE),
	             new box2d.b2Vec2((canvasWidth*12/16) / SCALE, (500) / SCALE),
	             new box2d.b2Vec2((canvasWidth*13/16) / SCALE, (500) / SCALE),
	             new box2d.b2Vec2((canvasWidth*13/16) / SCALE, (canvasHeight-10) / SCALE)	             
	           ];
	
	fixDef.shape.SetAsArray(point, point.length);
	this.rightBody = world.CreateBody(bodyDef);
	this.rightBody.CreateFixture(fixDef);
	
	point = [
				new box2d.b2Vec2((canvasWidth*13/16) / SCALE, (550) / SCALE),
			    new box2d.b2Vec2((canvasWidth*13/16) / SCALE, (500) / SCALE),
			    new box2d.b2Vec2((canvasWidth*48/50) / SCALE, (500) / SCALE),
			    new box2d.b2Vec2((canvasWidth*19/20) / SCALE, (550) / SCALE)
			];
	fixDef.shape.SetAsArray(point, point.length);
	this.rightBody.CreateFixture(fixDef);
	
	
	var warmHoleBodyDef = new box2d.b2BodyDef();
	warmHoleBodyDef.type = box2d.b2Body.b2_kinematicBody;
	warmHoleBodyDef.position.Set(300 / SCALE, (canvasHeight-20)/SCALE);
	
	var warmHoleFixDef = new box2d.b2FixtureDef();
	warmHoleFixDef.isSensor = true;
	warmHoleFixDef.density = 0.4;
	warmHoleFixDef.friction= 1.0;
	warmHoleFixDef.shape = new box2d.b2CircleShape(10/SCALE);
	
	this.holes = [];
	var i = 1;
	
	this.holes[0] = world.CreateBody(warmHoleBodyDef);
	this.holes[0].CreateFixture(warmHoleFixDef);
	this.holes[0].SetUserData('hole0');
	
	warmHoleBodyDef.position.Set((20)/SCALE, (canvasHeight-20)/SCALE);
	this.holes[1] = world.CreateBody(warmHoleBodyDef);
	this.holes[1].CreateFixture(warmHoleFixDef);
	this.holes[1].SetUserData('hole'+i);
	
	for(i = 2; i < 6; i++){
		warmHoleBodyDef.position.Set((canvasWidth/16 * ((i-1)*3))/SCALE, 390/SCALE);
		this.holes[i] = world.CreateBody(warmHoleBodyDef);
		this.holes[i].CreateFixture(warmHoleFixDef);
		this.holes[i].SetUserData('hole'+i);
	}
	
	var bodyDefWall = new box2d.b2BodyDef();
	bodyDefWall.position.Set(900/SCALE, 200/SCALE);
	bodyDefWall.type = box2d.b2Body.b2_kinematicBody;
	
	var fixDefWall = new box2d.b2FixtureDef();
	fixDefWall.shape = new box2d.b2PolygonShape();
	fixDefWall.shape.SetAsBox(5/SCALE, 100/SCALE);
	
	this.wallBody = world.CreateBody(bodyDefWall);
	this.wallBody.CreateFixture(fixDefWall);
	this.wallBody.SetAngularVelocity(70/SCALE);
	
	}//end block;
	/******************************************************
	 * 
	 *  CUSTOM DRAWING AREA END
	 * 
	 * 
	 ******************************************************/
	
	var holeBodyDef = new box2d.b2BodyDef();
	holeBodyDef.position.x = (canvasWidth*15/16) / SCALE;
	holeBodyDef.position.y = (400) / SCALE;
	holeBodyDef.type = box2d.b2DynamicBody;
	var holeFixDef = new box2d.b2FixtureDef();
	holeFixDef.isSensor = true;
	holeFixDef.shape = new box2d.b2PolygonShape();
	holeFixDef.shape.SetAsBox(5/SCALE, 5/SCALE);
	
	this.holeBody = world.CreateBody(holeBodyDef);
	this.holeBody.CreateFixture(holeFixDef);
	this.holeBody.SetUserData('hole');
	
this.radius = 5.0 / SCALE;
	
	var ballBodyDef = new box2d.b2BodyDef();
	ballBodyDef.bullet = true;
	ballBodyDef.position.x = this.startBallPos.x / SCALE;
	ballBodyDef.position.y = this.startBallPos.y / SCALE;
	ballBodyDef.type = box2d.b2Body.b2_dynamicBody;
	var ballFixDef = new box2d.b2FixtureDef();
	ballFixDef.shape = new box2d.b2CircleShape(this.radius);
	ballFixDef.density = 2;
	ballFixDef.friction = 0.3;
	ballFixDef.restitution = 0.1;
	
	var FixDdef = new box2d.b2FixtureDef();
	FixDdef.shape = new box2d.b2PolygonShape();
	FixDdef.density = 2;
	FixDdef.friction = 0.4;
	FixDdef.restitution = 0.2;
	
	var points = [];
	
	for (var i = 0, j = 0; i < 360; i+= Math.round(360/64), j++) {
	    var vec = new box2d.b2Vec2();
	    vec.Set(this.radius * Math.cos(i*Math.PI/180), this.radius * Math.sin(i*Math.PI/180));
	    points[j] = vec;
	}
	
//	console.log(points);

	FixDdef.shape.SetAsArray(points, points.length);
	
	this.golfBall = world.CreateBody(ballBodyDef);
//	this.golfBall.CreateFixture(ballFixDef);
	this.golfBall.CreateFixture(FixDdef);
	this.golfBall.SetUserData('golfBall');
	
	this.initComplete = true;
}

StageInterface.prototype.drawAll = function(obj){
	//obj is stage.
	var stage = obj;
	
	var grass = new createjs.Shape();
	grass.graphics.beginBitmapFill(loader.getResult("grass")).drawRect(0, 500, 1000, 200);
    stage.addChildAt(grass, 0);
    
    var ball = new createjs.Bitmap(loader.getResult("golfball"));
	ball.x = this.golfBall.GetPosition().x * SCALE -6;
	ball.y = this.golfBall.GetPosition().y * SCALE -6;
	stage.addChildAt(ball, 1);
	
	var flag = new createjs.Bitmap(loader.getResult("flag"));
	flag.x = this.holeBody.GetPosition().x * SCALE - 5;
	flag.y = this.holeBody.GetPosition().y * SCALE - 74;
	stage.addChildAt(flag, 2);
}

StageInterface.prototype.step = function(obj){
	StageInterface_.prototype.step.call(this);
	if(this.isMoveTime && !world.IsLocked()){
		this.isMoveTime = false;
		this.golfBall.SetPosition(new box2d.b2Vec2(this.arrayToMovePos.x/SCALE,this.arrayToMovePos.y/SCALE));
	}
}

return StageInterface;
}
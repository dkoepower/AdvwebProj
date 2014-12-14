/**
*
* This is the main interface that i should implemet all of these method.
* It is because all other main routine use this method format everywhere needed. 
*
**/

function s1(){

function StageInterface(object) {
	this.startBallPos = new MPoint(55,10);
	this.itemsArray;
	this.initComplete = false;
	this.collisonCallback;
	this.collisionCallback = new Box2D.Dynamics.b2ContactListener();
	this.collisionCallback.BeginContact = function(contact){
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
		
		//console.log(contact.GetFixtureB().GetBody().GetUserData(), contact.GetFixtureA().GetBody().GetUserData());
		
		if(golfBall && golfHole){
			console.log("collision");
		} else {
		}
	}
	this.collisionCallback.EndContact = function(contact){
		
	}
	this.collisionCallback.PreSolve = function(contact, oldManifold){

	}
	this.collisionCallback.PostSolve = function(contact, impulse){
//		console.log(contact.GetFixtureA().GetBody().GetUserData());
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
		
		//console.log(contact.GetFixtureB().GetBody().GetUserData(), contact.GetFixtureA().GetBody().GetUserData());
		
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
	
	//중간 둔턱
	var gap = 4;
	bodyDef.position.x = (canvasWidth/4-gap) /SCALE;
	bodyDef.position.y = 200 / SCALE;//canvasHeight /SCALE;
	fixDef.shape = new box2d.b2PolygonShape();
	fixDef.shape.SetAsBox((canvasWidth/4-gap) /SCALE, 10 /SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	bodyDef.position.x = (3*canvasWidth/4+gap) /SCALE;
	bodyDef.position.y = 200 / SCALE;//canvasHeight /SCALE;
	fixDef.shape = new box2d.b2PolygonShape();
	fixDef.shape.SetAsBox((canvasWidth/4-gap) /SCALE, 10 /SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	
	var propelBodyDef = new box2d.b2BodyDef();
	propelBodyDef.position.x = 300 / SCALE;
	propelBodyDef.position.y = 400 / SCALE;
	propelBodyDef.type = box2d.b2Body.b2_kinematicBody;
	var propelDef = new box2d.b2FixtureDef();
	propelDef.density = 2;
	propelDef.friction = 0.4;
	propelDef.restitution = 0.2;
	propelDef.shape = new box2d.b2PolygonShape();

	points = [];
	var propelBody = world.CreateBody(propelBodyDef)
	
	
	var j = 0;
	points[j++] = new box2d.b2Vec2(10/SCALE, -10/SCALE);
	points[j++] = new box2d.b2Vec2(100/SCALE, -10/SCALE);
	points[j++] = new box2d.b2Vec2(100/SCALE, 10/SCALE);
	points[j++] = new box2d.b2Vec2(10/SCALE, 10/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	points[j++] = new box2d.b2Vec2(80/SCALE, -10/SCALE);
	points[j++] = new box2d.b2Vec2(80/SCALE, -20/SCALE);
	points[j++] = new box2d.b2Vec2(100/SCALE, -20/SCALE);
	points[j++] = new box2d.b2Vec2(100/SCALE, -10/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	
	
	points[j++] = new box2d.b2Vec2(-10/SCALE, -10/SCALE);
	points[j++] = new box2d.b2Vec2(-10/SCALE, -100/SCALE);
	points[j++] = new box2d.b2Vec2(10/SCALE, -100/SCALE);
	points[j++] = new box2d.b2Vec2(10/SCALE, -10/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	points[j++] = new box2d.b2Vec2(-10/SCALE, -80/SCALE);
	points[j++] = new box2d.b2Vec2(-20/SCALE, -80/SCALE);
	points[j++] = new box2d.b2Vec2(-20/SCALE, -100/SCALE);
	points[j++] = new box2d.b2Vec2(-10/SCALE, -100/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	
	points[j++] = new box2d.b2Vec2(-10/SCALE, 10/SCALE);
	points[j++] = new box2d.b2Vec2(-100/SCALE, 10/SCALE);
	points[j++] = new box2d.b2Vec2(-100/SCALE, -10/SCALE);
	points[j++] = new box2d.b2Vec2(-10/SCALE, -10/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	points[j++] = new box2d.b2Vec2(-80/SCALE, 10/SCALE);
	points[j++] = new box2d.b2Vec2(-80/SCALE, 20/SCALE);
	points[j++] = new box2d.b2Vec2(-100/SCALE, 20/SCALE);
	points[j++] = new box2d.b2Vec2(-100/SCALE, 10/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	
	points[j++] = new box2d.b2Vec2(10/SCALE, 10/SCALE);
	points[j++] = new box2d.b2Vec2(10/SCALE, 100/SCALE);
	points[j++] = new box2d.b2Vec2(-10/SCALE, 100/SCALE);
	points[j++] = new box2d.b2Vec2(-10/SCALE, 10/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	points[j++] = new box2d.b2Vec2(20/SCALE, 100/SCALE);
	points[j++] = new box2d.b2Vec2(10/SCALE, 100/SCALE);
	points[j++] = new box2d.b2Vec2(10/SCALE, 80/SCALE);
	points[j++] = new box2d.b2Vec2(20/SCALE, 80/SCALE);
	
	propelDef.shape.SetAsArray(points, points.length);
	propelBody.CreateFixture(propelDef);
	j = 0;
	
	propelBody.SetAngularVelocity(20.0/SCALE);
	
	var holeBodyDef = new box2d.b2BodyDef();
	holeBodyDef.position.x = 500 / SCALE;
	holeBodyDef.position.y = (canvasHeight-440) / SCALE;
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

StageInterface.prototype.isPointOnTheBall = function(x, y, obj){
	var reValue = true;
	var ballPosition = this.golfBall.GetWorldCenter();
	console.log(ballPosition.x * SCALE +" "+ ballPosition.y * SCALE, this.radius * SCALE, x, y);
	if(x > ballPosition.x * SCALE - this.radius * SCALE
		 && x < ballPosition.x * SCALE  + this.radius * SCALE
		) {
		console.log('x 내부');
	} else {
		console.log('x 외부');
		reValue = false;
	}
	
	if(y < ballPosition.y * SCALE + this.radius * SCALE
		 && y > ballPosition.y * SCALE - this.radius * SCALE
	) {
		console.log('y 내부');
	} else {
		console.log('y 외부');
		reValue = false;
	}
	
	return reValue;
}

StageInterface.prototype.linkEventListeners = function(obj){
	
}

StageInterface.prototype.checkClear = function(obj) {
	console.log(canInfo);
	return false;
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
StageInterface.prototype.drawBall = function(obj){
	var ball = obj.getChildAt(1);
	if(ball){
		ball.x = this.golfBall.GetPosition().x * SCALE -6;
		ball.y = this.golfBall.GetPosition().y * SCALE -6;
	}
}

 return StageInterface;
}
////////////////////////////////////////////////////////////////////////


//var b2Listener = box2D.Dynamics.b2ContactListener;
//
////Add listeners for contact
//var listener = new b2Listener;
//
//listener.BeginContact = function(contact) {
//  //console.log(contact.GetFixtureA().GetBody().GetUserData());
//}
//
//listener.EndContact = function(contact) {
//  // console.log(contact.GetFixtureA().GetBody().GetUserData());
//}
//
//listener.PostSolve = function(contact, impulse) {
//  if (contact.GetFixtureA().GetBody().GetUserData() == 'ball' || contact.GetFixtureB().GetBody().GetUserData() == 'ball') {
//      var impulse = impulse.normalImpulses[0];
//      if (impulse < 0.2) return; //threshold ignore small impacts
//      world.ball.impulse = impulse > 0.6 ? 0.5 : impulse;
//      console.log(world.ball.impulse);
//  }
//}
//
//listener.PreSolve = function(contact, oldManifold) {
//  // PreSolve
//}
//
//this.world.SetContactListener(listener);
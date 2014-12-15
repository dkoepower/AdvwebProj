/**
*
* This is the main interface that i should implemet all of these method.
* It is because all other main routine use this method format everywhere needed. 
*
**/

function s7() {

function StageInterface(object) {
	this.startBallPos = new MPoint(20,390);
	this.itemsArray;
	this.initComplete = false;
	this.isClear = false;
	this.collisionCallback;
	this.arrayToMovePos = new MPoint(20, 20);
	this.isMoveTime = false;
	this.collisionCallback = new Box2D.Dynamics.b2ContactListener();
	var me = this;
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
		
		
		if(golfBall && golfHole){
			console.log("collision");
			if(!me.isClear){
//				this.golfBall.SetLinearVelocity(new box2d.b2Vec2(0,0));
				window.showImagePopup('../../../res/img/oncanvas/clear.png', 2000, 400, function(){
					setMessageBoxMessage("단계를 클리어하셨습니다. 모두 클리어했군요.", "축하합니다.");
					window.endMilliSeconds = new Date().getTime();
					$.ajax({
						  url:'http://advancedwebprogramming.azurewebsites.net/ranking.do',
						  method:'GET',
						  success: function(data) { console.log(data);
						  
						    var output = '';
						  	$.each(data, function(i, e, a){
						  		output += i+' 순위 : ' + e.s_u_name +', time : ' + e.s_record + '\n';
						  	});
						  	
						  	alert(output);
						  }
						});
					$.ajax({
						url: 'http://advancedwebprogramming.azurewebsites.net/finishStage.do',
						method:'POST',
						data : {
							name:localStorage.getItem("enroll"),
							record:-(window.starteMilliSeconds - window.endMilliSeconds),
							stage:parseInt(location.search.substring(1).split('=')[1])
						},
						success:function(data){
							console.log(data);
						}
					});
					showMessageBox(3000, 1000, function(){
						if(localStorage){
							localStorage.setItem("openstatus"+(parseInt(parameters.nstype)+1), "OK");
							//$('.menu-exit').trigger('click');
							//location.assign('./playStage.html?nstype='+(parseInt(parameters.nstype)+1));
							location.assign('./stageSelect.html');
						}
					});					
				});
				me.isClear = true;
			}
		}

		if(golfBall && hole){
//			switch(hole.GetUserData()){
//				case "hole0":
//					console.log('call', stgInterface.golfBall == golfBall);
//					me.arrayToMovePos.set(20, 20);
////					stgInterface.golfBall.SetPosition(new box2d.b2Vec2(20/SCALE,20/SCALE));
//					//golfBall.ApplyImpulse(new box2d.b2Vec2(20/SCALE, -120/SCALE), golfBall.GetWorldCenter());
//					break;
//				default:
//					break;
//			}
			if(keyindex == 1){
				me.joint.EnableMotor(true)
				me.joint.SetMotorSpeed(250  * Math.PI/180);
				me.joint.SetMaxMotorTorque(500);
				return;
			}
			
			var pos = [[20, 160], [20.5, 20], [20, 20], [562.5, 20], [750, 20], [937.5 , 20]];
			if(!me.isMoveTime){
				me.arrayToMovePos.set(pos[keyindex][0], pos[keyindex][1]);
				me.isMoveTime = true;
				golfBall.SetLinearVelocity(new box2d.b2Vec2(0, 0/SCALE));
			}
			me.isMoveTime = true;
		}
	}
	this.collisionCallback.EndContact = function(contact){
	}
	this.collisionCallback.PreSolve = function(contact, oldManifold){
	}
	this.collisionCallback.PostSolve = function(contact, impulse){
//		console.log("PostSolve");
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
		/*
	var bodyDef = new box2d.b2BodyDef();
	var fixDef = new box2d.b2FixtureDef();
	bodyDef.position.Set(0, 0);
	bodyDef.type = box2d.b2Body.b2_staticBody;
	fixDef.density = 1.0;
	fixDef.friction = 0.4;
	fixDef.shape = new box2d.b2PolygonShape();
	var point = [
	             new box2d.b2Vec2((0) / SCALE, (500) / SCALE),
	             new box2d.b2Vec2((canvasWidth*48/80) / SCALE, 500 / SCALE),
	             new box2d.b2Vec2((canvasWidth*48/80) / SCALE, (canvasHeight-10) / SCALE),
	             new box2d.b2Vec2((0) / SCALE, (canvasHeight-10) / SCALE)
	           ];
	fixDef.shape.SetAsArray(point, point.length);
	this.leftBody = world.CreateBody(bodyDef);
	this.leftBody.CreateFixture(fixDef);
	
	point = [	new box2d.b2Vec2((canvasWidth*60/80) / SCALE, (500) / SCALE),
	         	new box2d.b2Vec2((canvasWidth) / SCALE, (500) / SCALE),
	         	new box2d.b2Vec2((canvasWidth) / SCALE, (canvasHeight-10) / SCALE),
	         	new box2d.b2Vec2((canvasWidth*60/80) / SCALE, (canvasHeight-10) / SCALE)
    		];
	fixDef.shape.SetAsArray(point, point.length);
	this.leftBody.CreateFixture(fixDef);
	//left one
	
	point = [
	             new box2d.b2Vec2((canvasWidth*0) / SCALE, (354) / SCALE),
	             new box2d.b2Vec2((canvasWidth) / SCALE, (354) / SCALE),
	             new box2d.b2Vec2((canvasWidth) / SCALE, (364) / SCALE),
	             new box2d.b2Vec2((canvasWidth*0) / SCALE, (364) / SCALE)	             
	           ];
	
	fixDef.shape.SetAsArray(point, point.length);
	this.rightBody = world.CreateBody(bodyDef);
	this.rightBody.CreateFixture(fixDef);
	
	point = [
				new box2d.b2Vec2((canvasWidth) / SCALE, (138) / SCALE),
			    new box2d.b2Vec2((canvasWidth*0/16) / SCALE, (154) / SCALE),
			    new box2d.b2Vec2((canvasWidth*0/16) / SCALE, (130) / SCALE),
			    new box2d.b2Vec2((canvasWidth) / SCALE, (130) / SCALE)
			];
	fixDef.shape.SetAsArray(point, point.length);
	this.rightBody.CreateFixture(fixDef);
	
	//OTHER BRICKS..
	bodyDef.position.Set(canvasWidth*59/80 / SCALE, 510/SCALE)
	this.leftBody = world.CreateBody(bodyDef);
	
	bodyDef.type = box2d.b2Body.b2_dynamicBody;
	
	
	point = [
				new box2d.b2Vec2((-canvasWidth*10/80-5) / SCALE, (-10) / SCALE),
			    new box2d.b2Vec2((canvasWidth*0/80) / SCALE, (-10) / SCALE),
			    new box2d.b2Vec2((canvasWidth*0/80) / SCALE, (10) / SCALE),
			    new box2d.b2Vec2((-canvasWidth*10/80-5) / SCALE, (10) / SCALE)
			];
	fixDef.shape.SetAsArray(point, point.length);
	this.leftBody = world.CreateBody(bodyDef);
	this.leftBody.CreateFixture(fixDef);
	
	
	bodyDef.type = box2d.b2Body.b2_staticBody;
	this.rightBody = world.CreateBody(bodyDef); //왜 추가되었는지 모른다.
		
	point = [
				new box2d.b2Vec2((-10) / SCALE, (-10) / SCALE),
			    new box2d.b2Vec2((10) / SCALE, (-10) / SCALE),
			    new box2d.b2Vec2((10) / SCALE, (10) / SCALE),
			    new box2d.b2Vec2((-10) / SCALE, (10) / SCALE)
			];
	fixDef.shape.SetAsArray(point, point.length);
	this.rightBody.CreateFixture(fixDef);
	
	
	var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
	jointDef.bodyB = this.leftBody;
	jointDef.bodyA = this.rightBody;
	jointDef.collideConnected = false;

	jointDef.enableLimit = true;
	jointDef.lowerAngle = 0 * Math.PI/180;
	jointDef.upperAngle = 87 * Math.PI/180;	
	
	
//	jointDef.enableMotor = true;
//	jointDef.maxMotorTorque = 500;
//	jointDef.motorSpeed = 250  * Math.PI/180; //1 turn per second counter-clockwise
	
	
	jointDef.localAnchorA.Set(0,0);//a little outside the bottom right corner
	jointDef.localAnchorB.Set(0,0);//bottom left corner
	
	this.joint = world.CreateJoint(jointDef);*/
	
	
	
	
	
	
	/*******
	 * 
	 * 
	 * 
	 * 
	 */
	/*var groundDef = new box2d.b2BodyDef();
	groundDef.position.Set(500, 300);
	groundDef.type = box2d.b2Body.b2_staticBody;
	var ground = world.CreateBody(groundDef);
    {
//        var shape = new Box2D.Collision.Shapes.b2EdgeShape(0, 0);
    	var shape = new box2d.b2PolygonShape();
    	shape.SetAsBox(20/SCALE, 20/SCALE);
//        shape.Set(new box2d.b2Vec2(-40.0/SCALE, 0.0/SCALE), new box2d.b2Vec2(40.0/SCALE, 0.0/SCALE));
    	var tempFixDef = new box2d.b2FixtureDef();
    	tempFixDef.shape = shape;
        ground.CreateFixture(tempFixDef);
    }
    {
        var shape = new box2d.b2PolygonShape();
        shape.SetAsBox(0.5 /SCALE, 0.125/SCALE);

        var fd = new box2d.b2FixtureDef();
        fd.shape = shape;
        fd.density = 20.0;
        fd.friction = 0.2;
    	
    	fd.filter.categoryBits = 0x0001;
    	fd.filter.maskBits = 0xFFFF & ~0x0002;
        var jd = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        jd.collideConnected  = false;

        var N = 10;
        var y = 15.0;
        
        var ropeDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        console.log('hs');
        ropeDef.localAnchorA.Set(0.0, y/SCALE);
        var prevBody = ground;
        for (var i = 0; i < N; ++i)
        {
            var bd = new box2d.b2BodyDef();
            bd.type = box2d.b2Body.b2_dynamicBody;
            bd.position.Set((0.5 + 1.0 * i)/SCALE, y/SCALE);
            if (i == N - 1)
            {
                shape.SetAsBox(1.5/SCALE, 1.5/SCALE);
                fd.density = 100.0;
                fd.filter.categoryBits = 0x0002;
                bd.position.Set((1.0 * i)/SCALE, y/SCALE);
                bd.angularDamping = 0.4;
            }

            var body = world.CreateBody(bd);

            body.CreateFixture(fd);

            var anchor = new box2d.b2Vec2((i)/SCALE, y/SCALE);
            jd.Initialize(prevBody, body, anchor);
            world.CreateJoint(jd);
            console.log('hs');
            prevBody = body;
        }

        ropeDef.localAnchorB.Set(0/SCALE,0/SCALE);

//        var extraLength = 0.01;
//        ropeDef.set_maxLength(N - 1.0 + extraLength);
        ropeDef.bodyB  = prevBody;
    }

    {
        ropeDef.bodyA = ground;
        world.CreateJoint(ropeDef);
    }*/
	
	/*****
	 * 
	 * 
	 * 
	 * 
	 */
	
	
	
	
	
	
	
	
	
	/*var warmHoleBodyDef = new box2d.b2BodyDef();
	warmHoleBodyDef.type = box2d.b2Body.b2_kinematicBody;
	warmHoleBodyDef.position.Set(canvasWidth*54/80 / SCALE, (590)/SCALE);
	
	var warmHoleFixDef = new box2d.b2FixtureDef();
	warmHoleFixDef.isSensor = true;
	warmHoleFixDef.density = 0.4;
	warmHoleFixDef.friction= 1.0;
	warmHoleFixDef.shape = new box2d.b2CircleShape(50/SCALE);
	
	this.holes = [];
	var i = 1;
	
	this.holes[0] = world.CreateBody(warmHoleBodyDef);
	this.holes[0].CreateFixture(warmHoleFixDef);
	this.holes[0].SetUserData('hole0');
	
	
	var stoneBodyDef = new box2d.b2BodyDef();
	stoneBodyDef.type = box2d.b2Body.b2_dynamicBody;
	var stoneFixtureDef = new box2d.b2FixtureDef();
	stoneFixtureDef.shape = new box2d.b2PolygonShape();
	stoneFixtureDef.shape.SetAsBox(5/SCALE, 60 /SCALE);
	stoneFixtureDef.density = 0.3;
	stoneFixtureDef.friction = 1.0;
	var tempStoneBody;
	for(i = 0; i < 40; i++){
		stoneBodyDef.position.Set((200+i*30)/SCALE, (325)/SCALE);
		tempStoneBody = world.CreateBody(stoneBodyDef);
		tempStoneBody.CreateFixture(stoneFixtureDef);
	}
	
	warmHoleBodyDef.position.Set((400)/SCALE, (400)/SCALE);
	warmHoleFixDef.shape = new box2d.b2PolygonShape();
	warmHoleFixDef.shape.SetAsBox(10 / SCALE, 10/ SCALE);
	var hole2 = world.CreateBody(warmHoleBodyDef);
	hole2.CreateFixture(warmHoleFixDef);
	hole2.SetUserData('hole'+1);
	point = [
//				new box2d.b2Vec2((canvasWidth*72/80) / SCALE, (400) / SCALE),
//			    new box2d.b2Vec2((canvasWidth*73/80) / SCALE, (400) / SCALE),
//			    new box2d.b2Vec2((canvasWidth*73/80) / SCALE, (500) / SCALE),
//			    new box2d.b2Vec2((canvasWidth*72/80) / SCALE, (500) / SCALE)
				new box2d.b2Vec2((350) / SCALE, (-30) / SCALE),
				new box2d.b2Vec2((393) / SCALE, (-30) / SCALE),
				new box2d.b2Vec2((393) / SCALE, (100) / SCALE),
				new box2d.b2Vec2((350) / SCALE, (100) / SCALE),
			];
	warmHoleFixDef.shape.SetAsArray(point, point.length);
	hole2.CreateFixture(warmHoleFixDef);
	
	
	warmHoleBodyDef.position.Set((canvasWidth*78/80)/SCALE, (350)/SCALE);
	warmHoleFixDef.shape = new box2d.b2PolygonShape();
	warmHoleFixDef.shape.SetAsBox(10 / SCALE, 10/ SCALE);
	var hole3 = world.CreateBody(warmHoleBodyDef);
	hole3.CreateFixture(warmHoleFixDef);
	hole3.SetUserData('hole'+2);*/
	
    /*****/
    
    
	/*warmHoleBodyDef.position.Set((20)/SCALE, (canvasHeight-20)/SCALE);
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
	bodyDefWall.type = box2d.b2Body.b2_kinematicBody;*/
	
	/*var fixDefWall = new box2d.b2FixtureDef();
	fixDefWall.shape = new box2d.b2PolygonShape();
	fixDefWall.shape.SetAsBox(5/SCALE, 100/SCALE);
	
	this.wallBody = world.CreateBody(bodyDefWall);
	this.wallBody.CreateFixture(fixDefWall);
	this.wallBody.SetAngularVelocity(70/SCALE);*/
	
	}//end block;
	/******************************************************
	 * 
	 *  CUSTOM DRAWING AREA END
	 * 
	 * 
	 ******************************************************/
	
	var holeBodyDef = new box2d.b2BodyDef();
	holeBodyDef.position.x = (canvasWidth*39/40) / SCALE;
	holeBodyDef.position.y = (130) / SCALE;
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
	
//	var grass = new createjs.Shape();
//	grass.graphics.beginBitmapFill(loader.getResult("grass")).drawRect(0, 500, 1000, 200);
//    stage.addChildAt(grass, 0);
	var background = new createjs.Shape();
	background.graphics.beginBitmapFill(loader.getResult("background7")).drawRect(0, 0, 1000, 645);
	stage.addChildAt(background, 0);
	
    var ball = new createjs.Bitmap(loader.getResult("golfball"));
	ball.x = this.golfBall.GetPosition().x * SCALE -6;
	ball.y = this.golfBall.GetPosition().y * SCALE -6;
	stage.addChildAt(ball, 1);
	
	var flag = new createjs.Bitmap(loader.getResult("flag"));
	flag.x = this.holeBody.GetPosition().x * SCALE - 5;
	flag.y = this.holeBody.GetPosition().y * SCALE - 74;
	stage.addChildAt(flag, 2);
	
	var spiral = createSprite('spiral1', 25, 192, 192, 400, 400, 1, 1);
	stage.addChild(spiral);
	stage.addChild(createSprite('spiral2', 20, 192, 192, 800, 200, 1, 1));
	stage.addChild(createSprite('spiral3', 25, 192, 192, 200, 200, 1, 1));
	stage.addChild(createSprite('spiral4', 30, 192, 192, canvasWidth*39/40, 130, 1, 1));
	stage.addChild(createSprite('spiral5', 30, 192, 192, canvasWidth*20/40, 450, 1.5, 1.5));
	stage.addChild(createSprite('spiral5', 30, 192, 192, canvasWidth*25/40, 500, 2.5, 2.5));
	stage.addChild(createSprite('spiral5', 30, 192, 192, canvasWidth*30/40, 550, 1.5, 1.5));
}
StageInterface.prototype.drawBall = function(obj){
	var ball = obj.getChildAt(1);
	if(ball){
		ball.x = this.golfBall.GetPosition().x * SCALE -6;
		ball.y = this.golfBall.GetPosition().y * SCALE -6;
	}
}
StageInterface.prototype.step = function(obj){
	if(this.isMoveTime && !world.IsLocked()){
		this.isMoveTime = false;
		this.golfBall.SetPosition(new box2d.b2Vec2(this.arrayToMovePos.x/SCALE,this.arrayToMovePos.y/SCALE));
//		world.DestroyBody(this.rightBody);
	}
}

return StageInterface;
}
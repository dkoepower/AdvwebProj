/**
 * 
 */

$(document).ready(function(){
	stage = new createjs.Stage($('#test_canvas')[0]);
	
	manifest = [
                { src: "../../../res/spr/set/real.png", id: "golfer" },
                { src: "../../../res/img/oncanvas/grass.png", id: "grass" },
                { src: "../../../res/img/oncanvas/golfball.png", id: "golfball" },
                { src: "../../../res/img/oncanvas/redflag.png", id: "flag" },
                { src: "../../../res/스프라이트/이펙트/expolsive.png", id: "expl" },
                { src: "../../../res/스프라이트/이펙트/fire.png", id: "fire" },
                { src: "../../../res/스프라이트/이펙트/fidown.png", id: "fidown" },
                { src: "../../../res/스프라이트/이펙트/heal_001.png", id: "heal_001" },
                { src: "../../../res/스프라이트/이펙트/heal_002.png", id: "heal_002" },
                { src: "../../../res/스프라이트/이펙트/light.png", id: "light" },
                { src: "../../../res/스프라이트/이펙트/ice_002.png", id: "ice_002" },
                { src: "../../../res/스프라이트/이펙트/ice_001.png", id: "ice_001" },
                { src: "../../../res/스프라이트/이펙트/water_003.png", id: "water_003" },
                { src: "../../../res/스프라이트/이펙트/ice_001.png", id: "ice_001" },
                { src: "../../../res/스프라이트/이펙트/ice_001.png", id: "ice_001" },
                { src: "../../../res/스프라이트/이펙트/ice_001.png", id: "ice_001" },
//                { src: "parallaxHill2.png", id: "hill2" }
            ];
	loader = new createjs.LoadQueue(false);
	var xspeed = 1.0;
	loader.addEventListener("complete", function(e){
		var spritedata = new createjs.SpriteSheet({
			"framerate" : 12,
	        "images": [loader.getResult("expl")],
	        "frames": { "regX": 0, "height": 192, "count": 15, "regY": 0, "width": 192 },
	        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
	        "animations": { "idle": [0, 14, "idle", xspeed]}   // jump후엔 run, run 후에 run(loop)
	    });
//		console.log(this.spritedata);
		var golfer = new createjs.Sprite(spritedata, "idle");
//		console.log(this.golfer);
//		this.golfer.setTransform(-200, h - 310, 0.8, 0.8);     // 초기 x값이 -200이므로 처음에 화면에서 안보이다가 나타남.
		golfer.x = 400;//;30//stgInterface.golfBall.GetPosition().x;
		golfer.y = 400;//190;//stgInterface.golfBall.GetPosition().y;
		golfer.framerate = 12;

//		this.golfer.on("mousedown", handleJumpStart);
	    // grant.crossOrigin = "Anonymous";

		golfer.scaleX = 0.9;
		golfer.scaleY = .9;
		
	    stage.addChild(golfer);
	    
	    stage.addChild(createSprite("fire", 25, 192, 192, 000, 000, 1, 1));
	    stage.addChild(createSprite("fidown", 22, 96, 96, 392, 000, 1, 1));
	    stage.addChild(createSprite("heal_001", 25, 192, 192, 576, 000, 0.5, 0.5));
	    stage.addChild(createSprite("heal_002", 25, 192, 192, 768, 000, 1, 1));
	    stage.addChild(createSprite("ice_001", 25, 192, 192, 192, 192, 1, 1));
	    stage.addChild(createSprite("ice_002", 25, 192, 192, 392, 192, 1, 1));
	    stage.addChild(createSprite("light", 25, 192, 192, 576, 192, 1, 1));
	    stage.addChild(createSprite("water_003", 50, 192, 192, 768, 192, 1, 1));
	    
	});  

	loader.loadManifest(manifest);
	
    createjs.Ticker.addEventListener("tick", callback);
    
    createjs.Ticker.setFPS(15);
	createjs.Ticker.useRAF = true;
});

function createSprite(id, count, width, height, x, y, xscale, yscale){
	var xspeed = 1.0;
	var spritedata = new createjs.SpriteSheet({
		"framerate" : 12,
        "images": [loader.getResult(id)],
        "frames": { "regX": 0, "height": height, "count": 25, "regY": 0, "width": width },
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": { "idle": [0, 24, "idle", xspeed]}   // jump후엔 run, run 후에 run(loop)
    });
	var data = new createjs.Sprite(spritedata, "idle");
	data.x = x;
	data.y = y;
	data.scaleX = xscale;
	data.scaleY = yscale;
	
	return data;
}

function callback (event) {
	stage.update();
}

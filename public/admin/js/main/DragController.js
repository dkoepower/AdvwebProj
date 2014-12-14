/**
 * 
 */

function DragController(x, y){
	this.nowX = 0;
	this.nowY = 0;
	this.nowPos = new MPoint(0,0);
	this.prevX = 0;
	this.prevY = 0;
	this.prevPos = new MPoint(0,0);
	this.dragOn = false;
	this.startX = 0;
	this.startY = 0;
	this.startPos = new MPoint(0,0);
	this.baseX = x;
	this.baseY = y;
	this.basePos = new MPoint(0,0);
	this.offsetX = 0;
	this.offsetY = 0;
	this.offsetPos = new MPoint(0,0);
}

DragController.prototype.setDragOn = function(value){
	this.dragOn = value;
}

DragController.prototype.endDrag = function(event) {
	this.dragOn = false;
}

DragController.prototype.setBaseXY = function(x, y){
	this.baseX = x;
	this.baseY = y;
	this.basePos.set(x, y);
	this.offsetX = this.nowX - this.baseX;
	this.offsetY = this.nowY - this.baseY;
}

DragController.prototype.getOffsetX = function(){
	return this.offsetX;
}

DragController.prototype.getOffsetY = function(){
	return this.offsetY;
}

DragController.prototype.startDrag = function(event){
	this.dragOn = true;
	this.prevX = this.nowX = this.startX = event.pageX - this.baseX;
	this.prevPos.x = this.nowPos.x = this.startPos.x = event.pageX - this.basePos.x;
	this.prevY = this.nowY = this.startY = event.pageY - this.baseY;
	this.prevPos.y = this.nowPos.y = this.startPos.y = event.pageY - this.basePos.y;
}

DragController.prototype.updateDrag = function(event){
	if(this.dragOn){
		this.prevX = this.nowX;
		this.prevY = this.nowY;
		this.prevPos.setPoint(this.nowPos);
		this.nowX = event.pageX - this.baseX;
		this.nowY = event.pageY - this.baseY;
		this.nowPos.set(event.pageX - this.basePos.y, event.pageY - this.basePos.y);
	}
}

DragController.prototype.getQuickDeltaX = function(){
//	return this.prevPos.x - this.nowPos.x;
	return this.prevX - this.nowX;
}

DragController.prototype.getQuickDeltaY = function(){
//	return this.prevPos.y - this.nowPos.y;
	return this.prevY - this.nowY;
}

DragController.prototype.getWholeDeltaX = function(){
//	return -(this.startPos.x - this.nowPos.x);
	return -(this.startX - this.nowX);
}

DragController.prototype.getWholeDeltaY = function(){
//	return -(this.startPos.y - this.nowPos.y);
	return -(this.startY - this.nowY);
}

DragController.prototype.getQuickRotation = function(){
	return Math.atan(this.getQuickDeltaY()/this.getQuickDeltaX())*180/Math.PI;
}

DragController.prototype.getWholeRotation = function(){
	var baseRotation = 0;
//	if(this.getWholeDeltaX() >= 0 && this.getWholeDeltaY() >= 0) baseRotation = 0;
//	if(this.getWholeDeltaY() >= 0 && this.getWholeDeltaX() < 0) baseRotation = 0;
	if(this.getWholeDeltaX() < 0 && this.getWholeDeltaY() >= 0) baseRotation = 180;
	if(this.getWholeDeltaY() < 0 && this.getWholeDeltaX() < 0) baseRotation = -180;
	if(this.getWholeDeltaX() == 0 && this.getWholeDeltaY() > 0) return 90;
	if(this.getWholeDeltaX() == 0 && this.getWholeDeltaY() < 0) return -90;
	return Math.atan(this.getWholeDeltaY()/this.getWholeDeltaX())*180/Math.PI + baseRotation;
}
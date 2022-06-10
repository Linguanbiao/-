const landDom = document.getElementsByClassName('land')[0];
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landtop = parseFloat(landStyle.top);

class Land extends Rectangle{
    constructor(Xspeed){
        super(landWidth , landHeight , 0 , landtop , Xspeed , 0 , landDom);
    }
    onMove(){        // 判断边界有没有超出
         if(this.left <= -landWidth / 2){
             this.left = 0;
         }
    }
}
// var land = new Land(-100);
// setInterval(()=>{
//     land.Move(50 /1000);
// }, 50)

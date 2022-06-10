const skyDom = document.getElementsByClassName('sky')[0];
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);
// const skyWidth = skyStyle.width;     //  直接这样写 skyWidth 的值为 1600px 而不是 1600 
// const skyHeight = skyStyle.height;
class Sky extends Rectangle{
    constructor(Xspeed){
        super(skyWidth , skyHeight , 0 , 0 , Xspeed , 0 , skyDom);
    }
    onMove(){        // 检查边界有没有超出
        if(this.left <= -skyWidth/ 2){
            this.left = 0;
        }
   }
}
// var sky = new Sky(-100);
// setInterval(()=>{
//     sky.Move(50/1000);
// }, 50)

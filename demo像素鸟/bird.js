const birdDom = document.getElementsByClassName('bird')[0];
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameHeight = document.querySelector(".game").clientHeight;

class Bird extends Rectangle{
    constructor(){
        super(birdWidth , birdHeight , birdLeft , birdTop , 0 , 0 , birdDom);
        this.g = 200 ;    // 下落的加速度, 单位 像素/毫秒；
        this.birdMaxTop = gameHeight - landHeight - birdHeight;
        this.swingstatus = 0;   // 小鸟翅膀的状态
        this.timer = null; // 翅膀煽动状态的计时器
        this.Render();
    }

    //小鸟移动，向下掉
    Move(time){   
        super.Move(time); 
        this.Yspeed = this.Yspeed + this.g * time;   
    }
    onMove(){
        if (this.top < 0){
            this.top = 0 ;
        }
        else if(this.top > this.birdMaxTop){
            this.top = this.birdMaxTop ;
        }
    }
    // 小鸟向上跳跃
    jump(){
       this.Yspeed = -100;
    }

    //小鸟开始煽动翅膀
    startSwing(){
        if(this.timer){
            return;
        }
      this.timer = setInterval(() => {
            this.swingstatus ++; 
            if(this.swingstatus === 4){
                this.swingstatus = 1;
            }
            this.Render();
      },200)
    }
    //小鸟停止煽动翅膀
    stopSwing(){
           clearInterval(this.timer);
           this.timer = null;
    }
    Render(){
        super.Render();   // 这里必须继承，因为重写了 Render() , 不重写 Move 使用的是这个渲染，但是不写的话又会没有父类的 Render()
        document.getElementsByClassName('bird')[0].className = `bird swing${this.swingstatus}`;    //  重写渲染样式，
    }
}
// var bird = new Bird();
// setInterval(()=>{
//     bird.Move(50 /1000);   // 小鸟的移动是没有横向移动的，只有纵向移动
// }, 50)



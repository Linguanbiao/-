const gameWidth =  parseFloat(getComputedStyle(document.getElementsByClassName('game')[0]).width);
const game = document.getElementsByClassName('game')[0];
class Pipe extends Rectangle{
    constructor(height , top , Xspeed , dom){
        super(52, height , gameWidth , top , Xspeed , 0 , dom);   // 对于水管而言，不能和其他类一样都是写死的， 这里水管又上下两根因此不知道 height , left = game.width 让水管每次从最右边产生

    }
    onMove(){
        if(this.left < - gameWidth){
            this.dom.remove();       //  删除当前元素的 dom 对象 ， this.dom 表示当前元素   
        }
    }
}

function getRandHeight(min , max){
    return Math.floor(Math.random()*(max - min) + min) ; //  这里 Math.random()  生成的是一个 0 - 1 的数
}

class Pipepare{       // 上面的类是生成一个柱子， 这里是生成一对柱子
    constructor(Xspeed){
        this.space = 120;    // 一对柱子之间的空隙，这是个固定值
        this.minHeight = 60;
        this.maxHeight =  landtop - this.space - this.minHeight;
        const upHeight = getRandHeight(this.minHeight , this.maxHeight);
        const upPipeDom = document.createElement('div');
        upPipeDom.className = 'pipe up';
        this.upPipe = new Pipe(upHeight , 0 , Xspeed , upPipeDom);

        const downHeight = landtop - upHeight - this.space;
        const downPipeDom = document.createElement('div');
        downPipeDom.className = 'pipe down';
        this.downPipe = new Pipe(downHeight,  landtop - downHeight, Xspeed , downPipeDom);

        game.appendChild(upPipeDom);
        game.appendChild(downPipeDom);
    }
    move(time){
        this.upPipe.Move(time);       // 上下两根柱子继承父类的移动方法动起来
        this.downPipe.Move(time); 
    }
}

class PipepareProducer{
    constructor(Xspeed){
        this.Xspeed = Xspeed
        this.pair = [];    // 用于存放生成的 每一对生成的柱子;
        this.itime = null ;  // 设置一个计时器；
    }
    starProduce(){
        if(this.itime){
            return;
        }else{
            setInterval(()=>{                // 每隔 2100 毫秒 就 new 一对新的柱子并放进 Pipe_pair 数组里面
               const Pipe_pair = new Pipepare(this.Xspeed);
               this.pair.push(Pipe_pair);
            }, 2100)
        }
    }
    stopProduce(){
        clearInterval(this.itime);
        this.itime = null;
    }
}

// var pipe = new PipepareProducer(-100);
// pipe.starProduce();
// setInterval(()=>{
//     for(let i = 0 ; i < pipe.pair.length; i ++){
//         pipe.pair[i].move(100/1000);
//     }
// },100)

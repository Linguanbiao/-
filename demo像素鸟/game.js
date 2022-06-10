class FlappyBirdlGame {
    constructor(Xspeed){
        this.sky = new Sky(Xspeed);
        this.land = new Land(Xspeed);
        this.bird = new Bird();
        this.pipepareproducer  = new PipepareProducer(Xspeed);
        this.timer = null;
        this.gap = 16;
        this.gameOver = false;
        this.score = 0 ;
        
    }
    startGame(){
        if(this.timer){
            return ;
        }
        if(this.gameOver){         //  在开始运动前，判断是否游戏洗净结束了，如果结束了就重新刷新一次页面重新开始游戏
            this.score = 0;
            window.location.reload();
        }
        this.bird.startSwing();
        this.pipepareproducer.starProduce();
        this.timer =  setInterval(()=>{
              const time = this.gap / 1000;
              this.sky.Move(time);
              this.land.Move(time);
              this.bird.Move(time);
              for(let i = 0 ; i < this.pipepareproducer.pair.length; i ++){
                this.pipepareproducer.pair[i].move(time);
            }
            if(this.isGameOver()){
                this.stopGame();
                if(this.score < 10){
                window.alert(`游戏结束了! 你的分数是:${this.score},继续加油
                点击 Enter 键再玩一局吧！`
                )
                }else if(this.score >10 && this.score <30){
                   window.alert( `游戏结束了! 你的分数是:${this.score}, 玩的不错！
                   点击 Enter 键再玩一局吧`)
                }else{
                   window.alert(`游戏结束了! 你的分数是:${this.score},太棒了！
                   点击 Enter 键再玩一局吧`)
                };
            }  
        }, this.gap)
    }
    stopGame(){
        this.bird.stopSwing();
        this.pipepareproducer.stopProduce();
        clearInterval(this.timer);
        this.timer = null;
    }
    setContral(){
        window.onkeydown = (e) => {
            console.log(e);
            if(e.key === "Enter"){
                if(this.timer){
                    this.stopGame();
                }else{
                    this.startGame();
                }
            }
            if(e.key === ' '){
                this.bird.jump();
            }
        }
    }
    isGameOver(){
        if(this.bird.top === this.bird.birdMaxTop){
           this.gameOver = true;
           return true;
        }
        for(let i = 0 ; i < this.pipepareproducer.pair.length ; i++){
            const pairs = this.pipepareproducer.pair[i];
            if(this.isHit(this.bird , pairs.upPipe) || this.isHit(this.bird , pairs.downPipe)){
                this.gameOver = true;
                return true;
            }
            this.score = i + 1;
        }   
        return false
    }
    isHit(rec1 , rec2){
        const x1 =  rec1.left + rec1.width / 2;
        const y1 =  rec1.top + rec1.height / 2;
        const x2 =  rec2.left + rec2.width /2;
        const y2 =  rec2.top + rec2.height /2;
        const x_gap = Math.abs(x1 - x2);
        const y_gap = Math.abs(y1 - y2);
        if((x_gap < ((rec1.width + rec2.width)/2 - 5)) && (y_gap < ((rec1.height + rec2.height)/2) -5)){
           console.log("撞上啦")
            return true;
        }
        return false
    }
}


var flappybird = new FlappyBirdlGame(-100);
// flappybird.startGame();
flappybird.setContral();
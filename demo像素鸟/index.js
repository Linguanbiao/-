//所有的对象都可以表述为一个正方形，这个正方向有宽高，位置， 还有一些公用的方法（比如都可以移动， 因此创建一个可以移动的对象父类
class Rectangle{
    constructor(width , height , left , top , Xspeed , Yspeed , dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.Xspeed = Xspeed,
        this.Yspeed = Yspeed;
        this.dom = dom;     // 传进来看看到底是什么元素
        this.Render();
    }
    Render(){       // 开始渲染，渲染这个元素， 把元素的宽高和位置给定好
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    Move(time){    // 所有方法都有一个可以移动的方法，那就在父类都创建这样一个方法
        const Xdistance = this.Xspeed * time;
        const Ydistance = this.Yspeed * time;
        this.left = this.left + Xdistance;
        this.top = this.top + Ydistance;
        if(this.onMove){
            this.onMove();
        }
        this.Render();
    }
}
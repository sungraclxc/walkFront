## 概述

该文档用于v1.0。包括引擎部分的两个canvas切换、人机交互的键盘事件以及可呈现的画面变动。

在设计中，引擎层是游戏世界的底层构造，模拟物理世界，比如边缘和碰撞检测；游戏层是游戏规则的执行者，它更新游戏中的所有可操作性对象，
但是在更新之前，需要由引擎层检查是否符合模拟的世界底层规则。

游戏主要逻辑如下：
    
    init
      show_init_window
        plane (middle)
      game_core_init
        define plane and bullet
        bullet_timer_init(bullet_generate)
      engine_init
        engine_timer_init(frame_generate)
        start_shoot // init a timer
        
    frame_generate
      get_frame // canvas id
      show_frame
      
    bullet_generate
      genetate a new bullet to the array
      update previous bullets

## 交互层
  
  只需接收用户的键盘鼠标指令，将指令通过引擎接口传入即可。

  键盘控制飞机的上下左右移动
  
  用event.keyCode(IE)或者event.which(Netscape/Firefox/Opera)判定按下哪个键
  
  键盘代码：左上右下箭头分别是37、38、39、40； W、A、S、D分别是	87、65、83、68
 
## 游戏层

  根据用户指令更新游戏对象的状态。
  
  游戏层不负责边缘和碰撞检测，它只保留一段时间内的游戏数据，这里设定为一帧数据的两倍，比如子弹在屏幕上最多10个，我们保留20个数据。

  设置两个定时器分别添加子弹和更新之前的子弹的坐标，这两个速度是不一样的。
  
  根据方向键更新飞机的坐标。

  接口如下：
  
    GameLayerInit()
  
    UserCommand(command)
    
    /*
     * ret = GetData()
     *
     * Return current game objects status.
     *
     * Return
     *   {"plane" : array, "bullet" : array}
     */
    data = GetData()

## 引擎层

  将键盘原始code转换成可读的方向；周期向游戏核心请求当前游戏中所有对象的状态数据。
  
  把用户指令下发给游戏层后，游戏层根据规则生成下一步方案，如果是行动指令，需要提交给引擎层判断是否超出边界或与其他对象碰撞，再反馈给游戏层。
  
  当物体发生移动时，应当将新的坐标提交给引擎层，判断是否与其他物体发生碰撞。

  接口如下：
  
    KeyInput(keyCode)
    
    /*
     * return true or false
     */
    IsOutOfEdge()
    
    IsCollide(A, B)
    
## 渲染层

  负责接收以json格式打包的绘图信息并将其解析，然后在相应的canvas上绘制出来。
  
  可以缓存多个渲染的canvas，但只提供最合适的一个给表现层。
  
  * 画布大小：800 * 400
  * 飞机大小：10 * 10
  * 子弹大小：4 * 4
  
  接口如下：
  
    Render(data)
    RegisterCanvas(id, width, height)
    
## 表现层

  负责显示已经绘制好的画布。
  
  当canvas开始发生变化canvas准备重绘时控制css hide 1 show 2，再进行1的clear及绘制。此以保证帧切换的流畅

  接口如下：
  
    ShowFrame(canvasID)
    